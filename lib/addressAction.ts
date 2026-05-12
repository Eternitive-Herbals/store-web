"use server";

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/token";
import connectDB from "@/lib/db";
import Address from "@/models/Address";
import User from "@/models/User";

const getUserId = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) return null;
  try {
    const decoded = verifyToken(token);
    return decoded.userId;
  } catch (err) {
    return null;
  }
};

export async function getUserAddresses() {
  await connectDB();
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  const addresses = await Address.find({ userId }).sort({ createdAt: -1 }).lean();
  
  // also get the primary address ID from User
  const user = await User.findById(userId).select("primaryAddress").lean();
  
  return {
    addresses: JSON.parse(JSON.stringify(addresses)),
    primaryAddress: user?.primaryAddress?.toString() || null
  };
}

export async function createAddress(data: any) {
  await connectDB();
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  const newAddress = await Address.create({ ...data, userId });
  
  // If this is the only address, or marked as default, make it primary
  const totalAddresses = await Address.countDocuments({ userId });
  if (totalAddresses === 1 || data.isDefault) {
    await User.findByIdAndUpdate(userId, { primaryAddress: newAddress._id });
  }

  return JSON.parse(JSON.stringify(newAddress));
}

export async function updateAddress(id: string, data: any) {
  await connectDB();
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  const address = await Address.findOneAndUpdate(
    { _id: id, userId },
    { $set: data },
    { new: true }
  );

  if (data.isDefault) {
    await User.findByIdAndUpdate(userId, { primaryAddress: id });
  }

  return JSON.parse(JSON.stringify(address));
}

export async function deleteAddress(id: string) {
  await connectDB();
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  await Address.findOneAndDelete({ _id: id, userId });
  
  // If this was the primary address, clear it
  const user = await User.findById(userId);
  if (user?.primaryAddress?.toString() === id) {
    await User.findByIdAndUpdate(userId, { primaryAddress: null });
  }

  return true;
}

export async function setPrimaryAddress(id: string) {
  await connectDB();
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  // Validate address belongs to user
  const address = await Address.findOne({ _id: id, userId });
  if (!address) throw new Error("Address not found");

  await User.findByIdAndUpdate(userId, { primaryAddress: id });
  return true;
}
