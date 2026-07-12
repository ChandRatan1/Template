import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import FloatingContact from '../FloatingContact/FloatingContact'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
      <a href="#top" className="scrollToTop scroll-btn" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <i className="far fa-arrow-up" />
      </a>
    </>
  )
}
