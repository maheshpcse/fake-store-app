import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return <main className="not-found"><strong>404</strong><h1>That page wandered off.</h1><p>The route you requested does not exist.</p><Link className="button button--primary" to="/">Return to dashboard</Link></main>
}
