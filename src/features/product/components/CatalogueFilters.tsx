import {
  Field,
  FieldLabel,
  FieldGroup,
} from "@/components/ui/field";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useProducts } from "../hooks/use-products";
import { useSearchParams } from "react-router";
import { productsData } from "../types";
import { formatPrice } from "@/utils/format-price";

const sortOptions = [
  {
    label: "Без сортировки",
    value: "none",
  },
  {
    label: "Сначала дорогие",
    value: "price-descend",
  },
  {
    label: "Сначала дешевые",
    value: "price-ascend",
  },
  {
    label: "Сначала новые",
    value: "new",
  },
];

export const CatalogueFilters = () => {
  const { data: productsDat } = useProducts();
  const [params, setParams] = useSearchParams();
  let max = 10000;
  // productsData?.pages.flatMap((page) =>
  //   page.products.forEach((product) => {
  //     if (product.price > max) max = product.price;
  //   }),
  productsData?.forEach((product) => {
    if (product.price > max) max = product.price;
  });

  const sortBy = params.get("sort-by");
  const lowestPrice = Number(params.get("lowest") ?? 0);
  const highestPrice = Number(params.get("highest") ?? max);

  const onChangeSort = (value: string | null) => {
    if (!value) return;

    setParams((prev) => {
      prev.set("sort-by", value);
      return prev;
    });
  };

  const onChangePrice = (value: number | readonly number[]) => {
    if (!Array.isArray(value)) return;
    setParams((prev) => {
      prev.set("lowest", value[0].toString());
      prev.set("highest", value[1].toString());
      return prev;
    });
  };

  return (
    <section className="flex flex-col min-w-53">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="filters-sort">
            Сортировка
          </FieldLabel>
          <Select
            id="filters-sort"
            items={sortOptions}
            defaultValue="none"
            value={sortBy || "none"}
            onValueChange={onChangeSort}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortOptions.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="filters-price">
            <span className="block mr-auto">Цена</span>
            <span>
              от {lowestPrice} до{" "}
              {formatPrice(highestPrice, true)}
            </span>
          </FieldLabel>
          <Slider
            id="filters-price"
            defaultValue={[lowestPrice, highestPrice]}
            onValueCommitted={onChangePrice}
            max={max}
            step={1}
          />
        </Field>
      </FieldGroup>
    </section>
  );
};
