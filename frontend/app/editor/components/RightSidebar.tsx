'use client'

import { useState } from 'react'
import { X, Sliders, Palette, Sun, Zap, Sparkles } from 'lucide-react'

interface RightSidebarProps {
  onEffectApply: (effect: string, value: number) => void
  onClose?: () => void
}

interface Effect {
  id: string
  name: string
  icon: any
  min: number
  max: number
  defaultValue: number
  step: number
  unit: string
}

const effects: Effect[] = [
  { id: 'brightness', name: 'Brightness', icon: Sun, min: -100, max: 100, defaultValue: 0, step: 1, unit: '' },
  { id: 'contrast', name: 'Contrast', icon: Sliders, min: -100, max: 100, defaultValue: 0, step: 1, unit: '' },
  { id: 'saturation', name: 'Saturation', icon: Palette, min: -100, max: 100, defaultValue: 0, step: 1, unit: '' },
  { id: 'blur', name: 'Blur', icon: Zap, min: 0, max: 20, defaultValue: 0, step: 0.1, unit: 'px' },
  { id: 'sharpen', name: 'Sharpen', icon: Sparkles, min: 0, max: 100, defaultValue: 0, step: 1, unit: '' },
]

export default function RightSidebar({ onEffectApply, onClose }: RightSidebarProps) {
  const [effectValues, setEffectValues] = useState<Record<string, number>>(
    effects.reduce((acc, effect) => ({ ...acc, [effect.id]: effect.defaultValue }), {})
  )

  const handleEffectChange = (effectId: string, value: number) => {
    setEffectValues(prev => ({ ...prev, [effectId]: value }))
    onEffectApply(effectId, value)
  }

  const resetEffect = (effectId: string) => {
    const effect = effects.find(e => e.id === effectId)
    if (effect) {
      handleEffectChange(effectId, effect.defaultValue)
    }
  }

  const resetAllEffects = () => {
    effects.forEach(effect => {
      handleEffectChange(effect.id, effect.defaultValue)
    })
  }

  return (
    <div className="w-full h-full bg-white/95 backdrop-blur-xl border-l border-gray-200/50 flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-xl flex items-center justify-center shadow-lg">
              <Sliders size={20} className="text-black" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
              <p className="text-gray-500 text-sm">Adjust image effects</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 text-gray-500 hover:text-gray-700 rounded-xl transition-all duration-200"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Effects */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Effects</h4>
              <button
              onClick={resetAllEffects}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
              Reset All
              </button>
                  </div>
          
          {effects.map((effect) => {
            const Icon = effect.icon
            const value = effectValues[effect.id]
            const isDefault = value === effect.defaultValue
            
            return (
              <div key={effect.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{effect.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 font-mono">
                      {value}{effect.unit}
                    </span>
                    {!isDefault && (
                      <button
                        onClick={() => resetEffect(effect.id)}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                    <input
                      type="range"
                    min={effect.min}
                    max={effect.max}
                    step={effect.step}
                    value={value}
                    onChange={(e) => handleEffectChange(effect.id, parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${((value - effect.min) / (effect.max - effect.min)) * 100}%, #e5e7eb ${((value - effect.min) / (effect.max - effect.min)) * 100}%, #e5e7eb 100%)`
                    }}
                    />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{effect.min}{effect.unit}</span>
                    <span>{effect.max}{effect.unit}</span>
                  </div>
                </div>
            </div>
            )
          })}
          </div>

        {/* Quick Presets */}
          <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Quick Presets</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Vintage', icon: '🎞️' },
              { name: 'Warm', icon: '🌅' },
              { name: 'Cool', icon: '❄️' },
              { name: 'Dramatic', icon: '🎭' }
            ].map((preset) => (
              <button
                key={preset.name}
                className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-sm text-left"
              >
                <div className="text-lg mb-1">{preset.icon}</div>
                <div className="text-xs font-medium text-gray-900">{preset.name}</div>
              </button>
            ))}
                  </div>
                  </div>
                </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200/50">
        <button
          onClick={resetAllEffects}
          className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 font-medium"
        >
          Reset All Effects
        </button>
      </div>
    </div>
  )
} 