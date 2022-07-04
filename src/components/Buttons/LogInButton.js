import styles from './Buttons.module.css'
import useStore from "../../store/store";
const LogInButton = () => {

    const toggleLogIn = useStore(state => state.toggleLoggedIn)

    return (
        <button onClick={toggleLogIn} className={`${styles.button} ${styles['button-login']}`}>Log In</button>
    )
}

export default LogInButton;