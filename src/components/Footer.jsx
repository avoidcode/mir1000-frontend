import { FaSquareFacebook, FaSquareInstagram, FaSquareXTwitter, FaSquareYoutube } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded max-md:px-0 mt-10">
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <FaSquareXTwitter className="text-6xl max-sm:text-4xl text-accent-content" />
                    <FaSquareFacebook className="text-6xl max-sm:text-4xl text-accent-content" />
                    <FaSquareInstagram className="text-6xl max-sm:text-4xl text-accent-content" />
                    <FaSquareYoutube className="text-6xl max-sm:text-4xl text-accent-content" />
                </div>
            </nav>
            <aside>
                <p className="text-2xl max-sm:text-sm text-accent-content">
                    © 2024 - Все права защищены
                </p>
            </aside>
        </footer>
    );
};

export default Footer;
