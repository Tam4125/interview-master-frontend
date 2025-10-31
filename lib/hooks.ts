"use client";

import {useEffect, useState} from "react";
import {fetchCurrentUser, fetchFeedback, fetchInterview, fetchUserInterviews} from "@/lib/api";

export const useCurrentUser = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchCurrentUser();
                setUser(data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, [user]);

    return { user, loading };
}

export const useUserInterviews = () => {
    const [interviews, setInterviews] = useState<Interview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInterviews = async () => {
            try {
                const data = await fetchUserInterviews();
                const listOfInterviews: Interview[] = data.interviews.map(
                    ({ _id, ...rest }: { _id: string } & Omit<Interview, "id">) => ({
                        ...rest,
                        id: _id,
                    })
                );
                setInterviews(listOfInterviews);
            } catch (err) {
                setInterviews([]);
            } finally {
                setLoading(false);
            }
        }

        loadInterviews();
    }, [interviews])

    return {interviews, loading};
}

export const useInterview = (id:string) => {
    const [interview, setInterview] = useState<Interview | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInterview = async () => {
            try {
                const data = await fetchInterview(id);
                const { _id, ...rest } = data.interview;
                setInterview({...rest, id:_id});
            } catch (err) {
                setInterview(null);
            } finally {
                setLoading(false);
            }
        }

        loadInterview();
    }, [interview, id])

    return {interview, loading};
}

export const useFeedback = (id:string) => {
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFeedback = async () => {
            try {
                const data = await fetchFeedback(id);
                const { _id, ...rest } = data.feedback;
                setFeedback({...rest, id:_id});
            } catch (err) {
                setFeedback(null);
            } finally {
                setLoading(false);
            }
        }

        loadFeedback();
    }, [feedback, id]);

    return {feedback, loading};
}
