"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import {
  Star,
  TrendingUp,
  TrendingDown,
  MapPin,
  Calendar,
  Ruler,
  Activity,
  CheckCircle,
  Users,
  Building,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarLayout } from "@/components/sidebar-layout"


interface PlayerDashboardProps {
  player: any
}

export default function PlayerDashboard() {
    const player = {
        id: "1",
        name: "Virat Kohli",
        image: "/players/virat-kohli.jpg",
        role: "Batsman",
        type: "Overseas",
        status: "my-team",
        takenBy: "My Team",
        cost: 15,
        costGrowth: 10,
        personalData: {
        age: 34,
        birthPlace: "Delhi, India",
        height: "5'9\"",
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm medium",
        debut: "2008",
        },
        iplStats: {
        matches: 192,
        runs: 5878,
        average: 38.16,
        strikeRate: 130.41,
        fifties: 40,
        notOuts: 12,
        },
        t20Stats: {
        matches: 99,
        runs: 3159,
        average: 50.00,
        strikeRate: 140.74,
        fifties: 28,
        notOuts: 10,
        },
        battingRadar: [
        { subject: "Strike Rate", A: 130, B: 120 },
        { subject: "Average", A: 50, B: 45 },
        { subject: "Fifties Rate", A: 60, B: 55 },
        { subject: "Boundary %", A: 35, B: 30 },
        { subject: "Runs", A: 5878, B: 5000 },
        { subject: "Not Outs", A: 12, B: 10 },
        ],
        bowlingRadar: [
        { subject: "Wickets", A: 100, B: 90 },
        { subject: "Economy", A: 7.5, B: 8.0 },
        { subject: "Average", A: 25, B: 30 },
        { subject: "Strike Rate", A: 18, B: 20 },
        ],
        yearlyData:
        [
            { year:"2018",iplRuns:"500",t20Runs:"400",wickets:"20" ,cost:"10"},
            { year:"2019",iplRuns:"600",t20Runs:"500",wickets:"25" ,cost:"12"},
            { year:"2020",iplRuns:"700",t20Runs:"600",wickets:"30" ,cost:"14"},
            { year:"2021",iplRuns:"800",t20Runs:"700",wickets:"35" ,cost:"16"},
            { year:"2022",iplRuns:"900",t20Runs:"800",wickets:"40" ,cost:"18"},
            { year:"2023",iplRuns:"1000",t20Runs:"900",wickets:"45" ,cost:"20"},
        ],
    }

  const getStatusBadge = (player: any) => {
    switch (player.status) {
      case "my-team":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <CheckCircle className="h-4 w-4 mr-1" />
            My Team
          </Badge>
        )
      case "other-team":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <Building className="h-4 w-4 mr-1" />
            {player.takenBy}
          </Badge>
        )
      case "available":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Users className="h-4 w-4 mr-1" />
            Available
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <SidebarLayout>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Player Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Avatar className="h-24 w-24 lg:h-32 lg:w-32">
                  <AvatarImage src={player.image || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {player.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl lg:text-3xl">{player.name}</CardTitle>
                    <CardDescription className="text-lg mt-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className="text-sm">
                          {player.role}
                        </Badge>
                        <Badge variant={player.type === "Overseas" ? "default" : "outline"} className="text-sm">
                          {player.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">{getStatusBadge(player)}</div>
                    </CardDescription>
                  </div>
                  <div className="text-right mt-4 sm:mt-0">
                    <div className="text-2xl font-bold">₹{player.cost}Cr</div>
                    <div className="flex items-center justify-end space-x-1">
                      {player.costGrowth > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm ${player.costGrowth > 0 ? "text-green-500" : "text-red-500"}`}>
                        {player.costGrowth}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mb-4">
                  <Button></Button>
                </div>

                {/* Personal Data */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-gray-600">Age</p>
                      <p className="font-medium">{player.personalData.age}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-gray-600">Birth Place</p>
                      <p className="font-medium">{player.personalData.birthPlace}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Ruler className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-gray-600">Height</p>
                      <p className="font-medium">{player.personalData.height}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-gray-600">Batting Style</p>
                      <p className="font-medium">{player.personalData.battingStyle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-gray-600">Bowling Style</p>
                      <p className="font-medium">{player.personalData.bowlingStyle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-gray-600">Debut</p>
                      <p className="font-medium">{player.personalData.debut}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Analytics Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* IPL vs T20 Comparison */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="h-full ">
                <CardHeader>
                  <CardTitle>IPL vs T20 International Comparison</CardTitle>
                  <CardDescription>Performance comparison across formats</CardDescription>
                </CardHeader>
                <CardContent className=" h-full">
                  <div className="grid grid-cols-1 gap-8 ">
                    {/* IPL Stats */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="space-y-4 w-full"
                    >
                      <h3 className="font-semibold text-lg flex items-center">
                        <Star className="h-5 w-5 text-blue-600 mr-2" />
                        IPL Statistics
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Matches</p>
                          <p className="text-2xl font-bold text-blue-600">{player.iplStats.matches}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Runs</p>
                          <p className="text-2xl font-bold text-blue-600">{player.iplStats.runs}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Average</p>
                          <p className="text-2xl font-bold text-blue-600">{player.iplStats.average}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Strike Rate</p>
                          <p className="text-2xl font-bold text-blue-600">{player.iplStats.strikeRate}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Fifties</p>
                          <p className="text-2xl font-bold text-blue-600">{player.iplStats.fifties}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Not Outs</p>
                          <p className="text-2xl font-bold text-blue-600">{player.iplStats.notOuts}</p>
                        </div>  
                         <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Not Outs</p>
                          <p className="text-2xl font-bold text-blue-600">{player.iplStats.notOuts}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Not Outs</p>
                          <p className="text-2xl font-bold text-blue-600">{player.iplStats.notOuts}</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* T20 Stats */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="space-y-4"
                    >
                      <h3 className="font-semibold text-lg flex items-center">
                        <Star className="h-5 w-5 text-green-600 mr-2" />
                        T20 International Statistics
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">Matches</p>
                          <p className="text-2xl font-bold text-green-600">{player.t20Stats.matches}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">Runs</p>
                          <p className="text-2xl font-bold text-green-600">{player.t20Stats.runs}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">Average</p>
                          <p className="text-2xl font-bold text-green-600">{player.t20Stats.average}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">Strike Rate</p>
                          <p className="text-2xl font-bold text-green-600">{player.t20Stats.strikeRate}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">Fifties</p>
                          <p className="text-2xl font-bold text-green-600">{player.t20Stats.fifties}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">Not Outs</p>
                          <p className="text-2xl font-bold text-green-600">{player.t20Stats.notOuts}</p>
                        </div>
                          <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">Not Outs</p>
                          <p className="text-2xl font-bold text-green-600">{player.t20Stats.notOuts}</p>
                        </div>
                          <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">Not Outs</p>
                          <p className="text-2xl font-bold text-green-600">{player.t20Stats.notOuts}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
        
            {/* Cost Growth */}
            <div className="grid grid-cols-1 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Player Cost Growth</CardTitle>
                  <CardDescription>Market value progression over years</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={player.yearlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${value}Cr`, "Cost"]} />
                        <Bar dataKey="cost" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Market Value</span>
                      <span className="text-lg font-bold">₹{player.cost}Cr</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">Growth Rate</span>
                      <div className="flex items-center">
                        {player.costGrowth > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`font-medium ${player.costGrowth > 0 ? "text-green-500" : "text-red-500"}`}>
                          {player.costGrowth}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
                  {/* Yearly Performance */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Yearly Runs & Wickets</CardTitle>
                  <CardDescription>Performance trends over the years</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={player.yearlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="iplRuns" stroke="#3b82f6" name="IPL Runs" strokeWidth={2} />
                        <Line type="monotone" dataKey="t20Runs" stroke="#10b981" name="T20I Runs" strokeWidth={2} />
                        <Line type="monotone" dataKey="wickets" stroke="#ef4444" name="Wickets" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            </div>

            {/* Tabs for Analytics */}
          {/* Batting Radar Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Batting Performance Radar</CardTitle>
                  <CardDescription>Strike rate, average, 50s rate, boundary %, runs, not outs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={player.battingRadar}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={90} domain={[0, "dataMax"]} />
                        <Radar
                          name="Batting Performance"
                          dataKey="A"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          {/* Bowling Radar Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Bowling Performance Radar</CardTitle>
                  <CardDescription>Wickets, economy, average, strike rate analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={player.bowlingRadar}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={90} domain={[0, "dataMax"]} />
                        <Radar
                          name="Bowling Performance"
                          dataKey="A"
                          stroke="#ef4444"
                          fill="#ef4444"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            </div>  
      </motion.div>
    </motion.div>
    </SidebarLayout>
  )
}
