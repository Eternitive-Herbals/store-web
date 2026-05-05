import { IUser } from "@/models/User";
import { ProductType } from "./ProductType";

export type OrderItemType = {
  product: ProductType;
  quantity: number;
  price: number;
  status: "pending" | "paid" | "failed";
};

export type OrderType = {
  _id: string;
  user: IUser;
  items: OrderItemType[];
  totalAmount: number;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
};

