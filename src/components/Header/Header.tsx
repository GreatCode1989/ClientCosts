import { useTheme } from "../../hooks";
import { useStore,  } from "effector-react";
import { $username } from "../../context/auth";

export const Header = () => {
    const { switchTheme, theme } = useTheme()
const username= useStore($username)

  return (
    <header className={`navbar bg-${theme === 'gray' ? 'dark' : 'primary'}`}>
      <div className="container">
        <h1 style={{ color: 'white'}}>Costs App</h1>
        {username.length ? <h2 style={{ color: 'white'}}>{username}</h2> : ''}
        <button
        onClick={switchTheme}
        className={`btn btn-${theme === 'gray' ? 'light' : 'light'}`}
        >
            {theme === 'gray' ? 'Go light' : 'Go gray'}
        </button>
      </div>
    </header>
  );
};
