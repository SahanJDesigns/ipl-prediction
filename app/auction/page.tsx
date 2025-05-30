"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { DollarSign, Users, Target, Plus, Trash2, Sparkles, Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SidebarLayout } from "@/components/sidebar-layout"

const allIPLPlayers = [
  // Existing players (keep if you want, or remove if only new list is needed)
  { id: "1", name: "KL Rahul", position: "Wicket-keeper", team: "LSG", price: 17.0, points: 226, rating: 8.7 },
  { id: "2", name: "Faf du Plessis", position: "Batsman", team: "RCB", price: 7.0, points: 730, rating: 9.0 },
  { id: "3", name: "Rovman Powell", position: "All-rounder", team: "RR", price: 7.4, points: 110, rating: 7.2 },
  { id: "4", name: "Glenn Phillips", position: "Wicket-keeper", team: "SRH", price: 1.5, points: 150, rating: 7.5 },
  { id: "5", name: "Sam Curran", position: "All-rounder", team: "PBKS", price: 18.5, points: 200, rating: 8.2 },
  { id: "6", name: "Lungi Ngidi", position: "Bowler", team: "DC", price: 0.5, points: 0, rating: 6.5 },
  { id: "7", name: "Maheesh Theekshana", position: "Bowler", team: "CSK", price: 0.7, points: 11, rating: 7.0 },
  { id: "8", name: "Jayant Yadav", position: "All-rounder", team: "GT", price: 1.7, points: 2, rating: 6.0 },
  { id: "9", name: "Mohammed Shami", position: "Bowler", team: "GT", price: 6.25, points: 24, rating: 8.5 },
  { id: "10", name: "Adam Zampa", position: "Bowler", team: "RR", price: 1.5, points: 8, rating: 7.0 },
  { id: "11", name: "Bhuvneshwar Kumar", position: "Bowler", team: "SRH", price: 4.2, points: 11, rating: 7.8 },
  { id: "12", name: "Lockie Ferguson", position: "Bowler", team: "RCB", price: 2.0, points: 2, rating: 6.8 },
  { id: "13", name: "Kagiso Rabada", position: "Bowler", team: "PBKS", price: 9.25, points: 11, rating: 8.4 },
  { id: "14", name: "Khaleel Ahmed", position: "Bowler", team: "DC", price: 5.25, points: 17, rating: 7.6 },
  { id: "15", name: "Quinton de Kock", position: "Wicket-keeper", team: "LSG", price: 6.75, points: 143, rating: 8.1 },
  { id: "16", name: "Jos Buttler", position: "Wicket-keeper", team: "RR", price: 10.0, points: 359, rating: 8.6 },
  { id: "17", name: "Atharva Taide", position: "Batsman", team: "PBKS", price: 0.2, points: 186, rating: 7.2 },
  { id: "18", name: "Ishan Kishan", position: "Wicket-keeper", team: "MI", price: 15.25, points: 320, rating: 8.3 },
  { id: "19", name: "Devdutt Padikkal", position: "Batsman", team: "LSG", price: 7.75, points: 38, rating: 7.0 },
  { id: "20", name: "Phil Salt", position: "Wicket-keeper", team: "KKR", price: 1.5, points: 435, rating: 8.5 },
  { id: "21", name: "Shubham Dubey", position: "Batsman", team: "RR", price: 5.8, points: 146, rating: 7.1 },
  { id: "22", name: "Nitish Rana", position: "Batsman", team: "KKR", price: 8.0, points: 36, rating: 7.4 },
  { id: "23", name: "Rishabh Pant", position: "Wicket-keeper", team: "DC", price: 16.0, points: 446, rating: 8.5 },
  { id: "24", name: "Rahmanullah Gurbaz", position: "Wicket-keeper", team: "KKR", price: 0.5, points: 71, rating: 7.0 },
  { id: "25", name: "Rahul Tripathi", position: "Batsman", team: "SRH", price: 8.5, points: 173, rating: 7.8 },
  { id: "26", name: "Harry Brook", position: "Batsman", team: "DC", price: 4.0, points: 63, rating: 7.2 },
]

interface SelectedPlayer {
  id: string
  name: string
  position: string
  team: string
  price: number
  buyPrice: number
  points: number
  rating: number
}

export default function DraftPage() {
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([])
  const [availablePlayers, setAvailablePlayers] = useState(allIPLPlayers.slice(0, 8)) // Show only 8 players initially
  const [budget] = useState(100)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showPriceDialog, setShowPriceDialog] = useState(false)
  const [selectedPlayerForPurchase, setSelectedPlayerForPurchase] = useState<(typeof allIPLPlayers)[0] | null>(null)
  const [buyPrice, setBuyPrice] = useState("")

  const usedBudget = selectedPlayers.reduce((sum, player) => sum + player.buyPrice, 0)
  const remainingBudget = budget - usedBudget
  const budgetPercentage = (usedBudget / budget) * 100

  const handlePlayerCountChange = (value: string) => {
    // This input shows the current team size
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === "available" && destination.droppableId === "selected") {
      const player = availablePlayers.find((p) => p.id === result.draggableId)
      if (player && remainingBudget >= player.price) {
        // Open price dialog for drag and drop
        setSelectedPlayerForPurchase(player)
        setBuyPrice(player.price.toString())
        setShowPriceDialog(true)
      }
    } else if (source.droppableId === "selected" && destination.droppableId === "available") {
      setSelectedPlayers((prev) => prev.filter((p) => p.id !== result.draggableId))
    }
  }

  const handleTickClick = (player: (typeof allIPLPlayers)[0]) => {
    
    if (remainingBudget >= player.price) {
      setSelectedPlayerForPurchase(player)
      setBuyPrice(player.price.toString())
      setShowPriceDialog(true)
    }
  }

  const handlePurchaseConfirm = async() => {
   

    if (selectedPlayerForPurchase && buyPrice) {
      const purchasePrice = Number.parseFloat(buyPrice)
      if (purchasePrice <= remainingBudget && purchasePrice > 0) {
        const newPlayer: SelectedPlayer = {
          ...selectedPlayerForPurchase,
          buyPrice: purchasePrice,
        }
        setSelectedPlayers((prev) => [...prev, newPlayer])
        setShowPriceDialog(false)
        
        setSelectedPlayerForPurchase(null)
        setBuyPrice("")
          setIsRefreshing(true)

    // Simulate loading for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Refresh with different players from the pool
    const currentPlayerIds = availablePlayers.map((p) => p.id)
    const remainingPlayers = allIPLPlayers.filter(
      (p) => !currentPlayerIds.includes(p.id) && !selectedPlayers.find((sp) => sp.id === p.id),
    )

    // Get 8 random players (mix of current and new)
    const shuffledPlayers = [...remainingPlayers, ...availablePlayers.slice(0, 4)]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
      .filter((p) => !selectedPlayers.find((sp) => sp.id === p.id))

    setAvailablePlayers(shuffledPlayers)
    setIsRefreshing(false)
      }
    }
  }

  const handleCrossClick = async () => {
    setIsRefreshing(true)

    // Simulate loading for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Refresh with different players from the pool
    const currentPlayerIds = availablePlayers.map((p) => p.id)
    const remainingPlayers = allIPLPlayers.filter(
      (p) => !currentPlayerIds.includes(p.id) && !selectedPlayers.find((sp) => sp.id === p.id),
    )

    // Get 8 random players (mix of current and new)
    const shuffledPlayers = [...remainingPlayers, ...availablePlayers.slice(0, 4)]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
      .filter((p) => !selectedPlayers.find((sp) => sp.id === p.id))

    setAvailablePlayers(shuffledPlayers)
    setIsRefreshing(false)
  }

  const removePlayer = (playerId: string) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.id !== playerId))
  }

  const optimizeTeam = async () => {
    setIsOptimizing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const optimizedPlayers = availablePlayers
      .slice(0, 3)
      .filter((p) => !selectedPlayers.find((sp) => sp.id === p.id) && remainingBudget >= p.price)
      .map((p) => ({ ...p, buyPrice: p.price }))

    setSelectedPlayers((prev) => [...prev, ...optimizedPlayers])
    setIsOptimizing(false)
  }

  return (
    <SidebarLayout>
    <div className="min-h-screen bg-background w-full">
      <div className="container mx-auto px-4 py-8">
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
          
          {/* Budget Tracker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-1 gap-4"
          >
            {/* Budget Card */}
            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Budget Tracker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Used: ₹{usedBudget.toFixed(1)} cr</span>
                  <span className="text-sm font-medium">Remaining: ₹{remainingBudget.toFixed(1)} cr</span>
                </div>
                <Progress value={budgetPercentage} className="h-2" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">₹{budget} cr</p>
                    <p className="text-xs text-muted-foreground">Total Budget</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{selectedPlayers.length}</p>
                    <p className="text-xs text-muted-foreground">Players Selected</p>
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
                    <CardTitle className="flex items-center gap-2 w-full">
                      <Users className="h-5 w-5" />
                      Recommended Players
                      <div className="flex items-center gap-2 ml-4">
                        <Label htmlFor="teamSize" className="text-xs">Team Size</Label>
                        <Input
                          id="teamSize"
                          type="number"
                          min={1}
                          max={15}
                          className="w-16 h-8 px-2 py-1 text-sm"
                          onChange={(e) => {
                            const newSize = e.target.value ? parseInt(e.target.value, 10) : 8
                            // Pick newSize players from allIPLPlayers not already selected
                            const currentIds = selectedPlayers.map((p) => p.id)
                            const filtered = allIPLPlayers.filter(p => !currentIds.includes(p.id))
                            setAvailablePlayers(filtered.slice(0, newSize-selectedPlayers.length))
                          }}
                          disabled={isRefreshing}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCrossClick}
                        disabled={isRefreshing}
                        className="ml-auto"
                      >
                        {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
                      </Button>
                    </CardTitle>
                    <CardDescription>Drag players to your team or use tick/cross buttons</CardDescription>
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
                          {isRefreshing ? (
                            <div className="flex items-center justify-center h-32">
                              <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                          ) : (
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
                                        } ${remainingBudget < player.price ? "opacity-50" : ""}`}
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
                                            <p className="text-sm font-semibold">₹{player.price} cr</p>
                                          </div>
                                          <div className="flex gap-1">
                                            <Button
                                              size="icon"
                                              variant="ghost"
                                              disabled={remainingBudget < player.price}
                                              onClick={() => handleTickClick(player)}
                                              className="text-green-600 hover:bg-green-100 dark:hover:bg-green-900"
                                              aria-label="Select player"
                                            >
                                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path
                                                  d="M5 10.5L9 14.5L15 7.5"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </Button>
                                            <Button
                                              size="icon"
                                              variant="ghost"
                                              onClick={handleCrossClick}
                                              className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
                                              aria-label="Refresh players"
                                            >
                                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path
                                                  d="M6 6L14 14M14 6L6 14"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            </Button>
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </Draggable>
                                ))}
                            </AnimatePresence>
                          )}
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
                                          <p className="text-sm font-semibold">₹{player.buyPrice} cr</p>
                                          {player.buyPrice !== player.price && (
                                            <p className="text-xs text-muted-foreground">Base: ₹{player.price} cr</p>
                                          )}
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
          </motion.div>
        </motion.div>

        {/* Price Input Dialog */}
        <Dialog open={showPriceDialog} onOpenChange={setShowPriceDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Purchase Price</DialogTitle>
              <DialogDescription>
                Enter the price you want to pay for {selectedPlayerForPurchase?.name}
                <br />
                Base price: ₹{selectedPlayerForPurchase?.price} cr
                <br />
                Available budget: ₹{remainingBudget.toFixed(1)} cr
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="buyPrice">Purchase Price (₹ crores)</Label>
                <Input
                  id="buyPrice"
                  type="number"
                  step="0.25"
                  min="0.25"
                  max={remainingBudget}
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  placeholder="Enter price in crores"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPriceDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handlePurchaseConfirm}
                disabled={
                  !buyPrice || Number.parseFloat(buyPrice) > remainingBudget || Number.parseFloat(buyPrice) <= 0
                }
              >
                Purchase Player
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    </SidebarLayout>
  )
}
