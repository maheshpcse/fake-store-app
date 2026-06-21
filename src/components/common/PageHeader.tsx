import type { ReactNode } from 'react'

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <header className="page-header">
      <div><p className="eyebrow">Fake Store System</p><h1>{title}</h1>{description ? <p>{description}</p> : null}</div>
      {actions ? <div className="page-header__actions">{actions}</div> : null}
    </header>
  )
}
