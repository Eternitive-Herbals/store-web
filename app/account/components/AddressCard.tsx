import React from "react";
import { MapPinHouse, CheckCircle } from "lucide-react";

type AddressCardProps = {
  address: any;
  onEdit: (address: any) => void;
  onDelete: (id: string) => void;
  onSetPrimary: () => void;
  isPrimary: boolean;
};

export default function AddressCard({ address, onEdit, onDelete, onSetPrimary, isPrimary }: AddressCardProps) {
  return (
    <div className={`flex min-h-60 w-full items-start gap-5 rounded-xl border p-6 bg-white shadow-sm hover:shadow-md transition-all ${isPrimary ? 'border-green-500 shadow-green-100' : 'border-primary-background/20'}`}>
      <MapPinHouse size={72} className={`${isPrimary ? 'text-green-500' : 'text-primary-background/50'} flex-shrink-0 transition-colors`} />
      <div className="flex-grow">
        <div className="mb-6 flex flex-col items-start justify-start gap-1">
          <h1 className="text-primary-background text-xl font-semibold flex items-center gap-2">
            {address.fullName}
          </h1>
          <p className="text-primary-background/80 font-medium">
            Phone: {address.phone}
          </p>
          <p className="text-primary-background/50 text-sm mt-1">
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
        <div className="flex items-center justify-start gap-6 pt-2 border-t border-gray-100">
          <button 
            onClick={() => onEdit(address)}
            className="text-foreground cursor-pointer text-sm font-medium"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(address._id)}
            className="text-foreground/80 hover:foreground/60 cursor-pointer text-sm font-medium"
          >
            Delete
          </button>
          {!isPrimary && (
             <button 
             onClick={onSetPrimary}
             className="text-primary-background cursor-pointer text-sm font-medium ml-auto flex items-center gap-1"
           >
             <CheckCircle size={16} /> Set as Primary
           </button>
          )}
        </div>
      </div>
    </div>
  );
}
