import { catalogueItems } from "../catalogue-items";
import { formatPrice } from "@/utils/format-price";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export interface Item {
  id: number;
  price: number;
  title: string;
  img: string;
}

export const CatalogueGrid = () => {
  return (
    <div className="w-full flex flex-wrap gap-6">
      {catalogueItems.map((item) => (
        <Card
          key={item.id}
          size="sm"
          className="grow max-w0/3 min-w-1/5"
        >
          <img
            src={item.img}
            className="bg-card-foreground/5 h-58 ratio-[0.931] rounded-sm"
          />
          <CardHeader>
            <CardTitle>{formatPrice(item.price)}</CardTitle>
            <CardDescription className="text-ellipsis text-nowrap overflow-hidden">
              {item.title}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
