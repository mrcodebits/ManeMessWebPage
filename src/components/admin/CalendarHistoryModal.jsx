import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const CalendarHistoryModal = ({ user, onClose }) => {
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

    // Renewal History Map
    const renewalMap = (user.renewalHistory || []).reduce((acc, event) => {
        const dateKey = event.date.split('T')[0]; // ISO String matches
        acc[dateKey] = event;
        return acc;
    }, {});

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
                                    {renewalMap[dateStr] && (
                                        <span className="absolute bottom-1 right-1">
                                            <RefreshCw size={10} className="text-secondary-600" />
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

                {/* Monthly Renewals List */}
                <div className="px-6 pb-4">
                    {(user.renewalHistory || [])
                        .filter(e => e.date.startsWith(currentMonthKey))
                        .map((event, idx) => (
                            <div key={idx} className="bg-orange-50 p-3 rounded-lg border border-orange-100 text-xs mb-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <RefreshCw size={12} className="text-orange-600" />
                                    <span className="font-bold text-orange-800">Plan Renewed: {new Date(event.date).toLocaleDateString('en-IN')}</span>
                                </div>
                                <div className="text-gray-600">
                                    {event.oldPlanName} → <strong>{event.newPlanName}</strong>
                                </div>
                                <div className="mt-1 font-medium text-gray-800">
                                    Paid: ₹{event.amountPaid} <span className="text-gray-400 font-normal">(Credit: ₹{event.creditApplied})</span>
                                </div>
                            </div>
                        ))}
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

export default CalendarHistoryModal;
