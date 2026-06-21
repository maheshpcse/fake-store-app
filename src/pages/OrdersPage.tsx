import { Link } from 'react-router-dom'
import { AsyncState } from '@/components/common/AsyncState'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { orderApi } from '@/features/orders/orderApi'
import { useAsync } from '@/hooks/useAsync'
import type { Order } from '@/types'
import { currency, dateTime } from '@/utils/format'
import { statusTone } from '@/utils/status'

export function OrdersPage() {
  const request = useAsync(() => orderApi.list({ limit: 100 }), [])
  const columns: Column<Order>[] = [
    { key: 'id', header: 'Order', render: (row) => <Link to={`/orders/${row.id}`}><strong>#{row.id}</strong></Link> },
    { key: 'customer', header: 'Customer', render: (row) => `User #${row.user_id}` },
    { key: 'date', header: 'Placed', render: (row) => dateTime(row.ordered_at) },
    { key: 'payment', header: 'Payment', render: (row) => row.payment_method },
    { key: 'status', header: 'Status', render: (row) => <Badge tone={statusTone(row.status)}>{row.status}</Badge> },
    { key: 'total', header: 'Total', render: (row) => <strong>{currency(row.final_amount, row.currency)}</strong> },
  ]
  return <>
    <PageHeader title="Orders" description="Track every order from placement through delivery." />
    <section className="card table-card"><AsyncState loading={request.loading} error={request.error} empty={!request.data?.length} onRetry={request.refetch}>{request.data ? <DataTable columns={columns} rows={request.data} rowKey={(row) => row.id} /> : null}</AsyncState></section>
  </>
}
