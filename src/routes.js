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
import NewBracelet from './pages/admin/bracelets/new'
import Bracelets from './pages/admin/bracelets/bracelets'
import EditBracelet from './pages/admin/bracelets/edit'
import Bracelet from './pages/admin/bracelets/bracelet'
import EditGiftCard from './pages/admin/gift_cards/edit'
import GiftCards from './pages/admin/gift_cards/giftcards'
import GiftCard from './pages/admin/gift_cards/giftcard'
import NewGiftCard from './pages/admin/gift_cards/new'
import Orders from './pages/admin/orders/orders'
import Order from './pages/admin/orders/order'

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
        path: '/admin/bracelets/:id',
        element: <Bracelet />
      },
      {
        path: '/admin/bracelets',
        element: <Bracelets />
      },
      {
        path: '/admin/bracelets/new',
        element: <NewBracelet />
      },
      {
        path: '/admin/bracelets/edit/:id',
        element: <EditBracelet />
      },
      {
        path: '/admin/giftcards',
        element: <GiftCards />
      },
      {
        path: '/admin/giftcards/:id',
        element: <GiftCard />
      },
      {
        path: '/admin/giftcards/edit/:id',
        element: <EditGiftCard />
      },
      {
        path: '/admin/giftcards/new',
        element: <NewGiftCard />
      },
      {
        path: '/admin/customers',
        element: <Customers />
      },
      {
        path: '/admin/orders',
        element: <Orders />
      },
      {
        path: '/admin/orders/:id',
        element: <Order />
      }
    ]
  }
]

export default routes
