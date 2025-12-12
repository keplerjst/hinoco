import type { Context } from 'hono'
import { hc } from 'hono/client'
import { useState } from 'preact/hooks'
import { drizzle } from 'drizzle-orm/d1'
import { counter } from '../../db/schema'
import type { CloudflareBindings } from '../../server'
import type { ApiType } from '../../api'
import Header from '../components/Header'

// loader: SSR時にデータ取得
export const loader = async (c: Context<{ Bindings: CloudflareBindings }>) => {
  const db = drizzle(c.env.DB)
  const result = await db.select().from(counter).all()
  console.log('result: ', result)
  return { count: result.length }
}

export type LoaderData = Awaited<ReturnType<typeof loader>>

// Component: ページコンポーネント
export const Component = ({ count: initialCount }: LoaderData) => {
  const [count, setCount] = useState(initialCount)
  console.log('count: ', count)

  const handleClick = async () => {
    alert('handleClick')
    const api = hc<ApiType>('/api')
    const res = await api.count.$post()
    const data = await res.json()
    setCount(data.count)
  }

  return (
    <div className="max-w-3xl mx-auto my-8 text-center">
      <Header />
      <div className="my-4">
        <button
          className="py-1 px-2 bg-gray-700 text-white"
          onClick={handleClick}
        >
          count is {count}
        </button>
      </div>
    </div>
  )
}
