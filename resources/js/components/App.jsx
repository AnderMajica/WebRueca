import React from "react";
import Header from './Header/header';
import Map from './MAPS/mapas';
import { Main } from './Main/Main';
import { ForgotPass } from './Main/ForgotPass';
import { ResetPass } from './Main/ResetPass';
import { AlreadyVer} from "@/components/Main/AlreadyVer";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
// import { CheckoutNow } from "./Checkout/CheckoutNew";
import { Verified } from "./Main/Verified";
// import Checkout from "./Checkout/Checkout";
import PaypalMensual from "./Checkout/PaypalMensual";
import PaypalTrimestral from "./Checkout/PaypalTrimestral";

const App = () => {

    return (
        <BrowserRouter>
        <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Main />} 
                    />
                <Route
                    path="/map"
                    element={<Map />} />
                {/* <Route
                    path="/checkout"
                    element={<Checkout />} />
                <Route
                    path="/CheckoutNow"
                    element={<CheckoutNow />} /> */}
                <Route
                    path="/forgotPass"
                    element={<ForgotPass />}/>
                <Route
                    path="/new-password/:token/:email"
                    element={<ResetPass />}/>
                <Route
                    path="/verified"
                    element={<Verified />}/>
                <Route
                    path="/already-verified"
                    element={<AlreadyVer />}/>
                <Route 
                    path="/paypalMensual"
                    element={<PaypalMensual/>} />
                <Route 
                    path="/paypalTrimestral"
                    element={<PaypalTrimestral/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
