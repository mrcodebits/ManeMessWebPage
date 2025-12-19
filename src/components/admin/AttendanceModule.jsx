import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Search, CheckCircle, AlertCircle, Clock, Calendar, X, ChevronLeft, ChevronRight, IdCard, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLAN_TYPES, CONSTANTS } from '../../utils/messConstants';
import CalendarHistoryModal from './CalendarHistoryModal';


const AttendanceModule = () => {
    const { subscribers, markAttendance } = useAdmin();
    const [searchTerm, setSearchTerm] = useState('');
    const [scannedUser, setScannedUser] = useState(null);
    const [viewingHistory, setViewingHistory] = useState(null);

    const filteredSubscribers = subscribers.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.phone.includes(searchTerm) ||
        (sub.uniqueId && sub.uniqueId.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleMarkAttendance = (user) => {
        if (user.status !== 'Active') return;

        const today = new Date().toISOString().split('T')[0];
        const todaysMeals = (user.history || []).filter(date => date.startsWith(today)).length;

        // Determine Plan Limits
        const plan = Object.values(PLAN_TYPES).find(p => p.id === user.planId);
        const mealsPerDay = plan ? plan.mealsPerDay : 1;

        // Warning Logic
        // Case 1: 1-Meal Plan, trying to mark 2nd meal
        if (mealsPerDay === 1 && todaysMeals >= 1) {
            const confirmExtra = window.confirm(
                `⚠️ WARNING: ${user.name} is on a 1-Meal Plan and has ALREADY eaten today.\n\nMarking this will deduct an EXTRA token from their remaining balance.\n\nProceed?`
            );
            if (!confirmExtra) return;
        }

        // Case 2: 2-Meal Plan, trying to mark 3rd meal
        if (mealsPerDay === 2 && todaysMeals >= 2) {
            const confirmExtra = window.confirm(
                `⚠️ WARNING: ${user.name} is on a 2-Meal Plan and has ALREADY eaten TWICE today.\n\nMarking this will deduct an EXTRA token from their remaining balance.\n\nProceed?`
            );
            if (!confirmExtra) return;
        }

        markAttendance(user.id);

        // Optimistic update for visual feedback
        setScannedUser({ ...user, tokensUsed: (user.tokensUsed || 0) + 1 });
        setTimeout(() => setScannedUser(null), 3000);
    };

    return (
        <div className="space-y-4 md:space-y-6 pb-20 md:pb-0">
            <header>
                <h2 className="text-xl md:text-2xl font-bold text-dark-900">Attendance Register 📝</h2>
                <p className="text-sm text-gray-500">Search member or verify token.</p>
            </header>

            {/* Scanned Feedback */}
            <AnimatePresence>
                {scannedUser && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-green-100 border border-green-200 p-4 md:p-6 rounded-2xl flex items-center gap-4 mb-4 md:mb-8 shadow-sm"
                    >
                        <div className="bg-green-500 text-white p-2 md:p-3 rounded-full shrink-0">
                            <CheckCircle size={24} className="md:w-8 md:h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-green-800">Attendance Marked!</h3>
                            <p className="text-green-700 text-sm md:text-base">
                                <strong>{scannedUser.name}</strong> <span className="opacity-75">({scannedUser.planName})</span> <br />
                                <span className="font-bold">Token {scannedUser.tokensUsed} of {scannedUser.totalTokens} used.</span>
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search by Name, Phone, or ID..."
                    className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-base md:text-lg shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* List */}
            <div className="grid gap-3 md:gap-4">
                {filteredSubscribers.map(user => (
                    <div key={user.id} className={`bg-white p-4 md:p-5 rounded-2xl md:rounded-xl border ${user.status === 'Active' ? 'border-l-4 border-l-green-500 border-gray-100' : 'border-l-4 border-l-red-500 border-gray-100'} shadow-sm flex flex-col lg:flex-row lg:items-center justify-between group md:hover:shadow-md transition-shadow gap-3 md:gap-4 active:scale-[0.99] md:active:scale-100 transition-transform`}>
                        <div className="flex gap-3 md:gap-4 items-center">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 shrink-0 text-sm md:text-base">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-dark-900 text-base md:text-lg flex items-center gap-2">
                                    {user.name}
                                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-normal border border-gray-200 flex items-center gap-0.5">
                                        <IdCard size={10} /> {user.uniqueId || 'N/A'}
                                    </span>
                                </h4>
                                <div className="flex flex-wrap gap-1 md:gap-2 text-xs md:text-sm text-gray-500 mt-0.5">
                                    <span>{user.planName}</span>
                                    <span className="hidden md:inline">•</span>
                                    <span className={user.status === 'Active' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                        {user.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between lg:justify-end gap-4 md:gap-6 w-full lg:w-auto mt-1 lg:mt-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-50">
                            <div className="text-left lg:text-right">
                                <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-bold">Remaining</div>
                                <div className="font-bold text-base md:text-xl text-dark-900">{(user.totalTokens || 0) - (user.tokensUsed || 0)} Tokens</div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewingHistory(user)}
                                    className="p-2 md:p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                                    title="View Calendar History"
                                >
                                    <Calendar size={18} className="md:w-5 md:h-5" />
                                </button>

                                {user.status === 'Active' ? (
                                    <button
                                        onClick={() => handleMarkAttendance(user)}
                                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold shadow-primary-200 shadow-lg active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap text-sm md:text-base"
                                    >
                                        <CheckCircle size={18} className="md:w-5 md:h-5" /> <span className="md:hidden">Mark</span><span className="hidden md:inline">Mark Present</span>
                                    </button>
                                ) : (
                                    <button className="bg-gray-100 text-gray-400 px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold cursor-not-allowed flex items-center gap-2 text-sm md:text-base">
                                        <AlertCircle size={18} className="md:w-5 md:h-5" /> <span className="md:hidden">Expired</span><span className="hidden md:inline">Expired</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {viewingHistory && (
                <CalendarHistoryModal user={viewingHistory} onClose={() => setViewingHistory(null)} />
            )}
        </div>
    );
};

export default AttendanceModule;
