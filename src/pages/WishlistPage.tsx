import { Link } from 'react-router-dom'
import { AsyncState } from '@/components/common/AsyncState'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { useToastStore } from '@/app/toastStore'
import { useAuthStore } from '@/features/auth/authStore'
import { wishlistApi } from '@/features/wishlist/wishlistApi'
import { useAsync } from '@/hooks/useAsync'
import { getApiError } from '@/lib/axios'
import { currency } from '@/utils/format'

export function WishlistPage() {
  const user = useAuthStore((state) => state.user)
  const toast = useToastStore((state) => state.show)
  const request = useAsync(() => user ? wishlistApi.getByUser(user.id) : Promise.reject(new Error('No authenticated user')), [user?.id])
  const remove = async (id: number) => {
    try { await wishlistApi.remove(id); await request.refetch(); toast('Removed from wishlist', 'success') } catch (error) { toast(getApiError(error), 'error') }
  }
  return <>
    <PageHeader title="Wishlist" description="Products saved for later." />
    <AsyncState loading={request.loading} error={request.error} empty={!request.data?.items.length} onRetry={request.refetch}>
      <section className="product-grid">{request.data?.items.map((item) => <article className="product-card" key={item.id}><Link className="product-card__image" to={`/products/${item.product_id}`}><img src={item.image} alt={item.title} /></Link><div className="product-card__body"><small>{item.category}</small><Link to={`/products/${item.product_id}`}><h2>{item.title}</h2></Link><div className="product-card__foot"><strong>{currency(item.price)}</strong><Button variant="ghost" onClick={() => remove(item.id)}>Remove</Button></div></div></article>)}</section>
    </AsyncState>
  </>
}
