import { Chatroom } from './chat.js'


//dom queries
const chatList = document.querySelector('.chat-list');


// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", "vivian");

// get chats and render
chatroom.getChats(data => chatUI.render(data));
