import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TooltipWrapperProps = {
  content: React.ReactNode;
  trigger: React.ReactNode | string;
  asChild?: boolean;
};

const TooltipWrapper = ({ asChild = false, ...props }: TooltipWrapperProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild}>{props.trigger}</TooltipTrigger>
      <TooltipContent side="bottom">{props.content}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipWrapper;
