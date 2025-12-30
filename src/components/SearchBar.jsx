export default function SearchBar({ search, setSearch }) {
  return (
    <input
      className="form-control my-2"
      placeholder="Search node..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  )
}
