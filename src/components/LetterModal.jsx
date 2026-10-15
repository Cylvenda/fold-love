import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, X } from 'lucide-react'

export default function LetterModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Fungua barua"
        className="fixed bottom-5 left-1/2 z-30 -translate-x-1/2 flex items-center gap-2 rounded-full glass pl-2 pr-4 py-2"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-wine text-white shadow-inner">
          <Mail size={18} />
          <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-wine ring-2 ring-white text-[8px] flex items-center justify-center">❤</span>
        </span>
        <span className="text-xs font-semibold text-wine">Fungua barua yangu</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-wine/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: '100%', scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              className="parchment relative h-full w-full overflow-y-auto sm:h-[90vh] sm:max-w-md sm:rounded-3xl shadow-2xl"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Funga"
                className="sticky top-3 float-right mr-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-wine text-white shadow-lg"
              >
                <X size={20} />
              </button>
              <div className="px-7 pb-16 pt-10 text-[#4a2a1a]">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-wine text-xl text-white shadow-lg">❤</div>
                <h2 className="text-center font-script text-3xl text-wine">Barua Kutoka Dodoma Hadi Dar</h2>
                <div className="mt-6 space-y-4 font-serif text-[15px] leading-relaxed">
                  <p className="font-script text-2xl">Mamaah wangu Asia, Mama Riah,</p>
                  <p>
                    Tulianza kama marafiki — vicheko, ushauri, na maongezi ya usiku wa manane. Tulishikana mikono kupitia maumivu ya mahusiano yaliyopita, bila kujua kwamba tulikuwa tunajifunza kupendana.
                  </p>
                  <p>
                    We healed side by side. You never judged my broken pieces, and I never stopped believing in yours. Somewhere between those honest conversations, my heart quietly chose you.
                  </p>
                  <p>
                    Najua umbali huu si rahisi. Usiku mrefu, simu zinazokatika, na kumbatio linalosubiri. Lakini umbali wa Dodoma hadi Dar hauwezi kupunguza uzito wa kile ninachohisi kwako.
                  </p>
                  <p>
                    I promise you this: my loyalty does not weaken with every kilometer. I will keep choosing you, trusting you, and showing up, whether it is a call at midnight or a message at sunrise. Past breakups taught me what to run from; you taught me what to stay for.
                  </p>
                  <p>
                    Niruhusu nikupende zaidi kila siku, na uniruhusu nipendwe na wewe kwa undani zaidi. Siku moja tutacheka kuhusu umbali huu tukiwa mikono kwa mikono. Hadi siku hiyo — nakusubiri, na nakupenda.
                  </p>
                  <p className="pt-2 text-right font-script text-2xl text-wine">Wako daima, Brayan ❤️</p>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

