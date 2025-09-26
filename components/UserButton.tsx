import React from 'react'
import Image from 'next/image'
import Link from "next/link";
import {logoutUser} from "@/lib/api";
import {useRouter} from "next/navigation";
const UserButton = () => {
    const router = useRouter();

    const handleOnClick = async () => {
        const response = await logoutUser();
        if (!response.success) {
            return;
        }
        router.push("/auth");

    }
    return (
        // <div className="relative w-[150px] group overflow-hidden cursor-pointer flex flex-row items-center">
        //     <div className="x-full absolute text-black rounded-l-lg bg-white transform transition-transform duration-300 ease-in-out
        //        group-hover:-translate-x-full">
        //         Sign out
        //     </div>
        //
        // </div>
        <div className="relative size-10 rounded-full bg-destructive-200 cursor-pointer"
             onClick={() => handleOnClick()}
        >
            <Image src={"/logout-circle-line.svg"} alt={"logout-icon"} fill className="object-contain"/>
        </div>
    )
}
export default UserButton
