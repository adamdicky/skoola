'use client'

// app/error/page.tsx
export default function ErrorPage({
    searchParams,
}: {
    searchParams: { message: string }
}) {
    return (
        <div>
            <h1>Error</h1>
            <p>{searchParams.message || 'An unknown error occurred'}</p>
        </div>
    )
}