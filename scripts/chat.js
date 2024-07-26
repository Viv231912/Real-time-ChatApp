// adding new chat documents
// setting up a real-time listener to get new chats
//updating the username
//updating the room
import {
  collection,
  Timestamp,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

export class Chatroom {
  constructor(room, username) {
    (this.room = room), (this.username = username);
    this.chats = collection(window.db, "chats");
    this.unsubscribe;
  }
  // adding new chat documents
  async addChat(message) {
    //format a chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: Timestamp.fromDate(now),
    };
    //save the chat document
    const response = await addDoc(this.chats, chat);
    return response;
  }
  // setting up a real-time listener to get new chats
  getChats(callback) {
    //getDocs(query(this.chats , where('room', '==', this.room)));
    const filter = query(
      this.chats,
      where("room", "==", this.room),
      orderBy("created_at")
    );
    this.unsubscribe = onSnapshot(filter, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //update the ui
          callback(change.doc.data());
        }
      });
    });
  }

  //take in the current username
  updateName(username) {
    this.username = username;
  }

  //updating the room
  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}


