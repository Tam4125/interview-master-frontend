"use client";

import {useState} from "react";
import {FormFieldBasic} from "@/components/FormComponents";
import Image from "next/image";
import {createNewInterview} from "@/lib/api";
import Loading from "@/components/Loading";


export const InterviewForm = ({onSuccess}: {onSuccess?: () => void}) => {
    const [type, setType] = useState("Technical");
    const [role, setRole] = useState("");
    const [level, setLevel] = useState("Intern");
    const [techstack, setTechstack] = useState("");
    const [amount, setAmount] = useState("");
    const [cv, setCV] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        const interview = await createNewInterview({type, role, level, techstack, amount, cv});
        setLoading(false);
        onSuccess?.();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCV(e.target.files[0]);
        }
    }
        return (
        <div>
            {loading ? (
                <div className="absolute w-screen h-screen flex justify-center items-center top-0 left-0">
                    <Loading/>
                </div>
            ) : (
                <div className="gap-15 p-10 flex flex-col w-full justify-center items-start border-white rounded-lg border-2 dark-gradient">
                    <div className="flex flex-col gap-2">
                        <h3>Starting Your Interview</h3>
                        <p className="text-white!">Customize your mock interview to suit your need</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                        <div className="flex flex-col gap-1">
                            <label className="text-light-100 text-normal-size">What type of interview you would like to practice?</label>
                            <select
                                name="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="flex-center border-b border-white pb-1 relative focus:border-dark-400 transition-colors w-full"
                            >
                                <option>Technical</option>
                                <option>Non-Technical</option>
                                <option>Mixed</option>

                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-light-100 text-normal-size">What role are you focusing on?</label>
                            <FormFieldBasic
                                placeholder={"Select your role"}
                                value={role}
                                labelShown={role==""}
                                onChangeFunc={(e) => setRole(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-light-100 text-normal-size">Which level you are?</label>
                            <select
                                name="level"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                className="flex-center border-b border-white pb-1 relative focus:border-dark-400 transition-colors w-full"
                            >
                                <option>Intern</option>
                                <option>Fresher</option>
                                <option>Middle</option>
                                <option>Senior</option>

                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-light-100 text-normal-size">Which tech stack would you like to focus on?</label>
                            <FormFieldBasic
                                placeholder={"Select your preferred tech stack"}
                                value={techstack}
                                labelShown={techstack==""}
                                onChangeFunc={(e) => setTechstack(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-light-100 text-normal-size">How many question you want to try?</label>
                            <FormFieldBasic
                                placeholder={"Number of question"}
                                value={amount}
                                labelShown={amount==""}
                                onChangeFunc={(e) => setAmount(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-light-100 text-normal-size">Resume</label>
                            <div className="flex flex-row w-full items-center justify-center gap-2 bg-dark-200 p-3 rounded-3xl cursor-pointer">
                                <div className="relative size-5">
                                    <Image src={'/upload.svg'} alt={'uploadIcon'} fill className="object-contain"/>
                                </div>
                                <input
                                    type="file"
                                    accept="application/pdf, image/*"
                                    onChange={handleFileChange}
                                    className="text-sm cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <button
                                type='submit'
                                className="interview-btn w-full text-normal-size">Create Interview</button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    )

}