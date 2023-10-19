
let tg = window.Telegram.WebApp;

export function useTelegram() {

    const onClose = () => {
        tg.showPopup({
            title: "Підтверження виходу",
            message: "Ви впевнені що бажаєте вийти? Данні не будуть збережені!",
            buttons: [
                {
                    id: "1",
                    text: 'Відмінити'
                },
                {
                    id: "close",
                    text: 'Вийти'
                }
            ]
        }, (id) => {
            if (id === "close") {

                tg.close()
            }
        })

    }

    const onToggleButton = () => {
        const mainBtn = tg.MainButton;

        if (mainBtn.isVisible) {
            mainBtn.hide()
        } else {
            mainBtn.show();
        }
    }

    let mainBtn = tg.MainButton;
    return {onClose, tg, mainBtn}
}