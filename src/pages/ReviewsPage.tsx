import { useState } from 'react'
import { AsyncState } from '@/components/common/AsyncState'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { productApi } from '@/features/products/productApi'
import { useAsync } from '@/hooks/useAsync'
import { dateTime } from '@/utils/format'

export function ReviewsPage() {
  const [productId, setProductId] = useState(1)
  const request = useAsync(() => productApi.reviews(productId), [productId])
  return <>
    <PageHeader title="Reviews" description="Inspect feedback for a selected product." />
    <section className="toolbar card"><Input label="Product ID" type="number" min="1" value={productId} onChange={(e) => setProductId(Number(e.target.value))} /><Button variant="secondary" onClick={request.refetch}>Refresh</Button></section>
    <section className="card section-card"><AsyncState loading={request.loading} error={request.error} empty={!request.data?.length} onRetry={request.refetch}>
      <div className="review-list">{request.data?.map((review) => <article className="review" key={review.id}><div className="review__head"><div><strong>{review.title}</strong><small className="block">{review.username} • {dateTime(review.created_at)}</small></div><span>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span></div><p>{review.comment}</p></article>)}</div>
    </AsyncState></section>
  </>
}
