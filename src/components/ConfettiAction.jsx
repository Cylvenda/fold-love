import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const quips = [
  'Wapi! Dodoma haikubali jibu hilo 😂❤️',
  'Kitufe kimekimbia Dar kwa basi! 🚌💨',
  'Nope! Jaribu tena… au bonyeza NDIYO 😏',
  'Hata Dodoma inajua jibu sahihi 😂',
  'Kimbia kimbia, lakini NDIYO iko hapa 💕',
]

function burst() {
  const end = Date.now() + 2500
  const colors = ['#f43f5e', '#881337', '#fda4af', '#fff1f2', '#fbbf24']
  confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 }, colors })
  ;(function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.8 }, colors })
    confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.8 }, colors })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

export default function ConfettiAction() {
  const [yes, setYes] = useState(false)
  const [pos, setPos] = useState(null) // null = in-flow
  const [toast, setToast] = useState('')
  const count = useRef(0)
  const timer = useRef(null)

  const onYes = () => {
    setYes(true)
    burst()
    navigator.vibrate?.([60, 40, 60])
  }

  const dodge = (e) => {
    e?.preventDefault?.()
    const w = 110, h = 52, pad = 12
    const x = pad + Math.random() * (window.innerWidth - w - pad * 2)
    const y = pad + Math.random() * (window.innerHeight - h - pad * 2)
    setPos({ x, y })
    setToast(quips[count.current++ % quips.length])
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(''), 2200)
    navigator.vibrate?.(30)
  }

  return (
    <section className="container-m py-16 pb-32 text-center">
      <p className="section-title">Je, Utanipenda Zaidi ya Jana?</p>
      <p className="mt-2 text-sm text-wine/75 italic">Will you love me more than yesterday?</p>

      <div className="mt-8 flex items-center justify-center gap-4 min-h-[56px]">
        <motion.button
          onClick={onYes}
          whileTap={{ scale: 0.92 }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="btn-rose text-base"
        >
          NDIYO / 1000x YES! 💖
        </motion.button>

        <div className="relative h-[52px] w-[110px]">
          <motion.button
            onPointerEnter={dodge}
            onClick={dodge}
            onTouchStart={dodge}
            animate={pos ? { left: pos.x, top: pos.y } : {}}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            style={pos ? { position: 'fixed', left: pos.x, top: pos.y, zIndex: 45 } : {}}
            className="rounded-2xl border border-rose-300 bg-white/80 px-5 py-3.5 text-sm font-semibold text-wine shadow"
          >
            Hapana / No
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-20 left-1/2 z-[60] w-[88%] max-w-sm -translate-x-1/2 rounded-2xl bg-wine px-4 py-3 text-center text-sm font-medium text-white shadow-xl"
            role="alert"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {yes && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-wine/50 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setYes(false)}
          >
            <motion.div
              initial={{ scale: 0.4, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
              className="glass w-full max-w-sm rounded-3xl bg-white/90 p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-6xl">
                ❤️
              </motion.div>
              <h3 className="mt-4 font-script text-3xl leading-snug">
                Asia wangu, umechagua kupendwa maisha yako yote! Distance will soon be history ❤️
              </h3>
              <p className="mt-3 text-sm text-wine/80">You just made me the happiest person alive. Nakupenda sana, mamaah. — Brayan</p>
              <div className="mt-6 flex gap-2 justify-center">
                <button className="btn-rose !py-2.5 text-sm" onClick={burst}>Mlipuko tena 🎉</button>
                <button className="rounded-2xl border border-rose-300 px-4 py-2.5 text-sm font-semibold" onClick={() => setYes(false)}>
                  Funga
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

