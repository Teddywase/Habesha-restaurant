import './Testimonials.css'

const testimonials = [
    {
        quote: 'The Doro Wat was so reminiscent of my grandmother\'s cooking in Gondar. The berbere depth and the slow-simmered onion sweet finish are impossible to find elsewhere.',
        initials: 'AM',
        name: 'Amanuel Mengistu',
        role: 'Bole Resident & Food Patron',
        tone: 'red',
    },
    {
        quote: 'Their Fasting Beyaynetu is unmatched on Wednesdays. 12 vibrant dishes, and the Shiro tagamino came out bubbling in clay. True culinary devotion.',
        initials: 'ST',
        name: 'Sara Tesfaye',
        role: 'Plant-Based Dining Advocate',
        tone: 'green',
    },
    {
        quote: 'We hosted a 10-person family reunion around their large handcrafted mesobs. The coffee ceremony with fresh frankincense made the evening unforgettable.',
        initials: 'DK',
        name: 'Dr. Kebede Wolde',
        role: 'Diaspora Homecoming Guest',
        tone: 'gold',
    },
]

function Testimonials() {
    return (
        <section className="testimonials" aria-labelledby="testimonials-title">
            <div className="testimonials-heading">
                <p>Voices around the mesob</p>
                <h2 id="testimonials-title">Honored Guest Reflections</h2>
            </div>
            <div className="testimonial-grid">
                {testimonials.map((testimonial) => (
                    <article className="testimonial-card" key={testimonial.name}>
                        <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
                        <blockquote>“{testimonial.quote}”</blockquote>
                        <div className="testimonial-author">
                            <span className={`testimonial-initials testimonial-initials-${testimonial.tone}`}>
                                {testimonial.initials}
                            </span>
                            <div>
                                <strong>{testimonial.name}</strong>
                                <span>{testimonial.role}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Testimonials
