"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, Star, TrendingUp, TrendingDown, Activity } from "lucide-react"
import { SidebarLayout } from "@/components/sidebar-layout"
import { PlayerStatsChart } from "@/components/player-stats-chart"
import { useRouter } from "next/navigation"

const players = [
  {
    id: 1,
    name: "Lionel Messi",
    position: "Forward",
    team: "Inter Miami",
    price: 12.5,
    points: 245,
    form: "+15%",
    avatar: "/placeholder.svg?height=60&width=60",
    stats: {
      goals: 23,
      assists: 18,
      matches: 28,
      rating: 8.9,
      chartData: [
        { month: "Jan", points: 45 },
        { month: "Feb", points: 52 },
        { month: "Mar", points: 48 },
        { month: "Apr", points: 61 },
        { month: "May", points: 39 },
      ],
    },
  },
  {
    id: 2,
    name: "Kevin De Bruyne",
    position: "Midfielder",
    team: "Manchester City",
    price: 11.8,
    points: 198,
    form: "+8%",
    avatar: "/placeholder.svg?height=60&width=60",
    stats: {
      goals: 12,
      assists: 25,
      matches: 32,
      rating: 8.7,
      chartData: [
        { month: "Jan", points: 38 },
        { month: "Feb", points: 42 },
        { month: "Mar", points: 55 },
        { month: "Apr", points: 35 },
        { month: "May", points: 28 },
      ],
    },
  },
  {
    id: 3,
    name: "Virgil van Dijk",
    position: "Defender",
    team: "Liverpool",
    price: 9.2,
    points: 156,
    form: "+12%",
    avatar: "/placeholder.svg?height=60&width=60",
    stats: {
      goals: 4,
      assists: 3,
      matches: 30,
      rating: 8.5,
      chartData: [
        { month: "Jan", points: 32 },
        { month: "Feb", points: 28 },
        { month: "Mar", points: 35 },
        { month: "Apr", points: 31 },
        { month: "May", points: 30 },
      ],
    },
  },
  {
    id: 4,
    name: "Erling Haaland",
    position: "Forward",
    team: "Manchester City",
    price: 13.2,
    points: 289,
    form: "+22%",
    avatar: "/placeholder.svg?height=60&width=60",
    stats: {
      goals: 35,
      assists: 8,
      matches: 31,
      rating: 9.1,
      chartData: [
        { month: "Jan", points: 58 },
        { month: "Feb", points: 62 },
        { month: "Mar", points: 45 },
        { month: "Apr", points: 68 },
        { month: "May", points: 56 },
      ],
    },
  },
  {
    id: 5,
    name: "Mohamed Salah",
    position: "Forward",
    team: "Liverpool",
    price: 11.5,
    points: 234,
    form: "-3%",
    avatar: "/placeholder.svg?height=60&width=60",
    stats: {
      goals: 28,
      assists: 12,
      matches: 33,
      rating: 8.6,
      chartData: [
        { month: "Jan", points: 48 },
        { month: "Feb", points: 52 },
        { month: "Mar", points: 41 },
        { month: "Apr", points: 46 },
        { month: "May", points: 47 },
      ],
    },
  },
  {
    id: 6,
    name: "Alisson Becker",
    position: "Goalkeeper",
    team: "Liverpool",
    price: 6.8,
    points: 134,
    form: "+5%",
    avatar: "/placeholder.svg?height=60&width=60",
    stats: {
      goals: 0,
      assists: 1,
      matches: 29,
      rating: 8.2,
      chartData: [
        { month: "Jan", points: 28 },
        { month: "Feb", points: 25 },
        { month: "Mar", points: 32 },
        { month: "Apr", points: 26 },
        { month: "May", points: 23 },
      ],
    },
  },
]

export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState<(typeof players)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter();
  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePlayerClick = (player: (typeof players)[0]) => {
    router.push(`/players/${player.id}`)
  }

  return (
    <SidebarLayout>
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Player Search</h1>
              <p className="text-muted-foreground">Discover and analyze player statistics</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search players, teams, or positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Player Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlayerClick(player)}
                  className="cursor-pointer"
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200 dark:hover:border-green-800">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                          <AvatarFallback>
                            {player.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="font-semibold text-lg">{player.name}</h3>
                            <p className="text-sm text-muted-foreground">{player.team}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{player.position}</Badge>
                            <Badge
                              variant={player.form.startsWith("+") ? "default" : "destructive"}
                              className={
                                player.form.startsWith("+")
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : ""
                              }
                            >
                              {player.form.startsWith("+") ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              {player.form}
                            </Badge>
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <div>
                              <p className="text-2xl font-bold text-blue-600">{player.points}</p>
                              <p className="text-xs text-muted-foreground">Total Points</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold">${player.price}M</p>
                              <p className="text-xs text-muted-foreground">Price</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </SidebarLayout>
  )
}
