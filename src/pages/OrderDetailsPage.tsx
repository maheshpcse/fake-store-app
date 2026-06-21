import { Link, useParams } from 'react-router-dom'
import { AsyncState } from '@/components/common/AsyncState'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { orderApi } from '@/features/orders/orderApi'
import { useAsync } from '@/hooks/useAsync'
import { currency, dateTime, titleCase } from '@/utils/format'
import { statusTone } from '@/utils/status'

export function OrderDetailsPage() {
  const id = Number(useParams().id)
  const request = useAsync(() => orderApi.get(id), [id])
  return <>
    <Link className="back-link" to="/orders">← Back to orders</Link>
    <PageHeader title={`Order #${id}`} description="Order items, totals, and fulfillment status." />
    <AsyncState loading={request.loading} error={request.error} onRetry={request.refetch}>
      {request.data ? <section className="dashboard-grid">
        <article className="card section-card"><div className="card__head"><div><h2>Order items</h2><p>{request.data.items?.length ?? 0} line items</p></div><Badge tone={statusTone(request.data.status)}>{titleCase(request.data.status)}</Badge></div>
          <div className="cart-list">{request.data.items?.map((item) => <div className="cart-item" key={item.id}><div className="cart-item__art">▣</div><div><strong>{item.title}</strong><small>{currency(item.price)} × {item.quantity}</small></div><strong>{currency(item.subtotal)}</strong></div>)}</div>
        </article>
        <aside className="card summary-card"><h2>Summary</h2><div><span>Placed</span><strong>{dateTime(request.data.ordered_at)}</strong></div><div><span>Payment</span><strong>{request.data.payment_method}</strong></div><div><span>Subtotal</span><strong>{currency(request.data.total_amount, request.data.currency)}</strong></div><div><span>Discount</span><strong>−{currency(request.data.discount, request.data.currency)}</strong></div><div className="summary-card__total"><span>Total</span><strong>{currency(request.data.final_amount, request.data.currency)}</strong></div></aside>
      </section> : null}
    </AsyncState>
  </>
}
