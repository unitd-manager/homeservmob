import axios from 'axios'

const api = axios.create({
baseURL: 'https://unitdecom.unitdtechnologies.com:2014',
// baseURL: 'http://localhost:5009',

});

export default api;