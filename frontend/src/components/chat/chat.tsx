"use client";

import { Question } from "@/components/chat/question";
import { Answer } from "@/components/chat/answer";

export function Chat(props: any) {
  return (
    <div key={props.data.id}>
      <Question message={props.data.question} timestamp="15:42" />
      <Answer message={props.data.answer} timestamp="15:42" />
    </div>
  );
}
