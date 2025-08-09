import { FunctionI } from "@interfaces/common";
import { ReactNode } from "react";

export interface PaylaodChildrenSpeechRecognitionPropsI {
    stop: FunctionI
    recording: boolean
    speaking: boolean
    isError: boolean
}

export interface ChildrenSpeechRecognitionPropsI {
    (paylaod: PaylaodChildrenSpeechRecognitionPropsI): ReactNode
}

export interface PayloadOnStopFunctionI {
    transcript: string
}

export interface OnStopFunctionI {
    (payload: PayloadOnStopFunctionI): void
}

export interface SpeechRecognitionPropsI {
    onStop?: OnStopFunctionI
    children: ChildrenSpeechRecognitionPropsI
    alwayChildren?: boolean
    continuous?: boolean
    onChange?: (text: string) => void
}
