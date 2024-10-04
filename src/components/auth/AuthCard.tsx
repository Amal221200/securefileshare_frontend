"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardFooter, CardHeader, CardContent } from "../ui/card"
import { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"

interface AuthCardProps extends PropsWithChildren {
    headerLabel: string,
    backButtonHref: string,
    backButtonLabel: string,
    className?: string
}

const AuthCard = ({ backButtonHref, backButtonLabel, headerLabel, children, className }: AuthCardProps) => {
    return (
        <Card className={cn("w-[400px] shadow-md", className)}>
            <CardHeader>
                <div className="flex w-full flex-col items-center justify-center gap-y-4">
                    <h1 className="text-3xl font-semibold">SecureShare</h1>
                    <p className="text-sm text-muted-foreground">
                        {headerLabel}
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <Button variant="link" className="w-full font-normal" size="sm" asChild>
                    <Link href={backButtonHref}>
                        {backButtonLabel}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default AuthCard