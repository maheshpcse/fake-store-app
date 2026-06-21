import { useToastStore } from '@/app/toastStore'

export function ToastViewport() {
  const { items, remove } = useToastStore()
  return (
    <div className="toast-viewport" aria-live="polite">
      {items.map((item) => (
        <button key={item.id} className={`toast toast--${item.type}`} onClick={() => remove(item.id)}>
          {item.message}<span>×</span>
        </button>
      ))}
    </div>
  )
}
