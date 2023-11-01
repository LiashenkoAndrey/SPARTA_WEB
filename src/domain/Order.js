
export class Order {


    constructor(client, goodsWithAmount, message, methodOfDelivery, address) {
        this.client = client;
        this.goodsWithAmount = goodsWithAmount;
        this.message = message;
        this.methodOfDelivery = methodOfDelivery;
        this.address = address;
    }

    client
    goodsWithAmount
    message
    methodOfDelivery
    address
}