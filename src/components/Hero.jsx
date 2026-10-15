import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const couple = ['/images/us-together.jpg', '/images/us-together-2.jpg']
import { Heart, Sparkles } from 'lucide-react'
import { START_DATE } from '../config'

function useElapsed() {
  const calc = () => {
    const diff = Math.max(0, Date.now() - new Date(START_DATE).getTime())
    return {
      days: Math.floor(diff / 864e5),
      hours: Math.floor(diff / 36e5) % 24,
      minutes: Math.floor(diff / 6e4) % 60,
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 15000)
    return () => clearInterval(id)
  }, [])
  return t
}

function Ambient() {
  const items = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 16,
        dur: 9 + Math.random() * 8,
        delay: Math.random() * 8,
        sparkle: i % 3 === 0,
      })),
    []
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((p) => {
        const Icon = p.sparkle ? Sparkles : Heart
        return (
          <motion.span
            key={p.id}
            className="absolute bottom-0 text-rose-400/60"
            style={{ left: `${p.left}%` }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: -700, opacity: [0, 0.8, 0], x: [0, 14, -14, 0] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
          >
            <Icon size={p.size} fill={p.sparkle ? 'none' : 'currentColor'} />
          </motion.span>
        )
      })}
    </div>
  )
}

const stagger = { show: { transition: { staggerChildren: 0.15 } } }
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } },
}

export default function Hero() {
  const { days, hours, minutes } = useElapsed()
  const [photo, setPhoto] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPhoto((p) => (p + 1) % couple.length), 5000)
    return () => clearInterval(id)
  }, [])
  return (
    <header className="relative min-h-[100svh] flex items-center">
      <Ambient />
      <motion.div variants={stagger} initial="hidden" animate="show" className="container-m relative pt-10 pb-6 text-center">
        <motion.div variants={rise} className="relative mx-auto mb-6 w-[78%]">
          <div className="relative rotate-1 rounded-sm bg-white p-2.5 pb-9 shadow-2xl shadow-rose-900/30">
            <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 bg-rose-200/80 shadow-sm" />
            <div
              className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden bg-rose-100"
              onClick={() => setPhoto((p) => (p + 1) % couple.length)}
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={couple[photo]}
                  src={couple[photo]}
                  alt="Sisi wawili"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </AnimatePresence>
            </div>

            <p className="absolute bottom-1.5 left-0 right-0 text-center font-script text-xl text-wine/80">
              Asia & Brayan 💞
            </p>
          </div>
          <motion.span
            className="absolute -right-3 -top-4 text-3xl"
            animate={{ scale: [1, 1.25, 1], rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            ❤️
          </motion.span>
        </motion.div>
        <motion.p variants={rise} className="font-script text-2xl text-rose-500">
          Kwako, Asia — Mama Riah wangu 💕
        </motion.p>

        <motion.h1 variants={rise} className="mt-2 font-serif text-3xl sm:text-4xl font-bold leading-tight">
          Kutoka Rafiki wa Moyo... Hadi Maisha Yangu Yote{' '}
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.3 }}
          >
            ❤️
          </motion.span>
        </motion.h1>

        <motion.div
          variants={rise}
          className="mt-6 glass mx-auto flex w-full items-center justify-between gap-1 rounded-full px-3 py-2.5 text-[11px] font-semibold sm:text-xs"
        >
          <span className="whitespace-nowrap">📍 Dodoma</span>
          <motion.span animate={{ x: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 2.2 }}>✈️</motion.span>
          <span className="text-rose-500">—</span>
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>❤️</motion.span>
          <span className="text-rose-500">—</span>
          <span className="whitespace-nowrap">📍 Dar es Salaam</span>
        </motion.div>
        <motion.p variants={rise} className="mt-4 text-base text-wine/85">
          Kilomita zaidi ya 450, lakini moyo wangu haujawahi kuwa mbali na wewe hata sekunde moja.
        </motion.p>
        <motion.p variants={rise} className="mt-2 text-sm text-wine/70 italic">
          Umbali wa Dodoma hadi Dar hauwezi kupunguza uzito wa kile ninachohisi kwako.
        </motion.p>

        <motion.div variants={rise} className="mt-6 glass rounded-3xl p-4">
          <p className="text-xs uppercase tracking-widest text-rose-500 font-semibold">
            Tumekuwa pamoja moyoni · Time together
          </p>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ['Siku', days],
              ['Masaa', hours],
              ['Dakika', minutes],
            ].map(([label, v]) => (
              <div key={label} className="rounded-2xl bg-rose-50 py-3">
                <div className="font-serif text-3xl font-bold">{v}</div>
                <div className="text-[11px] uppercase tracking-wide text-wine/70">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p variants={rise} className="mt-6 font-script text-2xl">
          Nakupenda zaidi kila kukicha
        </motion.p>
        <motion.div
          variants={rise}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="mt-8 text-sm text-rose-500"
        >
          Telezesha chini, mamaah ↓
        </motion.div>
      </motion.div>
    </header>
  )
}

