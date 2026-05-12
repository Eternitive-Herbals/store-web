import React from "react";

type DetailsRowProps = {
  label: string;
  value: string;
  isEditing?: boolean;
  onChange?: (val: string) => void;
  placeholder?: string;
  editable?: boolean;
};

export default function DetailsRow({
  label,
  value,
  isEditing,
  onChange,
  placeholder,
  editable = true,
}: DetailsRowProps) {
  return (
    <div className="font-sf-pro-text border-primary-background/20 text-primary-background flex w-full max-w-lg items-center justify-between rounded-lg border bg-[#F9F8F6] p-4 text-xl shadow-2xs transition-all hover:border-primary-background/30">
      <h1 className="font-semibold">{label}:</h1>
      {isEditing && editable ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="font-regular text-[#787878] bg-transparent outline-none text-right border-b border-transparent focus:border-primary-background/20 transition-all w-full ml-4"
          placeholder={placeholder}
        />
      ) : (
        <h1 className="font-regular text-[#787878] truncate ml-4 text-right">
          {value || "N/A"}
        </h1>
      )}
    </div>
  );
}
