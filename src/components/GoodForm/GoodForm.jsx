import React, {useEffect, useState} from 'react';
import {UploadOutlined } from '@ant-design/icons';
import {Button, Form, Input, Upload} from 'antd';
import './GoodForm.css'
import {useTelegram} from "../../hooks/useTelegram";
import NumericInput from "../NumericInput/NumericInput";
import { useNavigate } from 'react-router-dom';


const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const GoodForm = () => {
    const [value, setValue] = useState('');
    const {mainBtn, tg} = useTelegram();
    const navigate = useNavigate();

    const saveGood = () => {

        navigate('/', { replace: true });
    }

    useEffect(() => {
        mainBtn.setParams({
            text: "Зберегти"
        })
        mainBtn.isActive = true
        mainBtn.show()
    }, [mainBtn]);

    useEffect(() => {
        tg.onEvent("mainButtonClicked", saveGood)
    }, [saveGood]);


    return (
        <div className={"goodForm"}>
            <h4 style={{textAlign: "center"}}>Новий товар</h4>

            <div className={"inputs"}>
                <Input placeholder={"Назва"}/>
                <NumericInput
                    style={{
                        width: 120,
                    }}
                    value={value}
                    onChange={setValue}
                />
                <Form.Item
                    name="upload"
                    label="Фото товару"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Натисни щоб завантажити</Button>
                    </Upload>
                </Form.Item>
            </div>
        </div>
    );
};

export default GoodForm;