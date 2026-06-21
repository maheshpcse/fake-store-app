import { Button } from './Button'
import { Modal } from './Modal'

export function ConfirmDialog({ open, title = 'Are you sure?', message, onConfirm, onClose, loading }: {
  open: boolean; title?: string; message: string; onConfirm: () => void; onClose: () => void; loading?: boolean
}) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <p className="muted">{message}</p>
      <div className="modal__actions">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="danger" loading={loading} onClick={onConfirm}>Confirm</Button>
      </div>
    </Modal>
  )
}
