import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Footer from "./Components/Footer/Footer"
import Header from "./Components/Header/Header"
import Menu from "./Components/Main/Menu/Menu"
import Cart from "./Components/Main/Cart/Cart"
import Checkout from "./Components/Main/CheckOut/Checkout"
import Reservation from "./Components/Main/Reservation/Reservation"
import Home from "./Components/Main/Home/Home"
import Login from "./Components/Main/Login/Login"
import Register from "./Components/Main/Register/Register"
import MenuDetail from "./Components/Main/MenuDetail/MenuDetail"

function App() {
    const normalizeCartItems = (items = []) => {
        const merged = new Map()

        items.forEach((item) => {
            const key = item.id
            const existing = merged.get(key)

            if (existing) {
                existing.quantity = (existing.quantity || 1) + (item.quantity || 1)
                return
            }

            merged.set(key, { ...item, quantity: item.quantity || 1 })
        })

        return [...merged.values()]
    }

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('habesha-cart')
        const parsedCart = savedCart ? JSON.parse(savedCart) : []
        return normalizeCartItems(parsedCart)
    })
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('habesha-current-user')
        return savedUser ? JSON.parse(savedUser) : null
    })

    const cartTotal = cartItems.reduce((sum, item) => sum + Number((item.priceETB || 0) * (item.quantity || 1)), 0)

    useEffect(() => {
        localStorage.setItem('habesha-cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (dish) => {
        setCartItems((items) => {
            const existingItem = items.find((item) => item.id === dish.id)

            if (existingItem) {
                return items.map((item) =>
                    item.id === dish.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                )
            }

            return [...items, { ...dish, quantity: 1 }]
        })
    }

    const increaseQuantity = (dishId) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === dishId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
            )
        )
    }

    const decreaseQuantity = (dishId) => {
        setCartItems((items) => {
            const target = items.find((item) => item.id === dishId)

            if (!target) return items

            if ((target.quantity || 1) <= 1) {
                return items.filter((item) => item.id !== dishId)
            }

            return items.map((item) =>
                item.id === dishId ? { ...item, quantity: (item.quantity || 1) - 1 } : item
            )
        })
    }

    const removeItem = (dishId) => {
        setCartItems((items) => items.filter((item) => item.id !== dishId))
    }

    const clearCart = () => {
        setCartItems([])
        localStorage.removeItem('habesha-cart')
    }

    const handleUserAuthenticated = (user) => {
        setCurrentUser(user)
    }

    const handleLogout = () => {
        localStorage.removeItem('habesha-current-user')
        setCurrentUser(null)
    }

    return(
        <>
        <Header cartItems={cartItems} cartTotal={cartTotal} currentUser={currentUser} onLogout={handleLogout} />
        <div>
            <Routes>
                <Route path="/" element={<Home onAddToCart={addToCart} />} />
                <Route path="/menu" element={<Menu cartItems={cartItems} onAddToCart={addToCart} />} />
                <Route path="/menu/:dishId" element={<MenuDetail cartItems={cartItems} onAddToCart={addToCart} />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} onRemove={removeItem} onClear={clearCart} />} />
                <Route path="/checkout" element={<Checkout cartItems={cartItems} cartTotal={cartTotal} currentUser={currentUser} onClearCart={clearCart} />} />
                <Route path="/login" element={<Login onUserAuthenticated={handleUserAuthenticated} />} />
                <Route path="/register" element={<Register onUserAuthenticated={handleUserAuthenticated} />} />
            </Routes>
        </div>
        <Footer />
        </>
    )
    
}

export default App
