import { filterCategories } from "../catalogue-items";
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

export const CatalogueFilters = () => {
  return (
    <div className="flex flex-col min-w-53">
      <FieldSet>
        <Field>
          <FieldLabel>Поиск по названию</FieldLabel>
          <Select items={filterCategories} defaultValue={"Выберите"}>
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
          <Slider
            defaultValue={[0, 75]}
            max={100}
            step={1}
          />
        </Field>
      </FieldSet>
    </div>
  );
};
