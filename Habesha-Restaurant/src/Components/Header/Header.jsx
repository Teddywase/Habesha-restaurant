import { Link, NavLink } from 'react-router-dom'
import './Header.css'

function Header({ cartItems = [], cartTotal = 0, currentUser, onLogout }) {
    const itemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0)

    return (
        <header className='navbar'>
            <Link to="/" className='brand'>
                <span className='brand-name'>Mesob</span>
                <span className='brand-name brand-name-lower'>House</span>
            </Link>

            <nav className="navLinks" aria-label="Main navigation">
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/menu">Menu</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/reservation">Reservation</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/cart">Order &amp; <br />Cart</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/checkout">Delivery &amp; <br />Checkout</NavLink>
            </nav>

            <div className='header-cart-box'>
                <div className='cart-pill'>{itemCount}</div>
                <div className='cart-amount'>
                    <span>ETB</span>
                    <strong>{cartTotal.toLocaleString()}</strong>
                </div>
            </div>

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
                        <Link to="/login" className='auth-button sign-in'>SignIn</Link>
                        <Link to="/register" className='auth-button register'>Register</Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header