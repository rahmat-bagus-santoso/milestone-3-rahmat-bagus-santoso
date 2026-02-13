"use server";
import { cookies } from 'next/headers';
import { AUTH_COOKIE, User } from "./auth-types";
import { API_URL } from "./api";


export async function login(
    email: string,
    password: string
) {
    const response =  await fetch(`${API_URL}/auth/login`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password}),
        }
    );

    if(!response.ok) {
        throw new Error('Invalid Credential')
    }

    const { access_token } = await response.json();
    const profileResponse = await fetch (`${API_URL}/auth/profile`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );

    if(!profileResponse.ok) {
        throw new Error('Failed to fetch profile')
    }

    const user: User = await profileResponse.json();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const cookieStore = await cookies();

    cookieStore.set(AUTH_COOKIE, JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });

    return { user, token: access_token};
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE)
}

export async function getSession(): Promise<User | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE)
    if(!token) return null
    try{
        return JSON.parse(token.value) as User
    }
    catch{
        return null
    }
}
