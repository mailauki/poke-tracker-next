import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Pokemon from '../components/Pokemon'

export default function Home() {
  const [data, setData] = React.useState([{id: 1}, {id: 2}, {id: 3}])
  const [next, setNext] = React.useState("")
  const [url, setUrl] = React.useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=9")
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    fetch(url)
    .then((r) => r.json())
    .then((data) => {
      setData(data.results)
      setNext(data.next)
    })
  }, [url])
  
  return (
    <div className={styles.container}>
      <Head>
        <title>PokeTracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>
          <a href="/api/hello">Hello</a>
        </h1>

        <ul className={open ? styles.list : styles.grid}>
          {data.map((pokemon) => (
            <Pokemon 
              key={pokemon.name} 
              pokemon={pokemon} 
              open={open} 
              onOpen={(open) => setOpen(open)} 
            />
          ))}
        </ul>

        <button onClick={() => setUrl(next)}>Load More</button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
