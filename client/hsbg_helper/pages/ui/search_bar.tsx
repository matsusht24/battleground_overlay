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
  const [activeIndex, setActiveIndex] = useState(-1);
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

 
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      
      if (e.key === 'ArrowDown') {
        // Move down in suggestions
        setActiveIndex((prevIndex) =>
          prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (e.key === 'ArrowUp') {
        // Move up in suggestions
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
      } else if (e.key === 'Enter') {
        // Select the active suggestion
        if (activeIndex >= 0 && activeIndex < filteredSuggestions.length) {
          setInputValue(filteredSuggestions[activeIndex]);
          setFilteredSuggestions([]);
          setActiveIndex(-1); // Reset index after selection
          onHeroSelect(filteredSuggestions[activeIndex]); 
        }
      }
    };
  
  const handleSelectHero = (hero: string) => {
    setInputValue(hero);
    onHeroSelect(hero);  // Call the parent component function
    setFilteredSuggestions([]);
    setActiveIndex(-1);
    
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={handleKeyDown}
      />
     {inputValue.length > 0 && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((hero, index) => (
            <li key={index} 
                className={`p-2 cursor-pointer ${index === activeIndex ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                onClick={() => handleSelectHero(hero)}>
              {hero}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
