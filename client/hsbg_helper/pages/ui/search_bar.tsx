import { HtmlContext } from 'next/dist/server/route-modules/pages/vendored/contexts/entrypoints';
import { useState, ChangeEvent, useContext} from 'react';
import HeroCard from './hero_card';

export default function SearchBar({ onHeroSelect}:{ onHeroSelect: (hero:string)=>void}, heroData: Record<string,string>) {
  const [inputValue, setInputValue] = useState('');
  // Example hero names array
  const heroes = ({ heroData }: Record<string, string>) => {
    if (!heroData) {
      return <div>No heroes found.</div>;
    }
  

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelectHero = (hero: string) => {
    setInputValue(hero);
    onHeroSelect(hero);  // Call the parent component function
    
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
      <ul className='pl-2'>
        {heroes
          .filter((hero) => hero.toLowerCase().includes(inputValue.toLowerCase()))
          .map((hero) => (
            <li key={hero} onClick={() => handleSelectHero(hero)}>
              {hero}
            </li>
          ))}
      </ul>
    </div>
  );
}
