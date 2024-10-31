"use client";

import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { useMemo } from "react";
import { ColProps } from "./Col";
import { RowContext, RowContextState, RowGap } from "./RowContext";
import { cn } from "@/lib/utils";

const rowVariants = cva("grid ", {
  variants: {
    layout: {
      vertical: "grid-rows-12 grid-flow-col",
      horizontal: "grid-cols-12",
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
  },
  defaultVariants: {
    layout: "horizontal",
  },
});

interface RowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rowVariants> {
  gutter?: RowGap | [RowGap, RowGap];
  children: React.ReactElement<ColProps> | React.ReactElement<ColProps>[];
}

const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ className, layout, align, justify, gutter, children, ...props }, ref) => {
    const rowContext = React.useMemo<RowContextState>(
      () => ({ layout }),
      [layout]
    );
    const gap = useMemo(() => {
      if (typeof gutter === "number") {
        return `gap-${gutter}`;
      }
      if (!!gutter?.length) {
        return `gap-x-${gutter?.[0]} gap-y-${gutter?.[1]}`;
      }
      return "";
    }, [gutter]);
    return (
      <RowContext.Provider value={rowContext}>
        <div
          className={cn(
            gap,
            rowVariants({ layout, align, justify, className })
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </RowContext.Provider>
    );
  }
);
Row.displayName = "Row";

export { Row, type RowProps };
