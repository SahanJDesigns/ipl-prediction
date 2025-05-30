"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Users, DollarSign, Globe, TrendingUp, Shield, Zap, Target } from "lucide-react"
import { motion } from "framer-motion"
import {SidebarLayout} from "@/components/sidebar-layout"


const teamComposition = [
  { category: "Batters", count: 7, color: "#10b981" },
  { category: "All-rounders", count: 4, color: "#f59e0b" },
  { category: "Bowlers", count: 8, color: "#ef4444" },
  { category: "Wicket-keepers", count: 2, color: "#8b5cf6" },
]

// Current team members organized by batting order
const team = [
  {
    "name": "Devon Conway",
    "role": "Wicketkeeper Batter",
    "type": "indian",
    "position": "Opener",
    "image": "",
    "number": 88,
    "stats": { "runs": 1500, "average": 45.2, "strikeRate": 135.4 }
  },
  {
    "name": "KL Rahul",
    "role": "Wicketkeeper Batter",
    "type": "indian",
    "position": "Opener",
    "image": "",
    "number": 1,
    "stats": { "runs": 4300, "average": 41.2, "strikeRate": 137.1 }
  },
  {
    "name": "Rachin Ravindra",
    "role": "Allrounder",
    "type": " Overseas",
    "position": "Top Order",
    "image": "",
    "number": 8,
    "stats": { "runs": 1100, "average": 33.5, "strikeRate": 130.7 }
  },
  {
    "name": "Mitchell Marsh",
    "role": "Allrounder",
    "type": "indian",
    "position": "No. 3/4",
    "image": "",
    "number": 4,
    "stats": { "runs": 1900, "average": 30.4, "strikeRate": 142.3 }
  },
  {
    "name": "Glenn Phillips",
    "role": "Batter",
    "type": "Overseas",
    "position": "Finisher",
    "image": "",
    "number": 29,
    "stats": { "runs": 1600, "average": 34.8, "strikeRate": 148.2 }
  },
  {
    "name": "Liam Livingstone",
    "role": "Allrounder",
    "type": "indian",
    "position": "Middle Order",
    "image": "",
    "number": 23,
    "stats": { "runs": 1200, "average": 29.3, "strikeRate": 152.6 }
  },
  ]


export default function Dashboard() {
  const overseasCount = team.filter((player) => player.type === "Overseas").length
  const battersCount = team.filter((player) => player.role === "Batter" || player.role === "Wicket-keeper").length
  const allRoundersCount = team.filter((player) => player.role === "All-rounder").length
  const bowlersCount = team.filter((player) => player.role === "Bowler").length
  const budgetData = [
    { name: "Used", value: 75, color: "#3b82f6" },
    { name: "Remaining", value: 25, color: "#d1d5db" },
  ]

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
            <div className="text-2xl font-bold">19</div>
            <p className="text-xs text-muted-foreground">
              7 Batters • 4 All-rounders • 8 Bowlers
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
            <div className="text-2xl font-bold">{overseasCount}/8</div>
            <p className="text-xs text-muted-foreground">{8 - overseasCount} slots remaining</p>
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
        <Card >
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
