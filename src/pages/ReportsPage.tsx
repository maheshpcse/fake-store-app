import { useState } from 'react'
import { AsyncState } from '@/components/common/AsyncState'
import { PageHeader } from '@/components/common/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { reportApi, type StageError } from '@/features/reports/reportApi'
import { getApiError } from '@/lib/axios'
import type { ReportBatch } from '@/types'
import { currency, dateTime } from '@/utils/format'
import { statusTone } from '@/utils/status'

export function ReportsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [batchId, setBatchId] = useState('')
  const [batch, setBatch] = useState<ReportBatch | null>(null)
  const [errors, setErrors] = useState<StageError[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const upload = async () => {
    if (!file) return
    setLoading(true); setError('')
    try {
      const result = await reportApi.upload(file)
      setBatch(result); setBatchId(String(result.id))
      setErrors(result.invalid_rows ? await reportApi.errors(result.id) : [])
    } catch (err) { setError(getApiError(err)) } finally { setLoading(false) }
  }
  const lookup = async () => {
    const id = Number(batchId)
    if (!id) return
    setLoading(true); setError('')
    try {
      const result = await reportApi.status(id)
      setBatch(result)
      setErrors(result.invalid_rows ? await reportApi.errors(id) : [])
    } catch (err) { setError(getApiError(err)) } finally { setLoading(false) }
  }
  return <>
    <PageHeader title="Payment reports" description="Upload CSV, XLSX, or JSON payment files and inspect processing results." />
    <section className="report-grid">
      <article className="card upload-card"><div className="upload-card__icon">⇧</div><h2>Upload payment report</h2><p>Files are sent directly to <code>POST /reports/upload</code>.</p><label className="dropzone"><input type="file" accept=".csv,.xlsx,.json" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /><strong>{file?.name ?? 'Choose a report file'}</strong><small>CSV, XLSX, or JSON</small></label><Button disabled={!file} loading={loading} onClick={upload}>Upload and process</Button></article>
      <article className="card lookup-card"><h2>Check an existing batch</h2><p>Enter a batch ID to retrieve its latest processing status.</p><Input label="Batch ID" type="number" min="1" value={batchId} onChange={(e) => setBatchId(e.target.value)} /><Button variant="secondary" disabled={!batchId} loading={loading} onClick={lookup}>Check status</Button></article>
    </section>
    {error ? <div className="alert alert--error">{error}</div> : null}
    <AsyncState loading={false}>
      {batch ? <section className="card section-card report-result">
        <div className="card__head"><div><p className="eyebrow">Batch #{batch.id}</p><h2>{batch.file_name}</h2><p>Started {dateTime(batch.started_at)}</p></div><Badge tone={statusTone(batch.status)}>{batch.status}</Badge></div>
        <div className="report-stats"><div><span>Total rows</span><strong>{batch.total_rows}</strong></div><div><span>Valid</span><strong>{batch.valid_rows}</strong></div><div><span>Invalid</span><strong>{batch.invalid_rows}</strong></div><div><span>Total amount</span><strong>{currency(batch.total_amount)}</strong></div></div>
        {batch.error_message ? <div className="alert alert--error">{batch.error_message}</div> : null}
        {errors.length ? <div><h3>Invalid rows</h3><div className="error-list">{errors.map((item) => <div key={`${item.source_row_number}-${item.transaction_id}`}><strong>Row {item.source_row_number}</strong><span>{item.transaction_id ?? 'No transaction ID'}</span><p>{item.error_reason}</p></div>)}</div></div> : null}
      </section> : null}
    </AsyncState>
  </>
}
