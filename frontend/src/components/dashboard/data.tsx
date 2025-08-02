// src/pages/Dashboard/data.ts

import type { ReactElement } from 'react'
import { TrendingUp, PieChart, Timeline } from '@mui/icons-material'

export interface SimpleFeature {
  icon: ReactElement
  title: string
  description: string
}

export const featureData: SimpleFeature[] = [
  {
    icon: <TrendingUp sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />,
    title: 'Track Performance',
    description: 'Monitor gains and losses across your entire portfolio',
  },
  {
    icon: <PieChart sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />,
    title: 'Asset Allocation',
    description: 'Visualize how your investments are distributed',
  },
  {
    icon: <Timeline sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />,
    title: "Historical Charts",
    description: "View your portfolio's performance over time",
  },
]
