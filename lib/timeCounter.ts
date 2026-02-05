'use client'

import { useEffect, useState } from 'react'

function useCountdown(seconds: number) {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const m = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0')
  const s = Math.floor(timeLeft % 60)
    .toString()
    .padStart(2, '0')

  return `${m}:${s}`
}

export { useCountdown }
