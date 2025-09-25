"use client";

import React, {useEffect, useState} from 'react'
import Image from "next/image";
import {vapi} from "@/lib/vapi.sdk";
import {createNewFeedback, updateInterviewState} from "@/lib/api";
import {useRouter} from "next/navigation";
import {useCurrentUser, useInterview} from "@/lib/hooks";
import Loading from "@/components/Loading";

enum CallStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    CONECTING = "CONECTING",
    FINISHED = "FINISHED",
}

export const Agent = ({interviewId}:{interviewId:string}) => {
    const router = useRouter();

    const {user, loading:userLoading} = useCurrentUser();
    const {interview, loading:interviewLoading} = useInterview(interviewId);
    const [pageLoading, setPageLoading] = useState<boolean>(false);

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const [lastMessage, setLastMessage] = useState<string>("");

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = {
                    role: message.role,
                    content: message.transcript,
                }

                setMessages((prev) => [...prev, newMessage]);
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error:Error) => console.log("Error", error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('error', onError);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
            vapi.off('error', onError);
        }
    }, [])

    useEffect(() => {
        if (messages.length >0) {
            setLastMessage(messages[messages.length - 1].content);
        }

        const handleGenerateFeedback = async (messages: SavedMessage[]) => {
            setPageLoading(true);
            const response1 = await createNewFeedback({
                transcript: messages,
                interviewId: interviewId,
                userId: user._id
            });
            const response2 = await updateInterviewState(
                interviewId,
                {finished: true},
            )
            setPageLoading(false);

            if (response1.success) {
                router.push(`/interview/${interviewId}/feedback`);
            } else {
                console.log("Error saving feedback");
                router.push("/");
            }
        }

        if (callStatus === CallStatus.FINISHED) {
            handleGenerateFeedback(messages)
        }
    }, [messages, callStatus, user, interviewId]);

    const handleCall = async () => {
        setCallStatus(CallStatus.CONECTING);
        const formattedQuestions = interview?.questions.map((question) => `-${question}`).join('\n');

        const username = user? user.userName : "Anonymous"
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
            variableValues: {
                username: username,
                questions: formattedQuestions,
            }
        })
    }

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    }

    const borderStyleAI = (isSpeaking && callStatus==CallStatus.ACTIVE) ? 'border-2 border-white blue-gradient-dark' : 'dark-gradient';
    const borderStyleUser = (!isSpeaking && callStatus==CallStatus.ACTIVE) ? 'border-2 border-white blue-gradient-dark' : 'dark-gradient';

    return (
        <div className="relative w-full">
            {pageLoading ? (
                <div className="absolute w-full top-20">
                    <Loading/>
                </div>
            ): (
                <div className="absolute flex flex-col w-full gap-10">
                    <div className="flex flex-row items-center justify-between w-full">
                        <div className={`flex flex-col items-center justify-center gap-5 overflow-hidden h-[400px] max-sm:h-[300px] w-5/11 rounded-lg ${borderStyleAI}`}>
                            <div className="flex items-center justify-center size-20 rounded-full p-5 blue-gradient relative z-10">
                                <div className="size-full relative rounded-full">
                                    <Image src={'/ai-avatar.png'} alt={''} fill className="object-contain"/>
                                </div>
                                {isSpeaking && callStatus==CallStatus.ACTIVE && (
                                    <span className="absolute size-5/6 animate-ping rounded-full bg-dark-400 opacity-75"></span>
                                )}
                            </div>
                            <h4>AI Interviewer</h4>
                        </div>

                        <div className={`flex flex-col items-center justify-center gap-5 overflow-hidden h-[400px] max-sm:h-[300px] w-5/11 rounded-lg ${borderStyleUser}`}>
                            <div className="flex items-center justify-center size-20 rounded-full p-5 blue-gradient relative z-10">
                                <div className="size-full relative rounded-full">
                                    <Image src={'/user-avatar.png'} alt={''} fill className="object-cover"/>
                                </div>
                                {!isSpeaking && callStatus==CallStatus.ACTIVE && (
                                    <span className="absolute size-5/6 animate-ping rounded-full bg-dark-400 opacity-75"></span>
                                )}
                            </div>
                            <h4>{user? user.username : "Anonymous"}</h4>
                        </div>
                    </div>


                    <div className="flex items-center justify-center w-full dark-gradient border-2 border-dark-200 rounded-lg p-3">
                        <p className="font-semibold">{lastMessage}</p>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        {callStatus !== "ACTIVE" ? (
                            <button className="flex flex-row items-center justify-center rounded-3xl py-2 px-5 bg-success-200 hover:bg-success-100 gap-2 font-semibold cursor-pointer"
                                    onClick={() => handleCall()}
                            >
                                <div className="size-5 relative">
                                    <Image src={'/call.svg'} alt={''} fill className="object-contain"/>
                                </div>
                                {callStatus === "INACTIVE" || callStatus === "FINISHED" ? "Call" : ". . ."}

                            </button>
                        ) : (
                            <button className="flex flex-row items-center justify-center rounded-3xl py-2 px-5 bg-destructive-200 hover:bg-destructive-100 gap-2 font-semibold cursor-pointer"
                                    onClick={() => handleDisconnect()}>
                                <div className="size-5 relative">
                                    <Image src={'/call-slash.svg'} alt={''} fill className="object-contain"/>
                                </div>
                                End
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
