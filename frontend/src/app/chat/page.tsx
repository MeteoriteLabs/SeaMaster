"use client";

import React, { useEffect, useRef, useState } from "react";
import useChatStore from "@/store/chatStore"; // Import Zustand store
import { Chat } from "@/components/chat/chat"; // Chat component to render messages

export default function ChatPage() {
  const { chats, activeChatId, setActiveChat, addMessage } = useChatStore(); // Access global state and actions
  const [isLoading, setIsLoading] = useState(false); // Loading indicator
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error handling
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Get the active chat details
  const activeChat = chats.find((chat) => chat.id === activeChatId);

  // Function to handle asking a question
  const askQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!activeChatId) {
      setErrorMessage("No active chat selected.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const question = formData.get("question")?.toString().trim();

    if (!question) {
      setErrorMessage("Please type a valid question.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:8000/handle-query", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();

      // Add the question and answer to the active chat's messages
      addMessage(activeChatId, question, data.answer || "No response");
    } catch (error) {
      console.error("Error while submitting question:", error);
      setErrorMessage("Failed to fetch the answer. Please try again.");
    } finally {
      setIsLoading(false);
      form.reset(); // Clear the input field
    }
  };

  useEffect(() => {
    // Auto-scroll to the bottom when messages are updated
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat]);

  return (
    <div className="flex flex-col h-screen w-full md:p-10 p-5">
      {/* Chat Header */}
      {/* <div className="mb-4">
        <h2 className="text-xl font-semibold">
          {activeChat ? activeChat.name : "No Chat Selected"}
        </h2>
      </div> */}

      {/* Chat History */}
      <div
        className="flex-1 overflow-y-scroll p-4 space-y-4 pb-6 mb-20 scrollbar-hide lg:px-36 md:px-2 font-mullish-400"
        ref={scrollRef}
      >
        {activeChat?.messages.map((msg) => (
          <Chat key={msg.id} data={msg} />
        ))}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 text-sm text-center mb-4">
          {errorMessage}
        </div>
      )}

      {/* Query Input */}
      <div className="sticky bottom-4 flex items-center w-full md:px-10 lg:px-16">
        <form className="flex w-full items-center gap-2" onSubmit={askQuestion}>
          <div className="relative flex w-full">
            {/* Input Field */}
            <input
              name="question"
              type="text"
              placeholder="Type a message..."
              className="bg-[#f2f2f2] text-black flex h-10 w-full rounded-lg bg-background/80 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading || !activeChatId}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 shadow-sm hover:shadow-md transition-all flex items-center justify-center p-2 bg-transparent"
              disabled={isLoading || !activeChatId}
            >
              <img
                src={isLoading ? "loading-spinner.svg" : "send.svg"}
                alt={isLoading ? "Loading..." : "Send"}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
