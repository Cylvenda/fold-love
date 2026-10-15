import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const cards = [
  {
    img: '/images/her-1.jpg',
    rot: '-rotate-1',
    tape: '-rotate-6',
    title: 'Tabasamu Lililoniteka',
    sw: 'Malkia wangu',
    text: 'The friend whose laugh used to brighten regular days, long before I knew I would fall in love with it. Kicheko chako kilikuwa jua la siku zangu za kawaida.',
  },
  {
    img: '/images/her-2.jpg',
    rot: 'rotate-2',
    tape: 'rotate-3',
    title: 'Faraja Katika Dhoruba',
    sw: 'Amani yangu',
    text: 'How we survived past heartbreaks together and found peace in each other’s honesty. Ulikuwa bega langu nilipovunjika, nami nikawa lako.',
  },
  {
    img: '/images/her-3.jpg',
    rot: '-rotate-2',
    tape: '-rotate-3',
    title: 'Malkia Unayeishikilia Dodoma Ukiwa Dar',
    sw: 'Uzuri usio na kifani',
    text: 'Your elegance undoes me. Every time I look at your photos, every kilometer between us disappears. Nakuona, na Dodoma inakuwa karibu na Dar.',
  },
  {
    img: '/images/her-4.jpg',
    rot: 'rotate-1',
    tape: 'rotate-6',
    title: 'Ahadi ya Kesho',
    sw: 'Kumbatio linakuja',
    text: 'Counting down until our next hug, when the screen calls turn into holding your hands. Siku hiyo inakuja, mpenzi.',
  },
]

function Polaroid({ src, rot, tape, caption }) {
  const [broken, setBroken] = useState(false)
  return (
    <div className={`relative bg-white p-3 pb-10 rounded-sm shadow-xl shadow-rose-900/20 ${rot}`}>
      <span className={`absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-20 bg-rose-200/80 ${tape} shadow-sm`} />
      <div className="aspect-[4/5] w-full overflow-hidden bg-rose-100">
        {broken ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-rose-100 to-rose-200 px-4 text-center text-rose-400">
            <Heart size={36} fill="currentColor" />
            <span className="font-script text-2xl text-wine/80">Malkia wangu 👑</span>
            <span className="text-[11px]">Weka picha yake hapa: <code>{src}</code></span>
          </div>
        ) : (
          <img
            src={src}
            alt={caption}
            loading="lazy"
            onError={() => setBroken(true)}
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>
      <p className="absolute bottom-2 left-0 right-0 px-2 text-center font-script text-xl text-wine/80">{caption}</p>
    </div>
  )
}

export default function SoloPhotoStory() {
  return (
    <section className="container-m py-14">
      <p className="section-title">Uzuri Wako &amp; Safari Yetu</p>
      <p className="mt-1 text-center text-sm italic text-wine/70">The girl who holds my whole heart from miles away</p>

      <div className="relative mt-10">
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-rose-300 to-transparent" />
        <div className="space-y-14">
          {cards.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 50, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 90, damping: 15 }}
              className="relative"
            >
              <div className="mx-auto w-[82%]">
                <Polaroid src={p.img} rot={p.rot} tape={p.tape} caption={p.sw} />
              </div>
              <div className="glass relative -mt-6 rounded-3xl p-5 text-center">
                <span className="inline-block rounded-full bg-rose-500 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
                  {i + 1} / {cards.length}
                </span>
                <h3 className="mt-2 font-serif text-xl font-bold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-wine/85">{p.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

