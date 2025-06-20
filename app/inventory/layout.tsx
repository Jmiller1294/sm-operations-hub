import React from 'react'
import InventoryHeader from './components/Header';
import { LayoutProps } from "@/.next/types/app/layout";
import Tabs from '../components/Tabs';

const tabs = [
  {
    label: "Inventory",
    path: "/inventory",
  },
  {
    label: "Order Stock",
    path: "/inventory/order-stock",
  },
];

const InventoryPageLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col w-full h-fit">
      <InventoryHeader />
      <Tabs tabs={tabs} />
      {children}
    </div>
  );
};

export default InventoryPageLayout