import classes from './Header.module.css'
import { useHistory } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { authActions } from './store/AuthStore';


const Header = () => {
  
  const dispatch=useDispatch()

  const totalSpent=useSelector((currState)=>currState.exp.totalSpent)
   //console.log(totalSpent)
   const history=useHistory()

    const logoutHandler = () => {
      dispatch(authActions.logout())
      history.replace("./");
    };

    return (
      <header className={classes.header}>
        <h1>Expense Tracker</h1>
        {(
          <nav>
            <ul>
              {/* <li>
                <a href="/">My Products</a>
              </li> */}
              {/* <li>
                <a href="/">My Sales</a>
              </li> */}
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
              <li>
                {totalSpent>10000 && <button>Active premium button</button>}
              </li>
            </ul>
          </nav>
        )}
      </header>
    );
  };
  
  export default Header;
  