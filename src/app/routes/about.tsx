import type { Context } from 'hono'
import type { CloudflareBindings } from '../../server'
import Header from '../components/Header'

// loader: SSR時にデータ取得（このページではデータ不要）
export const loader = async (_c: Context<{ Bindings: CloudflareBindings }>) => {
  return {}
}

export type LoaderData = Awaited<ReturnType<typeof loader>>

// Component: ページコンポーネント
export const Component = (_props: LoaderData) => {
  return (
    <div>
      <Header />
      <h1>About!</h1>
    </div>
  )
}
