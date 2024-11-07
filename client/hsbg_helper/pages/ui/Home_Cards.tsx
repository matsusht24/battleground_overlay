import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
type TopicType = 'Hero'|'Lesser'|'Greater'|'Composition';

const cardDict = {
    'Hero': {name:'Hero Selection', link: '/hero/page', img: 'hero'},
    'Lesser': {name:'Lesser Trinket Selection', link: '/trinket/lesser', img: 'lesser'},
    'Greater': {name:'Greater Trinket Selection', link: '/trinket/greater', img: 'greater'},
    'Composition': {name:'Composition Selection', link: '/comp/page', img: 'comp'},
};

function Home_Cards({topic}: {topic: TopicType}) {
    const curCard = cardDict[topic];
    return (
        <div>
        <Link href={curCard.link}>
        <Image src={`/home_portraits/${curCard.img}.png`}
            width={350}
            height={371}
            alt={curCard.name} 
            />
        </Link>
        <h1 className='font-bold text-xl'>{curCard.name}</h1>
        </div>
    )
}

export default Home_Cards