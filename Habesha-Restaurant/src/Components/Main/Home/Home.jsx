import Hero from './Hero/Hero'
import Testimonials from './Testimonials/Testimonials'
import CtaBanner from './CtaBanner/CtaBanner'
import './Home.css'

function Home({ onAddToCart }) {
    return (
        <main className="home-page">
            <Hero onAddToCart={onAddToCart} />
            <Testimonials />
            <CtaBanner />
        </main>
    )
}

export default Home
