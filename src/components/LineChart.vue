<!-- @format -->

<script setup>
import { onMounted, reactive, ref,computed } from "vue";
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
import { useChartApi } from "../composables/useChartApi";
import useComponentStore from "../store/componentStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const componentStore = useComponentStore();
const { showPopup, showLoading, dismissLoading } = componentStore;

const chartApi = useChartApi();
const { lineChartData } = chartApi;
const aid_allocations = ref([]);
const people_aid = ref([]);

onMounted(async () => {
  await chartApi.getLineData();
  aid_allocations.value = lineChartData.value.aid_allocation_data;
  people_aid.value = lineChartData.value.aid_allocation_data;
});

const data = computed(() => {
  return {
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
        data: aid_allocations.value,
      },
      {
        label: "کمک های اهدایی به سازمان",
        backgroundColor: "#7380ec",
        borderColor: "#7380ec",
        borderWidth: 2,
        data: people_aid.value,
      },
    ],
  };
});

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
      text: "کمک های موجود و اختصاص داده شده",
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
    <Line
      :data="data"
      :options="options"
    />
  </div>
</template>

<style>
.line {
  width: 98%;
  height: 25rem !important;
}
</style>
