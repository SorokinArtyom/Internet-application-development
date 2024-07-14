import React from 'react';
import SvgComponent_head_1 from "../Components/svg_head_1";
import SvgComponent_head_2 from "../Components/svg_head_2";

const Head = () => {
    return (
        <div>
            <header className="u-border-2 u-border-grey-75 u-clearfix u-gradient u-header u-header" id="sec-56f3">
                <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                    <a className="u-image u-logo u-image-1">
                        <img src="images/default-logo.png" className="u-logo-image u-logo-image-1"/>
                    </a>
                    <nav className="u-menu u-menu-one-level u-offcanvas u-menu-1">
                        <div className="menu-collapse"
                             style="font-size: 1rem; letter-spacing: 0px; font-weight: 700; text-transform: uppercase;">
                            <a className="u-button-style u-custom-active-border-color u-custom-border u-custom-border-color u-custom-borders u-custom-hover-border-color u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-color u-custom-text-hover-color u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
                               href="#">
                                <SvgComponent_head_1/>
                                <SvgComponent_head_2/>
                            </a>
                        </div>
                        <div className="u-custom-menu u-nav-container">
                            <ul className="u-nav u-spacing-30 u-unstyled u-nav-1">
                                <li className="u-nav-item"><a
                                    className="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-light-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-grey-90 u-text-grey-90 u-text-hover-grey-90"
                                    href="Главная.html" style="padding: 10px 12px;">Главная</a>
                                </li>
                                <li className="u-nav-item"><a
                                    className="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-light-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-grey-90 u-text-grey-90 u-text-hover-grey-90"
                                    href="О-нас.html" style="padding: 10px 12px;">О нас</a>
                                </li>
                                <li className="u-nav-item"><a
                                    className="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-light-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-grey-90 u-text-grey-90 u-text-hover-grey-90"
                                    href="Контакты.html" style="padding: 10px 12px;">Контакты</a>
                                </li>
                                <li className="u-nav-item"><a
                                    className="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-light-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-grey-90 u-text-grey-90 u-text-hover-grey-90"
                                    href="blog/blog.html" style="padding: 10px 12px;">Выбор дисциплины</a>
                                </li>
                                <li className="u-nav-item"><a
                                    className="u-border-2 u-border-active-palette-1-base u-border-hover-palette-1-light-1 u-border-no-left u-border-no-right u-border-no-top u-button-style u-nav-link u-text-active-grey-90 u-text-grey-90 u-text-hover-grey-90"
                                    href="Your-rates.html" style="padding: 10px 12px;">Your rates</a>
                                </li>
                            </ul>
                        </div>
                        <div className="u-custom-menu u-nav-container-collapse">
                            <div
                                className="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
                                <div className="u-inner-container-layout u-sidenav-overflow">
                                    <div className="u-menu-close"></div>
                                    <ul className="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2">
                                        <li className="u-nav-item"><a className="u-button-style u-nav-link"
                                                                      href="Главная.html">Главная</a>
                                        </li>
                                        <li className="u-nav-item"><a className="u-button-style u-nav-link"
                                                                      href="О-нас.html">О нас</a>
                                        </li>
                                        <li className="u-nav-item"><a className="u-button-style u-nav-link"
                                                                      href="Контакты.html">Контакты</a>
                                        </li>
                                        <li className="u-nav-item"><a className="u-button-style u-nav-link"
                                                                      href="blog/blog.html">Выбор дисциплины</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="u-black u-menu-overlay u-opacity u-opacity-70"></div>
                        </div>
                    </nav>
                    <div className="u-align-left u-form-group u-form-submit u-form-group-2" id="Rates_container"></div>
                </div>
            </header>
            </div>
);
};
export default Head;