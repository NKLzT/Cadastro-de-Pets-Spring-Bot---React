import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header({ refreshAnimals }) {
    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/animals" className="nav-link" onClick={refreshAnimals}>Listar Animais</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/create-animal" className="nav-link">Criar Animal</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;