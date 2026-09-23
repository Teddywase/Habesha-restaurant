import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Checkout.css'

function Checkout({ cartItems = [], cartTotal = 0, currentUser = null, onClearCart = () => {} }) {
  const navigate = useNavigate()
  const initialForm = {
    name: '',
    phone: '',
    email: '',
    delivery: 'home',
    address: '',
  }

  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const orderItems = cartItems.map((item) => ({
    id: item.id,
    name: item.nameEn,
    details: item.description,
    price: Number((item.priceETB || 0) * (item.quantity || 1)),
    quantity: item.quantity || 1,
  }))

  const subtotal = Number(cartTotal || orderItems.reduce((sum, item) => sum + item.price, 0))
  const vat = Math.round(subtotal * 0.15)
  const total = subtotal + vat

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!formData.name.trim()) nextErrors.name = 'Contact name is required.'
    if (!formData.phone.trim()) nextErrors.phone = 'Phone number is required.'
    if (!formData.email.trim()) nextErrors.email = 'Email is required.'
    if (!formData.address.trim()) nextErrors.address = 'Delivery address is required.'

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!currentUser) {
      alert('Please sign in before confirming your order.')
      navigate('/login')
      return
    }

    const nextErrors = validateForm()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setFormData(initialForm)
    setErrors({})
    onClearCart()
    localStorage.removeItem('habesha-cart')
    alert('Order placed successfully!')
  }

  return (
    <main className="checkout-page">
      <div className="checkout-shell">
        <div className="checkout-topbar">
          <div className="checkout-status">
            <div className="checkout-status-step">
              <span className="step-dot">1</span>
              Review Order
            </div>
            <div className="checkout-status-step active">
              <span className="step-dot">2</span>
              Delivery &amp; Payment
            </div>
            <div className="checkout-status-step">
              <span className="step-dot">3</span>
              Confirmation
            </div>
          </div>
        </div>

        <div className="checkout-grid">
          <form id="checkout-form" className="checkout-panel" onSubmit={handleSubmit} noValidate>
            <h2 className="checkout-section-title">Delivery details</h2>

            <div className="checkout-form-box">
              {/* <div className="checkbox-row">
                <input type="checkbox" id="pickup" defaultChecked />
                <label htmlFor="pickup">Dine-in / Pickup (Bale)</label>
              </div> */}

              <div className="form-row" style={{ marginTop: '1rem' }}>
                <div className="input-wrap">
                  <label htmlFor="name">Contact Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Abebe Bekele"
                    className={errors.name ? 'input-error' : ''}
                    required
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="input-wrap">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+251 911 145 7890"
                    className={errors.phone ? 'input-error' : ''}
                    required
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="input-wrap">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="abebe@example.com"
                    className={errors.email ? 'input-error' : ''}
                    required
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="input-wrap">
                  <label htmlFor="delivery">Delivery option</label>
                  <select
                    id="delivery"
                    name="delivery"
                    value={formData.delivery}
                    onChange={handleChange}
                  >
                    <option value="home">Home delivery</option>
                    <option value="pickup">Pickup</option>
                  </select>
                </div>
              </div>

              <div className="input-wrap">
                <label htmlFor="address">Delivery address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Bole Road, Bole Michael, Addis Ababa"
                  className={errors.address ? 'input-error' : ''}
                  required
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="delivery-option">
                <div className="icon">⏱</div>
                <div className="text">
                  <strong>Immediate dispatch</strong>
                  <span>Fresh &amp; hot, ready in 35–45 min</span>
                </div>
                <span className="chip">ETA 35–45m</span>
              </div>

              <div className="delivery-option" style={{ marginTop: '0.75rem' }}>
                <div className="icon">📍</div>
                <div className="text">
                  <strong>Delivery area</strong>
                  <span>Service available within a 7 km radius</span>
                </div>
                <span className="chip">Included</span>
              </div>
            </div>

            <h2 className="checkout-section-title" style={{ marginTop: '1.5rem' }}>Payment method</h2>

            <div className="checkout-form-box">
              <div className="payment-list">
                <label className="payment-option">
                  <input type="radio" name="payment" defaultChecked />
                  <span className="payment-brand">T</span>
                  <span className="payment-text">
                    <strong>Telebirr</strong>
                    <small>Instant wallet transfer</small>
                  </span>
                </label>

                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span className="payment-brand">C</span>
                  <span className="payment-text">
                    <strong>CBE Birr / CBE Mobile Banking</strong>
                    <small>Direct transfer</small>
                  </span>
                </label>

                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span className="payment-brand">$</span>
                  <span className="payment-text">
                    <strong>Cash on delivery</strong>
                    <small>Pay at your door</small>
                  </span>
                </label>
              </div>
            </div>
          </form>

          <aside className="order-summary">
            <div className="summary-header">
              <h2>Order Summary</h2>
              <button type="button">Edit cart</button>
            </div>

            {orderItems.map((item) => (
              <div key={item.name} className="order-item">
                <span className="order-item-title">{item.name}</span>
                <span className="order-item-price">ETB {item.price}</span>
                <span className="order-item-desc">{item.details}</span>
              </div>
            ))}

            <div className="summary-totals">
              <div className="summary-line">
                <span>Items Subtotal</span>
                <strong>ETB {subtotal}</strong>
              </div>
              <div className="summary-line">
                <span>VAT (15%)</span>
                <strong>ETB {vat}</strong>
              </div>
              <div className="summary-line total">
                <span>Grand Total</span>
                <strong>ETB {total}</strong>
              </div>
            </div>

            <button className="checkout-button" type="submit" form="checkout-form">Confirm Order &amp; Pay ETB {total}</button>

            <div className="summary-actions">
              <button type="button">Return to Cart</button>
              <button type="button">Need help?</button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Checkout
