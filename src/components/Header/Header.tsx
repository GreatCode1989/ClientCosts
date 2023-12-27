import { useTheme } from "../../hooks";
import { useStore,  } from "effector-react";
import { $auth, $username } from "../../context/auth";
import { removeUser } from "../../utils/auth";
import './styles.css'

export const Header = () => {
    const { switchTheme, theme } = useTheme()
const username= useStore($username)
const loggedIn = useStore($auth)

  return (
    <header className={`navbar bg-${theme === 'gray' ? 'dark' : 'primary'}`}>
      <div className="container">
        <h1 style={{ color: 'white'}}>Costs App</h1>
        {username.length ? <h2 style={{ color: 'white'}}>{username}</h2> : ''}
        <button
        onClick={switchTheme}
        className={`btn btn-theme btn-${theme === 'gray' ? 'light' : 'light'}`}
        >
            {theme === 'gray' ? 'Light' : 'Black'}
        </button>
        {loggedIn && <button className="btn btn-logout btn-danger" onClick={removeUser}>Выход</button>}
      </div>
    </header>
  );
};
