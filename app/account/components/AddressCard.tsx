import React from "react";
import { MapPinHouse } from "lucide-react";

type AddressCardProps = {
  address: any;
  onEdit: (address: any) => void;
  onDelete: (id: string) => void;
};

export default function AddressCard({ address, onEdit, onDelete }: AddressCardProps) {
  return (
    <div className="border-primary-background/20 flex min-h-60 w-full items-start gap-5 rounded-xl border p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <MapPinHouse size={72} className="text-primary-background/50 flex-shrink-0" />
      <div className="flex-grow">
        <div className="mb-8 flex flex-col items-start justify-start gap-2">
          <h1 className="text-primary-background text-xl font-semibold">
            {address.fullName}
          </h1>
          <p className="text-primary-background/50 text-sm">
            {address.addressLine1}
          </p>
          {address.addressLine2 && (
            <p className="text-primary-background/50 text-sm">
              {address.addressLine2}
            </p>
          )}
          <p className="text-primary-background/50 text-sm">
            {address.city}, {address.state}
          </p>
          <p className="text-primary-background/50 text-sm">
            {address.country} - {address.pincode}
          </p>
        </div>
        <div className="flex items-center justify-start gap-6">
          <button 
            onClick={() => onEdit(address)}
            className="text-primary-background hover:text-primary-background/60 cursor-pointer text-lg underline font-medium"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(address._id)}
            className="text-primary-background hover:text-primary-background/60 cursor-pointer text-lg underline font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
