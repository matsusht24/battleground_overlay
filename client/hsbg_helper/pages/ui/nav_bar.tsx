import Link from 'next/link';
import React from 'react'

function Nav_bar() {
    const pages = {'Hero': "/hero/page", 'Lesser Trinket': "/trinket/lesser", 'Greater Trinket': "/trinket/greater", 'Composition': "/comp/page"};
  return (
    <nav>
        <ul className='flex gap-8 h-auto w-auto'>
        {Object.entries(pages).map(([name, url]) => (
            
            <li key={name} className='font-bold w-auto' >
                
                <Link href={url} className='text-xl'>{name}</Link>
            </li>
        ))}
        </ul>
        
        
    </nav>
    
  )
}

export default Nav_bar