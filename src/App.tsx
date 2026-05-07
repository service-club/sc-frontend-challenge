import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.tsx'
import { GrandmastersListPage } from './pages/GrandmastersListPage.tsx'
import { GrandmasterProfilePage } from './pages/GrandmasterProfilePage.tsx'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/grandmasters" replace />} />
        <Route path="/grandmasters" element={<GrandmastersListPage />} />
        <Route path="/player/:username" element={<GrandmasterProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App

function NotFound() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-lg font-semibold">Page not found</div>
      <div className="mt-2 text-sm text-white/70">
        The page you are looking for does not exist.
      </div>
    </div>
  )
}
