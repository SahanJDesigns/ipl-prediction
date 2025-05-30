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
   "id": 8,
   "name": "Glenn Phillips",
   "position": "All-Rounder",
   "team": "India",
   "price": 14.0,
   "points": 300,
   "avatar": "https://resources.pulse.icc-cricket.com/players/284/662973.png",
   "stats": {
    "goals": 0,
    "assists": 0,
    "matches": 10,
    "rating": 9.5,
    "chartData": [
      { "month": "January", "points": 80 },
      { "month": "February", "points": 90 },
      { "month": "March", "points": 100 },
      { "month": "April", "points": 80 },
      { "month": "May", "points": 50 }
    ]
   }
  },
  {
   "id": 1,
   "name": "Ravichandran Ashwin",
   "position": "All-Rounder",
   "team": "India",
   "price": 9.75,
   "points": 210,
   "form": "",
   "avatar": "https://www.iplt20.com/assets/images/players/8.png",
   "stats": {
    "goals": 0,
    "assists": 0,
    "matches": 9,
    "rating": 6.5,
    "chartData": [
      { "month": "January", "points": 30 },
      { "month": "February", "points": 25 },
      { "month": "March", "points": 40 },
      { "month": "April", "points": 60 },
      { "month": "May", "points": 55 }
    ]
   }
  },
  {
   "id": 2,
   "name": "Rachin Ravindra",
   "position": "All-Rounder",
   "team": "New Zealand",
   "price": 1.8,
   "points": 320,
   "form": "Outstanding performance in ICC Champions Trophy 2025.",
   "avatar": "https://resources.pulse.icc-cricket.com/players/284/959767.png",
   "stats": {
    "goals": 263,
    "assists": 0,
    "matches": 4,
    "rating": 9.0,
    "chartData": [
      { "month": "January", "points": 50 },
      { "month": "February", "points": 70 },
      { "month": "March", "points": 80 },
      { "month": "April", "points": 60 },
      { "month": "May", "points": 60 }
    ]
   }
  },
  {
   "id": 3,
   "name": "Sam Curran",
   "position": "All-Rounder",
   "team": "England",
   "price": 7.0,
   "points": 280,
   "form": "Strong performance in County Championship; potential Test recall.",
   "avatar": "https://resources.pulse.icc-cricket.com/players/284/662973.png",
   "stats": {
    "goals": 147,
    "assists": 3,
    "matches": 2,
    "rating": 8.5,
    "chartData": [
      { "month": "January", "points": 40 },
      { "month": "February", "points": 50 },
      { "month": "March", "points": 60 },
      { "month": "April", "points": 70 },
      { "month": "May", "points": 60 }
    ]
   }
  },
  {
   "id": 4,
   "name": "Mitchell Marsh",
   "position": "All-Rounder",
   "team": "Australia",
   "price": 6.5,
   "points": 350,
   "form": "Explosive start to IPL 2025; consistent high scores.",
   "avatar": "https://resources.pulse.icc-cricket.com/players/284/272450.png",
   "stats": {
    "goals": 267,
    "assists": 0,
    "matches": 5,
    "rating": 9.2,
    "chartData": [
      { "month": "January", "points": 60 },
      { "month": "February", "points": 70 },
      { "month": "March", "points": 80 },
      { "month": "April", "points": 70 },
      { "month": "May", "points": 70 }
    ]
   }
  },
  {
   "id": 5,
   "name": "Krunal Pandya",
   "position": "All-Rounder",
   "team": "India",
   "price": 4.0,
   "points": 180,
   "form": "Notable incident: dismissed 'hit wicket' in IPL 2025.",
   "avatar": "https://resources.pulse.icc-cricket.com/players/284/471342.png",
   "stats": {
    "goals": 120,
    "assists": 8,
    "matches": 10,
    "rating": 7.0,
    "chartData": [
      { "month": "January", "points": 30 },
      { "month": "February", "points": 35 },
      { "month": "March", "points": 40 },
      { "month": "April", "points": 35 },
      { "month": "May", "points": 40 }
    ]
   }
  },
  {
   "id": 6,
   "name": "Kamindu Mendis",
   "position": "All-Rounder",
   "team": "Sri Lanka",
   "price": 3.5,
   "points": 150,
   "form": "Consistent performances in domestic leagues.",
   "avatar": "https://resources.pulse.icc-cricket.com/players/284/784373.png",
   "stats": {
    "goals": 64,
    "assists": 1,
    "matches": 1,
    "rating": 7.5,
    "chartData": [
      { "month": "January", "points": 20 },
      { "month": "February", "points": 30 },
      { "month": "March", "points": 40 },
      { "month": "April", "points": 30 },
      { "month": "May", "points": 30 }
    ]
   }
  },
  {
   "id": 7,
   "name": "Wanindu Hasaranga",
   "position": "Bowler",
   "team": "Sri Lanka",
   "price": 5.0,
   "points": 200,
   "form": "Effective performance in ILT20 2025.",
   "avatar": "https://resources.pulse.icc-cricket.com/players/284/784367.png",
   "stats": {
    "goals": 0,
    "assists": 2,
    "matches": 1,
    "rating": 8.0,
    "chartData": [
      { "month": "January", "points": 40 },
      { "month": "February", "points": 40 },
      { "month": "March", "points": 40 },
      { "month": "April", "points": 40 },
      { "month": "May", "points": 40 }
    ]
   }
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
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <div className="text-right">
                              <p className="text-lg font-semibold">₹{player.price}Cr</p>
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
