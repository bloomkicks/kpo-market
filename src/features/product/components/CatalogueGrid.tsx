import { formatPrice } from "@/utils/format-price";
import { Link, useSearchParams } from "react-router";
import { useCatalogue } from "../hooks/use-catalogue";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { QueryState } from "@/components/QueryState";
import { applyFilters } from "@/utils/apply-filters";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const CatalogueGrid = () => {
  const [params, setParams] = useSearchParams();
  const {
    data: catalogueData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useCatalogue();

  const onLoadMore = () => {
    fetchNextPage();
    // setParams();
  };

  const proudcts =
    catalogueData?.pages.map((p) => p.product) ?? [];
  const filtered = applyFilters(params, proudcts);

  return (
    <div className="w-full">
      <section className="w-full grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        <QueryState
          isEmpty={!filtered.length}
          emptyHeader="Товаров нет"
        >
          {filtered.map((product) => (
            <Card
              key={product.productId}
              size="sm"
              render={
                <Link to={`/product/${product.productId}`} />
              }
            >
              <img
                src={product.url}
                className="bg-card-foreground/5 h-58 ratio-[0.931] rounded-sm object-contain"
              />
              <CardHeader>
                <CardTitle>
                  {formatPrice(product.price)}
                </CardTitle>
                <CardDescription className="text-ellipsis text-nowrap overflow-hidden">
                  {product.title}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </QueryState>
      </section>
      {!!filtered.length && hasNextPage && (
        <Button
          variant="outline"
          className="flex mt-8 mx-auto"
          onClick={onLoadMore}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Загрузить ещё"}
        </Button>
      )}
    </div>
  );
};
