import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToastStore } from '@/app/toastStore'
import { useAuthStore } from '@/features/auth/authStore'
import { userApi } from '@/features/users/userApi'
import { getApiError } from '@/lib/axios'

const schema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  username: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional(),
})
type FormData = z.infer<typeof schema>

export function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const toast = useToastStore((state) => state.show)
  const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })
  useEffect(() => { if (user) reset(user) }, [user, reset])
  const submit = async (values: FormData) => {
    if (!user) return
    try { await userApi.update(user.id, values); toast('Profile updated', 'success') } catch (error) { toast(getApiError(error), 'error') }
  }
  return <>
    <PageHeader title="User profile" description="Manage your account and contact details." />
    <form className="card profile-form" onSubmit={handleSubmit(submit)}>
      <div className="profile-hero"><div className="avatar avatar--large">{user?.first_name?.[0] ?? 'U'}</div><div><h2>{user?.first_name} {user?.last_name}</h2><p>{user?.email}</p></div></div>
      <div className="form-grid">
        <Input label="First name" error={errors.first_name?.message} {...register('first_name')} />
        <Input label="Last name" error={errors.last_name?.message} {...register('last_name')} />
        <Input label="Username" error={errors.username?.message} {...register('username')} />
        <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
        <Input label="Phone" error={errors.phone?.message} {...register('phone')} />
      </div>
      <div><Button type="submit" loading={isSubmitting}>Save changes</Button></div>
    </form>
  </>
}
