import { ColumnDef } from "@tanstack/react-table";
import { ProductType } from "@/types/ProductType";
import "@/app/globals.css"


export const productColumns: ColumnDef<ProductType>[] = [
  {
  accessorKey: "image",
  header: "Image",
  cell: ({ row }) => { 
    const image = row.original.image;

    return (
      <div className="flex items-center">
        {image ? (
          <img
            src={image}
            alt="product"
            className="h-8 w-8 rounded-full object-cover place-self-center"
          />
        ) : (
          <div className="h-12 w-12 flex items-center justify-center bg-gray-100 text-xs text-gray-400 rounded-md">
            No Image
          </div>
        )}
      </div>
    );
  },
},
{
  accessorKey: "id",
  header: "Procut id",
  cell: ({ row }) => {
    const id = row.original._id.slice(0,8);
    return <><div><span className="text-xs font-light  text-sf-pro-text text-black hover:underline">{id}</span></div></>;
  },
},
  {
    accessorKey: "name",
    header: "Product Name",
    enableSorting: true,
  },
  {
    accessorKey: "price",
    header: "Price",
    enableSorting: true,
    cell: ({ getValue }) => `₹${getValue<number>().toFixed(2)}`,
  },
  {
    accessorKey: "dosage",
    header: "Dosage",
  },
  
{
  accessorKey: "category",
  header: "Category",
  cell: ({ row }) => {
    const categories = row.original.category;

    if (!categories || categories.length === 0) {
      return "—";
    }

    return categories.map((cat: any) => cat.name).join(", ");
  },
},
{
  accessorKey:"goal",
  header:"Goal",
  cell: ({ row }) => {
    const goals = row.original.goal;

    if (!goals || goals.length === 0) {
      return "—";
    }

    return goals.map((goal: any) => goal.name).join(", ");
  },
},
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ getValue }) => {
      const date = new Date(getValue<Date>());
      return date.toLocaleDateString("en-IN");
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated Date",
    cell: ({ getValue }) => {
      const date = new Date(getValue<Date>());
      return date.toLocaleDateString("en-IN");
    },
  },
  
];
