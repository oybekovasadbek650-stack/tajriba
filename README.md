# Algora — prezentatsiya dek (React + Vite)

Universitetda ma'ruza qilish uchun scroll'li, jonli fonli prezentatsiya sayti.
React 19 + Vite. Build qilingan holda `file://` orqali ham ochiladi.

## Ishga tushirish

```bash
npm install       # bir marta
npm run dev       # http://localhost:5174 — tahrirlab turib ko'rish uchun
npm run build     # dist/ papkasiga statik versiya
npm run preview   # dist/ ni lokal serverda tekshirish
```

`npm run build` dan keyin `dist/index.html` faylini oddiy ikki marta bosib
ochsa ham ishlaydi (internet ham shart emas, faqat shriftlar yuklanmaydi).

## Matnni o'zgartirish

**Butun matn bitta faylda: `src/data/content.js`.**
Universitet nomi, ismlar, raqamlar, slaydlar ketma-ketligi — o'sha yerda.
Komponentlarga tegish shart emas.

Slayd qo'shish: `src/slides/` ichiga yangi komponent yozib, `App.jsx`
dagi `DECK` ro'yxatiga va `content.js` dagi `slides` ro'yxatiga qo'shing.

## Boshqaruv

| Tugma | Vazifa |
|---|---|
| `←` `→` `Space` `PageUp/Down` | slayd almashish |
| `1`–`9` | shu slaydga sakrash |
| `Home` / `End` | birinchi / oxirgi slayd |
| `F` | fullscreen |
| `P` | PDF (Print) |
| `Esc` | ma'ruza rejimidan chiqish |

Yuqori o'ngdagi tugma — **ma'ruza rejimi** (fonni tinchlantiradi, yon
yo'liqda slayd nomini ko'rsatadi).

## Orqa fondagi video (scroll bilan harakatlanadi)

Videoni `public/fon.mp4` nomi bilan qo'ying — sahifa scroll qilinganda video ham
oldinga/orqaga yuradi. Fayl bo'lmasa, eski jonli fon (aurora + tor) ko'rinadi.

- Uzunligi: 8–20 soniya, hajmi 10 MB dan kam (telefonda tez ochilishi uchun).
- O'lchami: 1280×720 yoki 1920×1080, ovozsiz.
- Silliq harakat uchun videoni har kadri "keyframe" qilib qayta kodlang:

```bash
ffmpeg -i asl-video.mp4 -an -vf scale=1280:-2 -c:v libx264 -g 1 -crf 26 -movflags +faststart public/fon.mp4
```

**Hozirgi video:** Tartu universiteti (Estoniya), dron, 2021-yil dekabr. Muallif — Sillerkiil,
litsenziya CC BY-SA 4.0, manba: https://commons.wikimedia.org/wiki/File:Drone_video_of_University_of_Tartu_(Estonia)_in_December_2021.webm
Litsenziya muallifni ko'rsatishni talab qiladi — shuning uchun oxirgi slaydda kichik yozuv bor.
O'z universitetingiz videosini qo'ysangiz, `content.js` dagi `videoCredit` ni o'chirib yuboring.

## Diqqat

"Maqsadlar" slaydidagi raqamlar — **maqsad va gipoteza**, o'lchangan natija emas.
Pilot o'tkazilgach, haqiqiy raqamlarni `content.js` → `results` ga yozing.

## Tuzilma

```
src/
  main.jsx              kirish nuqtasi
  App.jsx               dek: slaydlar ro'yxati + dvijok ulanishi
  styles.css            butun dizayn (animatsiyalar shu yerda)
  data/content.js       ← BUTUN MATN SHU YERDA
  lib/useInView.js      IntersectionObserver hook'i (scroll reveal)
  lib/useDeck.js        faol slayd, progress, klaviatura, ma'ruza rejimi
  components/
    Background.jsx      aurora + yong'ul tori (canvas) + kursor dog'i
    Reveal.jsx          <Reveal> va <Rich> (matn ichida {emphasis})
    CountUp.jsx         raqam o'sishi
    Chart.jsx           animatsion chiziq diagrammasi
    ScrollVideo.jsx     scroll bilan harakatlanuvchi video fon
    Nav.jsx             panel + progress + yon yo'liq
  slides/               9 ta slayd komponenti
```
