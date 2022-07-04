import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


function CurrencyBar({currency}) {

    const [data, setData] = useState(null)


    useEffect(() => {
        const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
        ws.addEventListener('open', () => {

            let msg = JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol: `t${currency}`,
        })

        ws.send(msg);
        })

        ws.addEventListener('message', (event) => {

            if (!Array.isArray(JSON.parse(event.data)[1])) return;
            const chanId = JSON.parse(event.data)[0];
            const parsedData = JSON.parse(event.data)[1]
            setData({lastPrice: parsedData[6], dailyChange: parsedData[4], dailyChangePercent: parsedData[5] * 100, dailyHigh: parsedData[8], dailyLow: parsedData[9], channelId:chanId});

        })

    }, [])




    return (
        <>
            <div style={{backgroundColor: '#30ba0d', padding: '.5em 1em', justifySelf: 'center', width: '10rem'}}><Link to={`/CurrencyDetails/${currency}`}><p style={{color: '#fff'}}>{currency}</p></Link></div>
            <p>{data?.lastPrice}</p>
            <p>{data?.dailyChange.toFixed(2)}</p>
            <p>{data?.dailyChangePercent.toFixed(2)}%</p>
            <p>{data?.dailyHigh}</p>
            <p>{data?.dailyLow}</p>
        </>
    )
}

export default CurrencyBar;


// function CurrencyBar({currency}) {
//
//     const [data, setData] = useState(null)
//     const socket = useWebSocket('wss://api-pub.bitfinex.com/ws/2',(sk) => {
//         let msg = JSON.stringify({
//             event: 'subscribe',
//             channel: 'ticker',
//             symbol: `t${currency}`,
//         })
//
//         sk.current.send(msg)
//     }, (event) => {
//         const parsedData = JSON.parse(event.data)
//         console.log(parsedData)
//     })
//
//
//     useEffect(() => {
//         if (socket.current.readyState !== WebSocket.OPEN) return;
//
//         let msg = JSON.stringify({
//             event: 'subscribe',
//             channel: 'ticker',
//             symbol: `t${currency}`,
//         })
//
//         socket.current.send(msg)
//
//
//
//     }, [socket])
//
//
//
//
//     return (
//         <>
//
//         </>
//     )
// }
//
// export default CurrencyBar;

//[
//   19236, - BID
//   18.88780996, - Bid Size
//   19237, - ASK
//   23.121615320000004, // Ask - size
//   -201, - DAILY CHANGE
//   -0.0103, - DAILY CHANGE RELATIVE ( * 100) for percent change
//   19236, - Last Price
//   2339.0695257, - Volume
//   19694 - Daily high
//   18980 - Daily low
// ]