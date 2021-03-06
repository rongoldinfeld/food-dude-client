import { io, Socket } from 'socket.io-client';
import { config } from '../../config/config';

export interface ReviewBlockedChange {
  restaurantId: string;
  reviewsBlocked: boolean;
}

export const createSocket = (token: string): Socket => {
  if (token === '') {
    console.warn(`Tried to create a socket with an empty token`);
  }
  const socket = io(config.wsApi, { query: { token } });
  socket.on('connect', () => console.log(`Socket connected`));
  socket.on('disconnect', () => console.log(`Socket disconnected`));
  socket.on('AUTH_ERROR', () => console.log('Auth error occurred'));
  socket.on('INTERNAL_SERVER_ERROR', (args: any) =>
    console.log('Internal server error occured: ', args)
  );
  socket.on('INPUT_ERROR', (error: any) => console.log('Input error occurred: ', error));
  return socket;
};

export const sendMessage = <T>(socket: Socket, event: string, args: T) => {
  socket.emit(event, args);
};

const listenToSocketMessage = <T>(socket: Socket, event: string, listener: (data: T) => void) => {
  socket.on(event, listener);
};

export const listenToBlockReviewChange = (
  socket: Socket,
  restaurantId: string,
  listener: (data: ReviewBlockedChange) => void
) => {
  listenToSocketMessage<ReviewBlockedChange>(socket, 'BLOCK_RESTAURANT_REVIEWS_CHANGED', (data) => {
    if (data.restaurantId === restaurantId) {
      listener(data);
    }
  });
};

export const closeConnection = (socket: Socket) => {
  socket.close();
};

export const sendTestMessage = (socket: Socket, restaurantId: string, block: boolean) => {
  socket.emit('CHANGE_BLOCK_RESTAURANT_REVIEWS', { restaurantId, block });
};
