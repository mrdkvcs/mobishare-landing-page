"use server";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

// Define schema for form validation
const newsletterSchema = z.object({
  email: z.string().email({ message: "Érvényes email címet adjon meg" }),
  name: z.string().optional(),
});

export type SubscriptionStatus = {
  success: boolean;
  message: string;
};

export async function subscribeToNewsletter(
  formData: FormData,
): Promise<SubscriptionStatus> {
  try {
    // Extract and validate form data
    const email = formData.get("email") as string;
    const name = (formData.get("name") as string) || undefined;

    // Validate the data
    const validatedData = newsletterSchema.parse({ email, name });

    // Insert data into Supabase
    const { error } = await supabase.from("newsletter_subscribers").insert([
      {
        email: validatedData.email,
        name: validatedData.name,
        subscribed_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === "23505") {
        return {
          success: false,
          message: "Ez az email cím már feliratkozott a hírlevelünkre",
        };
      }

      console.error("Supabase error:", error);
      return {
        success: false,
        message:
          "Hiba történt a feliratkozás során. Kérjük, próbálja újra később.",
      };
    }

    return {
      success: true,
      message: "Sikeres feliratkozás! Köszönjük érdeklődését.",
    };
  } catch (error) {
    console.error("Subscription error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Érvényes email címet adjon meg",
      };
    }

    return {
      success: false,
      message:
        "Hiba történt a feliratkozás során. Kérjük, próbálja újra később.",
    };
  }
}
