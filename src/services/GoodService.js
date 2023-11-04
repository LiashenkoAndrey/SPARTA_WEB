import axios from "axios";

export const host = "http://localhost:8080/api"
// export const host = "https://sparta.miloverada.gov.ua:8443/api"
// export const host = "http://192.168.220.245:8080/api"
const PAGE_SIZE = 10;

export const imageEndpoint = host + "/upload/image/"
export function isOrdered(id, orders) {
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].good.id === id) return {isOrderedGood: true, orderedGood: orders[i]};
    }
    return {isOrderedGood: false, amount: -1};
}

export function getTotalPrice(orders) {
    return orders.reduce((acc, elem) => {
        return acc += (elem.good.price * elem.amount);
    }, 0)
}

export async function saveOrder(order) {
    await axios.post(host + "/order/new" , order);
}


export async function markGood(clientId, goodId, mark) {
    const params = new URLSearchParams();
    params.append('clientId', clientId);
    params.append('goodId', goodId);
    params.append('mark', mark);
    await axios.post(host + "/good/mark", params)
}

export function isMarked(goodsMarks, goodId, mark) {
    let goodMark = goodsMarks.find((goodMark) => {
        return goodMark.goodId == goodId && goodMark.mark == mark
    });
    return goodMark != null;
}

export async function getGoodsMarks(clientId) {
    try {
        if (clientId) {
            const response = await axios.get(host + "/good/getMarks?clientId=" + clientId);
            return response.data;
        }
        return [];
    } catch (e) {
        console.log(e)
    }
}
