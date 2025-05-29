"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PositionAnalysisChartProps {
  data: Array<{
    position: string
    points: number
    potential: number
  }>
}

export function PositionAnalysisChart({ data }: PositionAnalysisChartProps) {
  return (
    <ChartContainer
      config={{
        points: {
          label: "Current Points",
          color: "hsl(var(--chart-1))",
        },
        potential: {
          label: "Potential Points",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="position" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="points" fill="var(--color-points)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="potential" fill="var(--color-potential)" radius={[4, 4, 0, 0]} opacity={0.6} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
