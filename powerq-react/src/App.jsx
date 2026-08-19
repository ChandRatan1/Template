import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CatalogProvider } from './context/CatalogContext'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PricingPage from './pages/PricingPage'
import FaqPage from './pages/FaqPage'
import RequestQuotePage from './pages/RequestQuotePage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import SlugPage from './pages/SlugPage'
import SmokeAlarmPage from './pages/SmokeAlarmPage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <CatalogProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about-us" element={<AboutPage />} />
            <Route path="contact-us" element={<ContactPage />} />
            <Route path="cost-of-test-tag-in-melbourne" element={<PricingPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="request-a-quote" element={<RequestQuotePage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="smoke-alarm-service-melbourne" element={<SmokeAlarmPage />} />
            <Route path=":slug" element={<SlugPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CatalogProvider>
  )
}
