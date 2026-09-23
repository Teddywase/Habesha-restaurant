import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import menuData from '../../../data/menu.json'
import fallbackImage from '../../../assets/hero.jpg'
import './MenuDetail.css'

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

function MenuDetail({ onAddToCart }) {
    const { dishId } = useParams()
    const dish = useMemo(
        () => menuData.data.find((item) => String(item.id) === String(dishId)),
        [dishId]
    )

    const [quantity, setQuantity] = useState(1)

    if (!dish) {
        return (
            <main className="menu-detail-page empty-state">
                <div className="menu-detail-shell">
                    <h1>Dish not found</h1>
                    <Link to="/menu" className="back-link">← Back to menu</Link>
                </div>
            </main>
        )
    }

    const totalPrice = Number(dish.priceETB || 0) * quantity
    const dishImage = resolveMenuImage(dish.image)

    return (
        <main className="menu-detail-page">
            <div className="menu-detail-topbar">
                <Link to="/menu" className="detail-back-button">← Back to Menu</Link>
            </div>
            <div className="menu-detail-shell">
                <div className="menu-detail-gallery">
                    <div className="detail-hero-card">
                        <div className="detail-badges">
                            <span className="detail-signature">HOUSE SIGNATURE</span>
                            <span className="detail-offer">10% TEFF OPTION</span>
                        </div>

                        <div className="detail-image-wrap">
                            <img src={dishImage} alt={dish.nameEn} />
                        </div>

                        <div className="detail-meta-row">
                            <span className="detail-meta-clock">◔ Simmered 14 Hours</span>
                            <span className="detail-meta-table">Mesob Addis Recipe #01</span>
                        </div>
                    </div>

                    <div className="detail-gallery-grid">
                        <img src={dishImage} alt={`${dish.nameEn} preview 1`} />
                        <img src={dishImage} alt={`${dish.nameEn} preview 2`} />
                        <img src={dishImage} alt={`${dish.nameEn} preview 3`} />
                    </div>
                </div>

                <div className="menu-detail-content">
                    <div className="detail-header-row">
                        <h1>{dish.nameEn}</h1>
                        <div className="detail-price">ETB {dish.priceETB}</div>
                    </div>

                    <p className="detail-description">
                        {dish.description}
                    </p>

                    <div className="detail-info-row">
                        <div className="detail-info-item">
                            <span className="label">Serves</span>
                            <span className="value">{dish.serves || '1–2'}</span>
                        </div>
                        <div className="detail-info-item">
                            <span className="label">Unlim. injera refill</span>
                            <span className="value">Included</span>
                        </div>
                        <div className="detail-info-item">
                            <span className="label">Taxes</span>
                            <span className="value">Included</span>
                        </div>
                    </div>

                    <div className="detail-content-box">
                        <div className="detail-content-box-header">
                            <h2>About this dish</h2>
                        </div>
                        <p>
                            Traditional Ethiopian comfort food made with slow-cooked spices, house-made berbere,
                            and a rich, seasoned base that brings out the full depth of the ingredients.
                        </p>
                    </div>

                    <div className="detail-actions">
                        <div className="detail-qty-control" aria-label="Quantity selector">
                            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
                            <span>{quantity}</span>
                            <button type="button" onClick={() => setQuantity((value) => value + 1)}>+</button>
                        </div>

                        <button
                            type="button"
                            className="detail-add-button"
                            onClick={() => {
                                for (let i = 0; i < quantity; i += 1) {
                                    onAddToCart(dish)
                                }
                            }}
                        >
                            Add to Order • ETB {totalPrice}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MenuDetail
