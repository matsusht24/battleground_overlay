import { HtmlContext } from 'next/dist/server/route-modules/pages/vendored/contexts/entrypoints';
import { useState, ChangeEvent} from 'react';

export default function SearchBar({ onHeroSelect}:{ onHeroSelect: (hero:string)=>void}) {
  const [inputValue, setInputValue] = useState('');
  
  // Example hero names array
  const heroes = ['A. F. Kay', 'Al\'Akir', 'Alexstrasza', 'Ambassador Faelin'];

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
