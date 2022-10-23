import { useState } from 'react';
import { IconContext } from 'react-icons';
import { IoMoon } from 'react-icons/io5';
import { MdLightMode } from 'react-icons/md';
import { RiLightbulbFlashLine } from 'react-icons/ri';
import { Link } from 'remix';
import { Theme, useTheme } from '~/providers/ThemeProvider';

export const Navbar = () => {
    const [, setTheme] = useTheme();
    const [toggle, setToggle] = useState(false);

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === Theme.PALYANITSA ? Theme.RETRO : Theme.PALYANITSA
        );
        setToggle((prevState) => !prevState)
    };

    const toggleLanguage = () => {
        console.log('sdsdsad');
    };

    return (
        <IconContext.Provider value={{ size: '2em' }}>
            <div className="sp-navbar bg-base-100 shadow-xl sticky top-0 z-50">
                <div className="sp-navbar-start">
                    <div className="sp-dropdown">
                        <label
                            tabIndex="0"
                            className="sp-btn-circle sp-btn sp-btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex="0"
                            className="sp-menu-compact sp-dropdown-content sp-menu rounded-box mt-3 w-52 bg-base-100 p-2 shadow"
                        >
                            <li>
                                <Link to="/episodes">Episodes</Link>
                            </li>
                            <li>
                                <Link to="/seasons">Seasons</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-12 h-12 object-contain">
                        <img src="../../images/zsu.png" alt="zcu" />
                    </div>

                </div>
                <div className="sp-navbar-center">
                    <Link
                        className="sp-btn sp-btn-ghost text-xl normal-case"
                        to="/"
                    >
                        <img src="../../images/blazon.svg" alt="zcu" />
                    </Link>
                </div>
                <div className="sp-navbar-end">
                    {/* <div>
                        <label className="sp-swap">
                            <input type="checkbox" />
                            <div className="sp-swap-on">UA</div>
                            <div className="sp-swap-off">EN</div>
                        </label>
                    </div> */}
                    <Link to={`/?lng=ua`}>UA</Link>
                    <Link to={`/?lng=en`}>EN</Link>
                    {/* <div className="flex justify-between">
                        <MdLightMode />
                        <input type="checkbox" className="sp-toggle sp-toggle-primary" checked={toggle} onChange={toggleTheme} />
                        <IoMoon />
                    </div> */}
                    <button
                        className="sp-btn-circle sp-btn sp-btn-ghost"
                        onClick={toggleTheme}
                    >
                        <RiLightbulbFlashLine />
                    </button>
                </div>

            </div>
        </IconContext.Provider>
    );
};
