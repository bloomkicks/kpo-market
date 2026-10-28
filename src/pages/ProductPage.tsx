import { ProductImage } from "@/features/product/components/ProductImage";
import { ProductDetails } from "@/features/product/components/ProductDetails";
import { ProductDescription } from "@/features/product/components/ProductDescription";
import { useProduct } from "@/features/product/hooks/use-product";
import { useParams } from "react-router";
import { Empty, EmptyHeader } from "@/components/ui/empty";

export const ProductPage = () => {
  const { productId } = useParams();
  const { data: product } = useProduct(productId);

  if (!product)
    return (
      <Empty>
        <EmptyHeader className="text-lg font-bold">
          Товар не найден :D
        </EmptyHeader>
      </Empty>
    );

  return (
    <>
      <div className="flex gap-x-6 mb-6">
        <ProductImage
          url={product.url}
          title={product.title}
        />
        <ProductDetails product={product} />
      </div>
      <ProductDescription />
    </>
  );
};
