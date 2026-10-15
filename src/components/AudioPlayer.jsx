import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music2, Pause } from 'lucide-react'
import { AUDIO_SRC } from '../config'

const MAX_VOL = 0.7

export default function AudioPlayer() {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [everPlayed, setEverPlayed] = useState(false)
  const [error, setError] = useState(false)

  const fadeTo = (target, onDone) => {
    const a = audioRef.current
    clearInterval(fadeRef.current)
    fadeRef.current = setInterval(() => {
      const step = target > a.volume ? 0.05 : -0.05
      const next = Math.min(1, Math.max(0, a.volume + step))
      a.volume = next
      if (Math.abs(next - target) < 0.051) {
        a.volume = target
        clearInterval(fadeRef.current)
        onDone?.()
      }
    }, 80)
  }

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      setPlaying(false)
      fadeTo(0, () => a.pause())
    } else {
      try {
        a.volume = 0
        await a.play()
        setPlaying(true)
        setEverPlayed(true)
        setError(false)
        fadeTo(MAX_VOL)
      } catch {
        setError(true)
      }
    }
  }

  useEffect(() => () => clearInterval(fadeRef.current), [])

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="none" onError={() => setError(true)} />
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.93 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        aria-label={playing ? 'Pause song' : 'Play our song'}
        className="fixed top-3 right-3 z-40 flex items-center gap-2 rounded-full glass pl-1.5 pr-3 py-1.5 max-w-[78vw]"
      >
        <span className="relative shrink-0">
          {!playing && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500" />
            </span>
          )}
          <motion.span
            animate={{ rotate: playing ? 360 : 0 }}
            transition={playing ? { repeat: Infinity, duration: 3, ease: 'linear' } : { duration: 0.4 }}
            className="vinyl flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-rose-300"
          >
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500">
              <span className="h-1 w-1 rounded-full bg-cream" />
            </span>
          </motion.span>
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={playing ? 'p' : error ? 'e' : everPlayed ? 'r' : 'i'}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="flex items-center gap-1 text-[11px] font-semibold leading-tight text-wine"
          >
            {playing ? <Pause size={13} /> : <Music2 size={13} />}
            {playing
              ? 'Inacheza… gusa kusimamisha'
              : error
              ? 'Weka /audio/our-song.mp3'
              : everPlayed
              ? 'Endelea kusikiliza'
              : '🎵 Gusa hapa kusikiliza wimbo wetu'}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  )
}

