import Link from 'next/link'

export default function PersonComponent({ item }) {
  return (
    <li>
      <Link href="/item/[id]" as={`/item/${item.name}`}>
        {item.name}
      </Link>
    </li>
  )
}