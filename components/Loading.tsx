import React from 'react'

const Loading = () => {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="relative w-[30px] aspect-square">
                {/* first dot */}
                <div
                    className="absolute inset-0 rounded-full bg-white shadow-[-50px_0_0_0_white] animate-[dot-move_1.5s_linear_infinite]"
                />
                {/* second dot */}
                <div
                    className="absolute inset-0 rounded-full bg-white translate-x-[50px] animate-[dot-rotate_1.5s_linear_infinite]"
                />

                {/* keyframes */}
                <style jsx>
                    {`@keyframes dot-move {
                  100% {
                    transform: translateX(50px);
                  }
                }
                @keyframes dot-rotate {
                  100% {
                    transform: rotate(-180deg) translateX(100px);
                  }
                }`}
                </style>
            </div>
            <h3>Loading . . .</h3>
        </div>
    )
}
export default Loading
