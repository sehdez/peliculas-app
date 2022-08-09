import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key:'6c8d97e4c8c4d31d3d7d2678af3d2dbf',
        language:'es-ES'
    }
})

export default movieDB;