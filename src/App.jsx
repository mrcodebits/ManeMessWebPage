import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/admin/AdminPage';
import { AdminProvider } from './context/AdminContext';

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <HelmetProvider>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AdminProvider>
    </HelmetProvider>
  );
};

export default App;
