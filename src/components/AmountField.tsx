import { Button } from "@/components/ui/button";
import { cn } from "cn";

type AmountInputProps = React.ComponentProps<"div"> & {
  amount: number;
  onPlus: () => void;
  onMinus: () => void;
  min?: number;
};

export const AmountField = ({
  className,
  amount,
  onPlus,
  onMinus,
  min,
  ...props
}: AmountInputProps) => {
  return (
    <div
      className={cn(
        "flex items-center w-min h-10 gap-x-2 rounded-lg overflow-hidden border border-border text-lg",
        className,
      )}
      {...props}
    >
      <Button
        variant="secondary"
        className="h-full w-9 border-none rounded-none py-3.5 text-base"
        onClick={onMinus}
        disabled={amount === min}
      >
        -
      </Button>
      <p className="w-10 text-center">{amount}</p>
      <Button
        variant="secondary"
        className="h-full w-9 border-none rounded-none py-3.5 text-base"
        onClick={onPlus}
      >
        +
      </Button>
    </div>
  );
};
