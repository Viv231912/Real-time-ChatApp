import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

//dom queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newName = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");

// add a new chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //message from user input
  const message = newChatForm.message.value.trim();
  //add message
  chatroom
    .addChat(message)
    .then(() => {
      newChatForm.reset();
    })
    .catch((err) => console.log(err));
});

// update username
newName.addEventListener("submit", (e) => {
  e.preventDefault();
  // update name via chatroom
  const name = newName.name.value.trim();
  chatroom.updateName(name);
  //reset form
  newName.reset();
  //show then hide the update message
  updateMssg.innerText = `You name was updated to ${name}`;

  setTimeout(() => {
    updateMssg.innerText = "";
  }, 3000);
});

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", "vivian");

// get chats and render
chatroom.getChats((data) => chatUI.render(data));

//Todo: Username icon
