import { useMemo, useState } from 'react'
import { categories, products } from './data/products.js'
import './App.css'

const STORE_NAME = 'Mi Tienda'
const YEAR = new Date().getFullYear()
const currency = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })

function ProductCard({ product, onAdd }) {
  return (
    <article className="card">
      <div className="card-media" style={{ background: product.color }}>
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <span className="card-emoji" aria-hidden="true">{product.emoji}</span>
        )}
        {product.badge && <span className={`badge badge-${product.badge.toLowerCase()}`}>{product.badge}</span>}
      </div>
      <div className="card-body">
        <p className="card-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="card-desc">{product.description}</p>
        <div className="card-footer">
          <div>
            <span className="price">{currency.format(product.price)}</span>
            {product.oldPrice && <span className="old-price">{currency.format(product.oldPrice)}</span>}
          </div>
          <span className="rating" aria-label={`Valoración ${product.rating} de 5`}>★ {product.rating}</span>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => onAdd(product)}>
          Añadir al carrito
        </button>
      </div>
    </article>
  )
}

function Cart({ items, open, onClose, onChangeQty }) {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  return (
    <>
      <div className={`overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`cart ${open ? 'open' : ''}`} aria-hidden={!open}>
        <header className="cart-header">
          <h2>Tu carrito</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Cerrar carrito">✕</button>
        </header>
        {items.length === 0 ? (
          <p className="cart-empty">Tu carrito está vacío.</p>
        ) : (
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id}>
                <span className="cart-thumb" style={{ background: item.color }}>{item.emoji}</span>
                <div className="cart-info">
                  <strong>{item.name}</strong>
                  <span>{currency.format(item.price)}</span>
                </div>
                <div className="qty">
                  <button type="button" onClick={() => onChangeQty(item.id, -1)} aria-label="Quitar uno">−</button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => onChangeQty(item.id, 1)} aria-label="Añadir uno">+</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <footer className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <strong>{currency.format(total)}</strong>
          </div>
          <button type="button" className="btn btn-primary" disabled={items.length === 0}>
            Finalizar compra
          </button>
        </footer>
      </aside>
    </>
  )
}

function App() {
  const [category, setCategory] = useState('Todos')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = products.filter(
      (p) =>
        (category === 'Todos' || p.category === category) &&
        (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
    )
    if (sort === 'price-asc') return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') return [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [category, query, sort])

  const cartCount = cart.reduce((n, i) => n + i.qty, 0)

  const addToCart = (product) => {
    setCart((items) => {
      const found = items.find((i) => i.id === product.id)
      if (found) return items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      return [...items, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }

  const changeQty = (id, delta) =>
    setCart((items) =>
      items.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0),
    )

  return (
    <>
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#" className="logo">🛍️ {STORE_NAME}</a>
          <nav className="nav">
            <a href="#productos">Productos</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <button type="button" className="cart-btn" onClick={() => setCartOpen(true)}>
            🛒 <span className="cart-label">Carrito</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div>
              <p className="eyebrow">Nueva colección</p>
              <h1>Productos pensados para tu día a día</h1>
              <p className="hero-text">
                Calidad, buen diseño y envío gratuito en pedidos superiores a 50 €.
              </p>
              <a href="#productos" className="btn btn-primary btn-lg">Ver productos</a>
            </div>
            <div className="hero-art" aria-hidden="true">
              <span>🎧</span><span>☕</span><span>👟</span><span>🧘</span>
            </div>
          </div>
        </section>

        <section className="features container">
          <div><strong>🚚 Envío gratis</strong><span>Desde 50 €</span></div>
          <div><strong>↩️ Devoluciones</strong><span>30 días sin coste</span></div>
          <div><strong>🔒 Pago seguro</strong><span>Tarjeta y transferencia</span></div>
        </section>

        <section id="productos" className="container products">
          <div className="section-head">
            <h2>Nuestros productos</h2>
            <div className="controls">
              <input
                type="search"
                placeholder="Buscar productos…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar productos"
              />
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Ordenar">
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="rating">Mejor valorados</option>
              </select>
            </div>
          </div>

          <div className="chips" role="tablist">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                className={`chip ${category === c ? 'active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {visible.length > 0 ? (
            <div className="grid">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} />
              ))}
            </div>
          ) : (
            <p className="no-results">No hay productos que coincidan con tu búsqueda.</p>
          )}
        </section>

        <section id="nosotros" className="about">
          <div className="container about-inner">
            <h2>Sobre nosotros</h2>
            <p>
              Somos una pequeña tienda que selecciona productos útiles y duraderos.
              Cuéntale aquí a tus clientes quién eres y qué te hace diferente.
            </p>
          </div>
        </section>
      </main>

      <footer id="contacto" className="site-footer">
        <div className="container footer-inner">
          <div>
            <strong>{STORE_NAME}</strong>
            <p>hola@mitienda.com · +34 600 000 000</p>
          </div>
          <p>© {YEAR} {STORE_NAME}. Todos los derechos reservados.</p>
        </div>
      </footer>

      <Cart items={cart} open={cartOpen} onClose={() => setCartOpen(false)} onChangeQty={changeQty} />
    </>
  )
}

export default App
