import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-builder-app-d66a1.firebaseio.com/"
})

export default instance;