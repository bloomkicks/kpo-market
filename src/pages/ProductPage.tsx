import { ProductImage } from "@/features/product/components/ProductImage";
import { ProductDetails } from "@/features/product/components/ProductDetails";
import { useParams, useSearchParams } from "react-router";
import { useProduct } from "@/features/product/hooks/use-product";
import { QueryState } from "@/components/QueryState";
import { useProfile } from "@/features/profile/hooks/use-profile";
import { selectIsBusiness } from "@/utils/select-is-business";
import { useState } from "react";
import { MyProductDetails } from "@/features/product/components/MyProductDetails";
import { EditProductForm } from "@/features/product/components/EditProductForm";
import { ImageDropzone } from "@/features/product/components/ImageDropzone";
import { useUploadImage } from "../features/product/hooks/use-upload-image";
import { Empty, EmptyHeader } from "@/components/ui/empty";

export const ProductPage = () => {
  const [imageValue, setImageValue] = useState<File | null>(
    null,
  );
  const [params, setParams] = useSearchParams();
  const { productId } = useParams();

  const {
    data: product,
    isError,
    isFetching,
  } = useProduct(productId);
  const { data: isBusiness } = useProfile({
    select: selectIsBusiness,
  });
  const [isEditing, setIsEditing] = useState(
    params.get("edit") === "on",
  );

  const { mutate: upload } = useUploadImage(productId!);

  const onApply = () => {
    if (!imageValue) return;
    upload(imageValue, {
      onSettled: () => {
        setImageValue(null);
      },
    });
  };

  return (
    <QueryState
      isLoading={isFetching}
      isEmpty={!product}
      emptyHeader={`Товар ${productId} не найден`}
      isError={isError}
      error={
        <Empty>
          <EmptyHeader className="text-lg font-bold">
            Произошла ошибка с запросом товара
          </EmptyHeader>
        </Empty>
      }
    >
      {!!product && (
        <>
          {isEditing ? (
            <div className="flex gap-x-6 mb-6 *:basis-1/2">
              <ImageDropzone
                product={product}
                value={imageValue}
                onChange={(val) => setImageValue(val)}
              />
              <EditProductForm
                onApply={onApply}
                onClose={() => {
                  setIsEditing(false);
                  setParams();
                }}
                product={product}
              />
            </div>
          ) : (
            <div className="flex gap-x-6 mb-6 *:basis-1/2">
              <ProductImage product={product} />
              {isBusiness ? (
                <MyProductDetails
                  product={product}
                  onEdit={() => setIsEditing(true)}
                />
              ) : (
                <ProductDetails product={product} />
              )}
            </div>
          )}
        </>
      )}
    </QueryState>
  );
};
