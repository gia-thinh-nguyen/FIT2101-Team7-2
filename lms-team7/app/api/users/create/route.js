import { NextResponse } from "next/server"

import User from "@/models/user";
import { connectDB } from "@/utils/connectDB"

export async function POST() {
    try {
        await connectDB()

        const newUser = await User.create( {
            username: 'Test User',
            email: 'testuser@example.com',
        })

        return NextResponse.json(
            {user: newUser, message: 'User created'},
            {status: 200}
        )
    } catch(error) {
        return NextResponse.json(
            {message: 'Internal server error', error},
            {status: 500}
        )

    }
}