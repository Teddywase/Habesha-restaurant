import React from 'react'
import './Footer.css'
function Footer() {
    return (
        <div className='footer'>
            <div className="ref">
                <h3>Mesob House</h3>
                <p>Sharing traditions from the Ethiopian <br /> highlands - one Gursha at a time</p>

            </div>
            <div className="hour">
                <h3>HOSPITALITY HOURS</h3>
                <p>Tuesday - Sunday: 11:30 AM - 11:00PM</p>
                <p>Monday: Reserved for Private Banquets</p>
                <h5>Jebena Buna & Fresh Roasting All Evening</h5>
            </div>
            <div className='tradition'>
                <h3>DIETARY TRADITIONS</h3>
                <p>Vegan Fasting(Beyaynetu/Tsom)</p>
                <p>Traditional Prime Meat Feasts</p>
                <p>House Tej(Pure Honey Wine)</p>
                <p>Jebena Buna Roasting Ceremony</p>
            </div>
            <div className="location">
                <h3>ADDIS LOCATION</h3>
                <p>Bole Medhanialem, Addis Ababa & <br /> express delivery across town</p>
                <h5>+251911234567</h5>
            </div>
        </div>
    )
}

export default Footer
