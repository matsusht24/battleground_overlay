import React, {useEffect, useState, createContext, Suspense} from 'react'
import TrinketCard from '../ui/trinket_card'
import { useQuery } from '@tanstack/react-query';
import { fetchLesserTrinkets } from '../api/hello';
import Header from '../ui/header';
import NextButton from '../ui/NextButton';

const compareTiers = (trinketes: Array<string>, trinketData: Record<string,string>) => {
  const tierOrder = { S: 1, A: 2, B: 3, C: 4, D: 5, F: 6 };
  let bestTrinket = '';
  let curTier = 'F';

  trinketes.forEach((trinket) => {
    if (
      !bestTrinket ||
      tierOrder[trinketData[trinket]] < tierOrder[curTier]
    ) {
      bestTrinket = trinket;
      curTier = trinketData[trinket];
    } else if (!bestTrinket ||
      tierOrder[trinketData[trinket]] == tierOrder[curTier]){
        bestTrinket = bestTrinket+" / "+trinket;
      }
  });
  return bestTrinket;
};

function Page() {
  
  const [selectedTrinkets, setSelectedTrinkets] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
  });
  
  const {data, status} = useQuery({
    queryKey: ['lesser'], // The key for caching
    queryFn: fetchLesserTrinkets, // The function to fetch data
  });

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  if (status === 'error'){
    return <p>Error!</p>;
  }

  const handleSelect = (position: number, trinket:string) => {
    setSelectedTrinkets((prev) => ({
      ...prev,
      [position]: trinket,
    }));
  };

  const bestTrinket = compareTiers(Object.values(selectedTrinkets).filter(Boolean),data.trinketData);
  
  return (
        <div>
          <Header header_name='Lesser Trinket Selection' />
          <div className='flex justify-between'>
    
          {[1, 2, 3, 4].map((pos) => (
        <TrinketCard
          key={pos}
          position={pos}
          trinketData={data.trinketData}
          onSelect={(trinket:string) => handleSelect(pos, trinket)}
        />
      ))}
            
          </div>  
          {bestTrinket && <h2>Best trinket: {bestTrinket}</h2>}
          <NextButton next_link='/trinket/greater'/>
        </div>
        
  )
}

export default Page;