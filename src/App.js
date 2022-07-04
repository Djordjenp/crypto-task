import './App.module.css';
import {Routes, Route, NavLink} from "react-router-dom";
import Home from "./pages/Home/Home";
import CurrencyDetails from "./pages/CurrencyDetails/CurrencyDetails";
import LogInButton from "./components/Buttons/LogInButton";
import useStore from "./store/store";
import LogOutButton from "./components/Buttons/LogOutButton";
import styles from './App.module.css'
import Favorites from "./pages/Favorites/Favorites";
import {io} from "socket.io-client";

function App() {

    const isLoggedIn = useStore(state => state.loggedIn)



  return (
      <div className={`${styles.app} container`}>
          <div className={'row'}>
              <nav className={`${styles.nav}`}>
                  <NavLink to={`/`}>Home</NavLink>
                  {isLoggedIn ? <NavLink className={({ isActive }) =>
                      (isActive ? "active" : "")} to={`/favorites`}>Favorites</NavLink> : null}

              </nav>

              {isLoggedIn ? <LogOutButton/> : <LogInButton />}
          </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/CurrencyDetails/:symbol" element={<CurrencyDetails />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
      </div>
  );
}

export default App;
