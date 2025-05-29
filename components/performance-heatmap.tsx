"use client"

import { motion } from "framer-motion"

const heatmapData = [
  { category: "Attack", strength: 85, weakness: 15 },
  { category: "Midfield", strength: 72, weakness: 28 },
  { category: "Defense", strength: 68, weakness: 32 },
  { category: "Goalkeeping", strength: 91, weakness: 9 },
  { category: "Set Pieces", strength: 79, weakness: 21 },
  { category: "Consistency", strength: 76, weakness: 24 },
]

export function PerformanceHeatmap() {
  return (
    <div className="space-y-4">
      {heatmapData.map((item, index) => (
        <motion.div
          key={item.category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">{item.category}</span>
            <span className="text-sm text-muted-foreground">{item.strength}%</span>
          </div>
          <div className="relative h-6 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.strength}%` }}
              transition={{ duration: 1, delay: 0.2 * index }}
              className={`h-full rounded-full ${
                item.strength >= 80 ? "bg-green-500" : item.strength >= 60 ? "bg-yellow-500" : "bg-red-500"
              }`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
