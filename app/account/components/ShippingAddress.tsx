import { Plus } from "lucide-react";
import React, { useState } from "react";
import { IUser } from "@/models/User";
import { updateUserProfile } from "@/lib/userAction";
import { toast } from "sonner";
import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";

type ShippingAddressProps = {
  user: IUser | null;
  refreshUser: () => Promise<void>;
};

export default function ShippingAddress({ user, refreshUser }: ShippingAddressProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const addresses = user?.addresses || [];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      let newAddresses = [...addresses];
      
      if (editingId) {
        newAddresses = newAddresses.map((addr: any) => 
          addr._id === editingId ? { ...formData, _id: editingId } : addr
        );
      } else {
        newAddresses.push(formData as any);
      }

      await updateUserProfile({ addresses: newAddresses });
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
      const newAddresses = addresses.filter((addr: any) => addr._id !== id);
      await updateUserProfile({ addresses: newAddresses });
      await refreshUser();
      toast.success("Address deleted");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete address");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (address: any) => {
    setEditingId(address._id);
    setFormData({
      fullName: address.fullName,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
    });
    setIsAdding(true);
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    });
  };

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
            <AddressCard
              key={address._id}
              address={address}
              onEdit={startEdit}
              onDelete={handleDelete}
            />
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
