import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import './gallery.css'
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

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.data.forms[0].name.toLowerCase().includes(pokename.toLowerCase())
  );
    return (
        <div id='container'>
            
            <div id='search'>
                <h1>Poke Gallery</h1>
                <input id='search-bar' type="text" placeholder='Search for a pokemon by its name' onChange={(e)=>setName(e.target.value)}/>
                <input id='btn' type="button" value="search" />
            </div>
            <div id='gallery'>
                {filteredPokemons?(filteredPokemons.map((pokemon,index)=>(
                    <div key={index} className='my-pokemon'>
                    <img  src={pokemon.data.sprites.other['official-artwork'].front_default}/>
                    <p> {pokemon.data.forms[0].name}</p>
                    </div>

                ))):("loading")}
            </div>
        </div>
    );
}

export default Gallery;