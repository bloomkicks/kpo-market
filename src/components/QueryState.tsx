import { Empty, EmptyHeader } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

type QueryStateProps = {
  isEmpty: boolean;
  empty?: React.ReactNode;
  emptyHeader?: string;
  isLoading?: boolean;
  loading?: React.ReactNode;
  isError?: boolean;
  error?: React.ReactNode;
  children?: React.ReactNode;
};

export const QueryState = ({
  isEmpty,
  empty,
  emptyHeader,
  isLoading,
  loading,
  isError,
  error,
  children,
}: QueryStateProps) => {
  if (isLoading) return <>{loading || <Spinner className="size-6 mx-auto"/>}</>;
  if (isError) return <>{error}</>;
  if (isEmpty)
    return (
      <>
        {!!empty ? (
          empty
        ) : (
          <Empty>
            <EmptyHeader className="text-lg font-bold">
              {emptyHeader || "Список пуст :D"}
            </EmptyHeader>
          </Empty>
        )}
      </>
    );

  return <>{children}</>;
};
