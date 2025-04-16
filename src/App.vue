<template>
  <el-container style="height: 100vh">
    <!-- <el-aside width="200px">
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1">仪表盘</el-menu-item>
      </el-menu>
    </el-aside> -->
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
      <el-menu-item index="1">
        <el-icon><icon-menu /></el-icon>
          <span>大屏展示</span>
      </el-menu-item>
      <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>系统设置</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
    </el-menu>

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
