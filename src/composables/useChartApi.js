/** @format */

import { ref, onBeforeMount } from "vue";
import axiosInstance from "../services/axios";
import useComponentStore from "../store/componentStore";

export function useChartApi() {
  const componentStore = useComponentStore();
  const { showPopup, showLoading, dismissLoading } = componentStore;
  const lineChartData = ref([]);
  const pieChartData = ref([]);

  async function getLineData() {
    try {
      const response = await axiosInstance.get(
        "/api/people-aids/abundance-chart/data"
      );
      lineChartData.value = response.data;
    } catch (error) {
      showPopup("مشکلی پیش امده", "error");
    }
  }

  async function getPieData() {
    try {
      const response = await axiosInstance.get(
        "/api/aid-allocations/circle-chart/data"
      );
      pieChartData.value = response.data;
    } catch (error) {
      showPopup("مشکلی پیش امده", "error");
    }
  }

  return {
    lineChartData,
    pieChartData,
    getPieData,
    getLineData,
  };
}

export default useChartApi;
