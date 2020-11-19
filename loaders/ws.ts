import {Application} from 'express';
import WebSocket from 'ws';
import expressWs from 'express-ws';

import {sendMessage} from '../services/messages';
import {UserEssentials} from '../database/types/users';

interface Chat {
  sender: string;
  receiver: string;
  message: string;
}

const isString = (obj: any): obj is string => typeof obj === 'string';

const instanceOfChat = (obj: any): obj is Chat => {
  return isString(obj.sender) && isString(obj.receiver) && isString(obj.message);
};

const isJSON = (obj: string) => {
  try {
    JSON.parse(obj);
    return true;
  } catch {
    return false;
  }
};

export default (application: Application) => {
  expressWs(application);
  const app = application as expressWs.Application;

  const users = new Map<string, WebSocket>();

  app.ws('/chat', (ws, req) => {
    if (req.user) {
      const user = req.user as UserEssentials;
      users.set(user.username, ws);
    }

    ws.on('message', async (message) => {
      if (typeof message != 'string') return;

      if (!isJSON(message)) return;
      const data = JSON.parse(message);

      if (!instanceOfChat(data)) return;

      if (users.get(data.sender) != ws) return;

      const res = await sendMessage(data.sender, data.receiver, data.message);

      if (res === null) return;

      users.get(data.receiver)?.send(JSON.stringify(res));
    });
  });
};
