import { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PreferenceToggle from "./components/PreferenceToggle";
import Navbar from "./layouts/Navbar";
import Home from "./components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Navbar />
        <Home />
      </Suspense>
    </>
  );
}

export default App;
