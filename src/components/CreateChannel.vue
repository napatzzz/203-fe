<template>
  <div class="bg-blue-500 w-34 h-6 m-10 rounded-md">
    <button @click="CreateChannel" class="pl-3 text-white">Create Channel</button>
  </div>
  <div @click="CreateForm" v-show="showForm" class="rounded-md w-xs h-84 bg-blue-500 m-10 absolute">
    <form @click.prevent="addChannel">
      <input type="text" v-model="NameInput" class="bg-neutral-300 m-5 rounded-md">
      <button class="bg-blue-200 w-14 rounded-md" @click="CloseAndSubmit" type="submit">Create</button>
    </form>
  </div>
  <div>
    <h1 class="text-3xl w-32 rounded-md bg-blue-200 text-neutral-950 ml-8 font-semibold text-center" >
      Channel
    </h1>
    <h1 v-for="(channel, index) in Channels" :key="index" class=" w-xs p-5 bg-blue-300 m-2 ml-8 rounded-md
    text-xl text-center">
      {{ channel }}
    </h1>
  </div>
  
</template>


<script setup>
import { ref } from 'vue'

const showForm = ref(false)
const Channels = ref([])
const NameInput = ref('')

function CreateChannel() {
  showForm.value = !showForm.value

}

function addChannel() {
  const input = NameInput.value.trim()
  if (input) {
    Channels.value.push(input)
    NameInput.value = ''
  }
}

function CloseAndSubmit(){
  showForm.value = !showForm.value
}



</script>
