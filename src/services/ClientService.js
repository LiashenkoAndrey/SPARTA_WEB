import axios from "axios";
import {host} from "./GoodService";
import {useTelegram} from "../hooks/useTelegram";

const {tg} = useTelegram();

export async function getClient() {

    let telegramId = 1053183238;
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

const authUsers = [
    843888194,
    1053183238
]

export function isAuth() {
   return authUsers.includes(Number(tg.initDataUnsafe.user.id));
}