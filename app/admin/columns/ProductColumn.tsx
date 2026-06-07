import { ColumnDef } from "@tanstack/react-table";
import { ProductType } from "@/types/ProductType";
import "@/app/globals.css"


export const productColumns: ColumnDef<ProductType>[] = [
  {
  accessorKey: "image",
  header: "Image",
  cell: ({ row }) => { 
    const imagesList = (row.original.images?.length ? row.original.images : (row.original.image ? [row.original.image] : [])).filter(Boolean);
    const displayImage = imagesList[0] || null;

    return (
      <div className="flex items-center">
        {displayImage ? (
          <img
            src={displayImage}
            alt="product"
            className="h-8 w-8 rounded-full object-cover place-self-center border border-gray-200"
          />
        ) : (
          <div className="h-8 w-8 flex items-center justify-center bg-gray-100 text-[8px] text-gray-400 rounded-full border border-gray-200">
            None
          </div>
        )}
      </div>
    );
  },
},
{
  accessorKey: "id",
  header: "Product ID",
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
    accessorKey: "addToCarousel",
    header: "Carousel",
    cell: ({ row }) => {
      const addToCarousel = row.original.addToCarousel;
      const carouselImage = row.original.carouselImage;
      return (
        <div className="flex items-center gap-2">
          {addToCarousel ? (
            <>
              <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Yes
              </span>
              {carouselImage && (
                <img
                  src={carouselImage}
                  alt="carousel preview"
                  className="h-6 w-10 object-cover rounded border border-gray-200"
                />
              )}
            </>
          ) : (
            <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              No
            </span>
          )}
        </div>
      );
    },
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