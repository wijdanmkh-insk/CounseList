import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import AuthModal from './AuthModal';

export default function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }, [isMenuOpen]);
    
    const MENU_NAVBAR =[
        {name: 'About', link: '#about'},
        {name: 'How To Use', link: '#how-to-use'},
        {name: 'Contact', link: '#contact'}
    ];

    return(
        <nav className={`nav ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="nav-wrap">
                <div className="nav-left">
                    CounceList
                </div>

                <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`nav-center ${isMenuOpen ? 'active' : ''}`}>
                    {MENU_NAVBAR.map((item, index) => {
                        return (
                            <div>
                                <a key={index} href={item.link} onClick={() => setIsMenuOpen(false)}>{item.name}</a>
                            </div>
                        );
                    })}
                    <div className="shortcut">
                        <button className='contact-on'>Contact on <FontAwesomeIcon icon={faWhatsapp}/></button>
                        <button className='try-now' onClick={() => setIsPopUpOpen(true)}>Try Now!</button>
                    </div>
                </div>

                <div className="nav-right">
                    <button className="contact-on">Contact on <FontAwesomeIcon icon={faWhatsapp}/></button>
                    <button className="try-now" onClick={() => setIsPopUpOpen(true)}>Try Now!</button>
                </div>
            </div>
            <AuthModal isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} />
        </nav>
    )
}