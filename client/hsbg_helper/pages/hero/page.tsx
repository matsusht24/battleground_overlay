import React, {useEffect, useState, createContext, Suspense} from 'react'
import HeroCard from '../ui/hero_card'
import { useQuery } from '@tanstack/react-query';
import { fetchHeroes } from '../api/hello';

const compareTiers = (heroes: Array<string>, heroData: Record<string,string>) => {
  const tierOrder = { S: 1, A: 2, B: 3, C: 4, D: 5, F: 6 };
  let bestHero = '';
  let curTier = 'F';

  heroes.forEach((hero) => {
    if (
      !bestHero ||
      tierOrder[heroData[hero]] < tierOrder[curTier]
    ) {
      bestHero = hero;
      curTier = heroData[hero];
    } else if (!bestHero ||
      tierOrder[heroData[hero]] == tierOrder[curTier]){
        bestHero = bestHero+" / "+hero;
      }
  });
  return bestHero;
};

function Page() {
  
  const [selectedHeroes, setSelectedHeroes] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
  });
  
  const {data, status} = useQuery({
    queryKey: ['heroes'], // The key for caching
    queryFn: fetchHeroes, // The function to fetch data
  });

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  if (status === 'error'){
    return <p>Error!</p>;
  }

  const handleSelect = (position: number, hero:string) => {
    setSelectedHeroes((prev) => ({
      ...prev,
      [position]: hero,
    }));
  };

  const bestHero = compareTiers(Object.values(selectedHeroes).filter(Boolean),data.heroData);
  
  return (
        <main className='m-10'>
          <header className='text-center font-bold text-4xl p-12'>Hero Selection</header>
          <div className='flex justify-between'>
    
          {[1, 2, 3, 4].map((pos) => (
        <HeroCard
          key={pos}
          position={pos}
          heroData={data.heroData}
          onSelect={(hero:string) => handleSelect(pos, hero)}
        />
      ))}
            
          </div>  
          {bestHero && <h2>Best Hero: {bestHero}</h2>}
        </main>
        
  )
}

export default Page;