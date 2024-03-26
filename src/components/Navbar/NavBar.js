/* eslint-disable jsx-a11y/anchor-is-valid */
import "./navbar.css";
import logo from "../../assets/Logo.png";
import hamburgerMenu from "../../assets/hamburgerMenu.png";
import closeIcon from "../../assets/closeIcon.png";
import { useEffect, useState } from "react";

const menuItems = [
  { name: "Demos", submenu: [] },
  {
    name: "Post",
    submenu: [
      { name: "Post Header" },
      { name: "Post Layout" },
      { name: "Share Buttons" },
      { name: "Gallery Post" },
      { name: "Video Post" },
    ],
  },
  { name: "Features", submenu: [] },
  { name: "Categories", submenu: [] },
  { name: "Shop", submenu: [] },
  { name: "By Now", submenu: [] },
];

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [isMenuVisible, setIsMenuVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsMenuVisible(scrollPosition <= 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileMenuOpen]);

  return (
    <div
      className={`navigation-wrapper ${isMenuVisible ? "visible" : "hidden"}`}
      id="navigation-wrapper"
    >
      <div className="upper-container">
        <img src={logo} alt="logo" />
        {!isMobileMenuOpen && (
          <img
            src={hamburgerMenu}
            alt="hamburger_icon"
            className="hamburger-icon"
            onClick={toggleMobileMenu}
          />
        )}
      </div>
      <div className="menu-items-container">
        <nav className="horizontal-menu">
          <ul className="menu">
            {menuItems.map((menuItem, index) => (
              <li key={index}>
                <a href="#">{menuItem.name}</a>
                {!!menuItem.submenu.length && (
                  <>
                    {" "}
                    <span className="arrow">&#9013;</span>
                    <ul className="submenu">
                      {menuItem.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a href="#">{subItem.name}</a>
                          <span className="arrow">&#9013;</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        className={`mobile-menu-container ${isMobileMenuOpen ? "open" : ""}`}
      >
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="upper-container mobile">
              <img src={logo} alt="logo" />
              <img
                src={closeIcon}
                alt="close_icon"
                className="hamburger-icon"
                onClick={toggleMobileMenu}
              />
            </div>
            <hr className="divider" />
            <nav>
              <ul>
                {menuItems.map((menuItem, index) => (
                  <li key={index}>
                    <a href="#">{menuItem.name}</a>
                    <span className="arrow">&#9013;</span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};
export default NavBar;
