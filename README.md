# Levon Hovhannisyan — Portfolio (HTML / CSS / JS)

Անձնական պորտֆոլիոյի կայք՝ կառուցված սովորական **HTML**, **CSS** և **JavaScript**-ով, առանց ֆրեյմվորքների։ Աջակցում է երկու լեզու (Հայերեն / English) և երեք թեմա (Համակարգային / Բաց / Մուգ)։

## ✨ Հնարավորություններ

- 🌍 **Երկլեզու** ինտերֆեյս — հայերեն և անգլերեն (թարգմանվում է անգամ անուն-ազգանունը)
- 🎨 **Թեմայի ընտրություն** — System (դեֆոլտ), Light, Dark
- 💾 Ընտրությունները պահվում են `localStorage`-ում
- 📱 Ադապտիվ դիզայն (responsive)
- 📂 Տվյալները՝ առանձնացված JSON ֆայլերում (հեշտ խմբագրելի)

## 📁 Ֆայլերի կառուցվածք

```
portfolio-html/
├── index.html          # Հիմնական HTML
├── style.css           # Ոճեր (light/dark թեմաներ)
├── main.js             # Տրամաբանություն (լեզու, թեմա, ռենդերինգ)
├── README.md           # Այս ֆայլը
└── data/
    ├── contact.json    # Անուն, email, հեռախոս, սոցցանցեր
    ├── skills.json     # Հմտությունների ցուցակ
    └── projects.json   # Նախագծերի ցուցակ
```

> **Նշում:** Նկարների համար ստեղծիր `images/` պանակ (օր.՝ `images/myphoto.jpg`, `images/projects/...`)։ Բացակայող նկարների համար ինքնաբերաբար օգտագործվում է placeholder։

## 🚀 Տեղական գործարկում

JavaScript-ը կարդում է JSON ֆայլերը `fetch()`-ով, ուստի **հարկավոր է լոկալ սերվեր** (ուղղակի `index.html` բացելը browser-ում չի աշխատի CORS-ի պատճառով)։

### Տարբերակ 1 — Python
```bash
cd portfolio-html
python -m http.server 8000
```
Բացիր՝ http://localhost:8000

### Տարբերակ 2 — Node.js
```bash
npx serve portfolio-html
```

### Տարբերակ 3 — VS Code
Տեղադրիր **Live Server** ընդլայնումը → աջ սեղմում `index.html`-ին → **Open with Live Server**։

## ✏️ Բովանդակության խմբագրում

Ամբողջ տեքստն ու տվյալները գտնվում են `data/` պանակում։ Կոդը փոխելու կարիք չկա։

### Անուն, պաշտոն, կոնտակտներ — `data/contact.json`
```json
{
  "name":  { "hy": "Քո անուն", "en": "Your Name" },
  "title": { "hy": "Քո պաշտոն", "en": "Your Title" },
  ...
}
```

### Հմտություններ — `data/skills.json`
```json
[
  { "hy": "ՋավաՍկրիպտ", "en": "JavaScript" },
  { "hy": "Ռեակտ.js",  "en": "React.js" }
]
```

### Նախագծեր — `data/projects.json`
```json
[
  {
    "id": 1,
    "title": { "hy": "Իմ նախագիծը", "en": "My Project" },
    "image": "images/projects/my.jpg",
    "link":  "https://example.com"
  }
]
```

## 🌐 Դեպլոյ

Քանի որ սա ստատիկ կայք է, կարող ես տեղադրել ցանկացած hosting-ում.

- **GitHub Pages** — push արա `gh-pages` branch-ին
- **Netlify** / **Vercel** — drag & drop ամբողջ պանակը
- **Cloudflare Pages**

## 📞 Կապ

- 📧 levon.hovhannisyan999@gmail.com
- 📱 +374 77 238 895 / +374 99 950 367
- 💼 [LinkedIn](https://linkedin.com/in/levon-hovhannisyan-a91977219)
- 💻 [GitHub](https://github.com/levonhovhannisyan99)

---

Created by **Levon Hovhannisyan** © 2025
