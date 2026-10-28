export const ProductImage = ({
  url,
  title,
}: {
  url: string;
  title: string;
}) => {
  return (
    <section className="h-112">
      <img
        className="bg-card-foreground/5 h-112 aspect-[0.931] rounded-sm"
        width="450px"
        height="396px"
        src={url}
        alt={`Изображение товара: ${title}`}
      />
    </section>
  );
};
