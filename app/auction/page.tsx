"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DollarSign, Users, TrendingUp, AlertTriangle, Sparkles } from "lucide-react"
import { SidebarLayout } from "@/components/sidebar-layout"

const suggestedTeams = {
  conservative: [
    { name: "Lionel Messi", position: "Forward", price: 12.5, points: 245 },
    { name: "Kevin De Bruyne", position: "Midfielder", price: 11.8, points: 198 },
    { name: "Virgil van Dijk", position: "Defender", price: 9.2, points: 156 },
  ],
  balanced: [
    { name: "Erling Haaland", position: "Forward", price: 13.2, points: 289 },
    { name: "Mohamed Salah", position: "Forward", price: 11.5, points: 234 },
    { name: "Bruno Fernandes", position: "Midfielder", price: 10.8, points: 187 },
  ],
  aggressive: [
    { name: "Kylian Mbappé", position: "Forward", price: 14.5, points: 267 },
    { name: "Erling Haaland", position: "Forward", price: 13.2, points: 289 },
    { name: "Pedri", position: "Midfielder", price: 8.9, points: 145 },
  ],
}

export default function AuctionPage() {
  const [budget] = useState(156.7)
  const [expectedPlayers, setExpectedPlayers] = useState(11)
  const [showError, setShowError] = useState(false)

  const handlePlayerCountChange = (value: string) => {
    const count = Number.parseInt(value) || 0
    setExpectedPlayers(count)
    setShowError(count > 25)
  }

  const getTeamSuggestions = () => {
    if (expectedPlayers > 25) return null

    return {
      conservative: suggestedTeams.conservative.slice(0, Math.min(expectedPlayers - 1, 3)),
      balanced: suggestedTeams.balanced.slice(0, Math.min(expectedPlayers, 3)),
      aggressive: suggestedTeams.aggressive.slice(0, Math.min(expectedPlayers + 1, 3)),
    }
  }

  const suggestions = getTeamSuggestions()

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
              <h1 className="text-3xl font-bold tracking-tight">Auction Suggestions</h1>
              <p className="text-muted-foreground">Get AI-powered team suggestions based on your budget and strategy</p>
            </div>
          </div>

          {/* Budget Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-200 dark:border-green-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Budget</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">${budget}M</div>
                <p className="text-xs text-muted-foreground">Ready for auction</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Player Count Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Expected Player Count
                </CardTitle>
                <CardDescription>How many players are you planning to acquire?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="playerCount">Number of Players</Label>
                  <Input
                    id="playerCount"
                    type="number"
                    min="1"
                    max="25"
                    value={expectedPlayers}
                    onChange={(e) => handlePlayerCountChange(e.target.value)}
                    className="text-lg font-semibold"
                  />
                </div>

                {showError && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Maximum of 25 players allowed per team. Please enter a valid number.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Team Suggestions */}
          {suggestions && !showError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">Suggested Teams</h2>
                <p className="text-muted-foreground">Based on {expectedPlayers} players</p>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {/* Conservative Strategy */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full border-blue-200 dark:border-blue-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-600">
                        <TrendingUp className="h-5 w-5" />
                        Conservative ({expectedPlayers - 1} players)
                      </CardTitle>
                      <CardDescription>Safe picks with consistent performance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {suggestions.conservative.map((player, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{player.name}</p>
                            <p className="text-sm text-muted-foreground">{player.position}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-blue-600">${player.price}M</p>
                            <Badge variant="secondary" className="text-xs">
                              {player.points} pts
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                      <Button variant="outline" className="w-full">
                        View Full Team
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Balanced Strategy */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full border-green-200 dark:border-green-800 ring-2 ring-green-200 dark:ring-green-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600">
                        <Sparkles className="h-5 w-5" />
                        Balanced ({expectedPlayers} players)
                        <Badge className="ml-auto">Recommended</Badge>
                      </CardTitle>
                      <CardDescription>Optimal mix of risk and reward</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {suggestions.balanced.map((player, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{player.name}</p>
                            <p className="text-sm text-muted-foreground">{player.position}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">${player.price}M</p>
                            <Badge variant="secondary" className="text-xs">
                              {player.points} pts
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                      <Button className="w-full">View Full Team</Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Aggressive Strategy */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full border-orange-200 dark:border-orange-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-orange-600">
                        <TrendingUp className="h-5 w-5" />
                        Aggressive ({expectedPlayers + 1} players)
                      </CardTitle>
                      <CardDescription>High-risk, high-reward selections</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {suggestions.aggressive.map((player, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{player.name}</p>
                            <p className="text-sm text-muted-foreground">{player.position}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-orange-600">${player.price}M</p>
                            <Badge variant="secondary" className="text-xs">
                              {player.points} pts
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                      <Button variant="outline" className="w-full">
                        View Full Team
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </SidebarLayout>
  )
}
