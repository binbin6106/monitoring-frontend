<template>
  <el-container style="height: 100vh">
    <el-aside width="200px">
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1">仪表盘</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <el-page-header content="旋转设备监控系统" />
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup></script>

<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
