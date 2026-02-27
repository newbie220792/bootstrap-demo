import React from "react";
import {createRoot} from "react-dom/client";
import App from "./start/App";

let root;

export function mount(el) {
    if (!root) {
        root = createRoot(el);
    }
    root.render(<App/>);
}
