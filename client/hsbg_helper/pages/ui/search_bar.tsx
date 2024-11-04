import { HtmlContext } from 'next/dist/server/route-modules/pages/vendored/contexts/entrypoints';
import { useState, ChangeEvent, useEffect} from 'react';
import HeroCard from './hero_card';

type SearchBarProps = {
  onHeroSelect: (hero:string)=>void,
  heroData: Record<string,string>
};

export default function SearchBar({ onHeroSelect, heroData}: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState(['']);

  const heroes = Object.keys(heroData);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);  
    if (value.length > 0) {
      const filtered = heroes.filter((heroes) =>
        heroes.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]); // Hide suggestions if input is empty
    }
    };

 

  const handleSelectHero = (hero: string) => {
    setInputValue(hero);
    onHeroSelect(hero);  // Call the parent component function
    setFilteredSuggestions([]);
    
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search..."
        className='w-auto pl-2'
      />
     {inputValue.length > 0 && filteredSuggestions.length > 0 && (
        <ul className="suggestions-list pl-2">
          {filteredSuggestions.map((hero, index) => (
            <li key={index} className="suggestion-item" onClick={() => handleSelectHero(hero)}>
              {hero}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
