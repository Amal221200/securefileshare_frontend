import { auth } from "./auth";
import { apiAuthPrefix, DEFAULT_LOGIN_REDIRECT, authRoutes } from "./routes";
import { NextResponse } from "next/server";

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = req.auth?.user.accessToken ? true : false

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(`/${nextUrl.pathname.split('/').at(-1)}`);    

    if (nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL('/login', nextUrl))
    }

    if (isApiAuthRoute) {
        return NextResponse.next()
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }

    if (!isLoggedIn) {
        return NextResponse.redirect(
            new URL('/login', nextUrl)
        );
    }

    return NextResponse.next();
})
