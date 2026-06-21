import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AsyncState } from '@/components/common/AsyncState'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { categoryApi } from '@/features/categories/categoryApi'
import { productApi } from '@/features/products/productApi'
import { wishlistApi } from '@/features/wishlist/wishlistApi'
import { useAuthStore } from '@/features/auth/authStore'
import { useAsync } from '@/hooks/useAsync'
import { useToastStore } from '@/app/toastStore'
import { getApiError } from '@/lib/axios'
import { currency } from '@/utils/format'

export function ProductsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const user = useAuthStore((state) => state.user)
  const toast = useToastStore((state) => state.show)
  const products = useAsync(() => productApi.list({ search: search || undefined, category: category || undefined, limit: 100 }), [search, category])
  const categories = useAsync(() => categoryApi.list(), [])
  const addWishlist = async (productId: number) => {
    if (!user) return
    try { await wishlistApi.add({ user_id: user.id, product_id: productId }); toast('Added to wishlist', 'success') }
    catch (error) { toast(getApiError(error), 'error') }
  }
  return (
    <>
      <PageHeader title="Products" description="Search, inspect, and manage your product catalog." actions={<Button onClick={() => toast('Product creation calls POST /products. Add that backend route to enable it.', 'info')}>+ Add product</Button>} />
      <section className="toolbar card">
        <Input aria-label="Search products" placeholder="Search products…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.data?.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}
        </select>
        <span className="toolbar__count">{products.data?.length ?? 0} results</span>
      </section>
      <AsyncState loading={products.loading} error={products.error} empty={!products.data?.length} onRetry={products.refetch}>
        <section className="product-grid">
          {products.data?.map((product) => (
            <article className="product-card" key={product.id}>
              <Link className="product-card__image" to={`/products/${product.id}`}><img src={product.image} alt={product.title} /></Link>
              <div className="product-card__body">
                <div className="form-row form-row--between"><Badge tone="info">{product.category}</Badge><span className="rating">★ {product.rating_rate}</span></div>
                <Link to={`/products/${product.id}`}><h2>{product.title}</h2></Link>
                <div className="product-card__foot"><strong>{currency(product.price)}</strong><Button variant="ghost" aria-label="Add to wishlist" onClick={() => addWishlist(product.id)}>♡</Button></div>
              </div>
            </article>
          ))}
        </section>
      </AsyncState>
    </>
  )
}
