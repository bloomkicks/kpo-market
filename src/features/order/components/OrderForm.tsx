import { Input } from "@/components/ui/input";
import {
  FieldSet,
  Field,
  FieldLabel,
} from "@/components/ui/field";

export const OrderForm = () => {
  return (
    <section className="w-full ring-1 ring-border rounded-lg p-6">
      <h3 className="text-[1.375rem] font-bold mb-5">
        1. Получатель
      </h3>
      <FieldSet>
        <Field>
          <FieldLabel>Имя и фамилия</FieldLabel>
          <Input
            className="border-border"
            placeholder="Имя и фамилия"
          />
        </Field>
        <div className="flex gap-x-5 *:w-1/2">
          <Field>
            <FieldLabel>Телефон</FieldLabel>
            <Input
              className="border-border"
              placeholder="Телефон"
            />
          </Field>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              className="border-border"
              placeholder="Email"
            />
          </Field>
        </div>
      </FieldSet>
    </section>
  );
};
