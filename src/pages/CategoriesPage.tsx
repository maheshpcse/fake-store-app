import { AsyncState } from '@/components/common/AsyncState'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { useToastStore } from '@/app/toastStore'
import { categoryApi } from '@/features/categories/categoryApi'
import { useAsync } from '@/hooks/useAsync'
import type { Category } from '@/types'

export function CategoriesPage() {
  const request = useAsync(() => categoryApi.list(false), [])
  const toast = useToastStore((state) => state.show)
  const columns: Column<Category>[] = [
    { key: 'name', header: 'Category', render: (row) => <div className="table-primary">{row.image ? <img src={row.image} alt="" /> : <span className="table-avatar">{row.name[0]}</span>}<div><strong>{row.name}</strong><small>{row.description || 'No description'}</small></div></div> },
    { key: 'status', header: 'Status', render: (row) => <Badge tone={row.is_active ? 'success' : 'neutral'}>{row.is_active ? 'Active' : 'Inactive'}</Badge> },
    { key: 'action', header: '', render: () => <Button variant="ghost" onClick={() => toast('Category updates call PATCH /categories/{id}.', 'info')}>Edit</Button> },
  ]
  return <>
    <PageHeader title="Categories" description="Organize the catalog into easy-to-browse collections." actions={<Button onClick={() => toast('Category creation calls POST /categories.', 'info')}>+ Add category</Button>} />
    <section className="card table-card"><AsyncState loading={request.loading} error={request.error} empty={!request.data?.length} onRetry={request.refetch}>{request.data ? <DataTable columns={columns} rows={request.data} rowKey={(row) => row.id} /> : null}</AsyncState></section>
  </>
}
