import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import menuData from '../../../data/menu.json'
import fallbackImage from '../../../assets/hero.jpg'

import './Menu.css'

const menuImages = import.meta.glob('../../../assets/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?url',
})

function resolveMenuImage(imagePath) {
    const imageName = imagePath?.split('/').pop()
    const imageEntry = Object.entries(menuImages).find(([path]) => path.endsWith(`/${imageName}`))

    return imageEntry?.[1] || fallbackImage
}

function Menu({ cartItems = [], onAddToCart }) {
    const [activeCategory, setActiveCategory] = useState('All Dishes')
    const [searchTerm, setSearchTerm] = useState('')

    const categories = useMemo(() => {
        const categoryCounts = menuData.data.reduce((counts, dish) => {
            counts[dish.category] = (counts[dish.category] || 0) + 1
            return counts
        }, {})

        return [
            { label: 'All Dishes', count: menuData.data.length },
            ...Object.entries(categoryCounts).map(([label, count]) => ({ label, count })),
        ]
    }, [])

    const visibleDishes = menuData.data.filter((dish) => {
        const matchesCategory = activeCategory === 'All Dishes' || dish.category === activeCategory
        const searchText = `${dish.nameEn} ${dish.description} ${dish.category}`.toLowerCase()
        return matchesCategory && searchText.includes(searchTerm.toLowerCase())
    })

    const totalPrice = cartItems.reduce((total, dish) => total + dish.priceETB, 0)

    return (
        <main className="menu-page">
            <div className="menu-page-inner">
                <header className="menu-intro">
                    <p className="menu-eyebrow">✦ Handcrafted Gondar &amp; Addis spices</p>
                    <h1>Our Complete Culinary Heritage</h1>
                    <p>
                        Every dish is prepared daily from scratch using sun-dried spices, stone-ground
                        legume flours, and clarified herbal butters sourced directly from highland farm cooperatives.
                    </p>
                </header>

                <section className="menu-toolbar" aria-label="Menu search and dietary filters">
                    <label className="menu-search">
                        <span aria-hidden="true">⌕</span>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search dishes by name (e.g. Kitfo, Shiro, Tibs, Doro Wat)..."
                        />
                    </label>
                    <div className="menu-dietary-tags" aria-label="Dietary highlights">
                        <span>🌽 100% Pure Teff Injera</span>
                        <span>🌿 Fasting / Tsom Friendly</span>
                        <span>🌶 Berbere Spiced</span>
                    </div>
                </section>

                <nav className="menu-categories" aria-label="Menu categories">
                    {categories.map((category) => (
                        <button
                            className={activeCategory === category.label ? 'active' : ''}
                            key={category.label}
                            onClick={() => setActiveCategory(category.label)}
                            type="button"
                        >
                            {category.label} <small>({category.count})</small>
                        </button>
                    ))}
                </nav>

                <section className="menu-grid" aria-live="polite">
                    {visibleDishes.map((dish, index) => (
                        <article className="menu-card" key={dish.id}>
                            <Link to={`/menu/${dish.id}`} className="menu-card-image-link">
                                <div className={`menu-card-image menu-card-image-${(index % 8) + 1}`}>
                                    <img src={resolveMenuImage(dish.image)} alt={dish.nameEn} />
                                    <span className="menu-card-tag">
                                        {dish.isSpecial ? 'Chef\'s heritage' : dish.isFasting ? '100% vegan / Tsom' : 'Highland classic'}
                                    </span>
                                    <span className="menu-card-spice">🌶 {dish.spiceLevel}</span>
                                </div>
                            </Link>
                            <div className="menu-card-body">
                                <h2>{dish.nameEn}</h2>
                                <p>{dish.description}</p>
                                <div className="menu-card-footer">
                                    <strong>ETB {dish.priceETB}</strong>
                                    <button type="button" onClick={() => onAddToCart(dish)}>+ Add</button>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>

                {visibleDishes.length === 0 && (
                    <p className="menu-empty">No dishes match your search. Try another name or category.</p>
                )}

                <aside className="menu-callout">
                    <span className="menu-callout-icon" aria-hidden="true">🍴</span>
                    <div>
                        <strong>Experience Communal Dining Around the Mesob</strong>
                        <small>All platters are served with unlimited warm teff injera rolls and fresh house-made Ayib.</small>
                    </div>
                    <button type="button">Reserve a Group Mesob Table</button>
                </aside>
            </div>

            {cartItems.length > 0 && (
                <div className="menu-cart-bar" role="status">
                    <span className="menu-cart-count">{cartItems.length}</span>
                    <span><strong>{cartItems.length} selected item{cartItems.length === 1 ? '' : 's'}</strong> · ETB {totalPrice.toLocaleString()}</span>
                    <Link to="/cart" className="menu-cart-link">Proceed to Cart →</Link>
                </div>
            )}
        </main>
    )
}

export default Menu
