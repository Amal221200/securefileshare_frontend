"use server"
import getCurrentUser from "@/actions/getCurrentUser";
import { RedirectError } from "./ErrorUtils";

interface GlobalApiCallProps {
    url: string;
    options?: RequestInit;
}

export default async function GlobalApiCall({ url, options }: GlobalApiCallProps) {
    try {
        const session = await getCurrentUser();

        const token = session?.accessToken ?? null;
        
        const response = await fetch(url, {
            ...options,
            credentials: "include",
            headers: {
                "Content-type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options?.headers,
            }
        })

        if (response.status === 401) {
            throw new RedirectError(302, "/logout", "session expired");
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        return await response.json()
    } catch (error) {
        console.error("fetch Error:", error);
        throw error;
    }
}