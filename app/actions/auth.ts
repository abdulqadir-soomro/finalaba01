"use server"

import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { redirect } from "next/navigation"
import { sendNewUserNotification } from "@/lib/email"

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  console.log('Starting signup process...')
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    },
  )

  try {
    // Test the connection first
    console.log('Testing Supabase connection...')
    const { data: testData, error: testError } = await supabase.from('profiles').select('count').limit(1)
    
    if (testError) {
      console.error('Supabase connection test failed:', testError)
      return { error: "Unable to connect to the database. Please try again later." }
    }
    
    console.log('Supabase connection test successful')

    console.log('Attempting to sign up user...')
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })

    if (error) {
      console.error('Signup error:', error)
      return { error: error.message }
    }

    console.log('User signed up successfully:', data)

    // After sign up, create a profile in the profiles table
    console.log('Creating user profile...')
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: data.user?.id,
        full_name: name,
        email,
      },
    ])

    if (profileError) {
      console.error('Profile creation error:', profileError)
      return { error: profileError.message }
    }

    console.log('Profile created successfully')

    // Send notification email to owner
    try {
      console.log('Sending notification email...')
      await sendNewUserNotification(email, name)
      console.log('Notification email sent successfully')
    } catch (error) {
      console.error('Failed to send notification email:', error)
    }

    return { success: "Check your email to confirm your account!" }
  } catch (error) {
    console.error('Unexpected error during signup:', error)
    return { error: "An unexpected error occurred during signup" }
  }
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    },
  )

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: "Logged in successfully!" }
}

export async function signOut() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    },
  )

  await supabase.auth.signOut()
  redirect("/")
}
