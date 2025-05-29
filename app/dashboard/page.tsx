"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Users, DollarSign, Globe, TrendingUp, Shield, Zap, Target } from "lucide-react"
import { motion } from "framer-motion"
import {SidebarLayout} from "@/components/sidebar-layout"

// Budget data for pie chart
const budgetData = [
  { name: "Used", value: 75, color: "#3b82f6" },
  { name: "Remaining", value: 25, color: "#e5e7eb" },
]

// Team composition by role
const teamComposition = [
  { category: "Batters", count: 7, color: "#10b981" },
  { category: "All-rounders", count: 4, color: "#f59e0b" },
  { category: "Bowlers", count: 8, color: "#ef4444" },
  { category: "Wicket-keepers", count: 2, color: "#8b5cf6" },
]

// Current team members organized by batting order
const team = [
    {
      name: "Rohit Sharma",
      role: "Batter",
      type: "Indian",
      position: "Opener",
      image: "/placeholder.svg?height=40&width=40",
      stats: { runs: 597, average: 31.4, strikeRate: 130.6 },
    },
     {
      name: "Rohit Sharma",
      role: "Batter",
      type: "Indian",
      position: "Opener",
      image: "/placeholder.svg?height=40&width=40",
      stats: { runs: 597, average: 31.4, strikeRate: 130.6 },
    }, {
      name: "Rohit Sharma",
      role: "Batter",
      type: "Indian",
      position: "Opener",
      image: "/placeholder.svg?height=40&width=40",
      stats: { runs: 597, average: 31.4, strikeRate: 130.6 },
    },
     {
      name: "Rohit Sharma",
      role: "Batter",
      type: "Indian",
      position: "Opener",
      image: "/placeholder.svg?height=40&width=40",
      stats: { runs: 597, average: 31.4, strikeRate: 130.6 },
    },
    {
      name: "Ishan Kishan",
      role: "Wicket-keeper",
      type: "Indian",
      position: "Opener",
      image: "/placeholder.svg?height=40&width=40",
      stats: { runs: 516, average: 34.4, strikeRate: 135.8 },
    },
    {
      name: "Quinton de Kock",
      role: "Wicket-keeper",
      type: "Overseas",
      position: "Top Order",
      image: "/placeholder.svg?height=40&width=40",
      stats: { runs: 508, average: 36.3, strikeRate: 140.2 },
    },
  ]


export default function Dashboard() {
  const overseasCount = team.filter((player) => player.type === "Overseas").length
  const battersCount = team.filter((player) => player.role === "Batter" || player.role === "Wicket-keeper").length
  const allRoundersCount = team.filter((player) => player.role === "All-rounder").length
  const bowlersCount = team.filter((player) => player.role === "Bowler").length

  return (
    <SidebarLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
         <div className="space-y-6">
      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.length}</div>
            <p className="text-xs text-muted-foreground">
              {battersCount} Batters • {allRoundersCount} All-rounders • {bowlersCount} Bowlers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹75Cr Used</div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">₹25Cr remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overseas Players</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overseasCount}/4</div>
            <p className="text-xs text-muted-foreground">{4 - overseasCount} slots remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Balance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5/10</div>
            <p className="text-xs text-muted-foreground">Excellent balance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Remaining Budget Pie Chart */}
        <div>
          <Card className="h-full">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <CardTitle>Current Team</CardTitle>
            </div>
            <CardDescription>Current team members we've picked up</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {team.map((player, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                <Avatar>
                  <AvatarImage src={player.image || "/placeholder.svg"} />
                  <AvatarFallback>
                    {player.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{player.name}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {player.role}
                    </Badge>
                    <Badge variant={player.type === "Overseas" ? "default" : "outline"} className="text-xs">
                      {player.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{player.position}</p>
                  {player.stats.runs && (
                    <p className="text-xs text-gray-600">
                      {player.stats.runs} runs • Avg: {player.stats.average} • SR: {player.stats.strikeRate}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        </div>
        <div>
        <Card>
          <CardHeader>
            <CardTitle>Budget Breakdown</CardTitle>
            <CardDescription>Remaining budget allocation for auction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Budget"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm">Used (₹75Cr)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-sm">Remaining (₹25Cr)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Composition by Role */}
        <Card>
          <CardHeader>
            <CardTitle>Team Composition</CardTitle>
            <CardDescription>Players distribution by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamComposition}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
      </motion.div>
    </SidebarLayout>
  )
}

    // {/* Team Organization by Batting Order */}
    //   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    //     {/* Top Order Batters */}
    //     <Card>
    //       <CardHeader>
    //         <div className="flex items-center space-x-2">
    //           <Shield className="h-5 w-5 text-green-600" />
    //           <CardTitle>Top Order</CardTitle>
    //         </div>
    //         <CardDescription>Openers and early batters</CardDescription>
    //       </CardHeader>
    //       <CardContent className="space-y-4">
    //         {teamByBattingOrder.topOrder.map((player, index) => (
    //           <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
    //             <Avatar>
    //               <AvatarImage src={player.image || "/placeholder.svg"} />
    //               <AvatarFallback>
    //                 {player.name
    //                   .split(" ")
    //                   .map((n) => n[0])
    //                   .join("")}
    //               </AvatarFallback>
    //             </Avatar>
    //             <div className="flex-1">
    //               <p className="font-medium text-sm">{player.name}</p>
    //               <div className="flex items-center space-x-2">
    //                 <Badge variant="secondary" className="text-xs">
    //                   {player.role}
    //                 </Badge>
    //                 <Badge variant={player.type === "Overseas" ? "default" : "outline"} className="text-xs">
    //                   {player.type}
    //                 </Badge>
    //               </div>
    //               <p className="text-xs text-muted-foreground">{player.position}</p>
    //               {player.stats.runs && (
    //                 <p className="text-xs text-gray-600">
    //                   {player.stats.runs} runs • Avg: {player.stats.average} • SR: {player.stats.strikeRate}
    //                 </p>
    //               )}
    //             </div>
    //           </div>
    //         ))}
    //       </CardContent>
    //     </Card>

    //     {/* Middle Order */}
    //     <Card>
    //       <CardHeader>
    //         <div className="flex items-center space-x-2">
    //           <Zap className="h-5 w-5 text-orange-600" />
    //           <CardTitle>Middle Order</CardTitle>
    //         </div>
    //         <CardDescription>Finishers and all-rounders</CardDescription>
    //       </CardHeader>
    //       <CardContent className="space-y-4">
    //         {teamByBattingOrder.middleOrder.map((player, index) => (
    //           <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
    //             <Avatar>
    //               <AvatarImage src={player.image || "/placeholder.svg"} />
    //               <AvatarFallback>
    //                 {player.name
    //                   .split(" ")
    //                   .map((n) => n[0])
    //                   .join("")}
    //               </AvatarFallback>
    //             </Avatar>
    //             <div className="flex-1">
    //               <p className="font-medium text-sm">{player.name}</p>
    //               <div className="flex items-center space-x-2">
    //                 <Badge variant="secondary" className="text-xs">
    //                   {player.role}
    //                 </Badge>
    //                 <Badge variant={player.type === "Overseas" ? "default" : "outline"} className="text-xs">
    //                   {player.type}
    //                 </Badge>
    //               </div>
    //               <p className="text-xs text-muted-foreground">{player.position}</p>
    //               {player.stats.runs && (
    //                 <p className="text-xs text-gray-600">
    //                   {player.stats.runs} runs • Avg: {player.stats.average} • SR: {player.stats.strikeRate}
    //                 </p>
    //               )}
    //             </div>
    //           </div>
    //         ))}
    //       </CardContent>
    //     </Card>

    //     {/* Bowlers */}
    //     <Card>
    //       <CardHeader>
    //         <div className="flex items-center space-x-2">
    //           <Target className="h-5 w-5 text-red-600" />
    //           <CardTitle>Bowling Attack</CardTitle>
    //         </div>
    //         <CardDescription>Fast bowlers and spinners</CardDescription>
    //       </CardHeader>
    //       <CardContent className="space-y-4">
    //         {teamByBattingOrder.bowlers.map((player, index) => (
    //           <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
    //             <Avatar>
    //               <AvatarImage src={player.image || "/placeholder.svg"} />
    //               <AvatarFallback>
    //                 {player.name
    //                   .split(" ")
    //                   .map((n) => n[0])
    //                   .join("")}
    //               </AvatarFallback>
    //             </Avatar>
    //             <div className="flex-1">
    //               <p className="font-medium text-sm">{player.name}</p>
    //               <div className="flex items-center space-x-2">
    //                 <Badge variant="secondary" className="text-xs">
    //                   {player.role}
    //                 </Badge>
    //                 <Badge variant={player.type === "Overseas" ? "default" : "outline"} className="text-xs">
    //                   {player.type}
    //                 </Badge>
    //               </div>
    //               <p className="text-xs text-muted-foreground">{player.position}</p>
    //               {player.stats.wickets && (
    //                 <p className="text-xs text-gray-600">
    //                   {player.stats.wickets} wickets • Eco: {player.stats.economy} • Avg: {player.stats.average}
    //                 </p>
    //               )}
    //             </div>
    //           </div>
    //         ))}
    //       </CardContent>
    //     </Card>
    //   </div>
