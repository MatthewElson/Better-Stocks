import React from 'react';
import { useState, useEffect } from 'react';
// import { SelectedStock } from './SelectedStock';
import SelectedStock from './SelectedStock';

const StockPicker = () => {
    let [searchInput, setSearchInput] = useState([]);
    let [stockInfo, setStockInfo] = useState({});
    const typeInSearch = (event) => {
        if(localStorage.getItem(event.target.value)){
            setSearchInput(JSON.parse(localStorage.getItem(event.target.value)));
            console.log("Used localStorage!")
        }
        else {
            if(event.target.value.length) {
                const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${event.target.value}&apikey=45DWJ20XYHORHS52`;
                try {
                    fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Successfully Called API");
                        setSearchInput(data.bestMatches);
                        localStorage.setItem(event.target.value, JSON.stringify(data.bestMatches));
                    })
                } catch(error) {
                    console.log("Error after calling API!")
                    console.error(error.message);
                }
            }
            else
                setSearchInput([]);
        }
    };

    const clickOnSearchResult = (event) => {
        const targetText = event.target.innerText;
        console.log('targetText :', targetText);
        if(searchInput.length){
            return setStockInfo(searchInput.find((element) => targetText === element["2. name"]));
        }
        
    };

    let dropdownInfo = [];
    if(searchInput.length){
        console.log("SearchInput: ",searchInput);
        dropdownInfo = searchInput.map((val, ind, arr) => {
            if(ind < 5)
            return <div id={val["1. symbol"].replaceAll(" ","") + "-" + ind} value={val["1. symbol"]} onClick={clickOnSearchResult} key={val["1. symbol"] + "-" + ind}>{val["2. name"]}</div>
        });
    }

    return (
        <>
            <h1>Pick a stock you own.</h1>
            <input type="text" id='symbolSearch' onChange={typeInSearch}/>
            <h2>
                {dropdownInfo}
            </h2>
            <div><SelectedStock val={stockInfo} /></div>
        </>
    )
}

export default StockPicker
