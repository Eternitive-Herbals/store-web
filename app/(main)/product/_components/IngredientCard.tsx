import Image from 'next/image'
type IngredientCardProps = {
  ingredients: Array<{
    _id: string;
    name: string;
    description: string;
    image: string;
  }>;
};
export default function IngredientCard({ ingredients }: IngredientCardProps) {
  // Split into rows of 3
  const rows: Array<typeof ingredients> = [];
  for (let i = 0; i < ingredients.length; i += 3) {
    rows.push(ingredients.slice(i, i + 3));
  }
  return (
    <div className="mb-10 w-full space-y-2 md:space-y-9">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx}>
          <div className="bg-[#9EA1A7 ] hidden h-[.5px] w-fit md:static" />
          <div className="mx-auto flex flex-wrap gap-4  items-center justify-between py-1 md:py-9">
            {row.map((ingredient, idx) => (
              <div
                key={ingredient._id || idx}
                className="flex items-center justify-between gap-5 max-w-fit"
              >
                <div className="relative flex size-8 items-center justify-center overflow-hidden rounded-full bg-gray-200 sm:size-16 md:size-22">
                  {ingredient.image ? (
                    <Image
                      loading="lazy"
                      src={ingredient.image}
                      alt={ingredient.name || "Ingredient"}
                      fill
                      sizes="88px"
                      className="object-cover object-center"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No Image</span>
                  )}
                </div>
                <div className="w-fit ">
                  <h1 className="font-sf-pro-text pb-1 text-sm font-normal tracking-normal text-wrap sm:text-lg md:text-xl">
                    {ingredient.name}
                  </h1>
                  <p className="font-sf-pro-text  text-xs font-light text-wrap sm:text-sm md:text-lg">
                    {ingredient.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {ingredients.length > 0 && (
        <div className="h-[.5px] w-full bg-[#9EA1A7] hidden md:static" />
      )}
    </div>
  );
}
