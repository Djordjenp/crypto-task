import {useParams} from "react-router-dom";
import styles from './CurrencyDetails.module.css'
import TheTable from "../../components/TheTable/TheTable";
import {useFetch} from "../../hooks/useFetch";
import useStore from "../../store/store";

const CurrencyDetails = () => {

    const {symbol} = useParams();

    const addToFavorites = useStore(state => state.addToFavorites)
    const favorites = useStore(state => state.favorites)
    const isLoggedIn = useStore(state => state.loggedIn)

    const [currencyDetails, error] = useFetch(`/pubticker/${symbol}`);

    const addFavoriteCurrency = () => {
        if (favorites.includes(symbol)) return;
        const newFavoriteData = JSON.stringify(favorites.concat([symbol]))
        localStorage.setItem('favorites', newFavoriteData)
        addToFavorites(symbol)
    }


    return (
        <section className={`${styles.details__section}`}>
            { error ? <p>Oops, something went wrong</p> :
               <>
                    <TheTable headers={['Symbol', "Last Price", "High", "Low"]}>
                        <p>{symbol}</p>
                        <p>{currencyDetails?.last_price}</p>
                        <p>{currencyDetails?.high}</p>
                        <p>{currencyDetails?.low}</p>
                    </TheTable>
                    {(favorites.some(currency => currency === symbol) ||  !isLoggedIn ) ? null :  <button onClick={addFavoriteCurrency} className={`${styles['button-add']} btn`}>Add To Favorites</button>}
               </>
            }

        </section>
    )
}

export default CurrencyDetails;