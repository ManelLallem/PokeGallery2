import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';

function Gallery(props) {
    const [data, setData] = useState(null);
    const [pokemons, setPokemons] = useState([]);

  const getData = async () => {
    let next_res = null
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=50"
    );
    setData(response);
    for (const myurl of response.data.results) {
        next_res = await axios.get(myurl.url);
        setPokemons((prevPokemons) => [...prevPokemons, next_res]);
      }
  };

  useEffect(() => {
    data?(console.log(data)):("")
  }, [data]);
  useEffect(() => {
    pokemons?(console.log(pokemons)):("")
  }, [pokemons]);
    return (
        <div>
            <div id='search'></div>
            <div id='gallery'>
                <input type="text" value="button" onClick={()=>getData()} />
            </div>
        </div>
    );
}

export default Gallery;