"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        <Button onClick={() => signIn("github")} size="lg">
          <Github className="mr-2 h-4 w-4" /> Sign in with GitHub
        </Button>
      </div>
    </div>
  )
}