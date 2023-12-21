import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter basename={"/bootstrap-demo"}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
);
