import './App.css';
import React, {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import GoodsList from "./components/GoodsList/GoodsList";
import {useTelegram} from "./hooks/useTelegram";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Confirm from "./components/Confirm/Confirm";
import {OrderContext} from "./context";
import OrderList from "./components/OrderList/OrderList";
import {TelegramContext} from "./context2";
import GoodForm from "./components/GoodForm/GoodForm";
import {getClient} from "./services/ClientService";


 function App() {

     const [client, setClient] =  useState(getClient)
     const [orderedGoods, setOrderedGoods] = useState([]);
     const {tg} = useTelegram();

     useEffect(() => {
        fetchClient()
     }, []);


     async function fetchClient() {
         let cl = await getClient();
        console.log(cl)
         setClient(cl)
     }


     console.log(client)


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
                        <Route path={"/"} index element={<GoodsList />}/>
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
