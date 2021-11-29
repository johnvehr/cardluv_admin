import React from 'react'

import AuthLayout from './layouts/Auth'
import Auth from './pages/auth/auth'

import AdminLayout from './layouts/Admin'
import AdminDashboard from './pages/admin/adminDashboard'
import AdminCards from './pages/admin/cards/cards'
import AddCard from './pages/admin/cards/new'
import CardDetail from './pages/admin/cards/cardDetail'
import Customers from './pages/admin/customers/customers'
import AdminDesigners from './pages/admin/designers/designers'
import AddDesigner from './pages/admin/designers/new'

const routes = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <Auth />
      }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/dashboard',
        element: <AdminDashboard />
      },
      {
        path: '/admin/designers',
        element: <AdminDesigners />
      },
      {
        path: '/admin/designers/new',
        element: <AddDesigner />
      },
      {
        path: '/admin/cards',
        element: <AdminCards />
      },
      {
        path: '/admin/cards/new',
        element: <AddCard />
      },
      {
        path: '/admin/cards/:id',
        element: <CardDetail />
      },
      {
        path: '/admin/customers',
        element: <Customers />
      }
    ]
  }
]

export default routes
