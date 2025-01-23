<script setup>
import Member from './Member.vue';
import { ref } from 'vue'
import Chat from './Chat.vue'

const messageToSend = ref([]);
const message = ref('')
const searchParam = ref('')

const sendMessage = () => {
    if (message.value.trim()) {
        messageToSend.value.push(message.value)
        message.value = ''
    }
}

const searchHistory = (searchParam) => {
    return messageToSend.value.filter(m => m.toLowerCase().includes(searchParam.toLowerCase()))
}

const handleSearch = () => {
    messageToSend.value = searchHistory(searchParam.value);
    sendMessage(); 
}
</script>

<template>
    <div class="">
        <div class="grid grid-rows-[10%_8%_72%_10%] h-screen">
            <div class="">
                <div class="grid grid-cols-3 h-[100px]">
                    <div class="grid grid-rows-[70%_auto] mx-10">
                        <h1 class="font-bold text-gray-500 flex self-end">Sales Team</h1>
                        <p class="flex self-start text-gray-500">20 👤 | description for your team...</p>
                    </div>
                    <div class="">
                        <Member />
                    </div>
                    <div class="">
                        name
                    </div>
                </div>
            </div>
            <div class="">
                <div class="w-full px-10 my-5">
                    <div class="relative ">
                        <input
                            class="w-full  placeholder:text-slate-600 text-slate-700 text-sm border border-none rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Search history message"
                            v-model="searchParam" 
                        />
                    <button
                        class="absolute top-1 right-1 flex items-center rounded bg-blue-500 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        v-on:click="handleSearch"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2">
                            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                        </svg>
                     Search
                    </button> 
                </div>
            </div>
            </div>
            <div class="">
                <div class="w-[100%]">
                     <Chat :messages="messageToSend"/>
                </div>
            </div>
            <div>
                <div class=" px-10 my-5"> <input
                            class="w-full  placeholder:text-slate-600 text-slate-700 text-sm border border-none rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Search history message" 
                            v-model="message" @keyup.enter="sendMessage"
                        />
                </div> 
            </div>
            
        </div>
    </div>
</template>

<style scoped></style>
