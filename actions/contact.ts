"use server"

import { createServerClient } from "@/lib/supabase"
import { z } from "zod"

// Define validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export type ContactFormState = {
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
    _form?: string[]
  }
  success?: boolean
  message?: string
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Extract form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Validate form data
  const validationResult = contactFormSchema.safeParse({ name, email, message })

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      success: false,
      message: "Please fix the errors in the form",
    }
  }

  try {
    // Initialize Supabase client
    const supabase = createServerClient()

    // Insert data into Supabase
    const { error } = await supabase.from("contact_submissions").insert([{ name, email, message }])

    if (error) {
      console.error("Error submitting contact form:", error)
      return {
        errors: {
          _form: ["Failed to submit your message. Please try again later."],
        },
        success: false,
        message: "Failed to submit your message",
      }
    }

    // Send notification email (this would be implemented with an email service)
    // For now, we'll just return success

    return {
      success: true,
      message: "Your message has been sent successfully! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Error in contact form submission:", error)
    return {
      errors: {
        _form: ["An unexpected error occurred. Please try again later."],
      },
      success: false,
      message: "An unexpected error occurred",
    }
  }
}
