import { ProductImage } from "@/features/product/components/ProductImage";
import { ProductDetails } from "@/features/product/components/ProductDetails";
import { ProductDescription } from "@/features/product/components/ProductDescription";
import { useProduct } from "@/features/product/hooks/use-product";
import { useParams } from "react-router";
import { Empty, EmptyHeader } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth-store";

export const ProductPage = () => {
  const { productId } = useParams();
  const isAuth = useAuthStore((s) => !!s.tokens);
  const { data: product, isLoading } = useProduct(productId);

  if (isLoading) return <Spinner className="mx-auto mt-8" />;

  if (!product)
    return (
      <Empty>
        <EmptyHeader className="text-lg font-bold">
          {isAuth
            ? "Товар не найден :D"
            : "Войдите, чтобы открыть карточку товара"}
        </EmptyHeader>
      </Empty>
    );

  return (
    <>
      <div className="flex gap-x-6 mb-6">
        <ProductImage url={product.url} title={product.title} />
        <ProductDetails product={product} />
      </div>
      <ProductDescription description={product.description} />
    </>
  );
};
