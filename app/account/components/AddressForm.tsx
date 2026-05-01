import React from "react";

type AddressFormProps = {
  formData: any;
  setFormData: (data: any) => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
  loading: boolean;
  editingId: string | null;
};

export default function AddressForm({
  formData,
  setFormData,
  onSave,
  onCancel,
  loading,
  editingId,
}: AddressFormProps) {
  return (
    <div className="border-primary-background/20 w-full rounded-xl border p-6 bg-[#F9F8F6]">
      <h2 className="text-primary-background text-lg font-semibold mb-4">
        {editingId ? "Edit Address" : "Add New Address"}
      </h2>
      <form onSubmit={onSave} className="grid grid-cols-2 gap-4">
        <input
          className="col-span-2 p-2 rounded border bg-white outline-none focus:border-primary-background/40 transition-colors"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />
        <input
          className="col-span-2 p-2 rounded border bg-white outline-none focus:border-primary-background/40 transition-colors"
          placeholder="Address Line 1"
          value={formData.addressLine1}
          onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
          required
        />
        <input
          className="col-span-2 p-2 rounded border bg-white outline-none focus:border-primary-background/40 transition-colors"
          placeholder="Address Line 2 (Optional)"
          value={formData.addressLine2}
          onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
        />
        <input
          className="p-2 rounded border bg-white outline-none focus:border-primary-background/40 transition-colors"
          placeholder="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          required
        />
        <input
          className="p-2 rounded border bg-white outline-none focus:border-primary-background/40 transition-colors"
          placeholder="State"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          required
        />
        <input
          className="p-2 rounded border bg-white outline-none focus:border-primary-background/40 transition-colors"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
          required
        />
        <input
          className="p-2 rounded border bg-white outline-none focus:border-primary-background/40 transition-colors"
          placeholder="Country"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          required
        />
        <div className="col-span-2 flex justify-end gap-4 mt-2">
          <button type="button" onClick={onCancel} className="text-sm underline cursor-pointer hover:text-primary-background/60">
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-background text-white px-6 py-2 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
        </div>
      </form>
    </div>
  );
}
