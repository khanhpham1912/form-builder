"use client";

import { createContext } from "react";
export type RowGap =
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;
export interface RowContextState {
  gutter?: [RowGap, RowGap];
  layout?: "vertical" | "horizontal" | null;
}

export const RowContext = createContext<RowContextState>({});
