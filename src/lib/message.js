import { messages } from './store';

export const add = (level, message) => {
  messages.messages.push({
    id: Math.random(),
    level,
    message
  });
};
