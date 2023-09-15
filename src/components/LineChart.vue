<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "ابان",
    "اذر",
    "دی",
    "بهمن",
    "اسفند",
  ],
  datasets: [
    {
      label: "کمک های تخصیص داده شده",
      backgroundColor: "#f87979",
      borderColor: "#FF5733",
      borderWidth: 2,
      data: [40, 39, 10, 40, 39, 80, 40, 10, 5, 22, 56, 89],
    },
    {
      label: "کمک های اهدایی به سازمان",
      backgroundColor: "#7380ec",
      borderColor: "#7380ec",
      borderWidth: 2,
      data: [20, 22, 25, 27, 31, 10, 12, 2, 89, 10, 11, 12],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        font: {
          family: "Vazirmatn",
          size: 14,
        },
      },
    },
    y: {
      ticks: {
        font: {
          family: "Vazirmatn",
          size: 14,
        },
      },
    },
  },

  plugins: {
    title: {
      display: true,
      text: "کمک های موجود و تخصیصی",
      font: {
        family: "Vazirmatn",
        size: 18, // Font size in pixels
        weight: "bold", // Font weight (e.g., 'normal', 'bold')
      },
    },
    legend: {
      labels: {
        font: {
          family: "Vazirmatn",
          size: 14, // Font size in pixels
        },
      },
    },
  },
};
</script>

<template>
  <div class="line">
    <Line :data="data" :options="options" />
  </div>
</template>

<style>
.line {
  width: 98%;
  height: 100%;
}
</style>
