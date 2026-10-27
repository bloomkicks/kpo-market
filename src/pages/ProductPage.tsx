import { ProductImages } from "@/features/product/components/ProductImages";
import { ProductDetails } from "@/features/product/components/ProductDetails";
import { ProductDescription } from "@/features/product/components/ProductDescription";

export const ProductPage = () => {
  return (
    <>
      <div className="flex gap-x-6 mb-6">
        <ProductImages />
        <ProductDetails />
      </div>
      <ProductDescription />
    </>
  );
};
