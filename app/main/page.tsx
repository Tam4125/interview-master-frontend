"use client";

import React, {useState} from 'react'
import Image from 'next/image'
import InterviewCard from "@/components/InterviewCard";
import {InterviewForm} from "@/components/InterviewForm";
import {useUserInterviews} from "@/lib/hooks";
import {useRouter} from "next/navigation";
import Loading from "@/components/Loading";
import {categorizeInterviews} from "@/lib/utils";

const Home = () => {
    const [formShown, setFormShown] = useState(false);
    const {interviews, loading:interviewsLoading} = useUserInterviews();
    const router = useRouter();
    const handleFormSuccess = () => {
        setFormShown(false);
        router.refresh();
    }

    const {finished:finishedInterviews, unfinished:unfinishedInterviews} = categorizeInterviews(interviews);

    return (
        <div className="relative">
            <div className={`space-y-10 ${formShown? "blur-sm pointer-events-none opacity-10" : ""}`}>
                <section className="w-full blue-gradient-dark rounded-lg flex flex-row items-center p-5">
                    <div className="flex flex-col justify-center items-start w-3/5 max-sm:w-full space-y-5">
                        <h3>Get Interview-ready with AI-powered Practice & Feedback</h3>
                        <p className="text-normal-size">Practice real interview questions & get instant feedback</p>
                        <button
                            onClick={() => setFormShown(!formShown)}
                            className="interview-btn w-1/2 max-sm:w-full text-normal-size"
                        >Start an interview</button>
                    </div>
                    <div className="w-2/5 flex-center max-sm:hidden relative size-50">
                        <Image src={'/robot.png'} alt={'robo'} fill className="object-contain"/>
                    </div>
                </section>

                <section className="space-y-5">
                    <h3>Unfinished Interview</h3>

                    {interviewsLoading ? (
                            <div className="flex justify-center w-full mt-30">
                                <Loading/>
                            </div>
                        ) : (
                            <div className="grid gap-6 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
                                {unfinishedInterviews.map((interview) => (
                                    <InterviewCard interview={interview} key={interview.id}/>
                                ))}
                                <div className="flex justify-center items-center rounded-lg overflow-hidden border-2 border-white border-dashed">
                                    <button
                                        onClick={() => {
                                            setFormShown(!formShown)
                                        }}
                                    >
                                        <div className="relative size-30 cursor-pointer">
                                            <Image src={'/add-circle-fill.svg'} alt={'circle-fill'} fill className="object-contain"/>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}
                </section>

                <section className="space-y-5">
                    <h3>Finished Interview</h3>

                    {interviewsLoading ? (
                        <div className="flex justify-center w-full mt-30">
                            <Loading/>
                        </div>
                    ) : (
                        <div className="grid gap-6 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
                            {finishedInterviews.map((interview) => (
                                <InterviewCard interview={interview} key={interview.id}/>
                            ))}
                        </div>
                    )}
                </section>

            </div>

            {formShown && (
                <div
                    className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setFormShown(false)} // close on outside click
                >
                    <div
                        className="w-1/3 max-lg:w-3/5 max-sm:w-4/5"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                    >
                        <InterviewForm onSuccess={handleFormSuccess} />
                    </div>
                </div>
            )}
        </div>
    )
}
export default Home
