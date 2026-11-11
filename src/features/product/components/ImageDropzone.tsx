import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { XIcon, ImageIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import type { Product } from "@/types";

const accept = {
  "image/*": [".png", ".jpeg", ".jpg"],
};
const maxSize = 15 * 1024 * 1024;

export function ImageDropzone({
  product,
  value,
  onChange,
}: {
  product: Product;
  value: File | null;
  onChange: (value: File | null) => void;
}) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted[0]) onChange(accepted[0]);
    },
    [onChange],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({ onDrop, accept, maxSize, multiple: false });

  const previewUrl = value ? URL.createObjectURL(value) : null;

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  if (value && previewUrl) {
    return (
      <div className="relative h-112 w-full rounded-sm overflow-hidden border">
        <img
          src={previewUrl ?? product.url}
          alt=""
          className="w-full h-full object-contain"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => onChange(null)}
        >
          <XIcon />
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "h-112 flex flex-col items-center justify-center gap-2 w-full",
          "rounded-sm border-2 border-dashed cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
        )}
      >
        <input {...getInputProps()} />
        <ImageIcon size={36} />
        <p className="text-sm">
          {isDragActive
            ? "Отпустите файл"
            : "Перетащите или кликните"}
        </p>
      </div>
      {fileRejections.length > 0 && (
        <p className="text-sm text-destructive mt-2">
          {fileRejections[0].errors[0].message}
        </p>
      )}
    </div>
  );
}
