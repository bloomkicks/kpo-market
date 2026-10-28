import { formatPrice } from "@/utils/format-price";
import { Link, useSearchParams } from "react-router";
import { useProducts } from "../hooks/use-products";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { productsData } from "../types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const CatalogueGrid = () => {
  const [params, setParams] = useSearchParams();
  const {
    data: productsDat,
    isLoading,
    fetchNextPage,
  } = useProducts();

  // const products = productsData?.pages.flatMap(
  //   (page) => page.products,
  // );

  const sortBy = params.get("sort-by");
  const lowestPrice = Number(params.get("lowest") ?? 0);
  const highestPrice = Number(params.get("highest") ?? Infinity);

  let products = productsData.filter(
    (product) =>
      lowestPrice <= product.price &&
      product.price <= highestPrice,
  );

  if (!!sortBy && sortBy !== "none")
    products = [...products].sort((a, b) => {
      const coefficient = sortBy.includes("ascend") ? 1 : -1;
      if (sortBy == "new")
        return b.createdAt.localeCompare(a.createdAt);

      return coefficient * (b.price - a.price);
    });

  const onLoadMore = () => {
    fetchNextPage();
    setParams((prev) => {
      prev.delete("sort-by");
      return prev;
    });
  };

  return (
    <div className="w-full">
      <section className="w-full grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {!!products?.length ? (
          products.map((product) => (
            <Card
              key={product.productId}
              size="sm"
              render={
                <Link to={`/product/${product.productId}`} />
              }
            >
              <img
                src={product.url}
                className="bg-card-foreground/5 h-58 ratio-[0.931] rounded-sm"
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
          ))
        ) : (
          <Empty>
            <EmptyHeader className="text-lg font-bold">
              Товаров нет :D
            </EmptyHeader>
          </Empty>
        )}
      </section>
      {!!products?.length && (
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
