import './App.css';
import React, {useContext, useEffect, useState} from "react";
import Header from "./components/Header/Header";
import GoodsList from "./components/GoodsList/GoodsList";
import {useTelegram} from "./hooks/useTelegram";
import {BrowserRouter, Link, Route, Routes, useSearchParams} from "react-router-dom";
import Confirm from "./components/Confirm/Confirm";
import {OrderContext} from "./context";
import axios from "axios";
import OrderList from "./components/OrderList/OrderList";
import {host} from "./services/GoodService";
import {TelegramContext} from "./context2";
import GoodForm from "./components/GoodForm/GoodForm";


const queryParams = new URLSearchParams(window.location.search)
let telegramId = JSON.parse(queryParams.get("telegramId"));

let existingClient

if (telegramId) {
    try {
        existingClient = (await axios.get("http://localhost:8080/api/client?telegramId=" + telegramId)).data
    } catch (e) {
        existingClient = null
    }
}


 function App() {

     const [client, setClient] = useState({
         isRegistered: existingClient != null,
         client: existingClient,
         telegramId: telegramId
     })

     const [orderedGoods, setOrderedGoods] = useState([]);
     const {tg} = useTelegram();

     useEffect(() => {
         tg.ready()
     }, []);

    return (
    <div className="App">
        <Header/>

        <OrderContext.Provider value={{
            orderedGoods, setOrderedGoods
        }}>
            <TelegramContext.Provider value={{client, setClient }}>

                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} index element={<GoodsList setClientCallBack={setClient} />}/>
                        <Route path={"/orders"} element={<OrderList />} />
                        <Route path={"confirm"} element={<Confirm />}/>
                        <Route path={"newGood"} element={<GoodForm />}/>
                    </Routes>
                </BrowserRouter>

            </TelegramContext.Provider>
        </OrderContext.Provider>
    </div>
  );
}

export default App;
