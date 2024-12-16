import { create } from "zustand";

interface IMessage {
  id: number;
  text: string;
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
  addChat: () => void;
  addMessage: (chatId: string, message: string) => void;
}

const useChatStore = create<ChatState>((set) => ({
  chats: [
    { id: "1", name: "Boilers", messages: [] },
    { id: "2", name: "What is a hull", messages: [] },
    { id: "3", name: "Engine Working", messages: [] },
  ],
  activeChatId: null,

  setActiveChat: (id) => set(() => ({ activeChatId: id })),

  addChat: () =>
    set((state) => {
      const newChatId = `${Date.now()}`;
      const newChat = {
        id: newChatId,
        name: `New Chat ${state.chats.length + 1}`,
        messages: [],
      };
      return { chats: [...state.chats, newChat], activeChatId: newChatId };
    }),

  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { id: chat.messages.length + 1, text: message },
              ],
            }
          : chat
      ),
    })),
}));

export default useChatStore;
