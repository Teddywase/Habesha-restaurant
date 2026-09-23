import { Link } from 'react-router-dom'
import './CtaBanner.css'

function CtaBanner() {
    return (
        <section className="cta-banner" aria-labelledby="cta-banner-title">
            <div className="cta-banner-copy">
                <p>Join our table</p>
                <h2 id="cta-banner-title">
                    Experience Authentic Habesha Warmth
                    <br />
                    Tonight
                </h2>
                <span>
                    Whether gathering around our circular mesobs for communal dining or ordering
                    freshly baked injera to your home in Addis Ababa.
                </span>
            </div>
            <div className="cta-banner-actions">
                <Link className="cta-banner-button cta-banner-button-primary" to="/reservation">
                    Book a Mesob Table
                </Link>
                <Link className="cta-banner-button cta-banner-button-secondary" to="/menu">
                    View Complete Menu
                </Link>
            </div>
        </section>
    )
}

export default CtaBanner
