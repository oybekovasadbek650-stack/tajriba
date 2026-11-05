/* ══════════════════════════════════════════════════════════════
   BUTUN MATN SHU YERDA. Prezentatsiyani o'zgartirish uchun
   faqat shu faylni tahrirlang — komponentlarga tegish shart emas.
   ══════════════════════════════════════════════════════════════ */

export const meta = {
  brand: 'Algora',
  event: 'Ilmiy-amaliy konferensiya · 2026',
  university: 'Jahon iqtisodiyoti va diplomatiya universiteti',
  author: 'Asadbek Oybekov',
  // Litsenziya (CC BY-SA 4.0) muallifni ko'rsatishni talab qiladi — o'chirmang.
  videoCredit: 'Fon video: Sillerkiil, Tartu universiteti (2021) · CC BY-SA 4.0 · Wikimedia Commons',
  title: "Sun'iy intellekt talaba o'zlashtirishini {9 haftada} qanday o'zgartiradi",
  lede: "Algora — ma'ruza matnini tushunadi, savol tuzadi, xatoni topadi va professorga real vaqtda hisobot beradi. Bu ish — o'zlashtirishni taxmindan raqamga aylantirish urinishi.",
  contacts: [
    { label: 'Muallif', value: 'Asadbek Oybekov' },
    { label: 'Universitet', value: 'Jahon iqtisodiyoti va diplomatiya universiteti' },
    { label: 'Loyiha turi', value: 'Mustaqil tadqiqot · 2026' }
  ]
};

export const problem = {
  kicker: '01 — Muammo',
  title: 'Baholash ikki oy kechikadi',
  cards: [
    { icon: '◴', h: 'Kech feedback', p: "Imtihon qog'ozi tekshirilganda talaba mavzuni allaqachon unutgan bo'ladi. Xatoni tuzatish oynasi yopilgan." },
    { icon: '▥', h: 'Yuqori ish yuklamasi', p: "120 varaqni qo'lda tekshirish — professor uchun taxminan 6 soat. Shu vaqtning 80% i takroriy, yaratuvchi bo'lmagan ish." },
    { icon: '◈', h: 'Yashirin qolganlar', p: 'Savol so\'ray olmagan talaba birinchi semestrning o\'zida chetda qoladi — va buni hech kim sezmaydi.' }
  ],
  note: "Markaziy gipoteza: xato {24 soat ichida} aytilsa, o'zlashtirish egri chizig'i ko'tariladi."
};

export const solution = {
  kicker: '02 — Yechim',
  title: 'Uch ishni bir vaqtda bajaradigan tizim',
  points: [
    { who: 'Talabaga', what: '"nima uchun noto\'g\'ri" tushuntirishi bilan darhol baholanuvchi test.' },
    { who: 'Professor uchun', what: "guruhning zaif mavzularini ko'rsatadigan issiq xarita." },
    { who: 'Fakultet uchun', what: "kontsepsiya darajasidagi solishtirma hisobot, ism-sharifsiz." }
  ],
  quote: 'AI baholamaydi — AI baholashni {tezlashtiradi}. Yakuniy qarov professorniki.',
  panel: {
    url: 'algora.uz/panel',
    question: 'Savol 7 · Termodinamikaning 2-qonuni',
    answer: 'Yopiq tizimda entropiya kamaymaydi.',
    why: "Siz izolyatsiyalangan holatni to'g'ri tanladingiz; 40% guruh shu savolda 1-qonun bilan aralashtirib yubordi.",
    meter: 78,
    caption: 'Guruh o\'rtacha natijasi {78%} · 3 talaba bu mavzuda xavf ostida'
  }
};

export const architecture = {
  kicker: '03 — Qanday ishlaydi',
  title: "Besh halqa, bitta yo'l",
  steps: [
    { n: 1, h: 'Kirish', p: 'PDF, audio, LMS' },
    { n: 2, h: "Bo'laklash", p: 'mavzu bloklari' },
    { n: 3, h: 'Model', p: 'LLM + rubrika' },
    { n: 4, h: 'Baholash', p: 'mezon bo\'yicha ball' },
    { n: 5, h: 'Hisobot', p: 'panel + eksport' }
  ],
  stack: ['Python 3.12', 'FastAPI', 'PostgreSQL', 'pgvector', 'Redis queue', 'Whisper', 'React 19', 'Docker']
};

export const results = {
  // DIQQAT: bular — MAQSADLAR, hali o'lchangan natija emas.
  // Pilot o'tkazilgach, haqiqiy raqamlarni shu yerga yozing va sarlavhani "Natijalar" ga qaytaring.
  kicker: '04 — Maqsadlar',
  title: "Pilot rejasi: 1 ta guruh, 9 hafta",
  stats: [
    { value: 9, suffix: '', label: 'haftalik pilot' },
    { value: 120, suffix: '+', label: 'talaba — reja' },
    { value: 30, suffix: '%', label: "o'zlashtirish o'sishi — maqsad" },
    { value: 6, suffix: '→1', label: 'soat tekshiruv — maqsad' }
  ],
  note: "Bu ko'rsatkichlar — gipoteza va maqsad. Ular nazorat guruhi (an'anaviy baholash) bilan solishtirib tekshiriladi.",
  chart: {
    // Kutilayotgan egri chiziq (model). Pilotdan keyin haqiqiy raqamlarni qo'ying.
    ours: [52, 55, 58, 63, 67, 72, 75, 79, 82],
    control: [50, 51, 52, 53, 54, 55, 56, 57, 58],
    legend: ['Kutilayotgan (Algora)', "An'anaviy baholash", 'Hafta 1 → 9']
  }
};

export const ethics = {
  kicker: '05 — Etika va ma\'lumot himoyasi',
  title: 'Model ism bilmaydi',
  cards: [
    { h: 'Anonimlashtirish', p: "Talaba ID — hash. Modelga ism-sharif, foto, telefon yetib bormaydi." },
    { h: 'Odamsiz yakun', p: 'AI taklif qilgan baho — professor bosmaguncha jurnalga yozilmaydi.' },
    { h: 'Ochiq rubrika', p: "Har baho qanday mezon bilan chiqqani talabaga ko'rsatiladi." },
    { h: 'Chetda saqlash', p: "Ma'lumot universitet serveridan tashqariga chiqmaydi." }
  ]
};

export const roadmap = {
  kicker: '06 — Kelajak',
  title: 'Keyingi 4 bosqich',
  steps: [
    { when: '2027 / I', what: "Prototip va 9 haftalik pilot: bitta guruhda sinov." },
    { when: '2027 / II', what: "Natijalarni tahlil qilish, o'zbek + rus interfeysi." },
    { when: '2027 / III', what: "Ovozli savol-javob: ma'ruza yozuvidan avtomat test; LMS (Moodle) integratsiyasi." },
    { when: '2028', what: 'Boshqa fakultetlarga kengaytirish; ilmiy maqola.' }
  ]
};

export const team = {
  kicker: '07 — Muallif',
  title: "Bitta odam, bitta g'oya",
  people: [
    {
      initials: 'AO',
      name: 'Asadbek Oybekov',
      role: "G'oya, tadqiqot, dizayn va dasturlash",
      bio: "2007-yil tug'ilgan · Jahon iqtisodiyoti va diplomatiya universiteti talabasi"
    }
  ]
};

export const conclusion = {
  kicker: '08 — Yakun',
  title: 'Uch asosiy xulosa',
  points: [
    "Kech feedback — tuzatish mumkin bo'lgan xato emas, yo'qolgan imkoniyat.",
    "AI professor o'rnini bosmaydi: maqsad — takroriy tekshiruvni qisqartirib, vaqtni talaba bilan muloqotga qaytarish.",
    "Keyingi qadam — 9 haftalik pilot: gipotezani haqiqiy talabalarda raqam bilan tekshirish."
  ],
  thanks: 'E\'tiboringiz uchun rahmat.'
};

export const slides = [
  { id: 'kirish', title: 'Kirish', hero: true },
  { id: 'muammo', title: 'Muammo' },
  { id: 'yechim', title: 'Yechim', split: true },
  { id: 'arxitektura', title: 'Arxitektura' },
  { id: 'maqsadlar', title: 'Maqsadlar', split: true },
  { id: 'etika', title: 'Etika' },
  { id: 'reja', title: 'Reja' },
  { id: 'muallif', title: 'Muallif' },
  { id: 'yakun', title: 'Yakun' }
];
