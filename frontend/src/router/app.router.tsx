import AuthPage from '../pages/home/AuthPage'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/home/HomePage'
import Register from '../pages/home/RegisterPage'

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <HomePage></HomePage>
    },
    {
        path: '/auth',
        element: <AuthPage></AuthPage>
    }, 
    {
        path:'register',
        element: <Register></Register>
    }
])