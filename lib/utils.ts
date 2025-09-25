"use client";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {interviewCovers, mappings} from "@/constants";

export const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRandomInterviewCover = (type:string) => {
    let index;
    if (type=="Technical") {
        index = 0;
    } else if (type=="Non-Technical") {
        index = Math.floor(interviewCovers.length/3)
    } else {
        index = Math.floor(2*interviewCovers.length/3)
    }
    return `/covers${interviewCovers[index]}`;
}

const normalizeTechName = (techName: string) => {
    const key = techName.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
    return mappings[key as keyof typeof mappings] || null;
};

const checkIconExists = async (url: string) => {
    try {
        const response = await fetch(url, { method: "HEAD" });
        return response.ok; // Returns true if the icon exists
    } catch {
        return false;
    }
};

export const getTechLogos = async (techArray: string[]) => {
    const logoURLs = techArray.map((tech) => {
        const normalized = normalizeTechName(tech);
        if (!normalized) {
            return {
                tech,
                url: "/tech.svg"
            }
        }
        return {
            tech,
            url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`
        };
    });

    const results = await Promise.all(
        logoURLs.map(async ({ tech, url }) => ({
            tech,
            url: (await checkIconExists(url)) ? url : "/tech.svg",
        }))
    );

    return results;
};

export const categorizeInterviews = (interviews:Interview[]) => {
    let finishedInterviews = []
    let unfinishedInterviews = [];
    for (const interview of interviews) {
        if(interview.finished) {
            finishedInterviews.push(interview);
        } else {
            unfinishedInterviews.push(interview);
        }
    }
    finishedInterviews = finishedInterviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    unfinishedInterviews = unfinishedInterviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return {finished:finishedInterviews, unfinished: unfinishedInterviews};
}


