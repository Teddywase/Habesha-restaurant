import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import Footer from "./Components/Footer/Footer"
import Header from "./Components/Header/Header"
import { useAuthStore } from "./store/useAuthStore"
import { selectCartTotal, useCartStore } from "./store/useCartStore"

const Home = lazy(() => import("./Components/Main/Home/Home"))
const Menu = lazy(() => import("./Components/Main/Menu/Menu"))
const MenuDetail = lazy(() => import("./Components/Main/MenuDetail/MenuDetail"))
const Reservation = lazy(() => import("./Components/Main/Reservation/Reservation"))
const Cart = lazy(() => import("./Components/Main/Cart/Cart"))
const Checkout = lazy(() => import("./Components/Main/CheckOut/Checkout"))
const Login = lazy(() => import("./Components/Main/Login/Login"))
const Register = lazy(() => import("./Components/Main/Register/Register"))

function RouteLoading() {
    return <div className="route-loading" role="status">Loading page...</div>
}

function App() {
    const cartItems = useCartStore((state) => state.items)
    const cartTotal = useCartStore(selectCartTotal)
    const addToCart = useCartStore((state) => state.addItem)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const removeItem = useCartStore((state) => state.removeItem)
    const clearCart = useCartStore((state) => state.clearCart)
    const currentUser = useAuthStore((state) => state.currentUser)
    const logout = useAuthStore((state) => state.logout)

    return(
        <>
        <Header cartItems={cartItems} cartTotal={cartTotal} currentUser={currentUser} onLogout={logout} />
        <div>
            <Suspense fallback={<RouteLoading />}>
                <Routes>
                    <Route path="/" element={<Home onAddToCart={addToCart} />} />
                    <Route path="/menu" element={<Menu cartItems={cartItems} onAddToCart={addToCart} />} />
                    <Route path="/menu/:dishId" element={<MenuDetail cartItems={cartItems} onAddToCart={addToCart} />} />
                    <Route path="/reservation" element={<Reservation />} />
                    <Route path="/cart" element={<Cart cartItems={cartItems} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} onRemove={removeItem} onClear={clearCart} />} />
                    <Route path="/checkout" element={<Checkout cartItems={cartItems} cartTotal={cartTotal} currentUser={currentUser} onClearCart={clearCart} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Suspense>
        </div>
        <Footer />
        </>
    )
    
}

export default App
