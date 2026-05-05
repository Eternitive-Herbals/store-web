import { OrderType } from "./OrderType";
import {  ColumnDef } from "@tanstack/react-table";
import { ProductType } from "./ProductType";
export type OrderProps = {
  data: OrderType[];
  columns: ColumnDef<OrderType>[];
  pageSize?: number;
  enableRowSelection?: boolean;
  enableActions?: boolean;
  title?: string;
  description?: string;
  onRowAction?: (action: string, row: OrderType) => void;
  LeftSection?: React.ReactNode;
};

export type ProductProps= {
  data: ProductType[];
  columns: ColumnDef<ProductType>[];
  pageSize?: number;
  enableRowSelection?: boolean;
  enableActions?: boolean;
  title?: string;
  description?: string;
  onRowAction?: (action: string, row: ProductType) => void;
  LeftSection?: React.ReactNode;
}