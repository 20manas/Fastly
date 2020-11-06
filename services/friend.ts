import * as dbFriends from '../database/friends';
import {User} from '../database/types/users';

export const sendFriendRequest = async (senderId: User['id'], receiverId: User['id']) => {
  // TODO: Allow a user to not receive connection requests.
  const status = await dbFriends.getFriendRequestStatus(senderId, receiverId);

  if (status === null || status === true) return false;
  if (status === false) return acceptFriendRequest(receiverId, senderId, true);

  return dbFriends.addFriendRequest(senderId, receiverId);
};

export const acceptFriendRequest = async (
    senderId: User['id'],
    receiverId: User['id'],
    skipCheck = false,
) => {
  if (!skipCheck &&
    await dbFriends.getFriendRequestStatus(senderId, receiverId) !== false
  ) return false;

  return dbFriends.addFriend(senderId, receiverId);
};
