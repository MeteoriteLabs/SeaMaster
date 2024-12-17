import { create } from "zustand";

interface IMessage {
  id: number;
  question: string;
  answer: string;
}

interface IChat {
  id: string;
  name: string;
  messages: IMessage[];
}

interface ChatState {
  chats: IChat[];
  activeChatId: string | null;
  setActiveChat: (id: string) => void;
  addMessage: (chatId: string, message: string, answer: string) => void;
  setChats: (chats: IChat[]) => void;
}

const useChatStore = create<ChatState>((set) => ({
  chats: [],
  activeChatId: null,

  // Set the active chat
  setActiveChat: (id) => set(() => ({ activeChatId: id })),

  // Add a message and answer to a specific chat
  addMessage: (chatId, question, answer) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { id: chat.messages.length + 1, question, answer },
              ],
            }
          : chat
      ),
    })),

  setChats: (chats: IChat[]) => set(() => ({ chats })),
}));

export default useChatStore;
