import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gem, Phone, Hourglass, Sunrise } from 'lucide-react'

const reasons = [
  { icon: Gem, title: 'Moyo Wako Safi', text: 'How genuine and rare your character is.', back: 'Nimekutana na watu wengi, lakini moyo kama wako ni nadra kuupata.' },
  { icon: Phone, title: 'Sauti Yako', text: 'My daily medicine every time my phone rings.', back: 'Simu yako inapoita, siku yangu inapona.' },
  { icon: Hourglass, title: 'Uvumilivu Wako', text: 'The strength we share holding each other up across regions.', back: 'Dodoma na Dar, lakini tunashikana kila siku.' },
  { icon: Sunrise, title: 'Mustakabali Wetu', text: 'The certainty that waiting for you is worth every single second.', back: 'Kukusubiri ni heshima. Kila sekunde inastahili.' },
]

function FlipCard({ r }) {
  const [flipped, setFlipped] = useState(false)
  const Icon = r.icon
  return (
    <div className="flip-3d snap-center shrink-0 w-64 min-w-[16rem] h-64" onClick={() => setFlipped((f) => !f)}>
      <motion.div
        className="flip-inner relative h-full w-full cursor-pointer"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="flip-face glass absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-5 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-wine text-white">
            <Icon size={26} />
          </span>
          <h3 className="mt-3 font-script text-3xl">{r.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-wine/85">{r.text}</p>
          <span className="mt-3 text-[11px] text-rose-500">Gusa kugeuza ↻</span>
        </div>
        <div
          className="flip-face absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-to-br from-rose-500 to-wine p-6 text-center text-white shadow-lg"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <p className="font-script text-2xl leading-snug">{r.back} ❤️</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function ReasonsDeck() {
  return (
    <section className="py-14">
      <div className="container-m">
        <p className="section-title">Kwanini Nakupenda Zaidi Kila Siku</p>
        <p className="text-center text-sm text-wine/70 mt-1">Telezesha → na gusa kadi</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="no-scrollbar mx-auto mt-6 flex w-full max-w-md snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50%-8rem)] pb-4"
      >
        {reasons.map((r) => (
          <FlipCard key={r.title} r={r} />
        ))}
      </motion.div>
    </section>
  )
}
