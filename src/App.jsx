import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Leaderboard from './pages/Leaderboard.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<>
    <Home />
    </>
  },
  {
    path:'/leaderboard',
    element:<>
    <Navbar />
    <Leaderboard />
    </>
  }
])
function App() {
  return (
    <div className=" ">
       <RouterProvider router={router} />
    </div>
  )
}

export default App