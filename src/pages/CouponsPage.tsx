import { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { couponApi } from '@/features/coupons/couponApi'
import { getApiError } from '@/lib/axios'
import type { Coupon } from '@/types'
import { currency, dateTime } from '@/utils/format'

export function CouponsPage() {
  const [code, setCode] = useState('')
  const [coupon, setCoupon] = useState<Coupon | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const lookup = async () => {
    setLoading(true); setError(''); setCoupon(null)
    try { setCoupon(await couponApi.get(code)) } catch (err) { setError(getApiError(err)) } finally { setLoading(false) }
  }
  return <>
    <PageHeader title="Coupons" description="Validate coupon codes against the backend." />
    <section className="card coupon-search"><div><h2>Coupon lookup</h2><p>Enter a code to see its rules and current validity.</p></div><div className="form-row"><Input placeholder="e.g. WELCOME10" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} /><Button disabled={!code} loading={loading} onClick={lookup}>Check code</Button></div></section>
    {error ? <div className="alert alert--error">{error}</div> : null}
    {coupon ? <section className="card coupon-card"><div><Badge tone={coupon.is_active ? 'success' : 'danger'}>{coupon.is_active ? 'Active' : 'Inactive'}</Badge><h2>{coupon.code}</h2><p>{coupon.discount_type === 'percentage' ? `${coupon.discount_value}% off` : `${currency(coupon.discount_value)} off`} orders over {currency(coupon.min_order_amount)}.</p></div><dl><div><dt>Used</dt><dd>{coupon.used_count} / {coupon.usage_limit}</dd></div><div><dt>Valid from</dt><dd>{dateTime(coupon.valid_from)}</dd></div><div><dt>Valid until</dt><dd>{dateTime(coupon.valid_until)}</dd></div></dl></section> : null}
  </>
}
