"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface TeamPerformanceChartProps {
  data: Array<{
    week: string
    points: number
    average: number
  }>
}

export function TeamPerformanceChart({ data }: TeamPerformanceChartProps) {
  return (
    <ChartContainer
      config={{
        points: {
          label: "Your Points",
          color: "hsl(var(--chart-1))",
        },
        average: {
          label: "Average Points",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="points"
            stroke="var(--color-points)"
            strokeWidth={3}
            dot={{ fill: "var(--color-points)", strokeWidth: 2, r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="average"
            stroke="var(--color-average)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: "var(--color-average)", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
