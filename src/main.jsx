import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router/router.jsx'
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ToastContainer/>
  <RouterProvider router={router} />
</StrictMode>
)
