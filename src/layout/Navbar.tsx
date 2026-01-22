import {useLocation, Link} from 'react-router-dom';

export default function Navbar(){
    const location = useLocation();
    const MENU_NAVBAR =[
        {name: 'About', link: '#about'},
        {name: 'How To Use', link: '#how-to-use'},
        {name: 'Contact', link: '#contact'}
    ];

    return(
        <nav className="nav">
            <div className="nav-wrap">
                <div className="nav-left">
                    CounceList
                </div>

                <div className="nav-center">
                    {MENU_NAVBAR.map((item, index) => {
                        const isActive = location.pathname === item.link;
                        return (
                            <Link key={index} to={item.link} className={isActive ? 'active' : ''}>{item.name}</Link>
                        );
                    })}
                </div>

                <div className="nav-right">
                    <button className="try-now">Try It Now!</button>
                </div>
            </div>
        </nav>
    )
}