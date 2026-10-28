import { formatPrice } from "@/utils/format-price";
import { Link } from "react-router";
import { useCatalogue } from "../hooks/use-catalogue";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const CatalogueGrid = () => {
  const {
    products,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isFiltered,
    isFilling,
  } = useCatalogue();

  if (isLoading || (isFilling && !products.length))
    return <Spinner className="mx-auto mt-8" />;

  if (isError)
    return (
      <Empty>
        <EmptyHeader className="text-lg font-bold">
          Не удалось загрузить каталог
        </EmptyHeader>
      </Empty>
    );

  return (
    <div className="w-full">
      <section className="w-full grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {products.length ? (
          products.map((product) => (
            <Card
              key={product.productId}
              size="sm"
              className="max-w-xl"
              render={
                <Link to={`/product/${product.productId}`} />
              }
            >
              <img
                src={product.url}
                className="bg-card-foreground/5 h-58 max-w-xl ratio-[0.931] rounded-sm"
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
              {isFiltered
                ? "Ничего не нашлось, попробуйте изменить фильтры"
                : "Товаров нет :D"}
            </EmptyHeader>
          </Empty>
        )}
      </section>
      {!!products.length && hasNextPage && !isFiltered && (
        <Button
          variant="outline"
          className="flex mt-8 mx-auto"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? <Spinner /> : "Загрузить ещё"}
        </Button>
      )}
    </div>
  );
};
