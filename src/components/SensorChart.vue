<template>
  <el-card class="box-card">
    <template #header>
      <span>传感器 {{ sensorId }}</span>
    </template>
    <div ref="chartRef" class="chart-container"></div>
  </el-card>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, watch, ref, nextTick, onBeforeUnmount } from 'vue'

const props = defineProps({
  sensorId: String,
  data: Array
})

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  nextTick(() => {
    chartInstance = echarts.init(chartRef.value)
    renderChart()
  })
})

watch(() => props.data, renderChart, { deep: true })

function renderChart() {
  if (!props.data || props.data.length === 0) return

  const option = {
    tooltip: { trigger: 'axis' },
    title: { text: props.sensorId, left: 'center' },
    xAxis: {
      type: 'category',
      data: props.data.map(d => new Date(d.Timestamp).toLocaleTimeString())
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '温度',
        type: 'line',
        data: props.data.map(d => d.Temperature)
      },
      {
        name: '振动',
        type: 'line',
        data: props.data.map(d => d.Vibration)
      }
    ]
  }

  chartInstance.setOption(option)
}

onBeforeUnmount(() => {
  chartInstance?.dispose()
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}
</style>
