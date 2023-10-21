import './App.css';
import React, {useEffect, useState} from "react";
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

const goodsList = await axios.get(host + `/good/all`)
const ordersList = await axios.get(host + "/order/all");

const queryParams = new URLSearchParams(window.location.search)
console.log(queryParams.get("telegramId"))
let telegramId = JSON.parse(queryParams.get("telegramId"));
let existingClient
try {
     existingClient = (await axios.get("http://localhost:8080/api/client?telegramId=" + telegramId)).data
    console.log(existingClient)
} catch (e) {
    existingClient = null
    console.log(e)
}
console.log(existingClient)
console.log(existingClient != null)
 function App() {

     const [orderedGoods, setOrderedGoods] = useState([]);
     const [orders, setOrders] = useState(ordersList.data);
     const [goods, setGoods] = useState(goodsList.data)
     const [client, setClient] = useState({
         isRegistered: existingClient != null,
         telegramId: telegramId
     });
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
                        <Route path={"/"} index element={<GoodsList goods={goods}/>}/>
                        <Route path={"/orders"} element={<OrderList orders={orders}/>} />
                        <Route path={"confirm"} element={<Confirm/>}/>
                        <Route path={"newGood"} element={<GoodForm/>}/>
                    </Routes>
                </BrowserRouter>

            </TelegramContext.Provider>
        </OrderContext.Provider>
    </div>
  );
}

export default App;
