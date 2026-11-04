// Catálogo de ejemplo. Sustituye estos datos por tus productos reales.
// "image" puede ser una URL o una ruta dentro de /public (p. ej. "/productos/taza.jpg").
// Si no hay imagen se muestra el emoji sobre un fondo de color.
export const categories = ['Todos', 'Hogar', 'Tecnología', 'Moda', 'Deporte']

export const products = [
  { id: 1, name: 'Taza de cerámica artesanal', category: 'Hogar', price: 14.9, rating: 4.8, emoji: '☕', color: '#f3e3d3', badge: 'Nuevo', description: 'Hecha a mano, apta para lavavajillas. 350 ml.' },
  { id: 2, name: 'Lámpara de escritorio LED', category: 'Hogar', price: 39.0, rating: 4.6, emoji: '💡', color: '#fdf1c7', description: 'Luz regulable en tres temperaturas de color.' },
  { id: 3, name: 'Auriculares inalámbricos', category: 'Tecnología', price: 89.0, oldPrice: 109.0, rating: 4.7, emoji: '🎧', color: '#dfe7fb', badge: 'Oferta', description: 'Cancelación de ruido y 30 h de batería.' },
  { id: 4, name: 'Teclado mecánico compacto', category: 'Tecnología', price: 74.5, rating: 4.5, emoji: '⌨️', color: '#e4e2f7', description: 'Formato 75 %, switches intercambiables.' },
  { id: 5, name: 'Chaqueta impermeable', category: 'Moda', price: 119.0, rating: 4.4, emoji: '🧥', color: '#d9efe6', description: 'Tejido transpirable con capucha ajustable.' },
  { id: 6, name: 'Zapatillas urbanas', category: 'Moda', price: 64.0, oldPrice: 80.0, rating: 4.3, emoji: '👟', color: '#f7dfe3', badge: 'Oferta', description: 'Suela ligera y plantilla acolchada.' },
  { id: 7, name: 'Esterilla de yoga', category: 'Deporte', price: 29.9, rating: 4.9, emoji: '🧘', color: '#e2f2d9', description: 'Antideslizante, 6 mm de grosor.' },
  { id: 8, name: 'Botella térmica 750 ml', category: 'Deporte', price: 22.0, rating: 4.7, emoji: '🥤', color: '#d7eef4', badge: 'Nuevo', description: 'Mantiene el frío 24 h y el calor 12 h.' },
]
