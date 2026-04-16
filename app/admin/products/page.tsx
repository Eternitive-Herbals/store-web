
"use client";
import BasicTable from "@/components/BasicTable";
import { OrderType } from "@/types/OrderType";
import Mdata from "../../MOCK_DATA.json";
import { useMemo } from "react";
import { orderColumns } from "../columns/OrderColumn";

export default function Page() {
  const data: OrderType[] = useMemo(() => Mdata as OrderType[], []);

  return <BasicTable data={data} columns={orderColumns} pageSize={10}/>;
}
