import { formatPrice } from "@/utils/format-price";
import { Link, useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { QueryState } from "@/components/QueryState";
import { applyFilters } from "@/utils/apply-filters";
import { useBusinessProducts } from "../hooks/use-business-products";
import type { Product } from "../../../types/index";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const BusinessProductsGrid = () => {
  const [params, setParams] = useSearchParams();
  const {
    data: productsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useBusinessProducts();

  const onLoadMore = () => {
    fetchNextPage();
    // setParams();
  };

  const filtered = applyFilters(
    params,
    productsData?.pages ?? [],
  );

  return (
    <div className="w-full">
      <QueryState
        isEmpty={!filtered.length}
        emptyHeader="Товаров нет"
      >
        <section className="w-full grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
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
        </section>
      </QueryState>
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
