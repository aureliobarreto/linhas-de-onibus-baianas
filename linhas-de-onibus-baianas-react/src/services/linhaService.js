import api from './axios.config.js'
import qs from 'qs'

export default function linhaService (queryObject) {
    api.get('/buscarLinhaPorTrechoEAgenda?',qs.stringify(queryObject));
}