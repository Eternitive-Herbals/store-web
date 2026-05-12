import { IUser } from "@/models/User";
import React, { useState } from "react";
import { updateUserProfile } from "@/lib/userAction";
import { Edit2, X, Check } from "lucide-react";
import { toast } from "sonner";
import DetailsRow from "./DetailsRow";

type AccountDetailsProps = {
  user: IUser | null;
  refreshUser: () => Promise<void>;
};

export default function AccountDetails({ user, refreshUser }: AccountDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateUserProfile({ username });
      await refreshUser();
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setUsername(user?.username || "");
    setIsEditing(false);
  };

  return (
    <div className="w-full space-y-6 place-self-center">
      <div className="flex justify-end gap-4 mt-6">
        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              className="text-foreground font-normal flex items-center justify-center text-sm leading-none hover:opacity-80 transition-opacity bg-primary-background/30 px-6 py-3 rounded-full cursor-pointer"
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="text-background font-normal flex items-center justify-center text-sm leading-none hover:opacity-80 transition-opacity bg-primary-background px-6 py-3 rounded-full disabled:opacity-50 cursor-pointer"
            >
              <Check size={16} className="mr-2" />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-background font-normal flex items-center justify-center text-sm leading-none hover:opacity-80 transition-opacity bg-primary-background px-6 py-3 rounded-full cursor-pointer"
          >
            <Edit2 size={16} className="mr-2" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="space-y-4">
        <DetailsRow
          label="Name"
          value={username}
          isEditing={isEditing}
          onChange={setUsername}
          placeholder="Enter your name"
        />
        <DetailsRow
          label="Email"
          value={user?.email || "N/A"}
          editable={false}
        />
      </div>
    </div>
  );
}
