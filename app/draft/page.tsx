"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { DollarSign, Users, Target, Plus, Trash2, Sparkles } from "lucide-react"
import { SidebarLayout } from "@/components/sidebar-layout"

const availablePlayers = [
  { id: "1", name: "Lionel Messi", position: "Forward", team: "Inter Miami", price: 12.5, points: 245, rating: 9.2 },
  { id: "2", name: "Kevin De Bruyne", position: "Midfielder", team: "Man City", price: 11.8, points: 198, rating: 8.9 },
  { id: "3", name: "Virgil van Dijk", position: "Defender", team: "Liverpool", price: 9.2, points: 156, rating: 8.7 },
  { id: "4", name: "Erling Haaland", position: "Forward", team: "Man City", price: 13.2, points: 289, rating: 9.5 },
  { id: "5", name: "Mohamed Salah", position: "Forward", team: "Liverpool", price: 11.5, points: 234, rating: 8.8 },
  { id: "6", name: "Alisson", position: "Goalkeeper", team: "Liverpool", price: 6.8, points: 134, rating: 8.4 },
  {
    id: "7",
    name: "Bruno Fernandes",
    position: "Midfielder",
    team: "Man United",
    price: 10.8,
    points: 187,
    rating: 8.6,
  },
  { id: "8", name: "Ruben Dias", position: "Defender", team: "Man City", price: 8.9, points: 145, rating: 8.5 },
]

export default function DraftPage() {
  const [selectedPlayers, setSelectedPlayers] = useState<typeof availablePlayers>([])
  const [budget] = useState(100)
  const [isOptimizing, setIsOptimizing] = useState(false)

  const usedBudget = selectedPlayers.reduce((sum, player) => sum + player.price, 0)
  const remainingBudget = budget - usedBudget
  const budgetPercentage = (usedBudget / budget) * 100

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === "available" && destination.droppableId === "selected") {
      const player = availablePlayers.find((p) => p.id === result.draggableId)
      if (player && remainingBudget >= player.price) {
        setSelectedPlayers((prev) => [...prev, player])
      }
    } else if (source.droppableId === "selected" && destination.droppableId === "available") {
      setSelectedPlayers((prev) => prev.filter((p) => p.id !== result.draggableId))
    }
  }

  const removePlayer = (playerId: string) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.id !== playerId))
  }

  const optimizeTeam = async () => {
    setIsOptimizing(true)
    // Simulate optimization
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Add some optimized players
    const optimizedPlayers = availablePlayers
      .slice(0, 5)
      .filter((p) => !selectedPlayers.find((sp) => sp.id === p.id) && remainingBudget >= p.price)

    setSelectedPlayers((prev) => [...prev, ...optimizedPlayers.slice(0, 3)])
    setIsOptimizing(false)
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
              <h1 className="text-3xl font-bold tracking-tight">Team Builder</h1>
              <p className="text-muted-foreground">Build your perfect fantasy team with drag & drop</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={optimizeTeam} disabled={isOptimizing} className="gap-2">
                <Sparkles className="h-4 w-4" />
                {isOptimizing ? "Optimizing..." : "Optimize Team"}
              </Button>
            </motion.div>
          </div>

          {/* Budget Tracker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Budget Tracker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Used: ${usedBudget.toFixed(1)}M</span>
                  <span className="text-sm font-medium">Remaining: ${remainingBudget.toFixed(1)}M</span>
                </div>
                <Progress value={budgetPercentage} className="h-2" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">${budget}M</p>
                    <p className="text-xs text-muted-foreground">Total Budget</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{selectedPlayers.length}</p>
                    <p className="text-xs text-muted-foreground">Players Selected</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedPlayers.reduce((sum, p) => sum + p.points, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Points</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Available Players */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Available Players
                    </CardTitle>
                    <CardDescription>Drag players to your team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Droppable droppableId="available">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`space-y-3 min-h-[400px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                            snapshot.isDraggingOver
                              ? "border-blue-400 bg-blue-50 dark:bg-blue-950"
                              : "border-muted-foreground/25"
                          }`}
                        >
                          <AnimatePresence>
                            {availablePlayers
                              .filter((player) => !selectedPlayers.find((sp) => sp.id === player.id))
                              .map((player, index) => (
                                <Draggable key={player.id} draggableId={player.id} index={index}>
                                  {(provided, snapshot) => (
                                    <motion.div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -20 }}
                                      transition={{ duration: 0.3, delay: 0.05 * index }}
                                      className={`p-4 bg-card rounded-lg border cursor-grab active:cursor-grabbing transition-all ${
                                        snapshot.isDragging ? "shadow-lg scale-105 rotate-2" : "hover:shadow-md"
                                      } ${remainingBudget < player.price ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                      <div className="flex items-center space-x-3">
                                        <Avatar>
                                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                          <AvatarFallback>
                                            {player.name
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                          <p className="font-medium">{player.name}</p>
                                          <p className="text-sm text-muted-foreground">{player.team}</p>
                                        </div>
                                        <div className="text-right space-y-1">
                                          <Badge variant="secondary">{player.position}</Badge>
                                          <p className="text-sm font-semibold">${player.price}M</p>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </Draggable>
                              ))}
                          </AnimatePresence>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Selected Team */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Your Team ({selectedPlayers.length})
                    </CardTitle>
                    <CardDescription>Your selected players</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Droppable droppableId="selected">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`space-y-3 min-h-[400px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                            snapshot.isDraggingOver
                              ? "border-green-400 bg-green-50 dark:bg-green-950"
                              : "border-muted-foreground/25"
                          }`}
                        >
                          {selectedPlayers.length === 0 && (
                            <div className="flex items-center justify-center h-32 text-muted-foreground">
                              <div className="text-center">
                                <Plus className="h-8 w-8 mx-auto mb-2" />
                                <p>Drag players here to build your team</p>
                              </div>
                            </div>
                          )}

                          <AnimatePresence>
                            {selectedPlayers.map((player, index) => (
                              <Draggable key={player.id} draggableId={player.id} index={index}>
                                {(provided, snapshot) => (
                                  <motion.div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className={`p-4 bg-card rounded-lg border cursor-grab active:cursor-grabbing transition-all ${
                                      snapshot.isDragging ? "shadow-lg scale-105 rotate-2" : "hover:shadow-md"
                                    }`}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <Avatar>
                                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                        <AvatarFallback>
                                          {player.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <p className="font-medium">{player.name}</p>
                                        <p className="text-sm text-muted-foreground">{player.team}</p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <div className="text-right space-y-1">
                                          <Badge variant="secondary">{player.position}</Badge>
                                          <p className="text-sm font-semibold">${player.price}M</p>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removePlayer(player.id)}
                                          className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </Draggable>
                            ))}
                          </AnimatePresence>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </DragDropContext>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <Button variant="outline" size="lg">
              Save Draft
            </Button>
            <Button size="lg" disabled={selectedPlayers.length === 0}>
              Finalize Team
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </SidebarLayout>
  )
}
