"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { signIn, signUp } from "@/app/actions/auth"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Live password checks
  const [hasMinLength, setHasMinLength] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [hasSpecialChar, setHasSpecialChar] = useState(false)

  // Validators
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validatePassword = (password: string) => {
    const minLen = password.length >= 8
    const num = /\d/.test(password)
    const spec = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    return minLen && num && spec
  }

  // Password change handler with live feedback
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value
    setRegisterPassword(pwd)
    setHasMinLength(pwd.length >= 8)
    setHasNumber(/\d/.test(pwd))
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(pwd))
  }

  // Redirect logged-in users
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push("/")
    })
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccessMessage("")

    if (!validateEmail(loginEmail)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    const formData = new FormData()
    formData.append("email", loginEmail)
    formData.append("password", loginPassword)

    const result = await signIn(formData)
    if (result.error) setError(result.error)
    else if (result.success) {
      setSuccessMessage(result.success)
      setTimeout(() => router.push("/"), 1000)
    }

    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccessMessage("")

    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      setError("All fields are required")
      setIsLoading(false)
      return
    }
    if (!validateEmail(registerEmail)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }
    if (!validatePassword(registerPassword)) {
      setError("Password must be at least 8 characters, include a number and a special character")
      setIsLoading(false)
      return
    }
    if (registerPassword !== registerConfirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    const formData = new FormData()
    formData.append("name", registerName)
    formData.append("email", registerEmail)
    formData.append("password", registerPassword)

    const result = await signUp(formData)
    if (result.error) setError(result.error)
    else if (result.success) setSuccessMessage(result.success)

    setIsLoading(false)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 py-12">
      <div className="w-full space-y-6">
        <h1 className="text-2xl font-bold text-center">Welcome to Zafaran</h1>
        <p className="text-sm text-muted-foreground text-center">Sign in to your account or create a new one</p>

        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">{error}</div>}
        {successMessage && <div className="rounded-md bg-green-50 p-3 text-sm text-green-500">{successMessage}</div>}

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* --- Login Tab --- */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-muted-foreground underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={checked => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember-me" className="text-sm">Remember me</Label>
              </div>

              <Button type="submit" className="w-full rounded-xl" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center text-xs uppercase relative">
              <Separator />
              <span className="bg-background px-2 relative inline-block top-[-0.65em]">Or continue with</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" className="rounded-xl" onClick={() => alert("Google login not implemented yet")}>
                Google
              </Button>
              <Button variant="outline" className="rounded-xl" onClick={() => alert("Facebook login not implemented yet")}>
                Facebook
              </Button>
            </div>
          </TabsContent>

          {/* --- Register Tab --- */}
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  required
                  value={registerName}
                  onChange={e => setRegisterName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={registerEmail}
                  onChange={e => setRegisterEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={registerPassword}
                    onChange={handlePasswordChange}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  >
                    {showRegisterPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    <span className="sr-only">{showRegisterPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>

                {/* Real-time password rule feedback */}
                <div className="mt-1 space-y-1 text-xs text-muted-foreground">
                  <p className={hasMinLength ? "text-green-600" : "text-red-600"}>
                    {hasMinLength ? "✓" : "×"} At least 8 characters
                  </p>
                  <p className={hasNumber ? "text-green-600" : "text-red-600"}>
                    {hasNumber ? "✓" : "×"} At least one number
                  </p>
                  <p className={hasSpecialChar ? "text-green-600" : "text-red-600"}>
                    {hasSpecialChar ? "✓" : "×"} At least one special character
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={registerConfirmPassword}
                  onChange={e => setRegisterConfirmPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full rounded-xl" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm">
              By registering, you agree to our{" "}
              <Link href="/terms" className="text-primary underline">Terms of Service</Link> and{" "}
              <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
