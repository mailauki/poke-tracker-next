export default function itemHandler(req, res) {
  const data = [{id: 1}, {id: 2}, {id: 3}]
  const { query } = req
  const { id } = query
  const filtered = data.filter((p) => p.id === Number(id))

  return filtered.length > 0
    ? res.status(200).json(filtered[0])
    : res.status(404).json({ message: `Item with id: ${id} not found.` })
}