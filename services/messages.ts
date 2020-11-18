import {getFriendRequestStatus} from '../database/friends';
import {addMessage} from '../database/messages';
import {User} from '../database/types/users';
import {getUserByUsername} from '../database/users';

export const sendMessage = async (
    senderUsername: User['username'],
    receiverUsername: User['username'],
    content: string,
) => {
  const sender = await getUserByUsername(senderUsername);
  const receiver = await getUserByUsername(receiverUsername);

  if (!sender || !receiver) return null;

  if ((await getFriendRequestStatus(sender.id, receiver.id)) !== null) return null;

  await addMessage(sender.id, receiver.id, content);

  return {
    sender: senderUsername,
    receiver: receiverUsername,
    content,
    date: Date.now(),
  };
};
