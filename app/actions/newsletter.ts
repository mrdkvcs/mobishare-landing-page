"use server"

import { createServerClient } from "@/lib/supabase"
import { z } from "zod"
import { revalidatePath } from "next/cache"

// Define schema for form validation
const newsletterSchema = z.object({
  email: z.string().email({ message: "Érvényes email címet adjon meg" }),
  name: z.string().optional(),
})

export type SubscriptionStatus = {
  success: boolean
  message: string
}

export async function subscribeToNewsletter(formData: FormData): Promise<SubscriptionStatus> {
  try {
    const supabase = createServerClient()

    // Extract and validate form data
    const email = formData.get("email") as string
    const name = (formData.get("name") as string) || undefined

    // Validate the data
    const validatedData = newsletterSchema.parse({ email, name })

    // Insert data into Supabase
    const { error } = await supabase.from("newsletter_subscribers").insert([
      {
        email: validatedData.email,
        name: validatedData.name,
        subscribed_at: new Date().toISOString(),
      },
    ])

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === "23505") {
        return {
          success: false,
          message: "Ez az email cím már feliratkozott a hírlevelünkre",
        }
      }

      console.error("Supabase error:", error)
      return {
        success: false,
        message: "Hiba történt a feliratkozás során. Kérjük, próbálja újra később.",
      }
    }

    return {
      success: true,
      message: "Sikeres feliratkozás! Köszönjük érdeklődését.",
    }
  } catch (error) {
    console.error("Subscription error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Érvényes email címet adjon meg",
      }
    }

    return {
      success: false,
      message: "Hiba történt a feliratkozás során. Kérjük, próbálja újra később.",
    }
  }
}

export async function getNewsletterSubscribers() {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching subscribers:", error)
    throw new Error("Failed to fetch subscribers")
  }

  return data
}

export async function deleteNewsletterSubscriber(id: string) {
  const supabase = createServerClient()

  const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id)

  if (error) {
    console.error("Error deleting subscriber:", error)
    throw new Error("Failed to delete subscriber")
  }

  revalidatePath("/admin/subscribers")
  return { success: true }
}

