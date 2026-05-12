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
    <div className="mb-10 w-full space-y-9">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx}>
          <div className="h-[.5px] w-full bg-[#9EA1A7]" />
          <div className="mx-auto flex items-center justify-between py-9">
            {row.map((ingredient, idx) => (
              <div key={ingredient._id || idx} className="flex items-center justify-between gap-5">
                <div className="relative size-22 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {ingredient.image ? (
                    <Image
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
                <div className="">
                  <h1 className="font-sf-pro-text pb-1 text-[20px] font-normal tracking-normal text-wrap">
                    {ingredient.name}
                  </h1>
                  <p className="font-sf-pro-text spacing- w-3xs text-sm font-light text-wrap">
                    {ingredient.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {ingredients.length > 0 && <div className="h-[.5px] w-full bg-[#9EA1A7]" />}
    </div>
  );
}
