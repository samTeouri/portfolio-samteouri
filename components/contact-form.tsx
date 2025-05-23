"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useActionState } from "react"
import { submitContactForm, type ContactFormState } from "@/actions/contact"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const initialState: ContactFormState = {}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    // The actual submission is handled by the form action
  }

  // Reset submitting state when state changes
  if (state.success !== undefined && isSubmitting) {
    setIsSubmitting(false)
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
      {state.errors?._form && (
        <div className="p-3 rounded-md bg-red-950/30 border border-red-800/50 text-red-400 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{state.errors._form}</span>
        </div>
      )}

      {state.success && (
        <div className="p-3 rounded-md bg-green-950/30 border border-green-800/50 text-green-400 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            className={`w-full rounded-md border ${state.errors?.name ? "border-red-600" : "border-zinc-800"} bg-zinc-950/50 glass-dark px-3 py-2 text-sm transition-all focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 focus:glow-red-sm`}
            placeholder="Your Name"
          />
          {state.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`w-full rounded-md border ${state.errors?.email ? "border-red-600" : "border-zinc-800"} bg-zinc-950/50 glass-dark px-3 py-2 text-sm transition-all focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 focus:glow-red-sm`}
            placeholder="your.email@example.com"
          />
          {state.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className={`w-full rounded-md border ${state.errors?.message ? "border-red-600" : "border-zinc-800"} bg-zinc-950/50 glass-dark px-3 py-2 text-sm transition-all focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 focus:glow-red-sm`}
          rows={4}
          placeholder="Your message..."
        />
        {state.errors?.message && <p className="text-red-500 text-xs mt-1">{state.errors.message[0]}</p>}
      </div>
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          type="submit"
          className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 border-0 w-full glow-red-sm hover:glow-red"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </motion.div>
    </form>
  )
}
