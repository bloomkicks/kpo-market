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
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/format-price";
import { useEffect, useState } from "react";
import {
  useCatalogue,
  useCatalogueParams,
} from "../hooks/use-catalogue";

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
  const { maxPrice } = useCatalogue();
  const { sortBy, lowest, highest, query, update } =
    useCatalogueParams();

  const max = Math.max(1000, Math.ceil(maxPrice / 1000) * 1000);
  const from = lowest ?? 0;
  const to = highest ?? max;

  const [range, setRange] = useState<number[]>([from, to]);
  useEffect(() => setRange([from, to]), [from, to]);

  const onChangePrice = (value: number | readonly number[]) => {
    if (!Array.isArray(value)) return;
    const [low, high] = value as number[];
    update({
      lowest: low > 0 ? String(low) : null,
      highest: high < max ? String(high) : null,
    });
  };

  const hasFilters =
    !!query ||
    sortBy !== "none" ||
    lowest !== null ||
    highest !== null;

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
            value={sortBy}
            onValueChange={(value) =>
              update({
                "sort-by": value === "none" ? null : value,
              })
            }
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
              от {formatPrice(range[0], true)} до{" "}
              {formatPrice(range[1], true)}
            </span>
          </FieldLabel>
          <Slider
            id="filters-price"
            value={range}
            onValueChange={(value) =>
              Array.isArray(value) && setRange(value as number[])
            }
            onValueCommitted={onChangePrice}
            max={max}
            step={10}
          />
        </Field>
        {hasFilters && (
          <Button
            variant="outline"
            onClick={() =>
              update({
                q: null,
                "sort-by": null,
                lowest: null,
                highest: null,
              })
            }
          >
            Сбросить фильтры
          </Button>
        )}
      </FieldGroup>
    </section>
  );
};
