<script setup>
import { ref } from 'vue';

const input = ref(false);

const showInputContainer = () => {
  input.value = true;
};
const closeInputContainer = () => {
  input.value = false;
};

let id = 0;
const branchs = ref([]);
const inputBranch = ref("");
const inputInfo = ref("");
//ใช้.trimเพื่อป้องกันการกดspacebarมาแล้วกดcreate
const createBranch = () => {
  if (!inputBranch.value.trim()) {
    alert("Branch Name Can't be Null");
    return;
  }

  let newBranch = {
    id: id++,
    bname: inputBranch.value,
    binfo: inputInfo.value,
  };

  branchs.value.push(newBranch);
  inputBranch.value = "";
  inputInfo.value = "";
};
</script>

<template>
<div class="flex h-screen text-white bg-blue-900">
  <div class="w-1/6 bg-blue-800 flex flex-col items-center py-4 relative">
  
    <button 
      @click="showInputContainer" 
      class="absolute top-1000 bg-blue-500 hover:bg-blue-400 text-white rounded-full w-12 h-12 text-xl flex justify-center items-center shadow-lg">
      +
    </button>
  </div>

  <div class="flex-1 bg-blue-700 p-6">
    <h1 class="text-2xl font-bold mb-6">Your Workspace</h1>
    <a href="" class="text-white no-underline">
    <ul class="w-full">
      <li 
        v-for="branch in branchs" 
        :key="branch.id" 
        class="p-3 mb-2 bg-blue-700 rounded text-center cursor-pointer hover:bg-blue-600 transition mr-20">
        {{ branch.bname }}
      </li>
    </ul></a>
    <div v-if="input" class="bg-blue-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <input 
        type="text" 
        placeholder="Enter branch name" 
        class="w-full p-3 mb-4 bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        v-model="inputBranch">
      <input 
        type="text" 
        placeholder="Enter branch info" 
        class="w-full p-3 mb-4 bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        v-model="inputInfo">
      <div class="flex justify-between">
        <button 
          @click="closeInputContainer" 
          class="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded shadow">
          Cancel
        </button>
        <button 
          @click="createBranch" 
          class="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded shadow">
          Create
        </button>
      </div>
    </div>
  </div>
 <!-- เก็บไว้ก่อนค่อยใช้ -->
  <!-- <div class="w-1/4 bg-blue-800 p-4">
    <h1 class="text-center text-xl font-bold mb-4">Announcements</h1>
    <ul class="space-y-4">
      <li 
        v-for="branch in branchs" 
        :key="branch.id" 
        class="p-4 bg-blue-700 rounded shadow">
        Announcement for {{ branch.bname }}
      </li>
    </ul>
  </div> -->
</div>
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
}
</style>
