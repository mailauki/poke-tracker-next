import Link from 'next/link'

export default function PersonComponent({ pokemon }) {
  return (
    <li>
      <Link href="/pokemon/[id]" as={`/pokemon/${pokemon.name}`}>
        {pokemon.name}
      </Link>
    </li>
  )
}