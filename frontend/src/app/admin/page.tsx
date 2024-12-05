"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chat } from "@/components/chat/chat";
// import { auth } from '@/auth'
// import LoginForm from '@/components/login-form'
// import { Session } from '@/lib/types'
// import { redirect } from 'next/navigation'

interface IChat {
  id: number;
  question: string;
  answer: string;
}
export default function ChatPage() {
  const [chat, setChat] = useState<IChat[]>([
    {
      id: 1,
      question: "this is my first question",
      answer: "my first answer can be short but I need something a bit longer",
    },
  ]);

  const askQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extract form data
    const form = event.currentTarget;
    const formData = new FormData(form);
    const question = formData.get("question")?.toString().trim();

    if (!question) {
      console.log("Question is empty or invalid");
      return;
    }

    console.log("Question submitted:", question);

    try {
      // API setup
      const URL = `http://localhost:8000/handle-query`;
      const HEADERS = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const BODY = JSON.stringify({ question });

      // API request
      const response = await fetch(URL, {
        headers: HEADERS,
        method: "POST",
        body: BODY,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }

      const data = await response.json();

      // Update the chat with the new question and answer
      setChat((prevChat) => [
        ...prevChat,
        {
          id: prevChat.length + 1,
          question,
          answer: data.answer || "No response",
        },
      ]);

      console.log("Response received:", data);
    } catch (error) {
      console.error("Error while submitting question:", error);
    } finally {
      // Safely clear the input field
      const inputField = form.elements.namedItem(
        "question"
      ) as HTMLInputElement;
      if (inputField) {
        inputField.value = "";
      }
    }
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <>
      <div className="flex flex-col h-screen w-full md:p-10 p-5">
        {/* Chat History */}
        <div
          className="flex-1 overflow-y-scroll p-4 space-y-4 pb-6 mb-20 scrollbar-hide lg:px-36 md:px-2 font-mullish-400"
          ref={scrollRef}
        >
          {chat.map((c: IChat) => (
            <Chat key={c.id} data={c} />
          ))}
        </div>

        {/* Query Input */}
        <div className="sticky bottom-4 flex items-center w-full md:px-10 lg:px-16">
          <form
            className="flex w-full items-center gap-2"
            onSubmit={askQuestion}
          >
            <div className="relative flex w-full">
              {/* Input Field */}
              <input
                name="question"
                type="text"
                placeholder="Type a message..."
                className="flex h-10 w-full rounded-lg bg-background/80 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 shadow-sm hover:shadow-md transition-all flex items-center justify-center p-2 bg-transparent"
              >
                <img src="send.svg" alt="Send" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
