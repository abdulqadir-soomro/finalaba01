"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signOut } from "@/app/actions/auth"
import { supabase } from "@/lib/supabase"
import { User, Package, Heart, Settings, LogOut } from "lucide-react"

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        router.push("/login")
        return
      }

      setUser(data.user)
      setLoading(false)
    }

    getUser()
  }, [router])

  const handleSignOut = async () => {
    await signOut()
  }

  if (loading) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="mt-2 text-muted-foreground">Welcome back, {user?.user_metadata?.full_name || user?.email}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-10 w-10" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-medium">{user?.user_metadata?.full_name || "User"}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <Button variant="outline" className="w-full" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Orders</CardTitle>
                  <CardDescription>View and track your orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Package className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground">When you place an order, it will appear here.</p>
                    <Button className="mt-6" onClick={() => router.push("/collection")}>
                      Start Shopping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                  <CardDescription>Items you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Heart className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Save items you like to your wishlist to find them easily later.
                    </p>
                    <Button className="mt-6" onClick={() => router.push("/collection")}>
                      Browse Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Settings className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Account settings</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Account settings functionality will be available soon.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
