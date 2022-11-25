import React, { useEffect, useState } from 'react'
const Header = () => {

    const [language, setLanguage] = useState([]);
    const [currentLanguage, setCurrentLanguage] = useState({});
    const [show, setShow] = useState(false);
    const [menu, setMenu] = useState(false)

    const fetchLanguage = async () => {
        const response = await fetch("./flag.json");
        const data = await response.json();
        setLanguage(data);
        setCurrentLanguage(data[0].flag)
    }

    const handleLanguage = (e) => {
        setCurrentLanguage(e.target.value);
        setShow(!show)
    }

    useEffect(() => {
        fetchLanguage();
    }, [])

    return (
        <section>
            <nav>
                <div className='navbar'>
                    <div className='logo-section'>
                        <img className='logo' src="./images/ug.svg" alt="Logo" />
                        <img className='menu-icon' src={menu ? "./images/cross.png" : './images/menu.svg'} alt="Menu" onClick={() => setMenu(!menu)} />
                    </div>
                    <div className='menu-list'>
                        <ul className={menu ? 'active' : "deactive"} >
                            <li>About us</li>
                            <li>Solution</li>
                            <li>Global Network</li>
                        </ul>
                    </div>
                    <div className='lang-contact'>
                        <button className='contact-btn'>Contact us</button>
                        <div className='language-section'>
                            <img className='main-flag' src={currentLanguage} alt={currentLanguage} />
                            <img onClick={() => setShow(!show)} className='down-arrow' src="./images/arrow.svg" alt="arrow" />
                            <div className={show ? 'language-pop' : "language-pop language-pop-none"} >
                                {
                                    language.length && language.map((lang, index) => {
                                        return (
                                            <div key={index} className="single-Language">
                                                <input type="radio" name="language" value={lang.flag} onChange={handleLanguage} />
                                                <span>{lang.name}</span>
                                                <span>{lang.localName}</span>
                                                <img className='main-flag' src={lang.flag} alt={lang.name} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    )
}

export default Header