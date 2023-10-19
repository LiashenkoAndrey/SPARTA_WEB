import axios from "axios";

// export const host = "http://localhost:8080/api"
export const host = "https://514d-185-244-159-203.ngrok-free.app/api"
const PAGE_SIZE = 10;
export async function getGoodsPage() {
    return await axios.get(`http://localhost:8080/api/good/all`)
}

export function isOrdered(id, orders) {
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].good.id === id) return {isOrderedGood: true, orderedGood: orders[i]};
    }
    return {isOrderedGood: false, amount: -1};
}

export function getTotalPrice(orders) {
    return orders.reduce((acc, elem) => {
        return acc += elem.amount;
    }, 0)
}

export async function saveOrder(order) {
    await axios.post(host + "/order/new" , order);
}

export async function getAllOrders() {
    return (await axios.get(host + "/order/all"));
}