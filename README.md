
# Smart Booking Interface

This is a responsive and interactive **car repair booking interface** built with React and Tailwind CSS using Vite. The interface simulates a smart booking flow where users can select a car type and repair service, view compatible stations, and choose available time slots for booking.

## ✅ Project Overview: Smart Booking Interface

This project is a fully functional **car repair booking interface** built with React + Vite. It simulates a modern, responsive user flow allowing users to book repair services intelligently.

### ✨ What’s Implemented

#### 🔍 Booking Flow
- Select **Car Type** and **Repair Service**
- View **matching stations** that offer the service
- See **available time slots** per station
- “Book Now” triggers a **mock success state**

#### ⚙️ Smart UI Logic
- Inputs are **step-based** — e.g., you can’t choose a service until a car type is selected
- Displays:
  - 🔄 Loading state when fetching stations or time slots
  - 🙁 Empty state if no matches
  - ✅ Booking success state when confirmed

#### 🎨 UI/UX Design
- **Bento grid layout** (form on the left, results on the right)
- **Dark/Light/System mode** support
- Fully **responsive design** for mobile + desktop
- Smooth dropdown toggle for theme selection

#### 🧠 State & Theming
- Uses `localStorage` to persist user theme preference
- Dynamically adapts to system theme using `matchMedia`
- Toggle with dropdown options: “Light”, “Dark”, and “System”

## 🛠 Tech Stack
- **Vite** + **React.js**
- **Tailwind CSS** (utility-first styling)
- Mock API/data using local **JSON**
- **Git** + GitHub version control
- Developed in **VS Code**

## 📌 Next Steps (Optional)
- Add **screenshots** to this README
- Deploy to [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com/)
- Add simple form validations (e.g., “Select a car type first”)
- Improve animations: dropdowns, loading skeletons, etc.

## 🔗 Links

- GitHub: [https://github.com/sofelaisrael/vite-project](https://github.com/sofelaisrael/vite-project)
