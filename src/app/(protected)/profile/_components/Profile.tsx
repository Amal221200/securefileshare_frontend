"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import UserProfile from "./UserProfile"
import PasswordChange from "./PasswordChange";

export interface UserDataProps {
    id: string;
    name: string;
    email: string;
    public_key: string
}

const Profile = ({ userData }: { userData: UserDataProps }) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Profile Management
                </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <UserProfile userData={userData} />
                <Separator />
                <PasswordChange userData={userData} />
            </CardContent>
        </Card>
    )
}

export default Profile