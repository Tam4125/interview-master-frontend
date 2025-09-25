import React from "react";
import Image from "next/image";

interface FormFieldInterface {
    placeholder: string;
    value: string;
    onChangeFunc?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?:any;
    labelShown?:boolean;
    type?: "text" | "password" | "email";
}

export const FormField = ({placeholder, value, onChangeFunc, icon, labelShown, type}: FormFieldInterface) => {
    return (
        <div className="flex-center border-b border-white pb-1 relative focus:border-dark-400 transition-colors">
            <input
                type={type}
                placeholder=""
                value={value}
                onChange={onChangeFunc}
                className="peer w-full flex-1 text-white bg-transparent placeholder-transparent outline-none transition-colors text-sm"
            />

            {labelShown && (
                <label
                    className="absolute left-0 text-gray-400 transition-all text-sm
                   peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
                   peer-focus:-top-5 peer-focus:text-sm peer-focus:text-dark-400 peer-focus:font-semibold"
                >
                    {placeholder}
                </label>
            )}
            {icon && (
                <div className="relative size-4">
                    <Image
                        src={icon}
                        alt={`${placeholder}Icon`}
                        fill
                        className="object-contain"
                    />
                </div>
            )}
        </div>
    )
}

export const AuthButton = ({authChoice} : {authChoice:string}) => {
    return (
        <div>
            <button
                type="submit"
                className="relative font-bold text-white rounded-full py-2 px-3 bg-dark-400 w-full hover:bg-white hover:text-dark-400 duration-1000 transition-transform ease-in-out hover:scale-105"
            >{authChoice}</button>
        </div>
    )
}

export const FormFieldBasic = ({placeholder, value, onChangeFunc, labelShown}: FormFieldInterface) => {
    return (
        <div className="flex-center border-b border-white pb-1 relative focus:border-dark-400 transition-colors">
            <input
                type="string"
                placeholder=""
                value={value}
                onChange={onChangeFunc}
                className="peer w-full flex-1 text-white bg-transparent placeholder-transparent outline-none transition-colors text-sm"
            />

            {labelShown && (
                <label
                    className="absolute left-0 text-gray-400 transition-all text-sm pointer-events-none"
                >
                    {placeholder}
                </label>
            )}
        </div>
    )
}

