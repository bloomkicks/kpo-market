import { CatalogueGrid } from "@/features/catalogue/components/CatalogueGrid";
import { CatalogueFilters } from "@/features/catalogue/components/CatalogueFilters";
export const CataloguePage = () => {
  return (
    <>
      <h1 className="text-[2rem] font-bold mb-6">Каталог</h1>
      <div className="flex gap-x-6">
        <CatalogueFilters />
        <CatalogueGrid />
      </div>
    </>
  );
};
