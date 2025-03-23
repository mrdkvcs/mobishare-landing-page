"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions";
import { toast, ToastContainer } from "react-toastify";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  async function handleSubmit(formData: FormData) {
    try {
      const result = await subscribeToNewsletter(formData);

      if (result.success) {
        toast.success(`${result.message}`, {
          position: "top-center",
          autoClose: 3000,
        });
        setEmail(""); // Clear the form on success
      } else {
        toast.error(`${result.message}`, {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error(
        "Nem sikerült kapcsolódni a szerverhez. Kérjük, próbálja újra később.",
        {
          position: "top-center",
          autoClose: 5000,
        },
      );
    }
  }

  return (
    <>
      <form
        action={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
      >
        <div className="flex-1">
          <Input
            type="email"
            name="email"
            placeholder="Add meg az email címed"
            className="bg-[#FFFBFC] border-0 h-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="bg-[#007AAD] hover:bg-[#007AAD]/90 h-12"
        >
          <>
            <Mail className="mr-2 h-4 w-4" />
            Feliratkozás
          </>
        </Button>
      </form>
      <ToastContainer />
    </>
  );
}
