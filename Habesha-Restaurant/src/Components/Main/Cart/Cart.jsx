import { Link } from 'react-router-dom'
import './Cart.css'

function Cart({ cartItems = [], onIncrease, onDecrease, onRemove, onClear }) {
  const orderedItems = cartItems
    .map((item) => ({
      ...item,
      priceETB: Number(item.priceETB || 0),
      quantity: Number(item.quantity || 1),
    }))
    .filter((item) => Number(item.priceETB || 0) > 0)

  const subtotal = orderedItems.reduce((sum, item) => sum + item.priceETB * item.quantity, 0)
  const vat = Math.round(subtotal * 0.15)
  const total = subtotal + vat
  const hasItems = orderedItems.length > 0

  const handleDecrease = (item) => {
    if ((item.quantity || 1) <= 1) {
      onRemove(item.id)
      return
    }

    onDecrease(item.id)
  }

  const handleIncrease = (item) => {
    onIncrease(item.id)
  }

  const handleRemove = (item) => {
    onRemove(item.id)
  }

  return (
    <div className="cart-page">
      <div className="cart-topbar">
        <div className="topbar-left">
          <span className="delivery-pill">🚚 Free Highland Delivery: Complimentary delivery across Bale. Kazanchis, and S. Baret on orders over ETB 1,200!</span>
        </div>
        <span className="status-pill">Threshold Unlocked</span>
      </div>

      <div className="cart-shell">
        <div className="cart-progress">
          <div className="cart-progress-step active">
            <span className="step-number">1</span>
            Review Basket
          </div>
          <div className="cart-progress-step">
            <span className="step-number">2</span>
            Delivery Details
          </div>
          <div className="cart-progress-step">
            <span className="step-number">3</span>
            Confirmation
          </div>
        </div>

        <div className="cart-summary-page">
          <section className="cart-list-panel">
            <h1>Your Gursha Basket</h1>

            <div className="cart-list-header">
              <p>
                Clay Pot Stews &amp; Provisions <strong>({orderedItems.length} handcrafted selection{orderedItems.length === 1 ? '' : 's'})</strong>
              </p>
              <button type="button" onClick={onClear}>Clear Table</button>
            </div>

            {orderedItems.length === 0 ? (
              <div className="utility-box">
                <h3>Your basket is empty</h3>
                <p>Add dishes from the menu to see them here.</p>
              </div>
            ) : (
              orderedItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div
                    className="cart-item-image"
                    style={{ backgroundImage: (item.image) }}
                    aria-label={item.nameEn}
                  />

                  <div className="cart-item-copy">
                    <div className="cart-item-meta">
                      <span className="item-badge heritage">{item.category}</span>
                      <span className="item-detail">{item.isFasting ? 'Fasting Friendly' : 'Signature Plate'}</span>
                    </div>

                    <h2 className="item-name">{item.nameEn}</h2>
                    <p className="item-description">{item.description}</p>
                  </div>

                  <div className="cart-item-price">
                    <div className="item-price-tag">ETB {(item.priceETB * item.quantity).toLocaleString()}</div>
                    <div className="item-qty" aria-label={`Quantity for ${item.nameEn}`}>
                      <button type="button" aria-label={`Decrease quantity of ${item.nameEn}`} onClick={() => handleDecrease(item)}>−</button>
                      <span className="item-qty-value">{item.quantity}</span>
                      <button type="button" aria-label={`Increase quantity of ${item.nameEn}`} onClick={() => handleIncrease(item)}>+</button>
                    </div>
                    <button type="button" className="item-trash" aria-label={`Remove ${item.nameEn}`} onClick={() => handleRemove(item)}>🗑</button>
                  </div>
                </article>
              ))
            )}

            <div className="cart-utility">
              <div className="utility-box">
                <h3>Gursha Hospitality &amp; Dining Etiquette</h3>
                <ul>
                  <li>Include traditional Handwash Basin &amp; spoon for a centered, relaxed dining experience.</li>
                  <li>No Cutlery Needed (True Gursha) — simply savor each bite in a communal, shared style.</li>
                </ul>
              </div>

              <div className="utility-box">
                <h3>Kitchen Chef Note / Injera Separation Preference</h3>
                <ul>
                  <li>Keep your injera separate from your main dishes for the cleanest tasting experience.</li>
                </ul>
              </div>
            </div>

            <div className="cart-utility-note">
              <span className="note-label">The Meaning of Gursha</span>
              <button type="button" className="note-button">Learn more</button>
            </div>
          </section>

          <aside className="cart-side-panel">
            <div className="sidebar-box">
              <h2>Basket Ledger</h2>

              <div className="summary-line">
                <span>Items Subtotal ({orderedItems.reduce((count, item) => count + item.quantity, 0)} items)</span>
                <strong>ETB {subtotal.toLocaleString()}</strong>
              </div>
              <div className="summary-line">
                <span>VAT (15%)</span>
                <strong>ETB {vat}</strong>
              </div>

              <div className="summary-total">
                <span>Grand Total</span>
                <strong>ETB {total.toLocaleString()}</strong>
              </div>

              {hasItems ? (
                <Link to="/checkout" className="summary-button">Proceed to Delivery Checkout →</Link>
              ) : (
                <span className="summary-button is-disabled">Proceed to Delivery Checkout →</span>
              )}
              <a href="/menu" className="more-link">← Explore more dishes from our Menu</a>
            </div>

            <div className="delivery-box">
              <p>📦 Piping Warm Delivery in your Mesob.</p>
              <p>📞 Telephone: CBE, Birr, Cash and Delivery.</p>
              <p>📲 Encrypted checkout &amp; real-time dispatcher SMS.</p>
            </div>
          </aside>
        </div>
      </div>

      <div className="bottom-brand">
        <div className="brand-box">
          <span className="brand-mark">✓</span>
          <div className="brand-text">
            The Meaning of Gursha: a heartfelt custom of sharing &amp; generosity. Every plate at Mesob House is prepared with care and a warm, communal spirit.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
