import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminProvider, useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { ArrowLeft, ChefHat, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sub-components
import AttendanceModule from '../../components/admin/AttendanceModule';
import POSModule from '../../components/admin/POSModule';
import MenuManager from '../../components/admin/MenuManager';
import SubscriberCRM from '../../components/admin/SubscriberCRM';
import AdminNotepad from '../../components/admin/AdminNotepad';
import PlanSettings from '../../components/admin/PlanSettings';
import PasswordVerifyModal from '../../components/admin/PasswordVerifyModal';

const DashboardOverview = () => {
    const { subscribers, sales, dailyMenu, addSubscriber, updateMenu } = useAdmin();
    const today = new Date().toISOString().split('T')[0];
    const currentYear = new Date().getFullYear();

    const handleSeedData = async () => {
        if (confirm("This will add sample subscribers and menu data. Continue?")) {
            await addSubscriber({ name: 'Aditya Patil', phone: '9876543210', plan: 'Full Tiffin', daysTotal: 30 });
            await addSubscriber({ name: 'Priya Deshmukh', phone: '9876543211', plan: 'Half Tiffin', daysTotal: 30 });
            await updateMenu({
                date: new Date().toLocaleDateString('en-IN'),
                items: ['Masala Bhindi', 'Dal Tadka', 'Jeera Rice', 'Chapati (3)'],
                special: 'Gulab Jamun',
                priceFull: 120,
                priceHalf: 80,
                imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f5816029bd'
            });
            alert('Database Seeded Successfully! Refresh to see changes.');
        }
    };

    // --- Stats Logic ---
    const activeSubscribers = subscribers.filter(s => s.status === 'Active').length;
    const totalEarnings = sales.reduce((acc, curr) => acc + curr.total, 0);

    // 1. Consumption Logic (Today)
    // Subscribers
    const subscribersUsedToday = subscribers.filter(s => s.history && s.history.some(date => date.startsWith(today)));
    const subFullToday = subscribersUsedToday.filter(s => s.plan && s.plan.toLowerCase().includes('full')).length;
    const subHalfToday = subscribersUsedToday.filter(s => s.plan && s.plan.toLowerCase().includes('half')).length;

    // Walk-ins (Sales)
    const salesToday = sales.filter(s => s.timestamp.startsWith(today));
    // Flatten items from all sales today
    const salesItemsToday = salesToday.flatMap(s => s.items);
    const saleFullToday = salesItemsToday.filter(i => i.name.toLowerCase().includes('full')).reduce((acc, i) => acc + i.qty, 0);
    const saleHalfToday = salesItemsToday.filter(i => i.name.toLowerCase().includes('half')).reduce((acc, i) => acc + i.qty, 0);

    // Totals
    const totalFullToday = subFullToday + saleFullToday;
    const totalHalfToday = subHalfToday + saleHalfToday;
    const subscribersToday = subscribersUsedToday.length;
    const nonSubscribersToday = salesToday.length;

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.header variants={itemVariants} className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-dark-900 flex items-center gap-2">
                        Good Morning, Owner! <span className="text-2xl">☀️</span>
                    </h1>
                    <p className="text-gray-500">Here's what's happening at Mane Mess today.</p>
                </div>
                {subscribers.length === 0 && (
                    <button
                        onClick={handleSeedData}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-green-200 animate-pulse hover:animate-none flex items-center gap-2"
                    >
                        <Sparkles size={18} /> Seed Sample Data
                    </button>
                )}
            </motion.header>

            {/* Quick Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="text-gray-500 text-sm mb-1">Active Members</div>
                    <div className="text-3xl font-bold text-primary-600">{activeSubscribers}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="text-gray-500 text-sm mb-1">Total Earnings</div>
                    <div className="text-3xl font-bold text-green-600">₹{totalEarnings}</div>
                </div>

                {/* Consumption Stats Card (New) */}
                <div className="bg-orange-50 p-6 rounded-2xl shadow-sm border border-orange-100 col-span-1 md:col-span-2">
                    <div className="text-orange-800 text-sm mb-3 font-bold flex justify-between items-center">
                        <span>Kitchen Report (Today)</span>
                        <span className="bg-orange-200 px-2 py-0.5 rounded text-xs text-orange-900">{new Date().toLocaleDateString('en-IN')}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/60 p-3 rounded-xl">
                            <div className="text-xs text-orange-700 uppercase font-bold tracking-wider mb-1">Full Thalis</div>
                            <div className="text-2xl font-bold text-orange-900">{totalFullToday}</div>
                            <div className="text-xs text-orange-600 opacity-80">{subFullToday} Sub + {saleFullToday} Walk-in</div>
                        </div>
                        <div className="bg-white/60 p-3 rounded-xl">
                            <div className="text-xs text-orange-700 uppercase font-bold tracking-wider mb-1">Half Thalis</div>
                            <div className="text-2xl font-bold text-orange-900">{totalHalfToday}</div>
                            <div className="text-xs text-orange-600 opacity-80">{subHalfToday} Sub + {saleHalfToday} Walk-in</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Notepad (New) */}
                <div className="lg:col-span-1 h-full min-h-[300px]">
                    <AdminNotepad />
                </div>

                {/* Yearly Analysis & Menu Preview (Existing) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-4 text-dark-900">Yearly Overview ({currentYear})</h3>
                        {/* Simplified Yearly View for space */}
                        <div className="flex gap-8">
                            <div>
                                <div className="text-sm text-gray-500">Subscribers Meals</div>
                                <div className="text-xl font-bold">{subscribers.reduce((acc, curr) => acc + (curr.daysUsed || 0), 0)}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Walk-in Meals</div>
                                <div className="text-xl font-bold">{sales.filter(s => new Date(s.timestamp).getFullYear() === currentYear).length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-4">Today's Special Preview</h3>
                        <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-xl group hover:bg-gray-100 transition-colors cursor-pointer">
                            {dailyMenu.imageUrl && (
                                <img src={dailyMenu.imageUrl} alt="Menu" className="w-20 h-20 rounded-lg object-cover group-hover:scale-105 transition-transform" />
                            )}
                            <div>
                                <div className="font-bold text-dark-900">{dailyMenu.special}</div>
                                <div className="text-sm text-gray-500">{dailyMenu.items.join(', ')}</div>
                                <div className="text-sm font-bold text-primary-600 mt-1">₹{dailyMenu.priceFull} / ₹{dailyMenu.priceHalf}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const AdminPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    // Login State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError('Invalid Credentials. Check your email/password.');
            console.error(err);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };



    // --- Security Logic ---
    const [showVerify, setShowVerify] = useState(false);
    const [pendingTab, setPendingTab] = useState('');
    // Note: We don't store 'isUnlocked' state because user requested "everytime".
    // So we just allow entry once upon success, but switching away triggers lock again effectively by virtue of this interception.
    // Actually, "everytime user tries to access settings" means if I am on Dashboard and click Settings -> Verify.
    // If I switch to POS and back to Settings -> Verify again.
    // So we just intercept the tab switch to 'settings'.

    const handleTabChange = (tabId) => {
        if (tabId === 'settings') {
            setPendingTab(tabId);
            setShowVerify(true);
        } else {
            setActiveTab(tabId);
        }
    };

    const handleVerifySuccess = () => {
        setShowVerify(false);
        if (pendingTab) {
            setActiveTab(pendingTab);
            setPendingTab('');
        }
    };

    if (loading) return (
        <div className="flex h-screen justify-center items-center bg-gray-50">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
                <ChefHat className="text-primary-500" size={48} />
            </motion.div>
        </div>
    );

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden"
                    >
                        {/* Decorative Background Element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-full -mr-10 -mt-10 opacity-50 pointer-events-none"></div>

                        <button
                            onClick={() => navigate('/')}
                            className="absolute top-4 left-4 text-gray-400 hover:text-dark-900 transition-colors z-10"
                            title="Back to Home"
                        >
                            <ArrowLeft size={24} />
                        </button>

                        <div className="text-center mt-6 mb-6">
                            <div className="inline-block p-4 bg-primary-50 rounded-full mb-4 text-primary-600">
                                <ChefHat size={32} />
                            </div>
                            <h1 className="text-2xl font-bold text-dark-900">Admin Portal</h1>
                            <p className="text-gray-500 text-sm">Welcome back! Please login to continue.</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4 flex items-center gap-2"
                            >
                                <span className="font-bold">!</span> {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:border-primary-500 outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                                    placeholder="admin@manemess.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:border-primary-500 outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
                            >
                                Sign In
                            </motion.button>
                        </form>
                        <p className="text-xs text-center text-gray-400 mt-6">
                            Secure Access • Mane Mess System
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    }

    return (
        <AdminProvider>
            <AdminLayout activeTab={activeTab} setActiveTab={handleTabChange} onLogout={handleLogout}>
                <PasswordVerifyModal
                    isOpen={showVerify}
                    onClose={() => { setShowVerify(false); setPendingTab(''); }}
                    onSuccess={handleVerifySuccess}
                    title="Restricted Access"
                    message="Please verify your identity to access Settings."
                />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'dashboard' && <DashboardOverview />}
                        {activeTab === 'attendance' && <AttendanceModule />}
                        {activeTab === 'pos' && <POSModule />}
                        {activeTab === 'subscribers' && <SubscriberCRM />}
                        {activeTab === 'menu' && <MenuManager />}
                        {activeTab === 'settings' && <PlanSettings />}
                    </motion.div>
                </AnimatePresence>
            </AdminLayout>
        </AdminProvider>
    );
};

export default AdminPage;
