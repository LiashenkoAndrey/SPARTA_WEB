import axios from "axios";
import {host} from "./GoodService";


export async function getAll() {
    return await axios.get(host + `/order/all`)
}

export async function getForToday() {
    return await axios.get(host + `/order/all?forToday=true`)
}