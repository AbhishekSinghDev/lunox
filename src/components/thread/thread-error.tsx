import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "../ui/button";

interface ThreadErrorProps {
  onRetry?: () => void;
}

const ThreadError = ({ onRetry }: ThreadErrorProps) => {
  return (
    <div className="mx-auto flex min-h-[400px] max-w-md flex-col items-center justify-center space-y-4 text-center">
      <AlertCircle className="text-destructive h-12 w-12" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Something went wrong</h3>
        <p className="text-muted-foreground text-sm">
          We couldn&apos;t load this conversation. Please try again.
        </p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      )}
    </div>
  );
};

export default ThreadError;
