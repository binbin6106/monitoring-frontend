<template>
  <el-row :gutter="20">
    <el-col :span="24" class="header-row">
      <span>传感器监控（点击卡片展开图表）</span>
      <el-switch v-model="sortByAlarm" active-text="报警优先" />
    </el-col>

    <el-col
      v-for="(data, id) in sortedSensors"
      :key="id"
      :span="12"
    >
      <el-card class="sensor-card" @click="toggleChart(id)">
        <div class="card-header">
          <span class="sensor-id">ID: {{ id }}</span>
          <el-tag type="danger" v-if="isAlarm(data.at(-1))">报警</el-tag>
        </div>
        <div class="card-info">
          <p>温度: {{ data.at(-1)?.Temperature ?? '-' }} ℃</p>
          <p>振动: {{ data.at(-1)?.Vibration ?? '-' }} mm/s</p>
          <p>时间: {{ formatTime(data.at(-1)?.Timestamp) }}</p>
        </div>
        <div v-if="expandedId === id" class="chart-wrapper">
          <SensorChart :sensorId="id" :data="data" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getConnection } from '@/signalr/index'
import SensorChart from '@/components/SensorChart.vue'

const rawDataMap = ref({})
const expandedId = ref(null)
const sortByAlarm = ref(false)
const alarmAudio = new Audio('/alarm.ogg')  // 或使用远程地址
// 上次报警状态缓存
const lastAlarmStatus = ref({})

// 播放音效函数
const playAlarm = () => {
  if (alarmAudio.paused) {
    alarmAudio.currentTime = 0
    alarmAudio.play().catch((err) => {
      console.warn('音效播放失败：', err)
    })
  }
}

onMounted(async () => {
  const connection = await getConnection()
  connection.on('ReceiveSensorDataBatch', (json) => {
    const incoming = JSON.parse(json)
    
    incoming.forEach(entry => {
      const id = entry.SensorId
      if (!rawDataMap.value[id]) rawDataMap.value[id] = []
      rawDataMap.value[id].push(entry)
      if (rawDataMap.value[id].length > 50) {
        rawDataMap.value[id].shift()
      }

      // 判断是否新报警
      const isNowAlarm = isAlarm(entry)
      const wasAlarm = lastAlarmStatus.value[id] || false
      if (isNowAlarm && !wasAlarm) {
        playAlarm()
      }
      lastAlarmStatus.value[id] = isNowAlarm
    })
  })
})

const toggleChart = (id) => {
  expandedId.value = expandedId.value === id ? null : id
}

const isAlarm = (d) => d && (d.Temperature > 80 || d.Vibration > 50)

const sortedSensors = computed(() => {
  const entries = Object.entries(rawDataMap.value)
  if (sortByAlarm.value) {
    return Object.fromEntries(
      entries.sort(([, a], [, b]) => {
        const aAlarm = isAlarm(a.at(-1)) ? 1 : 0
        const bAlarm = isAlarm(b.at(-1)) ? 1 : 0
        return bAlarm - aAlarm
      })
    )
  }
  return rawDataMap.value
})

function formatTime(time) {
  if (!time) return '-'
  return new Date(time).toLocaleTimeString()
}
</script>

<style scoped>
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.sensor-card {
  cursor: pointer;
  margin-bottom: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-info p {
  margin: 5px 0;
}
.chart-wrapper {
  margin-top: 10px;
}
</style>
