<template>
<chat-window :current-user-id="currentUserId" :rooms="rooms" :messages="messages" :show-audio="false" :show-files="false" :rooms-loaded="roomsLoaded" :messages-loaded="messagesLoaded" @send-message="sendMessage" @fetch-messages="fetchMessages" />
</template>

<!-- ANCHOR SCRIPT PART -->

<script lang="ts">
// ANCHOR External import
import Vue from "vue";
import axios from "axios";
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";

// ANCHOR Internal import

const API_URL = process.env.VUE_APP_API_URL as string;

export default Vue.extend({
    name: "Chat",
    components: {
        ChatWindow,
    },
    data() {
        return {
            rooms: [],
            messages: [],
            currentUserId: 0,
            currentConversationId: "c0",
            messagesLoaded: false,
            roomsLoaded: false
        };
    },
    sockets: {
        // connect: function () {
        //     console.log("socket connected")
        // },
        // disconnect: function () {
        //     console.log("socket disconnected");
        // },
        // connect_error: function (error: any) {
        //     //console.log("client connect_error: ", error);
        // },
        // connect_timeout: function (error: any) {
        //     //console.log("client connect_timeout: ", error);
        // },

    },

    methods: {
        getConversations() {
            this.roomsLoaded = false
            axios
                .get(API_URL + "/social/get-conversations", {
                    withCredentials: true,
                })
                .then((response) => {
                    if (response.status == 200) {
                        this.rooms = response.data.conversations;
                        this.roomsLoaded = true
                        this.currentUserId = response.data.currentUserId;
                        console.log(
                            "response.data.currentUserId: ",
                            response.data.currentUserId
                        );
                    }
                })
                .catch(function (error) {
                    localStorage.setItem("isAuthenticated", "false");
                });
        },
        async sendMessage({
            content,
            roomId,
            files,
            replyMessage,
        }: {
            content: any;
            roomId: any;
            files: any;
            replyMessage: any;
        }) {
            axios
                .post(
                    API_URL + "/social/send-message", {
                        idConversation: roomId,
                        content: content,
                    }, {
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    if (response.status == 201) {
                        const currentDate = new Date();
                        const chatMessage = {
                            idConversation: roomId,

                            _id: response.data.idMessage,
                            index: currentDate,
                            content: content,
                            senderId: this.currentUserId,
                            date: currentDate.getDay().toString() +
                                "/" +
                                currentDate.getMonth().toString() +
                                "/" +
                                currentDate.getUTCFullYear().toString(),
                            timestamp: currentDate.getHours().toString() +
                                ":" +
                                currentDate.getMinutes().toString(),
                            disableActions: true,
                            disableReactions: true,
                        };
                        this.messages.push(chatMessage);

                        this.$socket.emit("send_message", chatMessage);
                        console.log("send_message", chatMessage);
                    }
                })
                .catch(function (error) {
                    localStorage.setItem("isAuthenticated", "false");
                });
        },
        async fetchMessages({
            room,
            options
        }: {
            room: any;options: any
        }) {
            this.messagesLoaded = false
            console.log("fetchMessages : ", room.roomId);
            axios
                .get(API_URL + "/social/get-messages/" + room.roomId.toString(), {
                    withCredentials: true,
                })
                .then((response) => {
                    if (response.status == 200) {
                        this.currentConversationId = room.roomId
                        this.messages = response.data.messages;
                        this.messagesLoaded = true
                        this.$socket.emit("join_chat_room", this.currentConversationId);
                    }
                })
                .catch(function (error) {
                    localStorage.setItem("isAuthenticated", "false");
                });
        },
    },
    mounted() {
        this.sockets.subscribe('message_sended', (messageData: any) => {
            // Avoid duplicate
            if (messageData.senderId != this.currentUserId) {
                this.messages.push(messageData);
            }
            
        });
        this.getConversations();
    },
    beforeDestroy() {
        console.log("BeforeDestroy disconnect...");
        //this.socket.disconnect()
    },
});
</script>
