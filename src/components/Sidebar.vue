<script setup>
defineProps({
    
})

let visibleAddBranch = false

function addBranch() {
    visibleAddBranch = true
}

</script>

<template>
    <div class="grid grid-cols-[60px_auto]">
        <div class="bg-blue 900 grid-rows-[30px_auto]">
            <div class="flex flex-col items-center justify-center py-3.5" >
                <button class="p-3 my-3" @click="addBranch"></button>
                <button class="p-3 my-3"></button>
                <button class="p-3 my-3"></button>
                <button class="p-3 my-3"></button>
            </div>
        </div>
        <div class="bg-blue-500 h-screen">
            <div class="p-5">
                <h1 class="font-bold text-white">📨 Dailyworks</h1>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
