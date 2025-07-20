import React from 'react'



// Pokeball SVG as a React component
const PokeballLogo = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
    <circle cx="24" cy="24" r="22" fill="#fff" stroke="#222" strokeWidth="4"/>
    <path d="M2 24h44" stroke="#222" strokeWidth="4"/>
    <circle cx="24" cy="24" r="8" fill="#fff" stroke="#222" strokeWidth="4"/>
    <circle cx="24" cy="24" r="4" fill="#F00" stroke="#222" strokeWidth="2"/>
    <path d="M2 24a22 22 0 0 1 44 0" stroke="#F00" strokeWidth="4" fill="none"/>
  </svg>
)

const Header = () => {
  return (
    <div className="w-full bg-pokedex-gray text-white flex items-center justify-center min-h-18 shadow-lg text-xl font-bold tracking-wide rounded-t-3xl py-4">
      <div className="flex items-center justify-center w-full">
        <PokeballLogo />
        <h1 className="m-0 ml-3">Ben's Pokedex</h1>
      </div>
    </div>
  )
}

export default Header 