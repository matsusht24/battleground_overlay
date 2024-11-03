import React, {useEffect, useState} from 'react'
import HeroCard from '../ui/hero_card'


function Page() {
  const [heroData, setHeroData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/heroes'); 
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setHeroData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchHeroData();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!heroData.length) return <p>Loading...</p>;


  return (
        <main className='m-10'>
          <header className='text-center font-bold text-4xl p-12'>Hero Selection</header>
          <div className='flex justify-between'>
              <HeroCard position='1'/>
              <HeroCard position='2'/>
              <HeroCard position='3'/>
              <HeroCard position='4'/>
          </div>  
        </main>
        
  )
}

export default Page;