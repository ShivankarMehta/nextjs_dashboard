"use client";
import React from "react";
import Image from "next/image";
import ApexChart from "./AreaChart";
import ColumnChart from "./columnChart";
export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Graph components below
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <ApexChart />
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <ColumnChart />
        </div>
      </div>
    </div>
  );
}
