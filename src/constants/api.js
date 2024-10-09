import axios from 'axios'

const api = axios.create({
baseURL: 'https://homeservices.unitdtechnologies.com:2034',

});

export default api;