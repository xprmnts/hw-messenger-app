import io from 'socket.io-client';
import store from './store';
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser
} from './store/conversations';

const socket = io(window.location.origin, { autoConnect: false });

socket.on('add-online-user', (id) => {
  store.dispatch(addOnlineUser(id));
});

socket.on('remove-offline-user', (id) => {
  store.dispatch(removeOfflineUser(id));
});
socket.on('new-message', (data) => {
  console.log(data);
  store.dispatch(setNewMessage(data.message, data.sender));
});

export default socket;
