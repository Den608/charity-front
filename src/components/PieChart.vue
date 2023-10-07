<!-- @format -->

<script setup>
import { ref, computed,onMounted  } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import { useChartApi } from "../composables/useChartApi";
import useComponentStore from "../store/componentStore";

ChartJS.register(ArcElement, Tooltip, Legend);
const color = ref("");

const componentStore = useComponentStore();
const { showPopup, showLoading, dismissLoading } = componentStore;

const chartApi = useChartApi();
const { pieChartData } = chartApi;

onMounted(async () => {
  await chartApi.getPieData();
});

const data = computed(() => {
  return {
    labels: [
      "کمک های موجود در سازمان",
      "کمک های تحویل داده شده",
      "کمک های در حال تحویل",
    ],
    datasets: [
      {
        color: "#41B883",
        backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
        data: pieChartData.value.data,
      },
    ],
  };
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      titleFont: {
        family: "Vazirmatn",
        size: 16, // Font size in pixels
      },
      bodyFont: {
        family: "Vazirmatn",
        size: 14, // Font size in pixels
      },
    },
    legend: {
      labels: {
        font: {
          family: "Vazirmatn",
          size: 15,
        },
      },
    },
  },
};
</script>

<template>
  <Pie
    :data="data"
    :options="options"
  />
</template>
