import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const NavbarLogo = () => (
    <div className="flex items-center space-x-4">
        <Link to="/">
            <img
                src={Logo}
                alt="Shop Logo"
                className="h-16 w-auto md:h-20 object-contain"
            />
        </Link>
    </div>
);

export default NavbarLogo;
