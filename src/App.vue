<script setup>
import { ref, watch, onBeforeMount } from "vue";
const messageToSend = ref([]);
const message = ref("");
const searchParam = ref("");
const messageTemp = ref([]);
const selectedMessage = ref("");
const selectReply = ref("");
const selectChat = ref("Welcome Dailyworks")
const selectBranch = ref('');
const reply = ref("");

import {getService} from "./functions/service.js"
const API_ROOT = import.meta.env.VITE_API_ROOT;

onBeforeMount(async () => {
  let res = await getService(API_ROOT+"/api/branch");
  branchs.value.push(res.body);
});

const selectedBranch = (branch) => {
  if (selectBranch.value === branch) {
    selectBranch.value = "";
  } else {
    selectBranch.value = branch;
  }
}

const selectedChat = (chat) => {
  return selectChat.value = chat
}

const sendReply = (messageParam) => {
  if (
    messageToSend.value.findIndex((message) => messageParam === message) > -1
  ) {
    messageToSend.value[
      messageToSend.value.findIndex((message) => messageParam === message)
    ].replys.push(reply.value);
    reply.value = "";
  }
};

const inputReply = (messageParam) => {
  selectReply.value = messageParam;
};

const showDialogManage = (messageDialog) => {
  if (selectedMessage.value === messageDialog) {
    selectedMessage.value = "";
  } else {
    selectedMessage.value = messageDialog;
  }
};

const deleteMessage = (messageDialog) => {
  messageToSend.value.splice(
    messageToSend.value.findIndex((message) => message === messageDialog),
    1
  );
};

const pinedMessage = (messageDialog) => {
  notify.value.push(messageDialog);
  selectedMessage.value = ""
};

const sendMessage = () => {
  if (message.value.trim()) {
    const newMessage = {
      message: message.value,
      time: new Date().toLocaleString(),
      replys: [],
      channel: `${selectChat.value}`
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
[1, 3, 4, 5];
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

let id = 2;
const branchs = ref([]);

branchs.value[0] = {
  id: 1,
  bname: "Welcome DailyWorks",
  binfo: "",
  channels: [
    {
      name: "Welcome",
      showEditAndDelete: ref(false),
      formEdit: ref(false),
    },
  ],
};

const inputBranch = ref("");
const inputInfo = ref("");
const input = ref(null);

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

  branchs.value.push(newBranch);
  inputBranch.value = "";
  inputInfo.value = "";
  input.value = null;
};

const showForm = ref(null);
const NameInput = ref("");

const CreateChannel = (branchId) => {
  if (showForm.value === branchId) {
    showForm.value = null;
  } else {
    showForm.value = branchId;
  }
};

const addChannelToBranch = (branchId) => {
  const findId = branchs.value.find((b) => b.id === branchId);
  const input = NameInput.value.trim();
  if (findId && input) {
    console.log(input);
    findId.channels.push({
      name: input,
      showEditAndDelete: ref(false),
      formEdit: ref(false),
    });
    NameInput.value = "";
    showForm.value = null;
  }
};

const notify = ref([]);
const visible = ref(false);
const newChannelName = ref("");
const showFormPost = ref(false);
const userName = ref("");
const messageForm = ref("");

const submit = () => {
  if (userName.value.trim() && messageForm.value.trim()) {
    notify.value.unshift({
      user: userName.value,
      content: messageForm.value,
      times: new Date().toLocaleString(),
    });
    userName.value = "";
    messageForm.value = "";
  }
};

const toggleShowForm = () => {
  showFormPost.value = !showFormPost.value;
};

const toggleNotifications = () => {
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
const EditChannel = (branchId, Index) => {
  const findOfBranch = branchs.value.find((branch) => branch.id === branchId);
  if (findOfBranch) {
    findOfBranch.channels[Index].formEdit =
      !findOfBranch.channels[Index].formEdit;
    findOfBranch.channels[Index].showEditAndDelete = false;
  }
};
const saveEditChannel = (branchId, Index) => {
  const findOfBranch = branchs.value.find((branch) => branch.id === branchId);
  if (findOfBranch && findOfBranch.channels[Index]) {
    findOfBranch.channels[Index].name = newChannelName.value;
    newChannelName.value = "";
    findOfBranch.channels[Index].formEdit =
      !findOfBranch.channels[Index].formEdit;
  }
};

const cancelEdit = (branchId, Index) => {
  const findOfBranch = branchs.value.find((branch) => branch.id === branchId);
  if (findOfBranch && findOfBranch.channels[Index]) {
    findOfBranch.channels[Index].formEdit =
      !findOfBranch.channels[Index].formEdit;
  }
};

const cancelCreateChannel = () => {
  showForm.value = null;
};

const showEditAndDeleteButton = (branchId, Index) => {
  const findOfBranch = branchs.value.find((branch) => branch.id === branchId);
  const checkPropertyInChannel =
    findOfBranch.channels[Index].hasOwnProperty("name");
  if (findOfBranch && checkPropertyInChannel) {
    findOfBranch.channels[Index].showEditAndDelete =
      !findOfBranch.channels[Index].showEditAndDelete;
  }
};


const hideEditBranchName = ref(false);
const newBranchName = ref("");
const newBranchInfo = ref("");

const showEditBranchName = (branchId) => {
  hideEditBranchName.value = !hideEditBranchName.value;
};


const editNewBranch = (branchId) => {
  
  console.log("Editing branch with ID:", branchId);
  const findOfBranch = branchs.value.find((branch) => branch.id === branchId);

  if (findOfBranch) {
    console.log("Branch found:", findOfBranch.value);

    if (newBranchName.value.trim()) {
      findOfBranch.bname = newBranchName.value.trim();
    }
    if (newBranchInfo.value.trim()) {
      findOfBranch.binfo = newBranchInfo.value.trim();
    }
  } 
  hideEditBranchName.value = !hideEditBranchName.value;

  console.log("Updated Branch:", findOfBranch);
};
</script>

<template>
  <div class="grid grid-cols-[25%_auto] w-screen h-screen font-montserrat">
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

        <div class="flex-1 bg-blue-700 w-full h-screen overflow-y-auto">
          <h1 class="text-2xl font-bold mb-6 ml-5 mt-4 tracking-wide">
            DailyWorks
          </h1>
          <div
            v-for="branch in branchs"
            :key="branch.id"
            class="p-3 mb-2 bg-blue-700 rounded-md text-center cursor-pointer hover:bg-blue-600 relative"
          >
            <div class="">
              <div class="space-y-2">
                <div class="flex items-center bg-blue-600 rounded-lg">
                  <h3
                    class="text-white font-bold text-left pl-3 flex-1 max-w-[80%] truncate"
                  >
                    {{ branch.bname }}
                  </h3>
                  <div class="flex flex-col">
                    <div>
                      <button class="flex justify-center items-end pl-3" @click="selectedBranch(branch.bname)">
                        <svg
                          class="swap-off fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"
                          />
                        </svg>
                      </button>
                      <div
                        v-if="selectBranch === branch.bname"
                        class="absolute top-7.5 w-20 right-[-1px] text-white shadow-lg z-50"
                      >
                        <div
                          class="menu px-2 py-3 text-sm rounded-lg grid text-white gap-0 dropdown-content w-full shadow bg-blue-700"
                        >
                          <button
                            @click="CreateChannel(branch.id)"
                            class="hover:text-green-500 text-left"
                          >
                            Create
                          </button>
                          <button
                            @click="removeBranch(branch.id)"
                            class="hover:text-red-500 text-left"
                          >
                            Delete
                          </button>
                          <button @click="showEditBranchName(branchId)" class="text-left">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="showForm === branch.id"
                class="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                :class="[
                  'mt-2 bg-blue-500 rounded-md p-4 transition-all',
                  showForm === branch.id ? 'opacity-100' : 'opacity-0',
                ]"
              >
                <div
                  class="bg-white p-4 rounded-lg shadow-lg border border-gray-300 w-96"
                >
                  <form
                    class="flex flex-col gap-2"
                    @submit.prevent="addChannelToBranch(branch.id)"
                  >
                    <input
                      type="text"
                      v-model="NameInput"
                      class="bg-blue-400 p-2 rounded-md flex-1 text-sm"
                      placeholder="Enter channel name"
                    />
                    <div class="flex gap-4 mt-4">
                      <button
                        class="bg-blue-600 ml-5 text-white px-1 py-2 text-sm rounded-md hover:text-green-500"
                        type="submit"
                      >
                        Create
                      </button>
                      <button
                        @click="cancelCreateChannel()"
                        class="bg-blue-600 ml-46 text-white px-1 py-2 text-sm rounded-md hover:text-red-700"
                      >
                        Cancle
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="mt-2 ml-2">
              <div
                v-for="(channel, Index) in branch.channels"
                :key="Index"
                class="w-full "
              >
                <div
                  class="flex items-center justify-start mt-2  bg-blue-600 p-1 rounded-md relative"
                >
                  <button @click="selectedChat(channel.name)"
                    class="text-white text-left font-bold flex-1 truncate max-w-full pl-2"
                  >
                    ✉️ {{ channel.name }}
                  </button>
                  <div class="flex flex-col ">
                    <div class="relative flex justify-center">
                      <button
                        @click="showEditAndDeleteButton(branch.id, Index)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                        </svg>
                      </button>
                      <div
                        v-show="branch.channels[Index].showEditAndDelete"
                        class="absolute top-7.5 w-16 right-[-1px] text-white shadow-lg z-40"
                      >
                        <div
                          class="menu px-2 py-4 text-sm rounded-lg grid text-white gap-0 dropdown-content w-full shadow bg-blue-700"
                        >
                          <button
                            class="hover:text-red-500 text-left"
                            @click="removeChannel(branch.id, Index)"
                          >
                            Delete
                          </button>

                          <button
                            @click="EditChannel(branch.id, Index)"
                            class="hover:text-green-500 text-left"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      <div
                        v-show="branch.channels[Index].formEdit"
                        class="absolute z-50 right-1 bg-blue-800 rounded-lg"
                        :class="{
                          'opacity-100 visible':
                            branch.channels[Index].formEdit,
                        }"
                      >
                        <div class="w-50 p-3">
                          <input
                            type="text"
                            class="w-full p-2 mb-2 bg-blue-600 text-white rounded-md"
                            placeholder="Channel name"
                            v-model="newChannelName"
                          />
                          <button
                            class="hover:text-green-400 mr-20"
                            @click="saveEditChannel(branch.id, Index)"
                          >
                            Save
                          </button>
                          <button
                            @click="cancelEdit(branch.id, Index)"
                            class="hover:text-red-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                  {{ selectChat }}
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
                    <img
                      class="border-2 border-white rounded-full h-9 w-9 -mr-3"
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt=""
                    />
                    <img
                      class="border-2 border-white rounded-full h-9 w-9 -mr-3"
                      src="https://randomuser.me/api/portraits/women/31.jpg"
                      alt=""
                    />
                    <img
                      class="border-2 border-white rounded-full h-9 w-9 -mr-3"
                      src="https://randomuser.me/api/portraits/men/33.jpg"
                      alt=""
                    />
                    <img
                      class="border-2 border-white rounded-full h-9 w-9 -mr-3"
                      src="https://randomuser.me/api/portraits/women/32.jpg"
                      alt=""
                    />
                    <img
                      class="border-2 border-white rounded-full h-9 w-9 -mr-3"
                      src="https://randomuser.me/api/portraits/men/44.jpg"
                      alt=""
                    />
                    <img
                      class="border-2 border-white rounded-full h-9 w-9 -mr-3"
                      src="https://randomuser.me/api/portraits/women/42.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div
                class="absolute top-9 right-25 flex items-center rounded bg-blue-500 py-1 px-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:shadow-none hover:bg-slate-700 active:shadow-none disabled:opacity-50"
                @click="toggleNotifications"
              >
                Announcement
              </div>
              <div
                v-if="showFormPost"
                class="absolute right-76 top-32 w-64 bg-blue-500 z-10 shadow-lg rounded-lg border border-gray-200 p-4"
              >
                <h3 class="text-lg font-semibold mb-2 text-white">important</h3>
                <input
                  v-model="userName"
                  type="text"
                  placeholder="username"
                  class="w-full p-2 border rounded-md mb-2 bg-white text-black"
                />
                <textarea
                  v-model="messageForm"
                  placeholder="message"
                  class="w-full p-2 border rounded-md mb-2 bg-white text-black"
                ></textarea>
                <button
                  @click="submit"
                  class="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                >
                  submit
                </button>
                <button
                  @click="toggleShowForm"
                  class="bg-red-500 text-white py-1 px-3 ml-2 rounded-md hover:bg-red-600"
                >
                  cancel
                </button>
              </div>
              <div
                v-if="visible"
                class="absolute right-4 top-20 w-64 bg-blue-500 z-10 shadow-lg rounded-lg border border-gray-200"
              >
                <div class="p-4 h-[500px] overflow-y-auto flex flex-col gap-3">
                  <button
                    @click="toggleShowForm"
                    class="bg-red-500 text-white py-2 rounded-md mb-1 font-bold hover:bg-red-600"
                  >
                    Post
                  </button>
                  <div
                    v-for="(message, index) in notify"
                    :key="index"
                    class="relative flex items-center bg-gray-100 shadow-md rounded-md"
                  >
                    <div class="flex items-center p-2">
                      <img
                        class="object-cover w-10 h-10 rounded-lg"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        alt="avatar"
                      />
                      <div class="ml-3 overflow-hidden">
                        <h3
                          class="font-semibold text-lg text-red-500 truncate w-40"
                        >
                          {{ message.user }}
                        </h3>
                        <p
                          class="text-sm text-gray-900 w-40 max-h-12 overflow-y-auto break-words"
                        >
                          {{ message.content }}
                        </p>
                        <p class="text-sm text-gray-500">
                          {{ message.times }}
                        </p>
                        <p class="text-sm text-gray-900 truncate">
                          {{ message.message }}
                        </p>
                        <p class="text-sm text-gray-500">
                          {{ message.time }}
                        </p>
                      </div>
                    </div>
                    <button
                      @click="removeNotification(index)"
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
                <!-- แก้Branch -->
                <div v-if="hideEditBranchName" v-for="branch in branchs"
                :key="branch.id">
                  <div
                    class="bg-blue-800 p-6 rounded-lg shadow-lg max-w-md mx-auto"
                  >
                    <input
                      type="text"
                      placeholder="Enter branch name"
                      class="w-full p-3 mb-4 bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      v-model="newBranchName"
                    />
                    <input
                      type="text"
                      placeholder="Enter branch info"
                      class="w-full p-3 mb-4 bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      v-model="newBranchInfo"
                    />
                    <div class="flex justify-between">
                      <button
                        @click="showEditBranchName"
                        class="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded shadow"
                      >
                        Cancel
                      </button>
                      <button
                        @click="editNewBranch(branch.id)"
                        class="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded shadow"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="w-[100%]">
              <div class="overflow-y-auto h-[600px]">
                <div class="flex flex-col-reverse justify-end max-w-[90%]">
                  <div
                    v-for="(message, index) in messageToSend.filter(message => message.channel === selectChat)"
                    :key="index"
                    class=" text-white rounded-lg break-words text-start max-w-[90%] mx-10 my-2 overflow-wrap-break-word hover:bg-gray-100 p-3 "
                  >
                    <div>
                      <div
                        class="grid grid-cols-[70px_auto] w-[100%] text-wrap"
                      >
                        <div class="relative">
                          <img
                            class="h-13 w-13 rounded-lg object-cover"
                            src="https://randomuser.me/api/portraits/women/87.jpg"
                            alt="Avatar"
                          />
                          <div class=""></div>
                        </div>
                        <div class="grid grid-rows-[30px]">
                          <div class="grid grid-cols-[220px_200px_auto]">
                            <h3 class="text-gray-700 font-bold text-lg">
                              Mr.Napat Chumtham.
                            </h3>
                            <span class="text-gray-500 flex text-base">{{
                              message.time
                            }}</span>
                            <button
                              v-on:click="showDialogManage(message)"
                              class="flex justify-end items-start cursor-pointer relative z"
                            >
                              <img
                                src="https://img.icons8.com/?size=100&id=42490&format=png&color=000000"
                                alt=""
                                width="20px"
                              />
                            </button>
                            <div
                              v-show="selectedMessage == message"
                              class="flex flex-col absolute right-25 items-start bg-gray-200 p-2 px-2 rounded-xl"
                            >
                              <button
                                v-on:click="deleteMessage(message)"
                                class="text-white bg-red-500 py-1 px-2 m-1 rounded-lg"
                              >
                                Delete
                              </button>
                              <button
                                v-on:click="pinedMessage(message)"
                                class="text-white bg-blue-500 w-[100%] py-1 px-2 rounded-lg"
                              >
                                Pin
                              </button>
                            </div>
                          </div>
                          <p
                            class="p-2 text-gray-700 break-words whitespace-normal mb-4 bg-amber-100"
                          >
                            {{ message.message }}
                          </p>

                          <span
                            v-for="reply in message.replys"
                            class="text-gray-600 text-md py-1 grid grid-cols-[60px_auto]"
                          >
                            <span class="relative inline-block">
                              <img
                                src="https://randomuser.me/api/portraits/women/50.jpg"
                                class="object-cover w-10 h-10 rounded-lg"
                              />
                            </span>
                            <span class=" p-2 bg-blue-100">{{ reply }}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-row p-2 mx-15">
                      <span class="relative inline-block">
                        <img
                          src="https://randomuser.me/api/portraits/women/50.jpg"
                          class="object-cover w-7 h-7 rounded-lg"
                        />
                        <span
                          class="absolute animate-pulse top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
                        ></span>
                      </span>
                      <h1
                        v-show="selectReply !== message"
                        ref="title-reply"
                        @click="inputReply(message)"
                        class="text-gray-500 text-md p-1"
                      >
                        Reply
                      </h1>
                      <div
                        v-show="selectReply === message"
                        class="flex flex-row"
                      >
                        <input
                          class="placeholder:text-slate-600 text-slate-700 text-md border border-none rounded-md pl-2 pr-28 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300"
                          placeholder="Reply for message"
                          v-model="reply"
                        />
                        <button
                          class="text-white text-sm bg-blue-500 px-2 rounded-lg cursor-pointer"
                          @click="sendReply(message)"
                        >
                          send
                        </button>
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
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

body {
  font-family: "Montserrat", serif;
}
</style>
