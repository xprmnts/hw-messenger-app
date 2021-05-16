import io from 'socket.io-client';
import store from './store';
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  updateConversation
} from './store/conversations';

const socket = io(window.location.origin, { autoConnect: false });

socket.on('read-messages', (messages) => {
  store.dispatch(updateConversation(messages));
});

socket.on('add-online-user', (id) => {
  store.dispatch(addOnlineUser(id));
});

socket.on('remove-offline-user', (id) => {
  store.dispatch(removeOfflineUser(id));
});
socket.on('new-message', (data) => {
  store.dispatch(setNewMessage(data.message, data.sender));
});

export default socket;
