import { useState } from 'react'
import './Reservation.css'

const timeSlots = ['5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM']

const initialForm = {
    name: '',
    phone: '',
    email: '',
    date: '2026-09-21',
    guests: '4',
    occasion: 'Dinner',
    notes: '',
    time: '7:00 PM',
}

function Reservation() {
    const [formData, setFormData] = useState(initialForm)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((current) => ({ ...current, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Reservation submitted:', formData)
    }

    return (
        <main className="reservation-page">
            <div className="reservation-shell">
                <header className="reservation-header">
                    <span className="reservation-eyebrow">Reserve a Table</span>
                    <h1>Plan your Gursha evening</h1>
                </header>

                <div className="reservation-grid">
                    <form className="reservation-card" onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="field">
                                <label htmlFor="name">Full name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="phone">Phone number</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+251 9xx xxx xxx"
                                />
                            </div>

                            <div className="field full">
                                <label htmlFor="email">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@email.com"
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="date">Reservation date</label>
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="guests">Guests</label>
                                <select id="guests" name="guests" value={formData.guests} onChange={handleChange}>
                                    <option value="2">2 guests</option>
                                    <option value="4">4 guests</option>
                                    <option value="6">6 guests</option>
                                    <option value="8">8 guests</option>
                                    <option value="10">10 guests</option>
                                </select>
                            </div>

                            <div className="field full">
                                <label htmlFor="occasion">Occasion</label>
                                <select id="occasion" name="occasion" value={formData.occasion} onChange={handleChange}>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Birthday">Birthday</option>
                                    <option value="Anniversary">Anniversary</option>
                                    <option value="Family gathering">Family gathering</option>
                                    <option value="Business meeting">Business meeting</option>
                                </select>
                            </div>

                            <div className="field full">
                                <label>Preferred time</label>
                                <div className="time-chips" aria-label="Time slots">
                                    {timeSlots.map((slot) => (
                                        <button
                                            key={slot}
                                            type="button"
                                            className={`time-chip ${formData.time === slot ? 'active' : ''}`}
                                            onClick={() => setFormData((current) => ({ ...current, time: slot }))}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="field full">
                                <label htmlFor="notes">Special requests</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Allergy notes, celebration details, or seating preferences..."
                                />
                            </div>
                        </div>
                    </form>

                    <aside className="reservation-summary">
                        <div className="summary-card">
                            <h2>Reservation Details</h2>

                            <div className="summary-item">
                                <span>Table for</span>
                                <strong>{formData.guests} guests</strong>
                            </div>
                            <div className="summary-item">
                                <span>Date</span>
                                <strong>{formData.date}</strong>
                            </div>
                            <div className="summary-item">
                                <span>Time</span>
                                <strong>{formData.time}</strong>
                            </div>
                            <div className="summary-item">
                                <span>Occasion</span>
                                <strong>{formData.occasion}</strong>
                            </div>

                            <div className="summary-total">
                                <span>Estimated spend</span>
                                <strong>ETB 1,200</strong>
                            </div>

                            <button type="submit" className="primary-button" onClick={handleSubmit}>Book my table</button>
                        </div>

                        <div className="meta-list">
                            <div className="meta-item">
                                <strong>Dining hours</strong>
                                Tue–Sun · 5:30 PM – 11:00 PM
                            </div>
                            <div className="meta-item">
                                <strong>Location</strong>
                                Mesob House, Kazanchis, Addis Ababa
                            </div>
                            <div className="meta-item">
                                <strong>Chef's note</strong>
                                We prepare communal platters for family-style sharing.
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}

export default Reservation
