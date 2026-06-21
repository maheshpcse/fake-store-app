import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '@/components/common/ProtectedRoute'
import { AppLayout } from '@/components/layout/AppLayout'
import { AddressesPage } from '@/pages/AddressesPage'
import { CartPage } from '@/pages/CartPage'
import { CategoriesPage } from '@/pages/CategoriesPage'
import { CouponsPage } from '@/pages/CouponsPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { OrderDetailsPage } from '@/pages/OrderDetailsPage'
import { OrdersPage } from '@/pages/OrdersPage'
import { PaymentsPage } from '@/pages/PaymentsPage'
import { ProductDetailsPage } from '@/pages/ProductDetailsPage'
import { ProductsPage } from '@/pages/ProductsPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ReportsPage } from '@/pages/ReportsPage'
import { ReviewsPage } from '@/pages/ReviewsPage'
import { WishlistPage } from '@/pages/WishlistPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  {
    element: <ProtectedRoute />,
    children: [{
      element: <AppLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/:id', element: <ProductDetailsPage /> },
        { path: 'categories', element: <CategoriesPage /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'wishlist', element: <WishlistPage /> },
        { path: 'orders', element: <OrdersPage /> },
        { path: 'orders/:id', element: <OrderDetailsPage /> },
        { path: 'payments', element: <PaymentsPage /> },
        { path: 'reviews', element: <ReviewsPage /> },
        { path: 'coupons', element: <CouponsPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'addresses', element: <AddressesPage /> },
        { path: 'reports', element: <ReportsPage /> },
      ],
    }],
  },
  { path: '*', element: <NotFoundPage /> },
])
