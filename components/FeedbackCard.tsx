'use client';

import React from 'react'
import {useFeedback, useInterview} from "@/lib/hooks";
import Image from "next/image";
import dayjs from "dayjs";
import {redirect} from "next/navigation";

const FeedbackCard = ({interviewId}:{interviewId:string}) => {

    const {interview, loading:interviewLoading} = useInterview(interviewId);
    const {feedback, loading:feedbackLoading} = useFeedback(interviewId);
    if (!feedback) {
        return (
            <div>
                <h2>You have not finished this interview yet</h2>
            </div>
        );
    }
    const scoreStyle = feedback.score < 50 ? "text-destructive-200" : "text-success-200";

    const formattedDate = dayjs(feedback.createdAt).format('MMM D, YYYY')

    return (
        <div className="flex flex-col gap-8 w-2/3 max-sm:w-full max-md:w-5/6">
            <div className="flex flex-col items-center gap-5 w-full">
                <div className="flex flex-col items-center gap-2 w-full text-center">
                    <h2>Feedback on the Interview -</h2>
                    <h2>{interview?.role}</h2>
                </div>
                <div className="flex flex-row justify-center items-center gap-10 w-full">
                    <div className="flex flex-row justify-center items-center gap-1">
                        <div className="relative size-4">
                            <Image src={"/star.svg"} alt={""} fill className="object-contain"/>
                        </div>
                        <p>Overall Impression: <span className="font-bold">{feedback.score}</span>/100</p>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-1">
                        <div className="relative size-4">
                            <Image src={"/calendar.svg"} alt={""} fill className="object-contain"/>
                        </div>
                        <p>{formattedDate}</p>
                    </div>

                </div>
            </div>
            <hr className="border-2 border-white w-full"></hr>
            <p className="text-justify w-full">This interview does not reflect serious interest or engagement from the candidate. Their responses are dismissive, vague, or outright negative, making it difficult to assess their qualifications, motivation, or suitability for the role.</p>



            <div className="flex flex-col w-full gap-5">
                <div className="flex flex-row items-center w-full gap-5">
                    <h3>Breakdown of Evaluation:</h3>
                    <h3 className={`flex items-center justify-center rounded-3xl bg-dark-200 py-1 px-3 ${scoreStyle}`}>{feedback.score}/100</h3>
                </div>

                <div className="flex flex-col w-full gap-2">
                    <p className="font-bold">1. Strengths</p>
                    <ul className="list-disc text-light-100 text-normal-size pl-5 space-y-1.5">
                        {feedback.strengths.map((item, index) => (<li key={index}>{item}</li>))}
                    </ul>
                </div>

                <div className="flex flex-col w-full gap-2">
                    <p className="font-bold">2. Constraints</p>
                    <ul className="list-disc text-light-100 text-normal-size pl-5 space-y-1.5">
                        {feedback.constraints.map((item, index) => (<li key={index}>{item}</li>))}
                    </ul>
                </div>

                <div className="flex flex-col w-full gap-2">
                    <p className="font-bold">3. Area for Improvement</p>
                    <ul className="list-disc text-light-100 text-normal-size pl-5 space-y-1.5">
                        {feedback.improvement.map((item, index) => (<li key={index}>{item}</li>))}
                    </ul>
                </div>
            </div>

            <div className="flex flex-col w-full gap-5">
                <h3>Final Assessment: </h3>
                <p className="text-justify">{feedback.finalAssessment}</p>
            </div>

            <button
                className="relative font-bold text-white rounded-full py-2 px-3 bg-dark-400 w-full hover:bg-white hover:text-dark-400 duration-500 cursor-pointer"
                onClick={() => redirect('/')}
            >Back to Dashboard</button>


        </div>
    )
}
export default FeedbackCard
