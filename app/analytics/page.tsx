"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Target, Users, Trophy, Activity } from "lucide-react"
import { TeamPerformanceChart } from "@/components/team-performance-chart"
import { PositionAnalysisChart } from "@/components/position-analysis-chart"
import { PerformanceHeatmap } from "@/components/performance-heatmap"
import { SidebarLayout } from "@/components/sidebar-layout"

const performanceData = [
  { week: "Week 1", points: 65, average: 58 },
  { week: "Week 2", points: 72, average: 61 },
  { week: "Week 3", points: 58, average: 59 },
  { week: "Week 4", points: 81, average: 62 },
  { week: "Week 5", points: 69, average: 60 },
  { week: "Week 6", points: 77, average: 63 },
  { week: "Week 7", points: 84, average: 64 },
  { week: "Week 8", points: 71, average: 61 },
]

const positionData = [
  { position: "Forwards", points: 245, potential: 280 },
  { position: "Midfielders", points: 198, potential: 220 },
  { position: "Defenders", points: 156, potential: 170 },
  { position: "Goalkeepers", points: 89, potential: 95 },
]

const topPerformers = [
  { name: "Lionel Messi", position: "Forward", points: 245, change: "+15%" },
  { name: "Kevin De Bruyne", position: "Midfielder", points: 198, change: "+8%" },
  { name: "Erling Haaland", position: "Forward", points: 289, change: "+22%" },
  { name: "Virgil van Dijk", position: "Defender", points: 156, change: "+12%" },
]

const teamStats = {
  totalPoints: 1247,
  averagePoints: 69.3,
  rank: 1247,
  totalPlayers: 156789,
  weeklyChange: "+12.5%",
}

export default function AnalyticsPage() {
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
              <h1 className="text-3xl font-bold tracking-tight">Team Performance Analytics</h1>
              <p className="text-muted-foreground">Comprehensive insights into your team's performance</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                  <Trophy className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teamStats.totalPoints}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{teamStats.weeklyChange}</span> from last week
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Points</CardTitle>
                  <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teamStats.averagePoints}</div>
                  <p className="text-xs text-muted-foreground">Per gameweek</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
                  <Target className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teamStats.rank.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Out of {teamStats.totalPlayers.toLocaleString()} players
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Value</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$98.5M</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+$2.3M</span> this week
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Performance Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Points Over Time</CardTitle>
                <CardDescription>Your team's performance compared to average</CardDescription>
              </CardHeader>
              <CardContent>
                <TeamPerformanceChart data={performanceData} />
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Position Analysis */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Position-Based Analysis</CardTitle>
                  <CardDescription>Performance breakdown by position</CardDescription>
                </CardHeader>
                <CardContent>
                  <PositionAnalysisChart data={positionData} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Performers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>Your highest scoring players</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topPerformers.map((player, index) => (
                    <motion.div
                      key={player.name}
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
                        <p className="font-semibold">{player.points} pts</p>
                        <Badge
                          variant={player.change.startsWith("+") ? "default" : "destructive"}
                          className={
                            player.change.startsWith("+")
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : ""
                          }
                        >
                          {player.change.startsWith("+") ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {player.change}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Performance Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Strengths & Weaknesses Heatmap</CardTitle>
                <CardDescription>
                  Visual representation of your team's performance across different metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceHeatmap />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </SidebarLayout>
  )
}
