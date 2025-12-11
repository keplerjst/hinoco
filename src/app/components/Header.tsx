const Header = () => {
  return (
    <header>
      <h1>Preact SSR on Cloudflare Workers</h1>
      <div className="flex justify-center gap-2">
        <a className="p-1 hover:bg-gray-100" href="/">
          Home
        </a>
        <a className="p-1 hover:bg-gray-100" href="/about">
          About
        </a>
      </div>
    </header>
  )
}

export default Header
