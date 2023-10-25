import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import series from "./assets/stock-prices";

const ApexChart = () => {
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/fetchData");
      const result = await response.json();
      setData(result.data);
    }
    fetchData();
    if (series && series.monthDataSeries1 && series.monthDataSeries1.prices) {
      const options = {
        series: [
          {
            name: "STOCK ABC",
            data: series.monthDataSeries1.prices,
          },
        ],
        chart: {
          type: "area",
          height: "auto", // Make the chart height responsive
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
          categories: series.monthDataSeries1.dates,
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
            height="auto" // Make the chart height responsive
            width="100%" // Make the chart width responsive
          />
        </div>
      );
    }
  }, []);

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
