<script setup>
import { ref } from "vue";
const messageToSend = ref([]);
const message = ref("");
const searchParam = ref("");

const sendMessage = () => {
  if (message.value.trim()) {
    const newMessage = {
      message: message.value,
      time: new Date().toLocaleString(),
    };
    messageToSend.value.push(newMessage);
    message = "";
  }
};

const searchHistory = (searchParam) => {
  return messageToSend.value.filter((m) =>
    m.toLowerCase().includes(searchParam.toLowerCase())
  );
};

const handleSearch = () => {
  messageToSend.value = searchHistory(searchParam.value);
  sendMessage();
};

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
  <div class="grid grid-cols-[25%_auto] w-screen h-screen font-montserrat">
    <div class="bg-blue-600">
      <div class="flex h-screen text-white bg-blue-900">
        <div class="w-1/6 bg-blue-800 flex flex-col items-center py-4 relative">
          <button
            @click="showInputContainer"
            class="absolute top-1000 bg-blue-500 hover:bg-blue-400 text-white rounded-full w-12 h-12 text-xl flex justify-center items-center shadow-lg"
          >
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
                class="p-3 mb-2 bg-blue-700 rounded text-center cursor-pointer hover:bg-blue-600 transition mr-20"
              >
                <div>
                  <h3>{{ branch.bname }}</h3>
                </div>
              </li>
            </ul></a
          >
          <div
            v-if="input"
            class="bg-blue-800 p-6 rounded-lg shadow-lg max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder="Enter branch name"
              class="w-full p-3 mb-4 bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="inputBranch"
            />
            <input
              type="text"
              placeholder="Enter branch info"
              class="w-full p-3 mb-4 bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="inputInfo"
            />
            <div class="flex justify-between">
              <button
                @click="closeInputContainer"
                class="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded shadow"
              >
                Cancel
              </button>
              <button
                @click="createBranch"
                class="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded shadow"
              >
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
    </div>
    <div class="bg-gray-50 h-[100%]">
      <div class="">
        <div class="grid grid-rows-[10%_8%_72%_10%] h-screen">
          <div class="">
            <div class="grid grid-cols-3 h-[100px]">
              <div class="grid grid-rows-[70%_auto] mx-10">
                <h1 class="font-bold text-gray-500 flex self-end">
                  Sales Team
                </h1>
                <p class="flex self-start text-gray-500">
                  20 👤 | description for your team....
                </p>
              </div>
              <div class="">
                <Member />
              </div>
              <div class="">name</div>
            </div>
          </div>
          <div class="">
            <div class="w-full px-10 my-5">
              <div class="relative">
                <input
                  class="w-full placeholder:text-slate-600 text-slate-700 text-sm border border-none rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Search history message"
                  v-model="searchParam"
                />
                <button
                  class="absolute top-1 right-1 flex items-center rounded bg-blue-500 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  v-on:click="handleSearch"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4 mr-2"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>
          <div class="">
            <div class="w-[100%]">
              <div class="overflow-y-auto h-[600px]">
                <div class="flex flex-col justify-end max-w-[90%]">
                  <div
                    v-for="(message, index) in messageToSend"
                    :key="index"
                    class="p-1 text-white rounded-lg break-words text-start max-w-[90%] mx-10 my-2 overflow-wrap-break-word"
                  >
                    <div class="grid grid-cols-[80px_auto] w-[100%] text-wrap">
                      <div class="avatar px-1">
                        <div class="w-[56px] h-[56px] rounded overflow-hidden">
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            alt="avatar"
                          />
                        </div>
                      </div>
                      <div class="grid grid-rows-[30px]">
                        <div class="grid grid-cols-[200px_auto]">
                          <h3 class="text-gray-700 font-bold">
                            Mr.Napat Chumtham.
                          </h3>
                          <span class="text-gray-500 flex items-center">{{
                            message.time
                          }}</span>
                        </div>
                        <p class="text-gray-700 break-words whitespace-normal">
                          {{ message.message }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="px-10 my-5">
              <input
                class="w-full placeholder:text-slate-600 text-slate-700 text-sm border border-none rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Search history message"
                v-model="message"
                @keyup.enter="sendMessage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
