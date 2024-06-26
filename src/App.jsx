import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header';
import PokemonList from './PokemonList';

function MainPage() {
    const [AllPokemon, setAllPokemon] = useState(null)
    const [filter, setFilter] = useState('asc-num')
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        async function fetchAllPkmn() {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=649&offset=0')
                const data = await res.json()
                setAllPokemon(data.results)         
            } catch (error) {
                console.error(error)
            }
        }
        fetchAllPkmn()
    }, [])

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter)
    }

    const handleSearch = (search) => {
        setSearchInput(search)
    }

    return (
        <main>
            <Header onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    searchInput={searchInput}
            />
            <PokemonList allPkmn={AllPokemon}
                        filter={filter} 
                        searchInput={searchInput}
            />
        </main>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MainPage />)