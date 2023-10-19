import './App.css';
import React, {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import GoodsList from "./components/GoodsList/GoodsList";
import {useTelegram} from "./hooks/useTelegram";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Confirm from "./components/Confirm/Confirm";
import {OrderContext} from "./context";
import axios from "axios";
import OrderList from "./components/OrderList/OrderList";
import {host} from "./services/GoodService";

const goodsList = await axios.get(host + `/api/good/all`)
const ordersList = await axios.get(host + "/order/all");

 function App() {
     console.log(ordersList.data)
     const [orderedGoods, setOrderedGoods] = useState([]);
     const [orders, setOrders] = useState(ordersList.data);
     const [goods, setGoods] = useState(goodsList.data)
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

            <BrowserRouter>
                <Routes>
                    <Route path={"/"} index element={<GoodsList goods={goods}/>}/>
                    <Route path={"/orders"} element={<OrderList orders={orders}/>} />
                    <Route path={"confirm"} element={<Confirm/>}/>
                </Routes>
            </BrowserRouter>
        </OrderContext.Provider>
    </div>
  );
}

export default App;
