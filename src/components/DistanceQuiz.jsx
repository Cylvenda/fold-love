import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Heart } from 'lucide-react'
import { sendAnswers } from '../lib/sendAnswers'

const questions = [
  {
    q: 'Kwenye maongezi yetu ya usiku mwingi tukiwa marafiki tu, ni siku gani ulihisi huyu mtu ameanza kuingia moyoni?',
    options: [
      ['Tulipocheka hadi usiku sana', 'Kicheko kile cha usiku kilikuwa mwanzo wa kila kitu. Nilitamani simu isikatike. 🌙😂'],
      ['Uliponijali bila sababu', 'Wema wako usio na masharti ndio uliofungua moyo wangu. Asante kwa kunijali.'],
      ['I just felt it quietly ❤️', 'Some things the heart simply knows. Moyo wangu ulijua kabla akili yangu kukubali.'],
    ],
  },
  {
    q: 'What’s your favorite thing about us?',
    note: 'Kile kitu kinacho kukosha zaid kuhusu sisi wawili?',
    options: [
      ['Your voice calming my whole day', 'And mine is calmest when it is saying your name. Sauti yako ni makazi yangu.'],
      ['The laughs that come out of nowhere', 'Hata kupitia simu, kicheko chako kinavuka kilomita zote 450. 😄'],
      ['Falling asleep while we’re still on the line', 'Nakusikiliza ukipumua, na naamini kesho itakuwa nzuri. 💤'],
    ],
  },
  {
    q: 'Kama ungepata nafasi ya kupunguza huu umbali kwa siku moja tu leo, ungetaka tufanye nini cha kwanza?',
    options: [
      [
        'Just a long, tight hug where nobody speaks a word.',
        'Kumbatio refu, kimya, ambapo mioyo yetu inasema kila kitu. Hiyo siku inakuja. 🤍',
      ],
    ],
  },
  {
    q: 'What is one habit of mine that makes you feel loved even through the phone screen?',
    options: [
      ['The “good morning” texts', 'Nitakuandikia kila asubuhi, hadi tutakapoamka pamoja. ☀️'],
      ['How I always pick up your call', 'Kwa sababu simu yako ndiyo wimbo ninaoupenda zaidi. 📞'],
      ['How I really listen to you', 'Nakusikiliza kwa moyo wote, kila neno, kila pumzi. 💞'],
    ],
  },
  {
    q: 'Je, unajua jinsi ninavyojivunia kuwa na wewe kando yangu licha ya umbali huu?',
    options: [
      [
        'Gusa kujua ❤️',
        'Distance is just a test of time, but what we share is built for a lifetime. Nakupenda sana.',
      ],
    ],
  },
  {
    q: 'Will you promise to keep choosing me, trusting me, and loving me deeper kila siku?',
    options: [
      ['Daima / Always', 'Daima. Nami nakuahidi vivyo hivyo, leo na kila siku. 🤝❤️'],
      ['Milele na Milele / Forever & Ever', 'Milele na milele. Umbali utaisha, lakini upendo huu hautaisha. 💞'],
    ],
  },
  {
    q: 'Je, ni kitu gani kidogo kuhusu mimi unachokikumbuka unapokuwa peke yako?',
    options: [
      ['Kicheko changu', 'Nakusikia ukicheka hata ukiwa mbali, na moyo wangu unatabasamu. 😊'],
      ['Maneno yangu ya faraja', 'Nitaendelea kukupa maneno ya amani kila siku. 🤍'],
      ['Jinsi ninavyokuita', 'Jina lako kwenye mdomo wangu ni wimbo mtamu. 🎶'],
    ],
  },
  {
    q: 'What is the one thing you wish I knew about how you love?',
    note: 'Ni kitu gani ungependa nijue kuhusu jinsi unavyopenda?',
    options: [
      ['I love quietly but deeply', 'Napenda upendo wa kimya unaokaa moyoni milele. Nauelewa. 🤫❤️'],
      ['I need reassurance sometimes', 'Nitakuhakikishia kila siku — hauko peke yako, kamwe. 🫶'],
      ['I love with my whole heart', 'Na ndiyo maana moyo wako ni salama kwangu. 💖'],
    ],
  },
  {
    q: 'Ni wimbo gani ukiusikia unanikumbuka moja kwa moja?',
    options: [
      ['Wimbo wetu wa kwanza', 'Kila wimbo unakuwa mtamu zaidi ukiwa unanikumbusha wewe. 🎵'],
      ['Nyimbo za mapenzi za taratibu', 'Siku moja tutacheza nyimbo hizo pamoja, polepole. 💃🕺'],
      ['Wimbo wowote, ni wewe tu', 'Hata ukimya, ukinikumbusha wewe, ni wimbo. 🎼'],
    ],
  },
  {
    q: 'When we finally meet again, what is the first thing you want to say to me?',
    options: [
      ['“Nimekukumbuka sana.”', 'Nami nimekukumbuka kila sekunde, kila siku. 🥹'],
      ['Nothing — just hold me', 'Kumbatio langu litasema kila kitu ambacho maneno hayawezi. 🤗'],
      ['“Sitaki kuondoka tena.”', 'Basi tupange siku ambayo hakuna kuondoka. 💞'],
    ],
  },
  {
    q: 'Je, ni ndoto gani moja ya maisha unayotamani tuitimize pamoja?',
    options: [
      ['Kujenga nyumba yetu ndogo ya amani', 'Nyumba yenye kicheko, chai ya asubuhi, na wewe. 🏡'],
      ['Kusafiri sehemu nzuri pamoja', 'Kila safari mpya nitashika mkono wako. ✈️'],
      ['Kuzeeka tukiwa bado marafiki', 'Best friends first, daima. 👵🏾👴🏾'],
    ],
  },
  {
    q: 'Je, upo tayari kunipenda zaidi kila siku, hata siku zikiwa ngumu?',
    options: [
      ['Ndiyo, kwa moyo wote 💖', 'Asante. Nitakuwa hapa kila siku, kwa upendo, subira na uaminifu. Nakupenda.'],
      ['Ndiyo, na nitakupenda zaidi kesho', 'Basi tukipendana kidogo zaidi kila siku, tutafika milele. ♾️'],
    ],
  },
]


const slide = {
  enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
}

export default function DistanceQuiz() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [picked, setPicked] = useState({}) // index -> option idx
  const [typed, setTyped] = useState({}) // index -> free text
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const done = i >= questions.length
  const cur = questions[i]
  const answered = picked[i] !== undefined || !!(typed[i] && typed[i].trim())

  const submit = async () => {
    setStatus('sending')
    const answers = questions.map((q, n) => ({
      question: q.q,
      choice: picked[n] !== undefined ? q.options[picked[n]][0] : '(hakuchagua)',
      written: (typed[n] || '').trim(),
    }))
    try {
      await sendAnswers(answers)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const go = (n) => {
    if (n < 0 || n > questions.length) return
    setDir(n > i ? 1 : -1)
    setI(n)
    if (n === questions.length) submit()
  }
  const next = () => answered && go(i + 1)

  const onDragEnd = (_, info) => {
    if (info.offset.x < -80 && answered) go(i + 1)
    else if (info.offset.x > 80) go(i - 1)
  }


  return (
    <section className="container-m py-14">
      <p className="section-title">Maswali ya Moyoni &amp; Long Distance</p>
      <p className="text-center text-sm text-wine/70 mt-1">Jibu kwa moyo · Telezesha kadi</p>

      <div className="mt-6">
        <div className="flex justify-between text-xs font-semibold text-wine/80 mb-1.5">
          <span>{done ? 'Umemaliza 🎉' : `Swali ${i + 1} kati ya ${questions.length}`}</span>
          <span>{Math.round((Math.min(i + (answered ? 1 : 0), questions.length) / questions.length) * 100)}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-rose-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose-400 to-wine"
            animate={{ width: `${(Math.min(i + (answered ? 1 : 0), questions.length) / questions.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <div className="relative mt-5 overflow-hidden px-1 py-2 min-h-[26rem]">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          {done ? (
            <motion.div
              key="done"
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              className="glass rounded-3xl p-8 text-center"
            >
              <Heart className="mx-auto text-rose-500" size={48} fill="currentColor" />
              <h3 className="mt-4 font-script text-3xl">Majibu yako yamenigusa, Mama Riah</h3>
              <p className="mt-3 text-sm leading-relaxed text-wine/85">
                Every answer is a reminder that Dodoma and Dar were never really apart. Asante kwa kuwa wewe — rafiki yangu, mpenzi wangu, nyumbani kwangu.
              </p>
              <p className="mt-3 text-xs font-medium text-rose-500">
                {status === 'sending' && 'Inatuma majibu yako… 💌'}
                {status === 'sent' && 'Majibu yako yamefika moyoni mwangu ✅'}
                {status === 'error' && 'Imeshindikana kutuma — jaribu tena 🥺'}
              </p>
              {status === 'error' && (
                <button className="btn-rose mt-3 !py-2.5 text-sm" onClick={() => submit()}>
                  Tuma tena
                </button>
              )}
              <button
                className="mt-4 block w-full text-sm font-medium text-wine/60"
                onClick={() => { setPicked({}); setTyped({}); setStatus('idle'); setDir(-1); setI(0) }}
              >
                Cheza tena ↺
              </button>

            </motion.div>
          ) : (
            <motion.div
              key={i}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={onDragEnd}
              className="glass rounded-3xl p-5 touch-pan-y cursor-grab active:cursor-grabbing"
            >
              <h3 className="font-serif text-lg font-bold leading-snug">{cur.q}</h3>
              {cur.note && <p className="mt-1 text-sm italic text-rose-500">{cur.note}</p>}

              <div className="mt-4 space-y-2.5">
                {cur.options.map(([label], k) => {
                  const sel = picked[i] === k
                  return (
                    <motion.button
                      key={label}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setPicked((p) => ({ ...p, [i]: k }))}
                      className={`w-full rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                        sel
                          ? 'border-transparent bg-gradient-to-r from-rose-500 to-wine text-white shadow-md'
                          : 'border-rose-200 bg-white/70 text-wine'
                      }`}
                    >
                      {label}
                    </motion.button>
                  )
                })}
              </div>

              <AnimatePresence>
                {picked[i] !== undefined && (
                  <motion.p
                    initial={{ opacity: 0, height: 0, y: 10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    className="mt-4 overflow-hidden rounded-2xl bg-rose-50 p-4 text-sm italic leading-relaxed"
                  >
                    💌 {cur.options[picked[i]][1]}
                  </motion.p>
                )}
              </AnimatePresence>

              <textarea
                value={typed[i] || ''}
                onChange={(e) => setTyped((t) => ({ ...t, [i]: e.target.value }))}
                onPointerDownCapture={(e) => e.stopPropagation()}
                rows={2}
                maxLength={500}
                placeholder="Au andika jibu lako mwenyewe… (optional)"
                className="mt-3 w-full resize-none rounded-2xl border border-rose-200 bg-white/70 p-3 text-sm text-wine placeholder:text-wine/40 focus:border-rose-400 focus:outline-none"
              />


              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => go(i - 1)}
                  disabled={i === 0}
                  className="text-sm font-medium text-wine/70 disabled:opacity-30 py-2 px-1"
                >
                  ← Rudi
                </button>
                <button
                  onClick={next}
                  disabled={!answered}
                  className="btn-rose !py-2.5 !px-4 text-sm flex items-center gap-1 disabled:opacity-40"
                >
                  {i === questions.length - 1 ? 'Maliza' : 'Endelea'} <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

