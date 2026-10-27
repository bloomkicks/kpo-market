import { catalogueProducts } from "@/types/mocks";
import { formatPrice } from "@/utils/format-price";
import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const CatalogueGrid = () => {
  return (
    <div className="w-full">
      <section className="w-full grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {catalogueProducts.map((product) => (
          <Card
            key={product.id}
            size="sm"
            render={<Link to={`/product/${product.id}`} />}
          >
            <img
              src={product.image}
              className="bg-card-foreground/5 h-58 ratio-[0.931] rounded-sm"
            />
            <CardHeader>
              <CardTitle>{formatPrice(product.price)}</CardTitle>
              <CardDescription className="text-ellipsis text-nowrap overflow-hidden">
                {product.title}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
};
