import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export const metadata = { title: 'Admin — Atlas Ascend' }

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#080808' }}>
      <AdminSidebar email={session.user.email!} />
      <main className="flex-1 min-h-screen overflow-auto">
        {children}
      </main>
    </div>
  )
}
