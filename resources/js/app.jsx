import './bootstrap';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

// if(document.getElementById('app')){
//     ReactDOM.render(
//         <App />,
//         document.getElementById('app')
//     );
// }

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)