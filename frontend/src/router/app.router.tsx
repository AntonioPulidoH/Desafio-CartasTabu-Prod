import AuthPage from '../pages/home/AuthPage'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/home/HomePage'
import Register from '../pages/home/RegisterPage'
import Rules from '../pages/home/RulesPage'
import ProfilePage from '../pages/profile/ProfilePage'
import PrivateRoute from './PrivateRoute'

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
        path: 'register',
        element: <Register></Register>
    },
    {
        path: 'rules',
        element: <Rules></Rules>
    },
    {
        path:'/profile',
        element: 
        <PrivateRoute>
            <ProfilePage></ProfilePage>
        </PrivateRoute>
    }
])