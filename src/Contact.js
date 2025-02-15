import './Contact.css'
import './App.css'
const Contact = () => (
        <>
        <div className="Contact">
        <h1 className="main-header">Please feel free to contact us</h1>
        <div className="map-embedding">
        <div className="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.7671968662867!2d13.438149376596655!3d52.4833507389424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84ff5a1d6d6d5%3A0x1fb7f04fefbe1ea0!2sWeserstr.%2055%2C%2012045%20Berlin!5e0!3m2!1sen!2sde!4v1716898744180!5m2!1sen!2sde" id="map" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <p id="how-to-contact">We are centrally located in Berlin's Neukolln district, on Weserstrasse, accessible by bus and train</p>
        </div>
        </div>
        </>
    )
export default Contact;