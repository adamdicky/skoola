import { NextResponse } from "next/server";

export function handleApiError(err: unknown, context: string = "") {
    console.error(`[API ERROR] ${context}`, err);

    return NextResponse.json(
        { msg: "Unexpected error occurred", error: (err as Error).message },
        { status: 500 }
    );
}

export function successResponse(data: any, msg: string = "Success", status = 200) {
    return NextResponse.json({ msg, data }, { status });
}

export function badRequest(msg: string) {
    return NextResponse.json({ msg }, { status: 400 });
}

export function unauthorized(msg: string = "Unauthorized") {
    return NextResponse.json({ msg }, { status: 401 });
}
