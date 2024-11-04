import React, {useEffect, useState, createContext, Suspense} from 'react'
import HeroCard from '../ui/hero_card'
import { useQuery } from '@tanstack/react-query';
import { fetchHeroes } from '../api/hello';


function Page() {
  const [heroData, setHeroData] = useState<Record<string,string>>({});
  // const [error, setError] = useState(null);
  // const [Loading, setLoading] = useState(true);

  const {data, status} = useQuery({
    queryKey: ['heroes'], // The key for caching
    queryFn: fetchHeroes, // The function to fetch data
  });

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error'){
    return <p>Error!</p>;
  }
 

  // useEffect(() => {
  //   const fetchHeroData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/heroes'); 
  //       if (!response.ok) throw new Error("Failed to fetch data");
  //       const data = await response.json();
  //      setHeroData(data.heroData);       
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }; 
  //   fetchHeroData();

  // }, []);


  // if (error) return <p>Error</p>;
  // if (Loading) return <p>Loading...</p>;

  useEffect(() => {
    if(data) {
      setHeroData(data.heroData);
      console.log(heroData)
    }
  }, [data]);


  return (
        <main className='m-10'>
          <header className='text-center font-bold text-4xl p-12'>Hero Selection</header>
          <div className='flex justify-between'>
            <Suspense fallback={<p>Loading...</p>}>
              <HeroCard position='1' heroData={heroData}/>
              <HeroCard position='2' heroData={heroData}/> 
              <HeroCard position='3' heroData={heroData}/>
              <HeroCard position='4' heroData={heroData}/>
            </Suspense>
              
            
          </div>  
        </main>
        
  )
}

export default Page;