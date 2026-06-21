import { Link, useParams } from 'react-router-dom'
import { AsyncState } from '@/components/common/AsyncState'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cartApi } from '@/features/cart/cartApi'
import { productApi } from '@/features/products/productApi'
import { useAuthStore } from '@/features/auth/authStore'
import { useAsync } from '@/hooks/useAsync'
import { useToastStore } from '@/app/toastStore'
import { getApiError } from '@/lib/axios'
import { currency, dateTime } from '@/utils/format'

export function ProductDetailsPage() {
  const id = Number(useParams().id)
  const user = useAuthStore((state) => state.user)
  const toast = useToastStore((state) => state.show)
  const request = useAsync(async () => {
    const [product, reviews] = await Promise.all([productApi.get(id), productApi.reviews(id)])
    return { product, reviews }
  }, [id])
  const addCart = async () => {
    if (!user) return
    try { await cartApi.addItem({ user_id: user.id, product_id: id, quantity: 1 }); toast('Added to cart', 'success') }
    catch (error) { toast(getApiError(error), 'error') }
  }
  return (
    <AsyncState loading={request.loading} error={request.error} onRetry={request.refetch}>
      {request.data ? <>
        <Link className="back-link" to="/products">← Back to products</Link>
        <section className="product-detail card">
          <div className="product-detail__image"><img src={request.data.product.image} alt={request.data.product.title} /></div>
          <div className="product-detail__content">
            <Badge tone="info">{request.data.product.category}</Badge>
            <h1>{request.data.product.title}</h1>
            <div className="product-detail__meta"><span>★ {request.data.product.rating_rate} ({request.data.product.rating_count} reviews)</span><span>{request.data.product.stock_quantity} in stock</span></div>
            <p>{request.data.product.description}</p>
            <strong className="product-detail__price">{currency(request.data.product.price)}</strong>
            <div className="form-row"><Button onClick={addCart}>Add to cart</Button><Button variant="secondary">♡ Wishlist</Button></div>
          </div>
        </section>
        <section className="card section-card"><div className="card__head"><div><h2>Customer reviews</h2><p>Feedback from verified store users</p></div></div>
          {request.data.reviews.length ? <div className="review-list">{request.data.reviews.map((review) => <article key={review.id} className="review"><div className="review__head"><strong>{review.title}</strong><span>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span></div><p>{review.comment}</p><small>{review.username} • {dateTime(review.created_at)}</small></article>)}</div> : <p className="muted">No reviews yet.</p>}
        </section>
      </> : null}
    </AsyncState>
  )
}
