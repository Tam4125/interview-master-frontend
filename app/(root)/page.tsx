"use client";

import React from 'react'
import {useRouter} from "next/navigation";
import Image from "next/image";

const Page = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-30 items-center">
            <section className="w-full flex flex-col items-center gap-10">
                <h1 className="text-8xl font-bold text-white font-sans max-sm:text-5xl text-center">
                    <span className="max-sm:block inline">Master </span>
                    <span className="max-sm:block inline gradient">Interview</span>
                </h1>
                <p className="text-center sm:text-xl">Ace Your Interviews with AI-Powered Practice</p>

                <button
                    className="font-bold text-dark-100 rounded-2xl p-5 bg-dark-400 hover:bg-white hover:text-dark-400 cursor-pointer"
                    type='button'
                    onClick={() => router.push('/auth')}
                >
                    Try InterviewMaster
                </button>
            </section>


            <section className="w-full flex flex-col gap-15">

                <p className="text-4xl text-center max-sm:text-2xl ">Your AI-Powered Mock Interview</p>

                <div className="grid gap-6 grid-cols-3 max-sm:grid-cols-1">
                    <div className="flex flex-col gap-5 bg-light-200 p-5 rounded-lg card-hover">
                        <div className="flex flex-col gap-5 bg-light-300 p-5 rounded-lg">
                            <div className="relative size-10">
                                <Image src={"/user-3-fill.svg"} alt={""} fill className="object-cover"/>
                            </div>
                            <p className="sm:text-xl gradient! font-bold">Upload Your CV</p>
                        </div>
                        <p className="text-black!">Simply upload your resume and let our AI analyze your background to tailor interview questions that match your skills, role, and experience</p>
                    </div>

                    <div className="flex flex-col gap-5 bg-light-200 p-5 rounded-lg card-hover">
                        <div className="flex flex-col gap-5 bg-light-300 p-5 rounded-lg">
                            <div className="relative size-10">
                                <Image src={"/ai-generate-2.svg"} alt={""} fill className="object-cover"/>
                            </div>
                            <p className="sm:text-xl gradient! font-bold">AI Interview</p>
                        </div>
                        <p className="text-black!">Practice in a one-on-one mock interview with our AI interviewer that simulates real-world scenarios, helping you build confidence and improve your responses</p>
                    </div>

                    <div className="flex flex-col gap-5 bg-light-200 p-5 rounded-lg card-hover">
                        <div className="flex flex-col gap-5 bg-light-300 p-5 rounded-lg">
                            <div className="relative size-10">
                                <Image src={"/alarm-fill.svg"} alt={""} fill className="object-cover"/>
                            </div>
                            <p className="sm:text-xl gradient! font-bold">Instant Feedback</p>
                        </div>
                        <p className="text-black!">Receive immediate, personalized feedback on your answers, communication, and soft skills so you know exactly what to improve before the real interview</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Page
