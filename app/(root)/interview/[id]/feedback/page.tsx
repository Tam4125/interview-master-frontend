import React from 'react'
import FeedbackCard from "@/components/FeedbackCard";
import {redirect} from "next/navigation";

const Page = async ({params}: InterviewPageProps) => {

    const {id:interviewId} = await params;
    if (!interviewId) {
        redirect("/");
    }

    return (
        <div className="flex items-center justify-center w-full">
            <FeedbackCard interviewId={interviewId}></FeedbackCard>
        </div>
    )
}
export default Page
