import { CatalogueGrid } from "@/features/product/components/CatalogueGrid";
import { CatalogueFilters } from "@/features/product/components/CatalogueFilters";

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
