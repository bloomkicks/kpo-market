import { productDetails } from "@/types/mocks";

export const ProductDescription = () => {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Описание</h2>
        <p>{productDetails.description}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Характеристики
        </h2>
        <p>{productDetails.description}</p>
      </div>
    </section>
  );
};
