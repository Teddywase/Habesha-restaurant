import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'
import heroImage from '../../../../assets/hero.jpg'
import menuData from '../../../../data/menu.json'
import specialsData from '../../../../data/specials.json'

const menuImages = import.meta.glob('../../../../assets/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
    query: '?url',
})

function resolveSpecialImage(special) {
    const menuDish = menuData.data.find((dish) => dish.id === special.id)
    const imageName = menuDish?.image?.split('/').pop()
    const imageEntry = Object.entries(menuImages).find(([path]) => path.endsWith(`/${imageName}`))

    return imageEntry?.[1] || heroImage
}

function Hero({ onAddToCart }) {
    const [activeFilter, setActiveFilter] = useState('All')

    const specials = specialsData.data.filter((special) => special.isSpecial)
    const categories = [...new Set(specials.map((special) => special.category))]
    const filters = ['All', ...categories]

    const visibleSpecials = activeFilter === 'All'
        ? specials
        : specials.filter((special) => special.category === activeFilter)

    return (
        <>
        <section className="hero" aria-labelledby="hero-title">
            <div className="hero-content">
                <p className="hero-eyebrow">
                    <span>✦</span>
                    Traditional Habesha foods
                </p>
                <h1 id="hero-title">
                    Communal warmth,
                    <br />
                    <em>slow-cooked heritage.</em>
                </h1>
                <p className="hero-description">
                    Handcrafted wats, ancient stone-ground teff injera, and velvety kitfo
                    simmered in the spirit of the Ethiopian highlands.
                </p>
                <div className="hero-actions">
                    <Link className="hero-button hero-button-primary" to="/reservation">
                        Reserve a table <span>↓</span>
                    </Link>
                    <Link className="hero-button hero-button-secondary" to="/menu">
                        Full banquet menu <span>↗</span>
                    </Link>
                </div>
                <div className="hero-stats" aria-label="Restaurant highlights">
                    <div>
                        <strong>100%</strong>
                        <span>Brown &amp; white teff</span>
                    </div>
                    <div>
                        <strong>6+ hours</strong>
                        <span>Slow stew caramels</span>
                    </div>
                    <div className='hero-stats-gursha'>
                        <strong>Gursha</strong>
                        <span>Hospitality shared</span>
                    </div>
                </div>
            </div>

            <div className="hero-visual">
                <div className="hero-image-frame">
                    <img
                        src={heroImage}
                        alt="A shared Ethiopian meal served on injera"
                    />
                    <div className="hero-meal-card">
                        <span>Centerpiece</span>
                        <strong>Great Mesob Feast</strong>
                        <b>ETB 1,650</b>
                    </div>
                </div>
                <div className="hero-feature-card">
                    <span>◉</span>
                    <div>
                        <strong>Stone ground</strong>
                        <small>Fresh berbere pepper</small>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="today-special" aria-labelledby="specials-title">
            <div className="special-heading">
                <p className="special-eyebrow"><span>⚒</span> From the clay pots</p>
                <h2 id="specials-title">Today's Curated Chef Specials</h2>
                <p>Carefully balanced stews prepared at dawn using our matriarch's 40-spice blend, served piping hot on hand-stretched injera.</p>
            </div>
            <div className="special-filters" aria-label="Filter specials">
                <span>Filter:</span>
                {filters.map((filter) => (
                    <button
                        className={activeFilter === filter ? 'active' : ''}
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        type="button"
                    >
                        {filter === 'All' ? `All (${specials.length})` : filter}
                    </button>
                ))}
            </div>
            <div className="special-grid">
                {visibleSpecials.map((special, index) => (
                    <article className="special-card" key={special.id}>
                        <div className={`special-card-image special-card-image-${index + 1}`}>
                            <Link to={`/menu/${special.id}`} aria-label={`View details for ${special.nameEn}`}>
                                <img src={resolveSpecialImage(special)} alt={special.nameEn} />
                            </Link>
                            <span className="special-tag">
                                {special.isFasting ? '◉ 100% Plant-Based (Tsom)' : "Chef's Special Today"}
                            </span>
                            <span className="special-heat">{special.spiceLevel}</span>
                        </div>
                        <div className="special-card-content">
                            <div className="special-card-title">
                                <h3>{special.nameEn}</h3>
                                <strong>ETB {special.priceETB}</strong>
                            </div>
                            <p>{special.description}</p>
                            <div className="special-card-actions">
                                <Link to={`/menu/${special.id}`}>View Details</Link>
                                <button type="button" onClick={() => onAddToCart(special)}>🛒 Quick Add</button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
        </>
    )
}

export default Hero
