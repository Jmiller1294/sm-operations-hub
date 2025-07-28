import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SearchBar from "../components/Searchbar";
import { BsThreeDots } from "react-icons/bs";

const inventoryItems = [
  {
    id: 1,
    name: "Mop",
    category: "equipment",
    sku: "ZXDFFF",
    supplier: "Amazon",
    stock: 11,
    price: 20.99,
  },
  {
    id: 2,
    name: "Mop",
    category: "equipment",
    sku: "ZXDFFF",
    supplier: "Amazon",
    stock: 11,
    price: 20.99,
  },
  {
    id: 3,
    name: "Mop",
    category: "equipment",
    sku: "ZXDFFF",
    supplier: "Amazon",
    stock: 11,
    price: 20.99,
  },
  {
    id: 4,
    name: "Mop",
    category: "equipment",
    sku: "ZXDFFF",
    supplier: "Amazon",
    stock: 11,
    price: 20.99,
  },
  {
    id: 5,
    name: "Mop",
    category: "equipment",
    sku: "ZXDFFF",
    supplier: "Amazon",
    stock: 11,
    price: 20.99,
  },
];

const InventoryPage = () => {
  return (
    <div className="flex flex-col h-fit w-full p-6">
      <div className="flex flex-row items-center gap-4 h-10">
        <SearchBar />
        <div className="flex flex-row w-1/2 h-full border-l-2 pl-4 items-center gap-4">
          <button className="w-fit h-fit border-1 p-2 rounded-md">
            Category
          </button>
          <button className="w-fit h-fit border-1 p-2 rounded-md">
            Supplier
          </button>
          <button className="w-fit h-fit border-1 p-2 rounded-md">Stock</button>
        </div>
      </div>

      <div className="flex flex-row bg-gray-200 w-full h-fit mt-6 p-2 rounded-l-lg">
        <span className="flex-2/7 text-md">PRODUCT NAME</span>
        <span className="flex-1/7 text-md">CATEGORY</span>
        <span className="flex-1/7 text-md">SKU</span>
        <span className="flex-2/7 text-md">SUPPLIER</span>
        <span className="flex-2/7 text-md">STOCK</span>
        <span className="flex-1/7 text-md">UNIT PRICE</span>
        <span className="flex-1/12  text-md"></span>
      </div>
      <ul>
        {inventoryItems.map((item) => {
          return (
            <li
              className="flex flex-row w-full h-fit items-center p-2 border-b-1 border-gray-300"
              key={item.id}
            >
              <span className="flex-2/7 text-sm">{item.name}</span>
              <span className="flex-1/7 text-sm">{item.category}</span>
              <span className="flex-1/7 text-sm">{item.sku}</span>
              <span className="flex-2/7 text-sm">{item.supplier}</span>
              <div className="flex-2/7 flex-col gap-1 h-fit">
                <span className="text-sm">
                  {item.stock} units - {item.stock > 10 ? "High" : "Low"}
                </span>
                <div className="bg-green-300 h-1 w-3/4 rounded-md"></div>
              </div>
              <span className="flex-1/7 text-sm">${item.price}</span>
              <span className="flex-row flex-1/12 justify-items-end">
                <BsThreeDots size={20} />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InventoryPage;
