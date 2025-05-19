import React from "react";
import Chart from "react-apexcharts";

const TotalEarning = () => {
  // X-axis: 5k to 60k with gap of 5k
  const xCategories = Array.from({ length: 12 }, (_, i) => (i + 1) * 5);

  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["#FDFFFF"], // ending color
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 0.4,
          stops: [0, 50, 100],
          colorStops: [
            {
              offset: 0,
              color: "#35BEBD",
              opacity: 1
            },
            {
              offset: 50,
              color: "#BAFFFF",
              opacity: 1
            },
            {
              offset: 100,
              color: "#FDFFFF",
              opacity: 1
            }
          ]
        }
      },
    tooltip: { enabled: true },
    xaxis: {
      categories: xCategories.map((x) => `${x}k`),
      labels: {
        style: {
          fontSize: "12px"
        }
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: (val) => `${val}%`
      }
    },
    markers: {
      size: 4,
      shape: "circle"
    },
    grid: {
      strokeDashArray: 4
    }
  };

  const chartSeries = [
    {
      name: "Earnings",
      data: [20, 35, 40, 55, 80, 60, 50, 30, 70, 45, 65, 85]
    }
  ];

  return (
    <div className="bg-white rounded-xl px-4 py-5 shadow-sm mt-3 font-title">
      <p className="font-bold text-lg mb-2 text-black font-title">Total Earning</p>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={200}
      />
    </div>
  );
};

export default TotalEarning;
