import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import Container from '../src/Container'
import Logo from '../src/Logo'
function Header() {

   
    const LoginStatus = useSelector((state) => state.Auth.Status)
    const navlist = [
        {
            Name: "Home",
            Path: "/",
            Active: "active"

        },
        {
            Name: "Login",
            Path: "/login",
            Active: !LoginStatus
        },
        {
            Name: "Signup",
            Path: "/signup",
            Active: !LoginStatus
        },
        {
            Name: "All Posts",
            Path: "/all-posts",
            Active: LoginStatus,
        },
        {
            Name: "Add Post",
            Path: "/add-post",
            Active: LoginStatus,
        },
    ]

    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px' />

                        </Link>

                    </div>

                <ul  className='flex ml-auto items-center'
                >
                    {navlist.map((navitem)=>
                        navitem.Active? (
                           <li className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                           key={navitem.Name}>
                             <Link
                            to={navitem.Path}>
                            {navitem.Name}
                            </Link>
                           </li>
                        ) : null
                    
                    )}


                    {LoginStatus && (
                        <li>
                            <LogoutBtn/>
                        </li>
                    )}
                </ul>

                </nav>
            </Container>
        </header>
    )
}

export default Header
