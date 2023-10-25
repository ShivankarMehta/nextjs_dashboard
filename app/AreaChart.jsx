import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ApexChart = () => {
  const [chartData, setChartData] = useState(null);
  const [prices, setPrices] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api/fetchData");
      const result = await response.json();
      const firstArray = result.data[0];
      const amount = firstArray.map((item) => parseFloat(item.price));
      const date = firstArray.map((item) => item.date);
      setPrices(amount);
      setDates(date);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (prices.length > 0 && dates.length > 0) {
      const options = {
        series: [
          {
            name: "STOCK ABC",
            data: prices,
          },
        ],
        chart: {
          type: "area",
          height: "auto",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Fundamental Analysis of Stocks",
          align: "left",
        },
        subtitle: {
          text: "Price Movements",
          align: "left",
        },
        xaxis: {
          type: "datetime",
          categories: dates,
        },
        yaxis: {
          opposite: true,
        },
        legend: {
          horizontalAlign: "left",
        },
      };

      const ApexCharts = dynamic(() => import("react-apexcharts"), {
        ssr: false,
      });
      setChartData(
        <div id="chart">
          <ApexCharts
            options={options}
            series={options.series}
            type="area"
            height="auto"
            width="100%"
          />
        </div>
      );
    }
  }, [prices, dates]); // Added dependencies to re-render when prices and dates change

  return (
    <div className="chart-container max-w-4xl mx-auto my-4">
      <style>
        {`
        .chart-container {
            margin: 30px auto;
            padding: 20px;
            background: #fff;
            border-radius: 1rem;
          }
          /* Add your custom CSS here */
          /* Example CSS for the chart container */
          .apexcharts-canvas {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
          }
        `}
      </style>
      {chartData && <div>{chartData}</div>}
    </div>
  );
};

export default ApexChart;
