import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

export default function TypewriterInput({ label, value, onChange, isLoading }: TypewriterInputProps) {
  const [displayedLabel, setDisplayedLabel] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayedLabel(label.substring(0, i))
      i++
      if (i > label.length) clearInterval(interval)
    }, 50)
    return () => clearInterval(interval)
  }, [label])

  return (
    <div className="space-y-2">
      <motion.label
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="block text-sm font-medium text-gray-700"
      >
        {displayedLabel}
      </motion.label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        placeholder={isLoading ? "Generating..." : label}
        disabled={isLoading}
      />
    </div>
  )
}
