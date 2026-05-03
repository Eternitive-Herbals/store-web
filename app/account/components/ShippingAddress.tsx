import { Plus, CheckCircle2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { IUser } from "@/models/User";
import { toast } from "sonner";
import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";
import { getUserAddresses, createAddress, updateAddress, deleteAddress, setPrimaryAddress } from "@/lib/addressAction";

type ShippingAddressProps = {
  user: IUser | null;
  refreshUser: () => Promise<void>;
};

export default function ShippingAddress({ user, refreshUser }: ShippingAddressProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [addresses, setAddresses] = useState<any[]>([]);
  const [primaryAddressId, setPrimaryAddressId] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const fetchAddresses = async () => {
    try {
      setFetching(true);
      const data = await getUserAddresses();
      setAddresses(data.addresses);
      setPrimaryAddressId(data.primaryAddress);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await updateAddress(editingId, formData);
      } else {
        await createAddress(formData);
      }
      await fetchAddresses();
      await refreshUser();
      resetForm();
      toast.success(editingId ? "Address updated" : "Address added");
    } catch (error: any) {
      toast.error(error.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      setLoading(true);
      await deleteAddress(id);
      await fetchAddresses();
      await refreshUser();
      toast.success("Address deleted");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete address");
    } finally {
      setLoading(false);
    }
  };

  const handleSetPrimary = async (id: string) => {
    try {
      setLoading(true);
      await setPrimaryAddress(id);
      await fetchAddresses();
      await refreshUser();
      toast.success("Primary address updated");
    } catch (error: any) {
      toast.error(error.message || "Failed to set primary address");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (address: any) => {
    setEditingId(address._id);
    setFormData({
      fullName: address.fullName || "",
      phone: address.phone || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      country: address.country || "India",
    });
    setIsAdding(true);
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    });
  };

  if (fetching) {
     return <div className="p-10 text-center animate-pulse text-gray-500">Loading your addresses...</div>;
  }

  return (
    <div className="mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      <div className="flex flex-col gap-6">
        {isAdding ? (
          <AddressForm
            formData={formData}
            setFormData={setFormData}
            onSave={handleSave}
            onCancel={resetForm}
            loading={loading}
            editingId={editingId}
          />
        ) : (
          addresses.map((address: any) => (
            <div key={address._id} className="relative">
              {primaryAddressId === address._id && (
                <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                  <CheckCircle2 size={14} /> Primary
                </div>
              )}
              <AddressCard
                address={address}
                onEdit={startEdit}
                onDelete={handleDelete}
                onSetPrimary={() => handleSetPrimary(address._id)}
                isPrimary={primaryAddressId === address._id}
              />
            </div>
          ))
        )}
        {addresses.length === 0 && !isAdding && (
          <div className="text-center p-10 border border-dashed rounded-xl border-primary-background/20 bg-gray-50/50">
            <p className="text-primary-background/40 font-medium">No addresses saved yet.</p>
          </div>
        )}
      </div>

      {!isAdding && (
        <div 
          onClick={() => setIsAdding(true)}
          className="border-primary-background/20 flex h-64 w-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-10 cursor-pointer hover:bg-primary-background/[0.02] hover:border-primary-background/40 transition-all group"
        >
          <div className="bg-primary-background p-3 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform">
            <Plus size={32} />
          </div>
          <h1 className="text-primary-background text-lg font-semibold underline decoration-primary-background/30 underline-offset-4">
            Add new address
          </h1>
        </div>
      )}
    </div>
  );
}