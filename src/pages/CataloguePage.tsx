import { CatalogueGrid } from "@/features/catalogue/components/CatalogueGrid";
import { CatalogueFilters } from "@/features/catalogue/components/CatalogueFilters";

export const CataloguePage = () => {
  return (
    <>
      <div className="flex gap-x-6">
        <CatalogueFilters />
        <CatalogueGrid />
      </div>
    </>
  );
};
