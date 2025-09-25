"use client";

import React, {useState} from 'react'
import {AuthButton, FormField} from "@/components/FormComponents";
import Notification from "@/components/Notification";
import {redirect} from "next/navigation";
import {icons} from '@/constants/icons'
import {loginUser, registUser} from "@/lib/api";

const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState('');
    const [notiType, setNotiType] = useState("message");


    const showMessage = (msg:string) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 5000); // auto clear after 5s
    }

    const handleChangeStatus = () => {
        setIsSignUp(!isSignUp);
        // Reset information
        setUsername("");
        setPassword("");
        setEmail("");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = isSignUp ? await registUser(username, email, password) : await loginUser(email, password);

        if (!result.success) {
            showMessage(result.error || "Something went wrong");
            setNotiType("error");
            return;
        }

        if (isSignUp) {
            showMessage(result.message || "Account created successfully!");
            setNotiType("message");
            handleChangeStatus();
        } else {
            redirect('/');
        }
    }

    return (
        <div className="flex-center flex-1 w-screen h-screen">
            {/* Notification */}
            {message && (
                <div className="absolute top-10 mx-auto">
                    <Notification message={message} type={notiType} />
                </div>
            )}

            <div className="flex flex-row w-2/3 h-2/3 max-sm:w-3/4 max-sm:h-3/4 rounded-lg border-2 border-dark-400 relative hover:shadow-[0_0_15px_0_#54BBF2] shadow-dark-400">

                {/*Sign In Form*/}
                <div className={`absolute w-1/2 h-full max-sm:w-full flex-col flex-center space-y-10 transition-opa left-0 ${isSignUp ? "opacity-0 w-0 pointer-events-none" : "opacity-100"}`}>

                    <h2 className="text-large-size font-bold">Sign in</h2>

                    <form onSubmit={handleSubmit} className="space-y-8 w-2/3">
                        {/*Username */}
                        <FormField
                            placeholder="Email"
                            value={email}
                            onChangeFunc={(e) => setEmail(e.target.value)}
                            icon={icons.emailIcon}
                            labelShown={email == ""}
                            type="email"
                        />

                        {/*Password*/}
                        <FormField
                            placeholder="Password"
                            value={password}
                            onChangeFunc={(e) => setPassword(e.target.value)}
                            icon={icons.passwordIcon}
                            labelShown={password == ""}
                            type="password"
                        />

                        {/*Button*/}
                        <AuthButton
                            authChoice="Sign in"
                        />
                    </form>

                    <div className="flex-center flex-col space-y-2">
                        <p className="text-normal-size">Don&apos;t have an account?</p>
                        <button
                            type="button"
                            onClick={handleChangeStatus}
                            className="text-dark-400 hover:underline cursor-pointer font-bold text-normal-size"
                        >Sign up</button>
                    </div>
                </div>

                {/*Blue Sliding Panel*/}
                <div className={`flex flex-row items-center relative w-1/2 h-full max-sm:hidden bg-dark-400 rounded-md transition-trans ${isSignUp ? "translate-x-0 left-0" : "translate-x-full right-0"}`}>
                    <div className={`absolute mx-10 w-1/2 transition-opa text-left left-0 ${isSignUp ? "opacity-100" : "opacity-0"}`}>
                        <h2 >{"WELCOME!"}</h2>
                        <p >{"We are delighted to have you here"}</p>
                    </div>

                    <div className={`absolute mx-10 w-1/2 transition-opa text-right right-0 ${isSignUp ? "opacity-0" : "opacity-100"}`}>
                        <h2 >{"WELCOME BACK!"}</h2>
                        <p >{"We are happy to have you with this again"}</p>
                    </div>


                </div>

                {/*Sign Up Form */}
                <div className={`absolute flex-col w-1/2 h-full max-sm:w-full flex-center space-y-10 transition-opa right-0 ${isSignUp ? "opacity-100 w-1/2" : "opacity-0 w-0 pointer-events-none"}`}>

                    <h2 className="text-large-size font-bold">Sign up</h2>

                    <form onSubmit={handleSubmit} className="space-y-8 w-2/3">
                        {/*Username */}
                        <FormField
                            placeholder="Username"
                            value={username}
                            onChangeFunc={(e) => setUsername(e.target.value)}
                            icon={icons.userIcon}
                            labelShown={username == ""}
                            type="text"
                        />

                        {/*Email*/}
                        <FormField
                            placeholder="Email"
                            value={email}
                            onChangeFunc={(e) => setEmail(e.target.value)}
                            icon={icons.emailIcon}
                            labelShown={email == ""}
                            type="email"
                        />

                        {/*Password*/}
                        <FormField
                            placeholder="Password"
                            value={password}
                            onChangeFunc={(e) => setPassword(e.target.value)}
                            icon={icons.passwordIcon}
                            labelShown={password == ""}
                            type="password"
                        />

                        {/*Button*/}
                        <AuthButton
                            authChoice="Sign up"
                        />
                    </form>

                    <div className="flex-center flex-col space-y-2">
                        <p className="text-normal-size">Don&apos;t have an account?</p>
                        <button
                            type="button"
                            onClick={handleChangeStatus}
                            className="text-dark-400 hover:underline cursor-pointer font-bold text-normal-size"
                        >Sign in</button>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default AuthPage;


