import useSWR from "swr"

const response = (...args) => fetch(...args).then(res => res.json());
const baseURL = "http://localhost:3000/";    

export default function fetcher(endpoint){
    const {data, error} = useSWR(`${baseURL}${endpoint}`,response);

    return{
        data,
        isLoading: !error && !data,
        isError: error,
    }
}