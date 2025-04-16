<template>
    <el-card>
      <template #header>
        <div>报警信息</div>
      </template>
      <el-table :data="alarmList" border height="300">
        <el-table-column prop="SensorId" label="传感器ID" />
        <el-table-column prop="Temperature" label="温度" />
        <el-table-column prop="Vibration" label="振动" />
        <el-table-column label="报警" width="100">
          <template #default="{ row }">
            <el-tag type="danger" v-if="isAlarm(row)">报警</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </template>
  
  <script setup>
  import { computed } from "vue";
  const props = defineProps({ data: Array })
  const alarmList = computed(() =>
    props.data?.filter(d => d.Temperature > 80 || d.Vibration > 50) || []
  )
  
  function isAlarm(row) { 
    return row.Temperature > 80 || row.Vibration > 50
  }
  </script>
  