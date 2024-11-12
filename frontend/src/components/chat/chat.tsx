"use client"

import { Question } from "@/components/chat/question"
import {Answer} from "@/components/chat/answer"

export function Chat(props: any) {
    return (
        <div key={props.data.id}>
            <Question key={`q${props.data.id}`} message={props.data.question}/>
            <Answer key={`q${props.data.id}`} message={props.data.answer}/>
        </div>
    )
}