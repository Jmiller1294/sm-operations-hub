"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Tabs = ({ tabs }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-items-center items-center gap-8 w-full h-fit pt-2 pl-8 border-b-1 border-gray-300">
      {tabs.map((tab: any, index: number) => {
        return (
          <Link
            className={
              pathname === tab.path
                ? "border-b-blue-700 border-b-1 pb-2"
                : "pb-2"
            }
            href={tab.path}
            key={index}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
    
  );
}

export default Tabs;