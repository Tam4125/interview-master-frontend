
import React from 'react'
import {Agent} from "@/components/Agent";
import {redirect} from "next/navigation";


const InterviewPage = async ({params}: InterviewPageProps) => {

    const {id: interviewId} = await params;
    console.log("InterviewId: " + interviewId);

    if (!interviewId) {
        redirect("/");
    }


    return (
        <div className="flex justify-center items-center">
            <Agent interviewId={interviewId}></Agent>
        </div>
    )
}
export default InterviewPage
