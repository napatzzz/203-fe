<script setup>
import WindowChat from './components/WindowChat.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="grid grid-cols-[25%_auto] w-screen h-screen font-montserrat" >
    <div class="bg-blue-600 ">
      <Sidebar />
    </div>
    <div class="bg-gray-50 h-[100%]">
      <WindowChat />
    </div>
  </div>
</template>

<style scoped>
</style>
