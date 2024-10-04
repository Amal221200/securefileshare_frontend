"use server"
import { redirect } from "next/navigation"
import handleApiError from "./handleApiError"

export default async function withActionHandler<T>(action: () => Promise<T>) {
    try {
        return await action();
    } catch (error) {
        const { status, message, location } = handleApiError(error);
        if (location) {
            redirect(location)
        }

        return {
            status,
            message
        }
    }
}
