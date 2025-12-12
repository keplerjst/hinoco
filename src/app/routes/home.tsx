import { hc } from 'hono/client'
import type { ApiType } from '../../api'
import { useEffect, useState } from 'preact/hooks'
import Header from '../components/Header'

const Home = () => {
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const api = hc<ApiType>('/api')
      const res = await api.hello.$get()
      const data = await res.json()
      setMessage(data.message)
    }
    fetchData()
  }, [])

  return (
    <div className="max-w-3xl mx-auto my-8 text-center">
      <Header />
      <div className="my-4">
        <button
          className="py-1 px-2 bg-gray-700 text-white"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
      </div>
      <div className="my-4">
        <h2 className="text-xl">Message from API</h2>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Home
