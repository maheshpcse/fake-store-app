import { AsyncState } from '@/components/common/AsyncState'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { useToastStore } from '@/app/toastStore'
import { paymentApi } from '@/features/payments/paymentApi'
import { useAsync } from '@/hooks/useAsync'
import type { Payment } from '@/types'
import { currency, dateTime } from '@/utils/format'
import { statusTone } from '@/utils/status'

export function PaymentsPage() {
  const request = useAsync(() => paymentApi.list(), [])
  const toast = useToastStore((state) => state.show)
  const columns: Column<Payment>[] = [
    { key: 'transaction', header: 'Transaction', render: (row) => <div><strong>{row.transaction_id}</strong><small className="block">Order #{row.order_id}</small></div> },
    { key: 'method', header: 'Method', render: (row) => `${row.method}${row.card_last4 ? ` •••• ${row.card_last4}` : ''}` },
    { key: 'date', header: 'Paid', render: (row) => dateTime(row.paid_at) },
    { key: 'status', header: 'Status', render: (row) => <Badge tone={statusTone(row.status)}>{row.status}</Badge> },
    { key: 'amount', header: 'Amount', render: (row) => <strong>{currency(row.amount, row.currency)}</strong> },
  ]
  return <>
    <PageHeader title="Payments" description="Monitor payment transactions and settlement states." actions={<Button onClick={() => toast('Payment creation calls POST /payments.', 'info')}>+ Record payment</Button>} />
    <section className="card table-card"><AsyncState loading={request.loading} error={request.error} empty={!request.data?.length} onRetry={request.refetch}>{request.data ? <DataTable columns={columns} rows={request.data} rowKey={(row) => row.id} /> : null}</AsyncState></section>
  </>
}
