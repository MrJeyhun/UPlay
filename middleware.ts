import { NextResponse } from "next/server";

const signedInPages: string[] = ['/', '/playlist', '/library'];

export default function middleware(req) {

    if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
        const token = req.cookies.get('UPLAY_ACCESS_TOKEN')
        console.log(token)

        console.log("token:", token);

        if (!token) {
            console.log('Token is not valid')
            let url = req.nextUrl.clone()
            url.pathname = '/signin'
            return NextResponse.redirect(url)
        } else {
            console.log('Token is valid');
        }
    }
}

