import { productDetails } from "@/types/mocks";
import { useState } from "react";

export const ProductImages = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section className="flex gap-x-3.5 h-112">
      <div className="flex flex-col gap-y-3 overflow-y-auto w-28 no-scrollbar">
        {productDetails.images.map((image, i) => (
          <img
            key={image}
            src={image}
            alt={image}
            width="112px"
            height="120px"
            className="bg-card-foreground/5 w-full aspect-[0.931] rounded-sm cursor-pointer"
            onClick={(e) => {
              setCurrent(i);
              e.currentTarget.scrollIntoView({
                block: "nearest",
                behavior: "smooth",
              });
            }}
          />
        ))}
      </div>
      <img
        className="bg-card-foreground/5 h-112 aspect-[0.931] rounded-sm"
        width="450px"
        height="396px"
        src={productDetails.images[current]}
        alt={productDetails.images[current]}
      />
    </section>
  );
};
