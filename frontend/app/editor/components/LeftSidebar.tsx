'use client'

import { 
  Brush, 
  Crop, 
  Eraser, 
  Type, 
  Droplets, 
  Square,
  Move,
  Eye
} from 'lucide-react'

interface LeftSidebarProps {
  selectedTool: string
  onToolSelect: (tool: string) => void
}

const tools = [
  { id: 'brush', icon: Brush, label: 'Brush' },
  { id: 'crop', icon: Crop, label: 'Crop' },
  { id: 'eraser', icon: Eraser, label: 'Eraser' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'fill', icon: Droplets, label: 'Fill' },
  { id: 'shape', icon: Square, label: 'Shape' },
  { id: 'move', icon: Move, label: 'Move' },
  { id: 'eyedropper', icon: Eye, label: 'Eyedropper' },
]

export default function LeftSidebar({ selectedTool, onToolSelect }: LeftSidebarProps) {
  return (
    <div className="w-20 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col items-center py-6 space-y-3 shadow-sm">
      {tools.map((tool) => {
        const Icon = tool.icon
        const isActive = selectedTool === tool.id
        
        return (
          <button
            key={tool.id}
            onClick={() => onToolSelect(tool.id)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 relative group ${
              isActive 
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-black shadow-lg scale-105' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 hover:shadow-md'
            }`}
            title={tool.label}
          >
            <Icon size={20} />
            {isActive && (
              <div className="absolute -right-1 -top-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white shadow-sm"></div>
            )}
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
              {tool.label}
            </div>
          </button>
        )
      })}
    </div>
  )
} 