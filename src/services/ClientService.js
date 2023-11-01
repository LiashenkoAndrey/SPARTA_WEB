import axios from "axios";
import {host} from "./GoodService";
import {useTelegram} from "../hooks/useTelegram";

export async function getClient() {

    const {tg} = useTelegram();

    let telegramId = tg.initDataUnsafe.user.id;
    let isClientExist = (await axios.get(host + "/client/isExists?telegramId=" + telegramId)).data

    let existingClient
    if (isClientExist) {
        existingClient =  (await axios.get(host + "/client?telegramId=" + telegramId)).data

        return {
            isRegistered: true,
            client: existingClient,
            telegramId: telegramId
        }
    }

    return {
        isRegistered: false,
        telegramId: telegramId
    }
}