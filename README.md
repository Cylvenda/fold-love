# Mapenzi Yetu ❤️

A mobile-first romantic website for Asia, built with React (Vite), Tailwind CSS, Framer Motion, Lucide React and canvas-confetti.

## Run

```bash
npm install
npm run dev      # dev server (also reachable from your phone on the same Wi-Fi)
npm run build    # production build into dist/
```

## Sections

`src/components/`: `AudioPlayer`, `Hero`, `SoloPhotoStory`, `DistanceQuiz`, `ReasonsDeck`, `LetterModal`, `ConfettiAction`.

## Customise

- `src/config.js`: relationship start date, audio path, the email address that receives quiz answers, names, creator link.
- `public/audio/our-song.mp3`: the song.
- `public/images/`: `her-1.jpg` to `her-4.jpg` (photo story), `us-together.jpg` and `us-together-2.jpg` (hero).
- Quiz questions: the `questions` array in `src/components/DistanceQuiz.jsx`.

## Quiz answers by email

When the quiz is finished, the answers are sent to the address in `src/config.js` through [FormSubmit](https://formsubmit.co), so no backend is needed. The first submission sends an activation email to that address. Click the link in it once, otherwise answers won't arrive. The address is visible in the site's code.
