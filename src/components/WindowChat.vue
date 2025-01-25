<script setup>
import Member from './Member.vue';
import { ref } from 'vue'
import Chat from './Chat.vue'

const messageToSend = ref([]);
const message = ref('')
const searchParam = ref('')

const sendMessage = () => {
    if (message.value.trim()) {
        const newMessage = {
            message: message.value,
            time: new Date().toLocaleString()
        }
        messageToSend.value.push(newMessage)
        message = ''
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

</template>

<style scoped></style>
