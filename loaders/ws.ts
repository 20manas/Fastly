import {sendMessage} from '../services/messages';

export default (app: any) => {
  require('express-ws')(app);

  const users = new Map<string, any>();

  app.ws('/chat', (ws: any, req: any) => {
    if (req.user) {
      users.set(req.user.username, ws);
    }

    ws.on('message', async (message: any) => {
      const data = JSON.parse(message);

      if (!data.sender || !data.receiver || !data.message) return;

      if (users.get(data.sender) != ws) return;

      const res = await sendMessage(data.sender, data.receiver, data.message);

      if (res === null) return;

      if (users.has(data.receiver)) {
        users.get(data.receiver).send(JSON.stringify(res));
      }
    });
  });
};
