import { NextResponse } from 'next/server';
import { connectDB } from './helper/db';
// connectDB();
// This function can be marked `async` if using `await` inside
export function middleware(request) {

    const authToken = request.cookies.get("authToken")?.value;

    if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/api/login' || request.nextUrl.pathname === '/api/users') {
        return;
    }

    const loggedInUserNotAccessPaths =
        request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/sign-up";

    if (loggedInUserNotAccessPaths) {
        // Accessing not secured route
        if (authToken) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
    else {
        // Accessing secured route
        if (!authToken) {
            if (request.nextUrl.pathname.startsWith("/api/")) {
                return NextResponse.json({
                    message: "Access Denied !!!",
                    success: false
                }, {
                    status: 401
                });
            }
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // return NextResponse.redirect(new URL('/login', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', '/sign-up', '/profile/:path*', '/api/:path*', '/add-task', '/show-tasks', '/about']
}