import type { Product } from "@/types";

export const ProductImage = ({
  product,
}: {
  product: Product;
}) => {
  return (
    <section className="h-112 basis-1/2 min-w-0 max-w-xl">
      <img
        className="bg-card-foreground/5 h-full w-full rounded-sm object-contain"
        width="450px"
        height="396px"
        src={product.url}
        alt={`Изображение товара: ${product.title}`}
      />
    </section>
  );
};
