import AuthPage from '../pages/home/AuthPage'
import { createBrowserRouter } from 'react-router-dom'

export const appRouter = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthPage></AuthPage>
    }
])