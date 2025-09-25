import React from 'react'

interface NotificationProps {
    message: string,
    type: string,
}
const Notification = ({message, type}:NotificationProps) => {
    return (
        <div>
            {type==="error" ? (
                <p className="px-3 py-1 bg-dark-200 text-destructive-200 rounded-lg font-bold text-xl">
                    {message}
                </p>
            ): (
                <p className="px-3 py-1 bg-dark-200 text-success-200 rounded-lg font-bold text-xl">
                    {message}
                </p>
            )}
        </div>
    )
}
export default Notification
