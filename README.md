# Open Subtitles Editor 🎬

A small project designed to learn and demonstrate Vue 3, TypeScript, Vite, and VideoJS.  
Built by **[Michael Konstantinou](https://mkonst.com/)**.

---

## 🚀 Features

- Create, edit, and manage subtitles for videos.
- Export subtitles in **SRT** and **VTT** formats.
- Dynamic subtitle handling with **Video.js**.
- Reactive and modular design using **Vue 3 Composition API**.
- Styled with **Tailwind CSS** and reusable **ShadCN** components.

---

## 🛠 How to Use

1. Open the app.
2. Create a new project by clicking the **"+" icon** next to the **Projects** section in the sidebar.
3. Upload a video and start adding subtitles at different timestamps.
4. Export subtitles as `.SRT` or `.VTT` files.

---

## 🏗 How It's Made

This project was built using:

- **Vue 3** with Composition API for reactive, modular code.
- **TypeScript** for type safety.
- **Vite** as the fast development build tool.
- **Tailwind CSS** for styling.
- **ShadCN components** for reusable UI elements.
- **Video.js** for video playback and dynamic subtitle management.

Key architecture points:

- Components are **reactive, maintainable, and reusable**.
- **Vue Router** handles navigation between projects and views.
- State management is **local**, using reactive `refs` and props.
- Real-time subtitle updates while the video is playing.

> Note: This project does not integrate with a back-end. Its purpose is to showcase **VueJS + VideoJS** for live subtitle editing.

---

## 📦 Installation

```bash
git clone https://github.com/michaelkonstantinou/open-srt-maker.git
cd open-srt-maker
npm install
```

### Development
To run the application in development mode:

```bash
npm run dev
```

### Production
To build the application for production:
```bash
npm run build
```

## ⚠ Known Limitations

- Project routes require a slug, but **slug uniqueness is not enforced**.
- Slugs are **only generated when the project is created**, not updated when the project name changes.
- **No tests** are included.
- Demo application only; not a production-ready app.

---

## 🧩 Contributing

Feel free to fork this repository and improve it.  
If you are interested in a full working application with back-end support, **contact me**!

---

## 📜 License

GPL-3.0 license
