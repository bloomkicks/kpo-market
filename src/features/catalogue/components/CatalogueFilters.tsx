import { filterCategories } from "@/types/mocks";
import {
  Field,
  FieldSet,
  FieldLabel,
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

const sortOptions = [
  {
    label: "По цене",
    value: "price",
  },
  {
    label: "По новизне",
    value: "new",
  },
];

export const CatalogueFilters = () => {
  return (
    <section className="flex flex-col min-w-53">
      <FieldSet>
        <Field>
          <FieldLabel>Сортировка</FieldLabel>
          <Select
            items={sortOptions}
            defaultValue={"Сортировка"}
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
          <FieldLabel>Поиск по названию</FieldLabel>
          <Select
            items={filterCategories}
            defaultValue={"Выберите"}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {filterCategories.map((item) => (
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
          <FieldLabel>Цена, ₽</FieldLabel>
          <Slider defaultValue={[0, 75]} max={100} step={1} />
        </Field>
      </FieldSet>
    </section>
  );
};
