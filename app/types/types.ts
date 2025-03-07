import { ReactNode } from "react";

export type DashBoardCardProps = {
  size:string;
  children: ReactNode;
};

export type Item = {
  icon: ReactNode;
  title: string;
  path: string;
};