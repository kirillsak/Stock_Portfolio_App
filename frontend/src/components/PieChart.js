import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, CategoryScale, PieController } from "chart.js";

Chart.register(ArcElement, CategoryScale, PieController);

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function PieChart({ data }) {
  if (!data) return null;

  const labels = Object.keys(data);
  const backgroundColors = labels.map(() => getRandomColor());

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let label = chartData.labels[tooltipItem.dataIndex] || "";
            let value = chartData.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: ${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
}

export default PieChart;
