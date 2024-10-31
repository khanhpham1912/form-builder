import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const flexVariants = cva("flex", {
  variants: {
    layout: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    justify: {
      normal: "justify-normal",
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
      stretch: "justify-stretch",
    },
    gap: {
      1: "gap-1",
      1.5: "gap-1.5",
      2: "gap-2",
      4: " gap-4",
      6: " gap-6",
      8: " gap-8",
    },
    flex: {
      1: "flex-1",
      auto: "flex-auto",
      initial: "flex-initial",
      none: "flex-none",
    },
  },
  defaultVariants: {
    layout: "horizontal",
  },
});

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  children: React.ReactNode;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    { className, layout, align, justify, gap, flex, children, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          flexVariants({ layout, align, justify, gap, flex, className })
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Flex.displayName = "Flex";

export { Flex, flexVariants };
