
import axios from 'axios';
import { getQuestionsData, setResultData } from './Common';

const API_URL = 'http://localhost:8000/';
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};
export const predict = async () => {
    // data'nın elemanlarını dolaş ve questionKey ve answer'i json'a ekle
    // json'u axios ile post et
    // response'u döndür
    const data = getQuestionsData();
    let json = {};
    for (let i = 0; i < data.length; i++) {
        json[data[i].questionKey] = data[i].answer;
    }
    console.log(json);
    await axios.post(
        API_URL + 'predict',
        json,
        axiosConfig
    ).then((response) => {
        console.log(response.data);
        setResultData(response.data);
    }
    ).catch((error) => {
        console.log(error);
    });
}
