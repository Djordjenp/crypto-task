import {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch";
import CurrencyBar from "../../components/CurrencyBar/CurrencyBar";
import styles from './Home.module.css'
import TheTable from "../../components/TheTable/TheTable";
import useStore from "../../store/store";

function Home() {

    const [topCurrencies, setTopCurrencies] = useState(null);
    const [currencies, error] = useFetch('/symbols');

    useEffect(() => {
        if (currencies){
            const firstFive = currencies.slice(0, 5)
            setTopCurrencies(firstFive)
        }

    }, [currencies, error])



    return (
        <main className={`${styles.home}`} >
            {error ?  <p>Oops, something went wrong</p> :
                <TheTable headers={['Symbol', 'Last Price', 'Daily Change', 'Daily Change Percent', 'Daily High', "Daily Low"]}>
                    {topCurrencies?.map(currency => <CurrencyBar key={currency}  currency={currency.toUpperCase()} />)}
                </TheTable>
            }

        </main>
    );
}

export default Home;
