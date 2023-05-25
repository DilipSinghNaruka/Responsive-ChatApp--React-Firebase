import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4WkNUfX49RJuQpPo7TaIriGP4LSBt1WE",
  authDomain: "chat-app-1b83f.firebaseapp.com",
  projectId: "chat-app-1b83f",
  storageBucket: "chat-app-1b83f.appspot.com",
  messagingSenderId: "853858123205",
  appId: "1:853858123205:web:a046a2af9fa89b3f0d9fac",
  measurementId: "G-2E60NVTTRP",
};

// Initialize Firebase
 initializeApp(firebaseConfig);
const root = createRoot(document.getElementById("root"));
root.render(<App />);
