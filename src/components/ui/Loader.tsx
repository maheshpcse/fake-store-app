export function Loader({ label = 'Loading data…' }: { label?: string }) {
  return <div className="state"><span className="loader" /><p>{label}</p></div>
}
