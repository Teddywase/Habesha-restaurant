import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

function Header({ cartItems = [], cartTotal = 0, currentUser, onLogout }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const itemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0)
    const closeMenu = () => setMenuOpen(false)

    return (
        <header className={`navbar${menuOpen ? ' menu-open' : ''}`}>
            <Link to="/" className='brand'>
                <span className='brand-name'>Mesob</span>
                <span className='brand-name brand-name-lower'>House</span>
            </Link>

            <button
                type="button"
                className="mobile-menu-toggle"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                aria-controls="main-navigation"
                onClick={() => setMenuOpen((open) => !open)}
            >
                <span />
                <span />
                <span />
            </button>

            <div className='header-cart-box'>
                <div className='cart-pill'>{itemCount}</div>
                <div className='cart-amount'>
                    <span>ETB</span>
                    <strong>{cartTotal.toLocaleString()}</strong>
                </div>
            </div>

            <nav className="navLinks" id="main-navigation" aria-label="Main navigation">
                <NavLink onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''} to="/menu">Menu</NavLink>
                <NavLink onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''} to="/reservation">Reservation</NavLink>
                <NavLink onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''} to="/cart">Order &amp; <br />Cart</NavLink>
                <NavLink onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''} to="/checkout">Delivery &amp; <br />Checkout</NavLink>
            </nav>

            <div className='auth-actions'>
                {currentUser ? (
                    <>
                        <div className='welcome-user'>
                            <span>Welcome</span>
                            <strong>{currentUser.fullName}</strong>
                        </div>
                        <button type="button" className='auth-button logout' onClick={onLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link onClick={closeMenu} to="/login" className='auth-button sign-in'>SignIn</Link>
                        <Link onClick={closeMenu} to="/register" className='auth-button register'>Register</Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header