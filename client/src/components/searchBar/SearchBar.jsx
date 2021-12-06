import React, {useState} from 'react'
import './searchBar.css'
import { Search, Close } from "@material-ui/icons"

function SearchBar({placeholder, data}) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchTerm = event.target.value;
        setWordEntered(searchTerm);
        const newFilter = data.filter((value) => {
           if (value.desc) {
               return value.desc.toLowerCase().includes(searchTerm.toLowerCase())
           } else if (value.username) {
               return value.username.toLowerCase().includes(searchTerm.toLowerCase())
           }
        });
        if (searchTerm === "") {
            setFilteredData([]);
        } else{
        setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    }

    return (
        <div className="search">
            <div className="searchInputs">
                <input className="inputText" type="text" placeholder={placeholder} value = {wordEntered} onChange={handleFilter}/>
                <div className="searchIcon">
                    {filteredData.length === 0 ? (
                    <Search /> 
                    ) : (
                    <Close id="clearBtn" onClick={clearInput}/>
                    )} 
                </div>
            </div>
            { filteredData.length !== 0 &&
            <div className="dataResult">
                {filteredData.slice(0,15).map((value, key) => {
                    return <a className="dataItem"><p>
                    {
                        value.desc 
                        ? value.desc
                        : value.username
                    }
                    </p></a>
                })}
            </div>}
        </div>
    )
}

export default SearchBar
