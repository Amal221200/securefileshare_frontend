"use client";

import { Logout } from "@/actions/authHandler";

interface LogoutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
    const onClick = async () => {
        await Logout();
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}