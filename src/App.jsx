import AudioPlayer from './components/AudioPlayer'
import Hero from './components/Hero'
import SoloPhotoStory from './components/SoloPhotoStory'
import DistanceQuiz from './components/DistanceQuiz'
import ReasonsDeck from './components/ReasonsDeck'
import ConfettiAction from './components/ConfettiAction'
import LetterModal from './components/LetterModal'
import { Heart } from 'lucide-react'
import { CREATOR } from './config'

export default function App() {
  return (
    <div className="min-h-screen">
      <AudioPlayer />
      <main>
        <Hero />
        <SoloPhotoStory />
        <DistanceQuiz />
        <ReasonsDeck />
        <ConfettiAction />
      </main>
      <footer className="container-m pb-24 text-center text-xs text-wine/70">
        <p className="flex items-center justify-center gap-1">
          Created &amp; designed with <Heart size={12} className="text-rose-500" fill="currentColor" /> by{' '}
          <a
            href={CREATOR.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-rose-500 underline underline-offset-2"
          >
            {CREATOR.name}
          </a>
        </p>
        <a href={CREATOR.url} target="_blank" rel="noopener noreferrer" className="mt-1 block text-wine/60">
          cylvenda.co.tz
        </a>
      </footer>
      <LetterModal />
    </div>
  )
}

