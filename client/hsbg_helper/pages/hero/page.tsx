import React, {useEffect, useState, createContext, Suspense} from 'react'
import HeroCard from '../ui/hero_card'
import { useQuery } from '@tanstack/react-query';
import { fetchHeroes } from '../api/hello';


function Page() {
  

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
  return (
        <main className='m-10'>
          <header className='text-center font-bold text-4xl p-12'>Hero Selection</header>
          <div className='flex justify-between'>
    
              <HeroCard position='1' heroData={data.heroData}/>
              <HeroCard position='2' heroData={data.heroData}/>
              <HeroCard position='3' heroData={data.heroData}/>
              <HeroCard position='4' heroData={data.heroData}/>
              
            
          </div>  
        </main>
        
  )
}

export default Page;