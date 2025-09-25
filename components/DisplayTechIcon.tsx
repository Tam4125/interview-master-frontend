"use client";

import React, {useEffect, useState} from 'react'
import {getTechLogos} from "@/lib/utils";
import Image from "next/image";

const DisplayTechIcon = ({techStack} : {techStack: string[]}) => {

    const [techIcons, setTechIcons] = useState<{tech:string, url:string}[]>([]);

    useEffect(() => {
        const fetchLogos = async () => {
            const logos = await getTechLogos(techStack);
            setTechIcons(logos);
        }
        fetchLogos();
    }, [techStack]);

    return (
        <div className="flex flex-row -space-x-1">
            {techIcons.slice(0,3).map(({tech, url}, index ) => (
                <div key={tech} className="relative group rounded-full p-2 flex-center bg-dark-300">
                    <span className="absolute bottom-full mb-1 hidden group-hover:flex px-2 py-1 text-xs text-white bg-dark-100 rounded-md shadow-md">{tech}</span>
                    <div className="size-3 object-contain relative">
                        <Image src={url} alt={tech} fill/>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default DisplayTechIcon