import { AsyncState } from '@/components/common/AsyncState'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { useToastStore } from '@/app/toastStore'
import { cartApi } from '@/features/cart/cartApi'
import { useAuthStore } from '@/features/auth/authStore'
import { useAsync } from '@/hooks/useAsync'
import { getApiError } from '@/lib/axios'
import { currency } from '@/utils/format'

export function CartPage() {
  const user = useAuthStore((state) => state.user)
  const toast = useToastStore((state) => state.show)
  const request = useAsync(() => user ? cartApi.getByUser(user.id) : Promise.resolve([]), [user?.id])
  const cart = request.data?.[0]
  const update = async (id: number, quantity: number) => {
    try { await cartApi.updateItem(id, quantity); await request.refetch(); toast('Cart updated', 'success') } catch (error) { toast(getApiError(error), 'error') }
  }
  const remove = async (id: number) => {
    try { await cartApi.removeItem(id); await request.refetch(); toast('Item removed', 'success') } catch (error) { toast(getApiError(error), 'error') }
  }
  const total = cart?.items.reduce((sum, item) => sum + Number(item.subtotal), 0) ?? 0
  return <>
    <PageHeader title="Cart" description="Review items and quantities before checkout." />
    <AsyncState loading={request.loading} error={request.error} empty={!cart?.items.length} onRetry={request.refetch}>
      {cart ? <section className="split-layout">
        <div className="card cart-list">{cart.items.map((item) => <article className="cart-item" key={item.id}><div className="cart-item__art">▣</div><div><strong>{item.title}</strong><small>{currency(item.price)} each</small></div><div className="quantity"><button onClick={() => update(item.id, Math.max(1, item.quantity - 1))}>−</button><span>{item.quantity}</span><button onClick={() => update(item.id, item.quantity + 1)}>+</button></div><strong>{currency(item.subtotal)}</strong><Button variant="ghost" onClick={() => remove(item.id)}>×</Button></article>)}</div>
        <aside className="card summary-card"><h2>Order summary</h2><div><span>Subtotal</span><strong>{currency(total)}</strong></div><div><span>Shipping</span><strong>Free</strong></div><div className="summary-card__total"><span>Total</span><strong>{currency(total)}</strong></div><Button onClick={() => toast('Checkout calls POST /orders when enabled by the backend.', 'info')}>Proceed to checkout</Button></aside>
      </section> : null}
    </AsyncState>
  </>
}
