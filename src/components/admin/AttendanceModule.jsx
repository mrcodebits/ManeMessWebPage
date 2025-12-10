import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Search, CheckCircle, AlertCircle, Clock, Calendar, X, ChevronLeft, ChevronRight, IdCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PLAN_TYPES, CONSTANTS } from '../../utils/messConstants';

const CalendarModal = ({ user, onClose }) => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay(); // 0 is Sunday

    // History Frequency Map
    const historyMap = (user.history || []).reduce((acc, dateStr) => {
        const dateKey = dateStr.split('T')[0];
        acc[dateKey] = (acc[dateKey] || 0) + 1;
        return acc;
    }, {});

    // Filter History for Selected Month to Counting Total
    const currentMonthKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
    const monthlyTotal = (user.history || []).filter(dateStr => dateStr.startsWith(currentMonthKey)).length;

    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    const changeMonth = (offset) => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
                <div className="p-4 bg-primary-600 text-white flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg">{user.name}</h3>
                        <p className="text-xs text-primary-100 opacity-80">{user.planName}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                            <ChevronLeft size={20} />
                        </button>
                        <span className="font-bold text-lg text-dark-900">{monthName}</span>
                        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full">
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-bold text-gray-400">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}

                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const date = i + 1;
                            const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date);
                            const dateStr = dateObj.toISOString().split('T')[0];
                            const count = historyMap[dateStr] || 0;
                            const isPresent = count > 0;
                            const isToday = today.toISOString().split('T')[0] === dateStr;

                            // Visual Logic
                            let bgClass = isToday ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-gray-700 border-gray-100';
                            if (isPresent) {
                                if (count === 1) bgClass = 'bg-green-500 text-white border-green-600 shadow-sm';
                                else if (count === 2) bgClass = 'bg-purple-600 text-white border-purple-700 shadow-sm';
                                else bgClass = 'bg-orange-500 text-white border-orange-600 shadow-sm'; // More than 2
                            }

                            return (
                                <div
                                    key={date}
                                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium border relative ${bgClass}`}
                                    title={isPresent ? `Meals: ${count}` : ''}
                                >
                                    {date}
                                    {count > 2 && (
                                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full border border-white">
                                            {count}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-center gap-4 mt-4 text-xs">
                        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> 1 Meal</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-purple-600 rounded-sm"></div> 2 Meals</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-orange-500 rounded-sm"></div> 3+ Meals</div>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 flex justify-between items-center text-xs text-gray-500 border-t border-gray-100">
                    <div>Total Used (All Time): <strong>{user.tokensUsed}</strong> / {user.totalTokens}</div>
                    <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-bold">
                        {monthName} Usage: {monthlyTotal}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

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
                    <div key={user.id} className={`bg-white p-4 md:p-5 rounded-2xl md:rounded-xl border ${user.status === 'Active' ? 'border-l-4 border-l-green-500 border-gray-100' : 'border-l-4 border-l-red-500 border-gray-100'} shadow-sm flex flex-col md:flex-row md:items-center justify-between group md:hover:shadow-md transition-shadow gap-3 md:gap-4 active:scale-[0.99] md:active:scale-100 transition-transform`}>
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

                        <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 w-full md:w-auto mt-1 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-50">
                            <div className="text-left md:text-right">
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
                <CalendarModal user={viewingHistory} onClose={() => setViewingHistory(null)} />
            )}
        </div>
    );
};

export default AttendanceModule;
