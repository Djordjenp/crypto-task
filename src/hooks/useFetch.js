import {useEffect, useState} from "react";
import axios from "axios";

export const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchData =  (url) => {
            axios.get(url)
                .then(data => setData(data.data))
                .catch(error => setError(error.response.statusText));
        }

        fetchData(url);

    }, [url])

    return [data, error];
}