import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CallIcon from '@mui/icons-material/Call';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Button from './Button';
import { Link, navigate } from '@reach/router'
import Cadastro from './Cadastro';
import { useContext } from 'react';
import { AuthContext } from '../Providers/Auth';
import Cookies from 'universal-cookie';

const Menu = styled.div`
    position: fixed;
    z-index: 999;
    width: 100%;
    background-color: #F67280;
    transition: all 0.3s ;
        
    &.transparent {
        background-color: #F6728090;
    }
`

const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 99999;
    height: 85px;
    padding: 0 2.5%;
`

const LeftMenu = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`

const RightMenuList = styled.ul`
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #f2f2f2;
    font-weight: 700;
    transition: none;

    @media (max-width: 720px) {
        flex-direction: column;
        justify-content: flex-start;
        position: absolute;
        top: 85px;
        left: 0;
        height: calc(100vh - 85px);
        width: 100%;
        padding: 10px 0px;
        left: ${props => props.active ? 0 : '-100%'};
        background-color: #F67280;
        transition: all 0.3s;

        &.transparent {
            background-color: #F6728090;
        }
    }
`

const MenuIconWrapper = styled.div`
    cursor: pointer;
    color: white;
    position: absolute;
    right: 0%;
    margin-right: 1rem;

    @media (min-width: 720px) {
        display: none;
    }
`

const NavItem = styled.li`
    display: flex;
    height: 85px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2px;
    box-sizing: border-box;
    cursor: pointer;
    border-bottom: 2px solid transparent;    
    transition: left 0.3s ease-out;

    :hover {
        border-bottom: 2px solid #fff;
    }

    @media (max-width: 720px) {
        height: auto;
        flex-direction: row;
        transition: all 0.3s;

        :hover {
            border-bottom: 2px solid transparent;
            color: #355c7d;
        }
    }
`

const Logo = styled.img`
    max-height: 70px;
    border-radius: 50%;
`

const StyledLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`

const LoggedInMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #F67280;
    position: absolute;
    padding: 1rem;
    top: 85px;
    right: calc(25px + 1rem);
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    f: all 0.3s;

    @media (max-width: 720px) {
        position: relative;
        top: 0;
        right: 0;
        padding: 0;
        gap: 1.5rem;
    }

    &.transparent {
            background-color: #F6728090;
    }
`

const LoggedInNavItem = styled.div`
    display: flex;
    align-items: center;
    gap: .3rem;
    padding: 10px;
    border-radius: 5px;

    @media (max-width: 720px) {
        padding: 0;
    }

    :hover {
       color: #355c7d;
    }
`

const LoggedInMenuIconWrapper = styled.div`
    display: block;

    @media (max-width: 720px) {
        display: none;
    }
`


export default function Navbar() {


    const [isShowingMenu, setIsShowingMenu] = useState(false);
    const [isShowingLoggedInMenu, setIsShowingLoggedInMenu] = useState(true);
    const [isTransparent, setIsTransparent] = useState(false);
    const [isShowingModal, setIsShowingModal] = useState(false);

    const { user, setUser } = useContext(AuthContext)

    const handleOutsideClick = () => {
        setIsShowingModal(false)
    }

    const handleResize = (e) => {
        setIsShowingMenu(false)
        if (e.target.innerWidth <= 720) {
            setIsShowingLoggedInMenu(true)
        } else {
            setIsShowingLoggedInMenu(false)
        }
    }

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsTransparent("transparent")
        } else {
            setIsTransparent("")
        }
    }



    useEffect(() => {
        window.addEventListener('resize', handleResize);

        window.addEventListener('scroll', handleScroll);

        return function cleanUp() {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleLogout = (e) => {
        e.preventDefault();


        const cookies = new Cookies()

        cookies.remove('httpOnly', { path: '/' })

        setUser({})

        navigate("/fashion-store")

    }

    const handleLoggedInMenuClick = (e) => {
        e.preventDefault();

        setIsShowingLoggedInMenu(!isShowingLoggedInMenu)

    }

    const handleSuccessfulLogin = () => {
        setIsShowingModal(false)
    }

    return (
        <Menu className={`${isTransparent} ? "transparent" : " "`}>
            <MenuContainer>
                <LeftMenu>
                    <StyledLink to="/fashion-store/">
                        <Logo alt='Logo' src="./images/Logo.png" />
                    </StyledLink>
                </LeftMenu>
                <MenuIconWrapper onClick={() => setIsShowingMenu(!isShowingMenu)}>
                    {!isShowingMenu ? <MenuIcon /> : <CloseIcon />}
                </MenuIconWrapper>
                <RightMenuList className={`${isTransparent} ? "transparent" : " "`} active={isShowingMenu}>
                    <StyledLink to='/fashion-store/avalie-nos'>
                        <NavItem>
                            <StarIcon color='white' />
                            Avalie-nos
                        </NavItem>
                    </StyledLink>
                    <StyledLink to='/fashion-store/atendimento'>
                        <NavItem>
                            <CallIcon color='white' />
                            Atendimento
                        </NavItem>
                    </StyledLink>
                    <StyledLink to='/fashion-store/carrinho'>
                        <NavItem>
                            <ShoppingCartIcon color='white' />
                            Carrinho
                        </NavItem>
                    </StyledLink>

                    {user.userAccess == 'admin' ? (
                        <StyledLink to='/fashion-store/administrative'>
                            <NavItem>
                                <PersonIcon color='white' />
                                Administrativo
                            </NavItem>
                        </StyledLink>
                    ) : null}

                    {user.isLoggedIn ? (
                        <>
                            <LoggedInMenuIconWrapper>
                                <StyledLink to='' onClick={handleLoggedInMenuClick}>
                                    <MoreVertIcon color='white' />
                                </StyledLink>
                            </LoggedInMenuIconWrapper>
                            {isShowingLoggedInMenu && <LoggedInMenu className={`${isTransparent}`}>


                                <StyledLink to="/fashion-store/user" >
                                    <LoggedInNavItem>
                                        <ManageAccountsIcon color='white' />
                                        Account
                                    </LoggedInNavItem>
                                </StyledLink>
                                <StyledLink to="/fashion-store" onClick={handleLogout}>
                                    <LoggedInNavItem>
                                        <LogoutIcon color='white' />
                                        Logout
                                    </LoggedInNavItem>
                                </StyledLink>
                            </LoggedInMenu>}
                        </>
                    ) : (
                        <Button onClick={() => setIsShowingModal(true)} type={isShowingMenu ? 'btn--secondary' : 'btn--outline'}>
                            <PersonIcon color='white' />
                            Entrar
                        </Button>
                    )}
                </RightMenuList>
            </MenuContainer>

            {isShowingModal && <Cadastro onClick={handleOutsideClick} onSuccessfulLogin={handleSuccessfulLogin} />}
        </Menu >
    )
}
