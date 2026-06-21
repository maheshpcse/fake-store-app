import type { PropsWithChildren } from 'react'

export function Modal({ open, title, children, onClose }: PropsWithChildren<{ open: boolean; title: string; onClose: () => void }>) {
  if (!open) return null
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal__head"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close">×</button></div>
        {children}
      </section>
    </div>
  )
}
