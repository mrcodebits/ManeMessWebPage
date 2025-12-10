import { useState } from 'react';
import { LayoutDashboard, Users, Utensils, ClipboardList, LogOut, Menu } from 'lucide-react';

const AdminLayout = ({ children, activeTab, setActiveTab, onLogout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
        { id: 'attendance', label: 'Attendance (Tokens)', icon: <ClipboardList size={20} /> },
        { id: 'pos', label: 'Walk-in POS', icon: <Utensils size={20} /> },
        { id: 'subscribers', label: 'Subscribers', icon: <Users size={20} /> },
        { id: 'menu', label: 'Daily Menu', icon: <Menu size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className={`fixed md:relative z-20 w-64 h-full bg-dark-900 text-white transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 border-b border-gray-800 flex justify-center">
                    <img src="/images/logo.svg" alt="Mane Mess" className="h-16 w-auto bg-white rounded-xl p-1" />
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-primary-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Mobile Header */}
                <header className="md:hidden bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
                    <h1 className="font-bold text-dark-900">Admin Panel</h1>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-gray-100 rounded-lg">
                        <Menu size={20} />
                    </button>
                </header>

                <div className="p-6 md:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 z-10 md:hidden" />
            )}
        </div>
    );
};

export default AdminLayout;
