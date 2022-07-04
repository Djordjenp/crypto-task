import styles from "./Buttons.module.css";
import useStore from "../../store/store";

const LogOutButton = () => {
   const toggleLogIn = useStore(state => state.toggleLoggedIn)


   return <button onClick={toggleLogIn} className={`${styles.button} ${styles['button-logout']}`}>Log Out</button>

}


export default LogOutButton;