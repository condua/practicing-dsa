import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Dsa from "./components/Dsa";
import TSLearningSystem from "./components/Typescript";
import VsatHome from "./components/vsat/VsatHome";
import SocialLearningApp from "./components/social-media/SocialMediaHome";
import "./index.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dsa />} />
        <Route path="/typescript" element={<TSLearningSystem />} />
        <Route path="/vsat" element={<VsatHome />} />
        <Route path="/social-media" element={<SocialLearningApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
