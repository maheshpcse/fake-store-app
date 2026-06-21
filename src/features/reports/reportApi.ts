import { api } from '@/lib/axios'
import type { ReportBatch } from '@/types'

export interface StageError {
  source_row_number: number
  transaction_id?: string
  error_reason?: string
}

export const reportApi = {
  upload: (file: File) => {
    const form = new FormData()
    form.append('file', file)
    return api.post<ReportBatch>('/reports/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data)
  },
  status: (batchId: number) => api.get<ReportBatch>(`/reports/${batchId}`).then((r) => r.data),
  errors: (batchId: number) => api.get<StageError[]>(`/reports/${batchId}/errors`).then((r) => r.data),
}
