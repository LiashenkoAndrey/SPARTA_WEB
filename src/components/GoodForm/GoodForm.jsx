import React, {useEffect, useState} from 'react';
import {UploadOutlined } from '@ant-design/icons';
import {Button, Form, Input, message, Upload} from 'antd';
import './GoodForm.css'
import {useTelegram} from "../../hooks/useTelegram";
import NumericInput from "../NumericInput/NumericInput";
import { useNavigate } from 'react-router-dom';
import {getTotalPrice, host} from "../../services/GoodService";
import axios from "axios";



const GoodForm = () => {
    const [price, setPrice] = useState('');
    const {mainBtn, tg} = useTelegram();
    const [goodImage, setGoodImage] = useState(null);
    const [goodName, setGoodName] = useState('')
    const [messageApi, contextHolder] = message.useMessage();


    useEffect(() => {
        mainBtn.setParams({
            text: "Додати"
        })
    }, []);

     async function sendData () {
        let data = new FormData();
        data.append("image", goodImage)
        data.append("price", price)
        data.append("name", goodName)

        console.log("save image: " + data)


        try {
            await axios.post(host + "/good/new", data, {
                crossDomain: true,
                headers: {
                    'Content-Type': `multipart/form-data`
                }
            }).then((response) => {
                if (response.status === 200) {
                    messageApi.open({
                        type: 'success',
                        content: 'Збережено успішно!',
                    });
                } else {
                    messageApi.open({
                        type: 'error',
                        content: 'Status code: ' + response.status,
                    });
                }
                console.log(response);
            }, (error) => {
                messageApi.open({
                    type: 'error',
                    content: "Помилка :(",
                });
            });

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        tg.onEvent("mainButtonClicked", sendData)
        return () => {
            tg.offEvent("mainButtonClicked", sendData)
        }
    }, [sendData]);

    useEffect(() => {
        if (goodImage == null || !goodName || !price) {
            mainBtn.hide()
        } else {
            mainBtn.show()
        }
    }, [goodImage, goodName, price]);
    const onUploadImage = (e) => {
        setGoodImage(e.target.files[0])
        console.log(e.target.files[0])

    }

    const onChangePrice = (e) => {
        setPrice(e)
    }

    const onChangeGoodName = (e) => {
        setGoodName(e.target.value)
    }


    useEffect(() => {
        mainBtn.setParams({
            text: "Зберегти"
        })
        mainBtn.isActive = true
    }, [mainBtn]);




    return (
        <div className={"goodForm"}>
            {contextHolder}
            <h4 style={{textAlign: "center"}}>Новий товар</h4>

            <div className={"inputs"}>
                <Input onChange={onChangeGoodName} placeholder={"Назва"}/>
                <NumericInput
                    style={{
                        width: 120,
                    }}
                    value={price}
                    onChange={onChangePrice}
                />

                <Form.Item
                    label={<label style={{ color: 'var(--tg-theme-text-color)' }}>Фото товару</label>}
                    name="upload"
                    valuePropName="fileList"
                    onChange={onUploadImage}
                >
                    <input style={{color: 'var(--tg-theme-text-color)'}} type="file" onChange={onUploadImage}/>
                </Form.Item>

            </div>
        </div>
    );
};

export default GoodForm;