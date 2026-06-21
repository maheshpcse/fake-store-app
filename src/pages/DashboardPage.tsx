import { Link } from 'react-router-dom'
import { AsyncState } from '@/components/common/AsyncState'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { orderApi } from '@/features/orders/orderApi'
import { paymentApi } from '@/features/payments/paymentApi'
import { productApi } from '@/features/products/productApi'
import { useAsync } from '@/hooks/useAsync'
import { currency, dateTime } from '@/utils/format'
import { statusTone } from '@/utils/status'

export function DashboardPage() {
  const request = useAsync(async () => {
    const [products, orders, payments] = await Promise.all([productApi.list({ limit: 100 }), orderApi.list({ limit: 100 }), paymentApi.list()])
    return { products, orders, payments }
  }, [])
  const data = request.data
  const revenue = data?.payments.filter((p) => p.status.toLowerCase() === 'success').reduce((sum, item) => sum + Number(item.amount), 0) ?? 0
  return (
    <>
      <PageHeader title="Dashboard" description="A quick pulse-check across your store." actions={<Link className="button button--primary" to="/products">Browse products</Link>} />
      <AsyncState loading={request.loading} error={request.error} onRetry={request.refetch}>
        {data ? <>
          <section className="stat-grid">
            <article className="stat-card stat-card--accent"><span>Catalog</span><strong>{data.products.length}</strong><small>active products</small></article>
            <article className="stat-card"><span>Orders</span><strong>{data.orders.length}</strong><small>across all customers</small></article>
            <article className="stat-card"><span>Payments</span><strong>{data.payments.length}</strong><small>transactions recorded</small></article>
            <article className="stat-card"><span>Revenue</span><strong>{currency(revenue)}</strong><small>successful payments</small></article>
          </section>
          <section className="dashboard-grid">
            <article className="card">
              <div className="card__head"><div><h2>Recent orders</h2><p>Latest activity from the backend</p></div><Link to="/orders">View all</Link></div>
              <div className="activity-list">
                {data.orders.slice(0, 5).map((order) => <Link to={`/orders/${order.id}`} className="activity" key={order.id}><span className="activity__icon">#</span><div><strong>Order #{order.id}</strong><small>{dateTime(order.ordered_at)}</small></div><Badge tone={statusTone(order.status)}>{order.status}</Badge><b>{currency(order.final_amount, order.currency)}</b></Link>)}
              </div>
            </article>
            <article className="card">
              <div className="card__head"><div><h2>Low stock</h2><p>Products needing attention</p></div><Link to="/products">Catalog</Link></div>
              <div className="activity-list">
                {[...data.products].sort((a, b) => a.stock_quantity - b.stock_quantity).slice(0, 5).map((product) => <Link to={`/products/${product.id}`} className="activity" key={product.id}><img src={product.image} alt="" /><div><strong>{product.title}</strong><small>{product.category}</small></div><Badge tone={product.stock_quantity < 10 ? 'danger' : 'warning'}>{product.stock_quantity} left</Badge></Link>)}
              </div>
            </article>
          </section>
        </> : null}
      </AsyncState>
    </>
  )
}
