import { NextResponse } from "next/server";

const signedInPages: string[] = ['/', '/playlist', '/library'];

export default function middleware(req) {
    let url = req.nextUrl.clone()

    if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
        const token = req.cookies.UPLAY_ACCESS_TOKEN;

        if (!token) {
            url.pathname = '/signin'
            return NextResponse.redirect(url)
        }
    } else {
        // FIXME: redirecting not found page
        // url.pathname = '/signin'
        // return NextResponse.redirect(url)
    }
}

