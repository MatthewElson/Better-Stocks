import React from 'react';
import { useState, useEffect } from 'react';

const StockPicker = () => {
    let [stockInfo, setStockInfo] = useState([]);
    useEffect(() => {
        const url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=45DWJ20XYHORHS52";
        try {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setStockInfo(data.bestMatches);
            })
        } catch(error) {
            console.error(error.message);
        }
    },[]);
    console.log("stockInfo: ",stockInfo);
    const dropdownInfo = stockInfo.map((val, ind, arr) => {
        if(ind < 5)
        return <option value={val["1. symbol"]} key={val["1. symbol"] + "-" + ind}>{val["2. name"]}</option>
    });

    return (
        <h2>
            <input type="text" id='symbolSearch'/>
            <div>
                {dropdownInfo}
            </div>
            Uptown funk going to give it to you.
        </h2>
    )
}

export default StockPicker
