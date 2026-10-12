# Digital Lookbook - FRONTEND ✨

Digital Lookbook is a website where users can upload their clothes and 
outfits and display them in a fun, visual way. This repository contains 
the **frontend** of the application.

🔗 **Live demo:** [Live website](https://cheryl-oop.github.io/digital-lookbook-frontend/)

> ⚠️ **Note:** This is a project from my previous academic year. 
> If I were to rebuild it today, I would approach several things 
> differently — see [Reflections](#-reflections) below.

---
## Up & running 🏃‍➡️
Log in to get started — **you won't be able to upload clothes or outfits without an account.**
- **Backend:** [link to backend repo](https://github.com/cheryl-oop/digital-lookbook-backend.git)

### 🔑 Demo credentials

Want to explore an already populated account? Use these:

| Field | Value |
|---|---|
| Email | `demo@mail.com` |
| Password | `simplepassword25` |

---

## 📸 Demo Note

For demonstration purposes, clothing and outfit images are served from 
the frontend as **static assets**. The backend stores **image filenames only**.

This approach ensures a stable and fully populated UI during demos while 
avoiding persistence limitations of free hosting environments.

---

## 🛠 Tech Stack

- **Frontend:** JavaScript, HTML, CSS
- **Build Tool:** Vite
- **Deployment:** GitHub Pages

---

## 💭 Reflections

This project was built during my previous academic year, and my approach 
to frontend development has evolved since then. If I were to rebuild it 
today, I would change the following:

- **Component-based structure** — I would break the UI into reusable 
  components instead of writing everything as monolithic pages.
- **Animation libraries** — I would use a dedicated library (e.g. GSAP, 
  Framer Motion) instead of hand-rolled animations.
- **Graphic assets** — I would handle and optimize graphic images more 
  efficiently (e.g. proper image formats, lazy loading, filters).

---

## Sources 🗃️

- [Alert (popup) browser](https://www.youtube.com/watch?v=bNtyTGBtbK4) used in src > js > login.js (line 12-15), register.js (12-14)
- [Upload and Display Files](https://www.youtube.com/watch?v=xXrs4j-p3yE) used in src > js > addClothing.js (line 4-14), addOutfit.js (line 6-16), updateClothing(line 3-13), updateOutfit(line 6-16)
- [Star rating logic](https://www.youtube.com/watch?v=fQIerHqB71w) used in src > js > outfit.js (123-149), clothing.js (line 129 -159)
- [Like system](https://www.youtube.com/watch?v=1AE3qtKA79w) src > js > clothing.js (line 104-127), outfit.js (155-176)
- [Navigation Hamburger menu (responsive)](https://www.youtube.com/watch?v=p1GmFCGuVjw&t=130s) used in src css > style.css (line 114 -229)
- [Javascript, Html and CSS documentation] (https://www.w3schools.com/)
