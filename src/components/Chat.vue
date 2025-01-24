<script setup>
defineProps({
    messages: {
        type: Array,
        required: true,
    }
});
</script>

<template>
    <div class="overflow-y-auto h-[600px]">
        <div class="flex flex-col justify-end max-w-[90%]">
            <div 
                v-for="(message, index) in messages" 
                :key="index" 
                class="p-1 text-white rounded-lg break-words text-start max-w-[90%] mx-10 my-2 overflow-wrap-break-word"
            >
                <div class="grid grid-cols-[80px_auto] w-[100%] text-wrap">
                    <div class="avatar px-1">
                        <div class="w-[56px] h-[56px] rounded overflow-hidden">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="avatar" />
                        </div>
                    </div>
                    <div class="grid grid-rows-[30px]">
                        <div class="grid grid-cols-[200px_auto]">
                            <h3 class="text-gray-700 font-bold">Mr.Napat Chumtham </h3>
                            <span class="text-gray-500 flex items-center">{{ message.time }}</span>
                        </div>
                        <p class="text-gray-700 break-words whitespace-normal">{{ message.message }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
</style>
