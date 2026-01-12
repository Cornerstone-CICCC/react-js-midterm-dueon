//import { NavLink } from "react-router";

const Header = () => {
  return (
    <header>
      <div className="logo">LOGO</div>
      <nav>
        <menu>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Cart</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
        </menu>
      </nav>
    </header>
  );
};

export default Header;
