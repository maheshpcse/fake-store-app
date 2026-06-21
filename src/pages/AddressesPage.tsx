import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { useToastStore } from '@/app/toastStore'
import { useAuthStore } from '@/features/auth/authStore'

export function AddressesPage() {
  const user = useAuthStore((state) => state.user)
  const toast = useToastStore((state) => state.show)
  const hasSeedAddress = Boolean(user?.street || user?.city)
  return <>
    <PageHeader title="Addresses" description="Delivery and billing locations for your account." actions={<Button onClick={() => toast('Address creation calls POST /users/{userId}/addresses.', 'info')}>+ Add address</Button>} />
    {hasSeedAddress ? <section className="address-grid"><article className="card address-card"><div className="form-row form-row--between"><span className="address-card__icon">⌂</span><span className="badge badge--success">Primary</span></div><h2>Home</h2><p>{user?.street_number} {user?.street}<br />{user?.city}, {user?.zipcode}</p><div className="form-row"><Button variant="secondary" onClick={() => toast('Address updates call PATCH /addresses/{id}.', 'info')}>Edit</Button><Button variant="ghost">Remove</Button></div></article></section> :
      <div className="state"><span className="state__icon">⌖</span><h3>No address returned in this session</h3><p>The backend can expose <code>GET /users/{'{userId}'}/addresses</code> to populate this page.</p></div>}
  </>
}
