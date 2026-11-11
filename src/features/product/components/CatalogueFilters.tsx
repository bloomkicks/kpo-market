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
import { useSearchParams } from "react-router";
import { formatPrice } from "@/utils/format-price";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { useCatalogue } from "../hooks/use-catalogue";

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
  const [params, setParams] = useSearchParams();
  const [slider, setSlider] = useState<[number, number] | null>(
    null,
  );
  const [sortBy, setSortBy] = useState<string | null>(
    params.get("sort-by"),
  );
  const { data: catalogueData } = useCatalogue();
  let maxPrice = useMemo(
    () =>
      catalogueData?.pages.reduce(
        (tally, cur) => Math.max(tally, cur.product.price),
        0,
      ) ?? 1000,
    [catalogueData],
  );

  const effectiveSlider = slider ?? [0, maxPrice];

  const handleApply = (e: React.SubmitEvent) => {
    e.preventDefault();

    setParams((prev) => {
      if (sortBy && sortBy !== "none")
        prev.set("sort-by", sortBy);
      else prev.delete("sort-by");

      if (slider && slider[0])
        prev.set("lowest", slider[0].toString());
      else prev.delete("lowest");

      if (slider && slider[1] !== undefined)
        prev.set("highest", slider[1].toString());
      else prev.delete("highest");

      return prev;
    });
  };

  const handleReset = () => {
    setSlider(null);
    setSortBy(null);

    setParams((prev) => {
      prev.delete("sort-by");
      prev.delete("lowest");
      prev.delete("highest");

      return prev;
    });
  };

  return (
    <section className="flex flex-col min-w-53">
      <form onSubmit={handleApply} onReset={handleReset}>
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
              onValueChange={(val) => setSortBy(val)}
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
                от {effectiveSlider[0]} до{" "}
                {formatPrice(effectiveSlider[1], true)}
              </span>
            </FieldLabel>
            <Slider
              id="filters-price"
              value={effectiveSlider}
              onValueChange={(val) =>
                setSlider(val as typeof effectiveSlider)
              }
              defaultValue={[0, maxPrice]}
              max={maxPrice}
              step={1}
            />
          </Field>
          <div className="space-y-2 *:w-full">
            <Button type="submit" size="lg">
              Применить фильтры
            </Button>
            <Button type="reset" variant="outline" size="lg">
              Сбросить
            </Button>
          </div>
        </FieldGroup>
      </form>
    </section>
  );
};
