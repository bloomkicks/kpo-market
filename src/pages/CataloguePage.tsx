import { CatalogueGrid } from "@/features/product/components/CatalogueGrid";
import { CatalogueFilters } from "@/features/product/components/CatalogueFilters";
import { useProfile } from "@/features/profile/hooks/use-profile";
import { selectIsBusiness } from "@/utils/select-is-business";
import { BusinessProductsGrid } from "@/features/product/components/BusinessProductsGrid";

export const CataloguePage = () => {
  const { data: isBusiness } = useProfile({
    select: selectIsBusiness,
  });

  return (
    <>
      {isBusiness ? (
        <BusinessProductsGrid />
      ) : (
        <div className="flex gap-x-6">
          <CatalogueFilters />
          <CatalogueGrid />
        </div>
      )}
    </>
  );
};
