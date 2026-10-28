export const ProductDescription = ({
  description,
}: {
  description?: string;
}) => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Описание</h2>
      <p>{description}</p>
    </section>
  );
};
