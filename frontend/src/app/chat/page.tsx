'use client';

import React, { useState } from 'react'
import { Chat } from '@/components/chat/chat'
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
  let testChat: IChat[] = [
    { "id": 1, "question": "this is my first question", "answer": "my first answer can be short but I need something a bit longer" },
    { "id": 2, "question": "my second question has to be long so adding some more text here", "answer": "second answer will be a medium lenght answer" },
    { "id": 3, "question": "third question is somewhere in between first and second", "answer": "this is the shortest answer" },
    { "id": 4, "question": "fourth question is somewhere in between first and second", "answer": "this is the shortest answer but longer than third" },
    { "id": 5, "question": "a fifth question is required to test scroll", "answer": "I dont care about the answer. As long as it fits into the chat box, I am happy" }
  ];
  const [chat, setChat] = useState<IChat[]>(testChat);

  const askQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = Object.fromEntries([...formData])
    console.log(result);
    // callAPI(`${result.question}`);
    const URL = `http://localhost:8000/handle-query`;
    const HEADERS = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    const BODY = JSON.stringify({ "question": `${result.question}` });
    const res = await fetch(URL, { headers: HEADERS, method: "POST", body: BODY });
    const data = await res.json();
    data.id = chat.length + 1;
    console.log(data);
    setChat([...chat, data]);
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {/* chat history */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-6">
          <div key={`mychat`}>
            {chat.map((c: IChat) => <Chat data={c} />)}
          </div >
        </div>
        {/* query input */}
        <div className="bg-gradient-to-b from-background/95 to-background/98 backdrop-blur-lg pt-2 px-4 pb-4 shadow-[0_-8px_16px_-6px_rgba(0,0,0,0.05)]">
          <form className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex h-10 w-full rounded-md bg-background/80 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="submit"
              size="icon"
              className="shadow-sm hover:shadow-md transition-all"
            >
              <img src="send.svg" alt="Send" type="submit"></img>
            </button>
          </form>
        </div>
      </div>

      {/* <div key={`mychat`} className="max-h-3/5 h-3/5 overflow-auto scroll-auto scroll-smooth">
        {chat.map((c: IChat) => <Chat data={c} />)}
      </div > */}

      {/* <form action={askQuestion} >
        <div className="group w-3/4 absolute bottom-40">
          <div className="relative flex items-center">
            <input name="question" type="text" className="peer relative h-10 w-full rounded-md bg-gray-50 pl-4 pr-20 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg" />
            <button className="absolute right-2 h-7 w-16 rounded-md text-xs font-semibold text-white transition-all duration-200 ease-in-out">
              <img src="send.svg" alt="Send" type="submit"></img>
            </button>
          </div>
        </div>
      </form > */}
    </>
  )
}
