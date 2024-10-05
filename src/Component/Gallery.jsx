import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';

function Gallery(props) {
    const [data, setData] = useState(null);
    const [pokemons, setPokemons] = useState([]);
    let [pokename,setName] = useState("")
  const getData = async () => {
    let next_res = null
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=50"
    );
    setData(response);

    const allPokemons = [];

    for (const myurl of response.data.results) {
      const next_res = await axios.get(myurl.url);
      allPokemons.push(next_res); // Push the data to the array
    }
  
    // Update the state once with all the collected Pokémon
    setPokemons(allPokemons);
  };
  useEffect(()=>{getData()},[])
  useEffect(() => {
    data?(console.log(data)):("")
  }, [data]);
  useEffect(() => {
    pokemons?(console.log(pokemons)):("")
  }, [pokemons]);
    return (
        <div>
            <div id='search'>
                <input type="text" placeholder='Search for a pokemon by its name' onChange={(e)=>setName(e.target.value)}/>
                <input type="button" value="search" />
            </div>
            <div id='gallery'>
                {pokemons?(pokemons.map((pokemon,index)=>(
                    <img key={index} src={pokemon.data.sprites.other['official-artwork'].front_default}/>
                ))):("loading")}
            </div>
        </div>
    );
}

export default Gallery;