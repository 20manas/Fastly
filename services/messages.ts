import {getFriendRequestStatus} from '../database/friends';
import {addMessage, getChat} from '../database/messages';
import {User} from '../database/types/users';
import {getUserByUsername} from '../database/users';

export const checkAndGetChat = async (
    username: User['username'],
    friendUsername: User['username'],
    limit: number,
    offset: number,
) => {
  const user = await getUserByUsername(username);
  const friend = await getUserByUsername(friendUsername);

  if (!user || !friend) return null;

  if ((await getFriendRequestStatus(user.id, friend.id)) !== null) return null;

  const chat = await getChat(user.id, friend.id, limit, offset);

  return chat.map(
      message => ({
        sender: message.sender_id === user.id ? user.username : friend.username,
        receiver: message.receiver_id === user.id ? user.username : friend.username,
        content: message.content,
        date: message.sent_at,
      }),
  );
};

export const sendMessage = async (
    senderUsername: User['username'],
    receiverUsername: User['username'],
    content: string,
) => {
  const sender = await getUserByUsername(senderUsername);
  const receiver = await getUserByUsername(receiverUsername);

  if (!sender || !receiver) return null;

  if ((await getFriendRequestStatus(sender.id, receiver.id)) !== null) return null;

  const now = new Date();
  await addMessage(sender.id, receiver.id, content, now);

  return {
    sender: senderUsername,
    receiver: receiverUsername,
    content,
    date: now,
  };
};
