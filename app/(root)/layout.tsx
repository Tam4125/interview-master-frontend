import React, {ReactNode} from 'react'
import Link from "next/link";
import Image from "next/image";

const RootLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className="root-layout">
            <nav>
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex items-center justify-center size-10 rounded-full blue-gradient relative z-10">
                        <div className="size-full relative rounded-full">
                            <Image src={'/logo.svg'} alt={'logo'} fill className="object-contain" />
                        </div>
                    </div>
                    <h3>InterviewMaster</h3>
                </Link>
            </nav>
            {children}
        </div>
    )
}
export default RootLayout
