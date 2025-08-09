import { useCallback, useEffect, useRef, useState } from "react";
import { SpeechRecognitionPropsI } from "./speech-recognition.interface";

import { faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import style from "./speech-recognition.module.css";

export default function SpeechRecognitionComponent({ children, continuous, onChange, alwayChildren, onStop }: SpeechRecognitionPropsI) {
    const [isError, setIsError] = useState<boolean>(false);
    const [recording, setRecording] = useState<boolean>(false);
    const [speaking, setSpeaking] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [allowSpeech, setAllowSpeech] = useState<boolean>(false)
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const handleStartRecognition = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
        }
    }, [])

    const saveSearch = useCallback((transcript: string) => {
        if (typeof onChange == "function") {
            return onChange(transcript)
        }
    }, [onChange])

    const logicRecognition = useCallback(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            return;
        }

        setAllowSpeech(true)

        let finalTranscript: string = '';
        const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = continuous || false;
        recognition.interimResults = true;
        recognition.lang = 'es-ES';

        recognition.onstart = () => {
            setSearching(true)
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const flattenedResults = Array.from(event?.results || []).flatMap(result =>
                Array.from(result).map(alternative => alternative.transcript)
            );
            const transcript = flattenedResults.join(" ");
            const split = transcript.split(".")
            split.pop()
            finalTranscript = split.join("")
            saveSearch(finalTranscript)
        };

        recognition.onerror = () => {
            setIsError(true)
        };

        recognition.onend = () => {
            setSearching(false)
            if (typeof onStop == "function") {
                onStop({ transcript: finalTranscript })
                finalTranscript = ""
            }
        };

        recognition.onaudiostart = () => {
            setRecording(true)
        };

        recognition.onaudioend = () => {
            setRecording(false)

        };

        recognition.onsoundstart = () => {
            setSpeaking(true)
        };

        recognition.onsoundend = () => {
            setSpeaking(false)
        };

        recognitionRef.current = recognition;
    }, [continuous, onChange])

    useEffect(() => {
        logicRecognition()
    }, [])

    if (!allowSpeech) return null

    return (
        <div className={classNames(style.box, searching ? style.active : "")} onClick={handleStartRecognition}>
            {searching && !alwayChildren ? (
                <div className={style.boxIconStop}>
                    <FontAwesomeIcon icon={faStop} />
                </div>
            ) : children({
                speaking,
                recording,
                isError,
                stop: () => {
                    if (recognitionRef.current) {
                        recognitionRef.current.stop();
                    }
                }
            })}

        </div>
    )
}