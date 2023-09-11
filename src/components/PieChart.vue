<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["کمک های موجود در سازمان", "کمک های تحویل داده شده", "کمک های در حال تحویل"],
  datasets: [
    {
      color: "#41B883",
      backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
      data: [40, 20, 80],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      titleFont: {
        family: 'Vazirmatn',
        size: 16, // Font size in pixels
      },
      bodyFont: {
        family: 'Vazirmatn',
        size: 14, // Font size in pixels
      },
    },
    legend: {
      labels: {
        font: {
          family: 'Vazirmatn',
          size: 14, // Font size in pixels
        },
      },
    },
  },
};
</script>

<template>
  <Pie :data="data" :options="options" />
</template>
