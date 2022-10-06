import axios from "axios";

const movieDB = axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    params:{
        api_key:'8a1c51470273acbb892a2392c7f56685',
        language:'es-ES'
    }
});


export default movieDB;