import React from 'react'
import Home from './components/Pages/Home';
import Atendimento from './components/Pages/Atendimento'
import Carrinho from './components/Pages/Carrinho'
import Avalienos from './components/Pages/Avalienos';
import { Router } from '@reach/router'
import CategoryItems from './components/Pages/CategoryItems';
import Administrativo from './components/Pages/Administrativo';
import Login from './components/Pages/Login';
import { Redirect } from '@reach/router';
import Cookies from 'universal-cookie';
import { AuthContext } from './Providers/Auth';
import Logout from '@mui/icons-material/Logout';
import UserManager from './components/UserManager';
import UserProfile from './components/Pages/UserProfile';

const NotFound = () => (
  <div>Sorry, nothing here.</div>
)

export default function App() {

  const { user, setUser } = React.useContext(AuthContext)

  return (
    <Router basepath='/fashion-store/'>

      <Login path='/login' />

      <Home path='/' exact />
      <Avalienos path='/avalie-nos' />
      <Atendimento path='/atendimento' />
      <Carrinho path='/carrinho' />
      <CategoryItems path='/clothes/:clothCategory' />

      {
        user.isLoggedIn ? (
          user.userAccess === 'admin' ?
            <>
              <Administrativo path='/administrative' />
              <UserProfile path='/user-profile' />
            </>
            :
            <>
              <UserManager path='/user-profile' />
            </>
        ) : (
          <Redirect from='/administrative' to='/fashion-store/login' noThrow />
        )
      }
      <Logout path='/logout' />
      <NotFound default />

    </Router>
  );
}
