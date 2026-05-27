"use client"

import { useState, useEffect } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"
import { Bell, CheckCheck, Trash2 } from "lucide-react"

interface Notification {
  id: string
  type: string
  title: string
  message: string
  data: any
  read: boolean
  created_at: string
}

export default function NotificationsPage() {
  const { user, authenticated } = usePrivy()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<"all" | "unread">("all")
  const supabase = createClient()

  useEffect(() => {
    if (!authenticated || !user?.id) return
    loadNotifications()
  }, [authenticated, user?.id, filter])

  async function loadNotifications() {
    if (!user?.id) return

    let query = supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (filter === "unread") {
      query = query.eq("read", false)
    }

    const { data, error } = await query

    if (error) {
      console.error("[v0] Failed to load notifications:", error)
      return
    }

    setNotifications(data || [])
  }

  async function markAsRead(notificationId: string) {
    const { error } = await supabase.from("notifications").update({ read: true }).eq("id", notificationId)

    if (!error) {
      setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
    }
  }

  async function markAllAsRead() {
    if (!user?.id) return

    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false)

    if (!error) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    }
  }

  async function deleteNotification(notificationId: string) {
    const { error } = await supabase.from("notifications").delete().eq("id", notificationId)

    if (!error) {
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
    }
  }

  function getNotificationColor(type: string) {
    switch (type) {
      case "security_alert":
        return "destructive"
      case "transaction":
        return "default"
      case "trust_score":
        return "secondary"
      default:
        return "outline"
    }
  }

  function getNotificationIcon(type: string) {
    switch (type) {
      case "security_alert":
        return "🚨"
      case "transaction":
        return "💸"
      case "trust_score":
        return "⭐"
      default:
        return "📢"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (!authenticated) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">로그인이 필요합니다</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">알림</h1>
          <p className="text-muted-foreground">실시간 보안 알림 및 거래 내역</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <CheckCheck className="h-4 w-4 mr-2" />
            모두 읽음 표시
          </Button>
        )}
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | "unread")}>
        <TabsList>
          <TabsTrigger value="all">모든 알림 ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">읽지 않음 ({unreadCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4 mt-6">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {filter === "unread" ? "읽지 않은 알림이 없습니다" : "알림이 없습니다"}
                </p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card key={notification.id} className={!notification.read ? "border-blue-500" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{notification.title}</CardTitle>
                          {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                        </div>
                        <CardDescription>
                          {formatDistanceToNow(new Date(notification.created_at), {
                            addSuffix: true,
                            locale: ko,
                          })}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getNotificationColor(notification.type)}>{notification.type}</Badge>
                      <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{notification.message}</p>
                  {notification.data && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <pre className="text-xs overflow-x-auto">{JSON.stringify(notification.data, null, 2)}</pre>
                    </div>
                  )}
                  {!notification.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 bg-transparent"
                      onClick={() => markAsRead(notification.id)}
                    >
                      읽음 표시
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
