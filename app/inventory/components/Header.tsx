import React from 'react';
import { CiDollar } from "react-icons/ci";

const InventoryHeader = () => {
  return (
    <div className="flex flex-row items-center w-auto h-28 mt-20 ml-6">
      <CiDollar size={34} />
      <div className="flex flex-col ml-4 border-r-2 pr-6">
        <span className="text-lg">Total Assets</span>
        <span className="text-3xl">$10,200.30</span>
      </div>
      <div className="flex flex-col h-fit w-full pl-6 gap-2">
        <div>
          <span className='text-xl font-medium mr-2'>32</span>
          <span>products</span>
        </div>
        <div className="flex flex-row h-5 w-1/2 gap-2">
          <div
            className={`h-3 w-[calc(20%+(100px-10px))] bg-red-600 rounded-xs`}
          ></div>
          <div
            className={`h-3 w-[calc(20%+(100px-50px))] bg-red-600 rounded-xs`}
          ></div>
          <div
            className={`h-3 w-[calc(20%+(100px-90px))] bg-red-600 rounded-xs`}
          ></div>
        </div>
        <div className="flex flex-row h-auto w-1/2 gap-4">
          <div className="flex flex-row h-fit w-fit items-center gap-2">
            <div className="bg-green-400 h-3 w-3 rounded-full"></div>
            <span>In Stock: 30</span>
          </div>
          <div className="flex flex-row h-fit w-fit items-center gap-2">
            <div className="bg-green-400 h-3 w-3 rounded-full"></div>
            <span>Low stock: 30</span>
          </div>
          <div className="flex flex-row h-fit w-fit items-center gap-2">
            <div className="bg-green-400 h-3 w-3 rounded-full"></div>
            <span>Out of Stock: 30</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryHeader