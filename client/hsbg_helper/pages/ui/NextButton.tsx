import React from 'react'
import Link from 'next/link'

type NextLinkProps = {
    next_link: LinkType,
};

type LinkType = "/hero/page"|"/trinket/lesser"|"/trinket/greater"|"/comp/page"|"/";
const pages = {
  "/hero/page": "Hero",
  "/trinket/lesser": "Lesser Trinket",
  "/trinket/greater": "Greater Trinket",
  "/comp/page": "Composition",
  "/": "Home"
};
function NextButton({next_link}: NextLinkProps) {
  const link_name = pages[next_link];
  return (
    <footer className="relative">
          <Link className="absolute right-0 top-4 p-1.5 bg-orange-300 font-bold" href={next_link}>{`${link_name} ->`}</Link>
    </footer>
  )
}

export default NextButton