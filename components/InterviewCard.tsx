"use client";

import React, {useEffect, useState} from 'react'
import Image from "next/image";
import dayjs from "dayjs";
import {getRandomInterviewCover} from "@/lib/utils";
import {useRouter} from "next/navigation";
import DisplayTechIcon from "@/components/DisplayTechIcon";
import {useFeedback} from "@/lib/hooks";

const InterviewCard = ({interview}: { interview:Interview}) => {
    const router = useRouter();

    const [formattedDate, setFormattedDate] = useState("");

    const {feedback, loading:feedbackLoading} = useFeedback(interview.id);
    const normalizedType = /mix/gi.test(interview.type) ? 'Mixed' : interview.type;
    const feedbackLink = feedback ? `/interview/${interview.id}/feedback` : `/interview/${interview.id}`;

    // use useEffect instead of assigning directly because of using Date.now() on the client
    useEffect(() => {
        setFormattedDate(dayjs(feedback?.createdAt || interview.createdAt || Date.now()).format('MMM D, YYYY'));
    }, [feedback?.createdAt, interview?.createdAt]);

    return (
        <div className="relative space-y-5 px-5 pb-5 pt-10 blue-gradient-dark rounded-lg flex flex-col overflow-hidden card-hover">
            <p className="absolute right-0 top-0 w-fit px-3 py-2 bg-dark-500 rounded-bl-md ">{normalizedType}</p>

            <div className="relative size-20 object-cover rounded-full">
                <Image src={getRandomInterviewCover(interview.type)} alt={'cover image'} fill />
            </div>

            <h4>{interview.role} Interview</h4>

            <div className="flex flex-row gap-4 items-center">
                <div className="flex flex-row gap-1 items-center">
                    <div className="relative size-4 object-contain">
                        <Image src={'/calendar.svg'} alt={'calendar'} fill/>
                    </div>
                    <p>{formattedDate}</p>

                </div>

                <div className="flex flex-row gap-1 items-center">
                    <div className="relative size-4 object-contain">
                        <Image src={'/star.svg'} alt={'star'} fill/>
                    </div>
                    <p>{feedback?.score || "..."}/100</p>
                </div>
            </div>

            <p className="line-clamp-3">{feedback?.finalAssessment || "You haven't taken this interview yet. Take it now to improve your skills."}</p>

            <div className="flex flex-row justify-between items-center">
                <DisplayTechIcon techStack={interview.techstack}/>

                <button
                    onClick={() => router.push(feedbackLink)}
                    className="interview-btn w-fit text-normal-size"
                >{feedback ? "Check Feedback" : "View Interview"}</button>
            </div>

        </div>
    )
}
export default InterviewCard
