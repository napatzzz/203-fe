<script setup>
    import { ref } from 'vue';
    const notify = ref([]) 
    const addNotification=()=>{
        const message = [
              "Notification Hi",
              "Notification Hello",
              "Notification Good",
              "Notification Bad",
              "Notification Sad",
              "Notification GoodBye",
              "Notification GoodNight",
    ];
        notify.value.push(...message)
    };

</script>
<template>
    
    <div class="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-2xl " @click="addNotification" >✉️</div>
    <div v-for="notification in notify" class="bg-blue-400 text-slate-100 border-solid border-4  rounded-lg px-4 py-2 w-80 shadow-md ">{{ notification }}</div>
    
</template>