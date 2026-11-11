import { formatPrice } from "@/utils/format-price";
import { Link } from "react-router";
import { QueryState } from "@/components/QueryState";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useLikes } from "@/features/product/hooks/use-likes";
import { useProduct } from "@/features/product/hooks/use-product";

// в /profiles/likes только id товаров - карточку берём из каталога
const WishlistCard = ({ productId }: { productId: string }) => {
  const { data: product } = useProduct(productId);

  // товар удалён или ещё грузится
  if (!product) return null;

  return (
    <Card size="sm" render={<Link to={`/product/${productId}`} />}>
      <img
        src={product.url}
        className="bg-card-foreground/5 h-58 ratio-[0.931] rounded-sm object-contain"
      />
      <CardHeader>
        <CardTitle>{formatPrice(product.price)}</CardTitle>
        <CardDescription className="text-ellipsis text-nowrap overflow-hidden">
          {product.title}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export const ProfileWishlist = () => {
  const { data: likes, isLoading } = useLikes();

  return (
    <section>
      <h3 className="text-xl font-bold mb-4">Избранное</h3>
      <QueryState
        isLoading={isLoading}
        isEmpty={!likes?.length}
        emptyHeader="В избранном пока ничего нет"
      >
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {likes?.map((like) => (
            <WishlistCard
              key={like.product_id}
              productId={like.product_id}
            />
          ))}
        </div>
      </QueryState>
    </section>
  );
};
