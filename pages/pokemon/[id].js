import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'

export default function Person() {
  const { query } = useRouter()
  const [info, setInfo] = React.useState(null)

  React.useEffect(() => {
    if(query.id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${query.id}`)
      .then((r) => r.json())
      .then((data) => setInfo(data))
    }
  }, [query])

  console.log(info)
  
  return (
    <main className={styles.main}>
      <img src={info ? info.sprites.front_default : ""} />
      <h1>{info ? info.name : query.id}</h1>
      {info ? info.types.map((type) => <p key={type.slot}>{type.type.name}</p>) : <></>}
    </main>
  )
}