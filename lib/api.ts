
export const loginUser = async (email: string, password: string) => {
    try {
        const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-in`;
        const reqBody = {
            email: email,
            password: password,
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // very important for cookies
            body: JSON.stringify(reqBody),
        });

        const data = await response.json();
        return data;

    } catch (error: any) {
        throw new Error(error.message || "Network error. Please try again.");
    }
}

export const registUser = async (username: string, email: string, password: string) => {
    try {
        const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-up`;
        const reqBody = {
            username: username,
            email: email,
            password: password,
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        });

        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error.message || "Network error. Please try again.");
    }
}

export const logoutUser = async () => {
    try {
        const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-out`;
        const response = await fetch(endpoint, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        return data;
    } catch (error:any) {
        throw new Error(error.message || "Network error. Please try again.");
    }
}


export const fetchCurrentUser = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`;
    const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Failed request:", response.status, errorText);
        throw new Error("Failed to get current user");
    }

    return response.json();
}

export const fetchUserInterviews = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/interviews/me`;
    const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Failed request:", response.status, errorText);
        throw new Error("Failed to get current user interviews");
    }

    return response.json();
}

export const createNewInterview = async ({type, role, level, techstack, amount, cv}:InterviewInfor) => {
    const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/vapi/generate-interview`

    //Use FormData (only accepts string or Blob/File) instead of json String file because of having cv as File object
    const formData = new FormData();
    formData.append("type", type);
    formData.append("role", role);
    formData.append("level", level);
    formData.append("techstack", techstack);
    formData.append("amount", amount);
    if(cv){formData.append("cv", cv)} // this sends the actual file


    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error("Failed to create interview");
        }
        console.log("New Interview was created successfully.");
        const data = await response.json();
        return data.data;

    } catch (error) {
        console.error(error);
    }
}

export const fetchInterview = async (id: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/interviews/${id}`;

    const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Failed request:", response.status, errorText);

        throw new Error("Failed to get interview");
    }

    return response.json();
}


export const createNewFeedback = async ({transcript, userId, interviewId} : FeedbackInputProps) => {
    const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/feedbacks`;

    const formattedTranscript = transcript.map((sentence: {role:string, content:string}) => `- ${sentence.role}: ${sentence.content}\n`).join("");

    const reqBody = {
        formattedTranscript: formattedTranscript,
        userId: userId,
        interviewId: interviewId,
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    })


    if (!response.ok) {
        throw new Error("Failed to create feedback");
    }

    return response.json();
}


export const fetchFeedback = async (id: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/feedbacks/me`;
    const reqBody = {
        interviewId: id,
    };
    const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Failed request:", response.status, errorText);
        throw new Error("Failed to get feedback");
    }
    return response.json();
}

export const updateInterviewState = async (interviewId:string, updateData:UpdateObject) => {
    const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/interviews/${interviewId}`;
    const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
        credentials: 'include',
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Failed request:", response.status, errorText);
        throw new Error("Failed to update interview");
    }
    return response.json();
}


