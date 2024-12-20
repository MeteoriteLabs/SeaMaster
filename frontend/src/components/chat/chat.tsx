"use client";

import { Question } from "@/components/chat/question";
import { Answer } from "@/components/chat/answer";

export function Chat(props: any) {
  return (
    <div className="flex flex-col w-full px-4 md:px-10 space-y-4">
      <div key={props.data.id} className="flex flex-col w-full max-w-full">
        <Question message={props.data.question} timestamp="15:42" />
        <div className="flex justify-end w-full">
          <Answer message={props.data.answer} timestamp="15:42" />
        </div>
      </div>
    </div>
  );
}
