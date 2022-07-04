import useStore from "../../store/store";
import styles from "../CurrencyDetails/CurrencyDetails.module.css";
import TheTable from "../../components/TheTable/TheTable";
import CurrencyBar from "../../components/CurrencyBar/CurrencyBar";
import {useEffect, useState} from "react";
import React from 'react'
import axios from "axios";

const Favorites = () => {

    const favoriteCurrencies = useStore(state => state.favorites)
    const [favoriteData, setFavoriteData] = useState(null);

    useEffect(() => {
        console.log(favoriteCurrencies)
        const fetchAllCurrencies = async () => {
          const allPromises =  favoriteCurrencies.map(currency => axios.get(`/pubticker/${currency}`))
            const data = await  Promise.all(allPromises)
            setFavoriteData(data)
        }

        fetchAllCurrencies();
    }, [])


    return (
        <section className={`${styles.details__section}`}>
            { favoriteData ?
            <TheTable headers={['Symbol', "Last Price", "High", "Low"]}>
                {favoriteData?.map(currency => <React.Fragment key={currency?.config?.url?.substring(11)}>
                    <p>{currency?.config?.url?.substring(11)}</p>
                    <p>{currency?.data?.last_price}</p>
                    <p>{currency?.data?.high}</p>
                    <p>{currency?.data?.low}</p>
                </React.Fragment>)}
            </TheTable> :

                <p>Loading...</p>
            }
        </section>
    )
}

export default Favorites