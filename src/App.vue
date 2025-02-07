<script setup>
import { ref, watch } from "vue";
const messageToSend = ref([]);
const message = ref("");
const searchParam = ref("");
const messageTemp = ref([]);
const selectedMessage = ref("");

const showDialogManage = (messageDialog) => {
  if (selectedMessage.value === messageDialog) {
    selectedMessage.value = ""
  } else {
    selectedMessage.value = messageDialog
  }
}

const deleteMessage = (messageDialog) => {
  messageToSend.value.splice(messageToSend.value.findIndex(message => message === messageDialog), 1)
}

const pinedMessage = (messageDialog) => {
  notify.value.push(messageDialog)
}

const sendMessage = () => {
  if (message.value.trim()) {
    const newMessage = {
      message: message.value,
      time: new Date().toLocaleString(),
    };
    messageToSend.value.push(newMessage);
    messageTemp.value.push(newMessage);
    message.value = "";
  }
};

const resendMessage = () => {
  messageToSend.value = messageTemp.value;
};

watch(searchParam, () => {
  if (searchParam.value == "") {
    resendMessage();
    console.log(messageTemp.value);
  }
});
[1,3,4,5]
const searchHistory = (searchParam) => {
  return messageToSend.value.filter((m) =>
    m.message.toLowerCase().includes(searchParam.value.toLowerCase())
  );
};

const handleSearch = () => {
  messageToSend.value = searchHistory(searchParam);
  sendMessage();
};

const showInputContainer = () => {
  input.value = !null;
};
const closeInputContainer = () => {
  input.value = null;
};

let id = 0;
const branchs = ref([]);

branchs.value[0] = {
  id: 999,
  bname: "Welcome DailyWorks",
  binfo: "",
  channels: [
    {
      name: "Welcome",
    },
  ],
};

const inputBranch = ref("");
const inputInfo = ref("");
const input = ref(null);

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
    channels: [],
  };

  console.log(newBranch);

  branchs.value.push(newBranch);
  inputBranch.value = "";
  inputInfo.value = "";
  input.value = null;
};

const showForm = ref(null);
const NameInput = ref("");

function CreateChannel(branchId) {
  if (showForm.value === branchId) {
    showForm.value = null;
  } else {
    showForm.value = branchId;
  }
}

const addChannelToBranch = (branchId) => {
  const findId = branchs.value.find((b) => b.id === branchId);
  const input = NameInput.value.trim();
  if (findId && input) {
    console.log(input);
    findId.channels.push({
      name: input,
    });
    NameInput.value = "";
    showForm.value = null;
  }
};

const notify = ref([]);
const visible = ref(false);
// const addNotification = () => {
//   const message = ["Eve", "Fiona", "God", "Louis", "Ball", "Sharon", "Richard"];
//   notify.value.push(...message);
// };

const toggleNotifications = () => {
  if (!visible.value) {
    if (notify.value.length === 0) {
      addNotification();
    }
  }

  visible.value = !visible.value;
};
const removeNotification = (index) => {
  notify.value.splice(index, 1);
};

const removeBranch = (branchId) => {
  branchs.value = branchs.value.filter((branch) => branch.id !== branchId);
};

const removeChannel = (branchId, channelIndex) => {
  const findBranch = branchs.value.find((branch) => branch.id === branchId);
  if (findBranch && findBranch.channels[channelIndex]) {
    findBranch.channels.splice(channelIndex, 1);
  }
};
</script>

<template>
  <div class="grid grid-cols-[29.5%_auto] w-screen h-screen font-montserrat">
    <div class="bg-blue-600">
      <div class="flex h-screen text-white bg-blue-900">
        <div class="w-1/6 bg-blue-800 flex flex-col items-center py-4 relative">
          <button
            @click="showInputContainer"
            class="absolute bg-blue-500 hover:bg-blue-400 text-white rounded-full w-12 h-12 text-xl flex justify-center items-center shadow-lg"
          >
            +
          </button>
        </div>

        <div class="flex-1 bg-blue-700 p-6 w-full">
          <h1 class="text-2xl font-bold mb-6 tracking-wide">DailyWorks</h1>

          <div class="w-full">
            <div
              v-for="branch in branchs"
              :key="branch.id"
              class="p-1 mb-2 bg-blue-700 rounded-md text-center cursor-pointer hover:bg-blue-600 transition mr-20"
            >
              <div>
                <div class="p-2 space-y-2 overflow-y-auto">
                  <div
                    class="flex items-center px-3 py-1 bg-blue-600 rounded-lg"
                  >
                    <!-- ส่วนชื่อ Branch -->
                    <h3 class="text-white font-bold flex-1 truncate max-w-40">
                      {{ branch.bname }}
                    </h3>
                    <!-- ส่วนไอคอน ✅ ❌ -->
                    <div class="flex space-x-2 shrink-0">
                      <button
                        @click="CreateChannel(branch.id)"
                        class="text-green-500 hover:text-green-700"
                      >
                        ✅
                      </button>
                      <button
                        @click="removeBranch(branch.id)"
                        class="text-red-500 hover:text-red-700"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  v-if="showForm === branch.id"
                  class="rounded-md h-84 bg-blue-500 m-10"
                >
                  <form
                    class="absolute mb-32 ml-40 bg-blue-600 rounded-md"
                    @submit.prevent="addChannelToBranch(branch.id)"
                  >
                    <input
                      type="text"
                      v-model="NameInput"
                      class="bg-blue-400 m-5 rounded-md"
                    />
                    <button class="bg-blue-600 w-14 rounded-md" type="submit">
                      Create
                    </button>
                  </form>
                </div>
                <div class="mt-1.5 ml-2">
                  <h1
                    v-for="(channel, channelIndex) in branch.channels"
                    :key="channelIndex"
                    class="w- rounded-md text-xl text-left font-normal"
                  >
                    <div>
                      <button
                        class="ml-28"
                        @click="removeChannel(branch.id, channelIndex)"
                      >
                        ❌
                      </button>
                      <a href="http://"
                        ><h4
                          class="text-white font-bold flex-1 truncate max-w-50"
                        >
                          ✉️ {{ channel.name }}
                        </h4>
                      </a>
                    </div>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="input !== null"
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
                <h1
                  class="font-bold text-2xl text-gray-500 flex self-center mt-3"
                >
                  {{ branchs[0].channels[0].name }}
                </h1>
                <p class="flex self-start text-gray-500 -mt-2 text-sm">
                  20 👤 | description for your team....
                </p>
              </div>
              <div class="">
                <div class="">
                  <div
                    class="flex justify-center items-center h-[100px] flex-wrap space-x-1"
                  >
                    <div class="avatar">
                      <div class="mask mask-squircle w-8">
                        <img
                          class="rounded-lg"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </div>
                    </div>
                    <div class="avatar">
                      <div class="mask mask-squircle w-8">
                        <img
                          class="rounded-lg"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </div>
                    </div>
                    <div class="avatar">
                      <div class="mask mask-squircle w-8">
                        <img
                          class="rounded-lg"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="absolute top-9 right-25 flex items-center rounded bg-blue-500 py-1 px-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:shadow-none hover:bg-slate-700 active:shadow-none disabled:opacity-50"
                @click="toggleNotifications"
              >
                Notification
              </div>
              <div
                v-if="visible"
                class="absolute right-4 top-20 w-64 bg-blue-500 z-10 shadow-lg rounded-lg border border-gray-200"
              >
                <div class="p-4 h-[400px] overflow-y-auto flex flex-col gap-3">
                  <div
                    v-for="(message, index_notify) in notify"
                    :key="index_notify"
                    class="relative flex items-center bg-gray-100 shadow-md rounded-md"
                  >
                    <div class="flex items-center p-2">
                      <img
                        class="object-cover w-10 h-10 rounded-lg"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        alt="avatar"
                      />
                      <div class="ml-3 overflow-hidden">
                        <h3 class="font-semibold text-lg text-gray-800">
                          {{ message }}
                        </h3>
                        <p class="text-sm text-gray-500">
                          Lorem ipsum dolor sit love is my bro.
                        </p>
                      </div>
                    </div>
                    <button
                      @click="removeNotification(index_notify)"
                      class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
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
                    <div>
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
                        <div class="grid grid-cols-[220px_200px_30px_auto]">
                          <h3 class="text-gray-700 font-bold text-lg">
                            Mr.Napat Chumtham.
                          </h3>
                          <span class="text-gray-500 flex text-base">{{
                            message.time
                          }}</span>
                          <button v-on:click="showDialogManage(message)" class="flex justify-start items-start cursor-pointer">
                            <img src="https://img.icons8.com/?size=100&id=42490&format=png&color=000000" alt="" width="20px">
                          </button>
                          <div v-show="selectedMessage == message" class="grid grid-rows-3">
                            <button v-on:click="deleteMessage(message)" class="text-black">delete</button>
                            <button class="text-black">edit</button>
                            <button v-on:click="pinedMessage(message)"class="text-black">pin</button>
                          </div>
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
          </div>
          <div>
            <div class="px-10 my-5">
              <input
                class="w-full placeholder:text-slate-600 text-slate-700 text-sm border border-none rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Send message here"
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
body {
  font-family: "Montserrat", serif;
}
</style>
