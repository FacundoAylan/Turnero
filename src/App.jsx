import * as React from 'react';
import * as ReactDom from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Home from './component/02-home/Home'
import './App.css'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    }
  ])

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
