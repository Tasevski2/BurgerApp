import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-a1842.firebaseio.com/'
});

export default instance;