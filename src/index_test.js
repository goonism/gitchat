import gitchat from './index.js';
import creds from '../credentials.json';

const username = creds.username;
const password = creds.password;

const gc = new gitchat(username, password, 'commit_chat');

const messages = gc.getMessagesFromChannel('master').then((messages) => {
  console.log(messages);  
});

gc.sendChatMessage('master', 'hello message').then(() => {
  gc.getMessagesFromChannel('master').then((messages) => {
    console.log(messages);
  });
})

