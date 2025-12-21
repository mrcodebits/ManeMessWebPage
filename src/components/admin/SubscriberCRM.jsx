import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Plus, RefreshCw, Smartphone, User, IdCard, CalendarCheck, Calendar } from 'lucide-react';
import { PLAN_TYPES, calculateRenewalDetails } from '../../utils/messConstants';
import CalendarHistoryModal from './CalendarHistoryModal';
import PasswordVerifyModal from '../../components/admin/PasswordVerifyModal';
import useModalBack from '../../hooks/useModalBack';

const SubscriberCRM = () => {
    const { subscribers, renewSubscription, addSubscriber } = useAdmin();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);

    // Use Modal Back Hooks
    useModalBack(isAddModalOpen, () => setIsAddModalOpen(false), 'add-member-modal');
    useModalBack(isRenewModalOpen, () => setIsRenewModalOpen(false), 'renew-modal');

    // State for Add Member
    const [newMember, setNewMember] = useState({
        name: '',
        phone: '',
        planId: PLAN_TYPES.FULL_TIFFIN_1M.id, // Default
    });

    // State for Renewal
    const [selectedSubscriber, setSelectedSubscriber] = useState(null);
    const [newPlanForRenewal, setNewPlanForRenewal] = useState(null);
    const [renewalDetails, setRenewalDetails] = useState(null);
    const [viewingHistory, setViewingHistory] = useState(null);
    const [showVerifyModal, setShowVerifyModal] = useState(false);

    useModalBack(showVerifyModal, () => setShowVerifyModal(false), 'crm-verify-modal');
    // Note: viewingHistory is also a modal (CalendarHistoryModal)
    useModalBack(!!viewingHistory, () => setViewingHistory(null), 'history-modal');

    const [filterType, setFilterType] = useState('ALL');

    const filteredSubscribers = subscribers.filter(sub => {
        const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.phone.includes(searchTerm) ||
            (sub.uniqueId && sub.uniqueId.toLowerCase().includes(searchTerm.toLowerCase()));

        if (!matchesSearch) return false;

        if (filterType === 'ALL') return true;

        const plan = Object.values(PLAN_TYPES).find(p => p.id === sub.planId);
        if (!plan) return false; // Should not happen but safety check

        if (filterType === 'DINE_IN') return plan.type === 'DINE_IN';
        if (filterType === 'DABBA') return plan.type === 'DABBA';
        if (filterType === '1M') return plan.mealsPerDay === 1;
        if (filterType === '2M') return plan.mealsPerDay === 2;

        return true;
    });

    const handleAddMember = (e) => {
        e.preventDefault();
        addSubscriber(newMember);
        setIsAddModalOpen(false);
        setNewMember({ name: '', phone: '', planId: PLAN_TYPES.FULL_TIFFIN_1M.id });
    };

    const openRenewModal = (sub) => {
        setSelectedSubscriber(sub);
        const defaultPlanId = sub.planId || PLAN_TYPES.FULL_TIFFIN_1M.id;
        setNewPlanForRenewal(defaultPlanId);
        setRenewalDetails(calculateRenewalDetails(sub, defaultPlanId));
        setIsRenewModalOpen(true);
    };

    const handlePlanChange = (planId) => {
        setNewPlanForRenewal(planId);
        if (selectedSubscriber) {
            setRenewalDetails(calculateRenewalDetails(selectedSubscriber, planId));
        }
    };

    const handleRenewSubmit = (e) => {
        e.preventDefault();
        if (!selectedSubscriber) return;
        // Trigger verification instead of immediate renewal
        setShowVerifyModal(true);
    };

    const confirmRenewalAfterVerify = () => {
        if (!selectedSubscriber) return;

        renewSubscription(selectedSubscriber.id, newPlanForRenewal, renewalDetails);

        setIsRenewModalOpen(false);
        setShowVerifyModal(false);
        setSelectedSubscriber(null);
    };

    return (
        <div className="space-y-4 md:space-y-6 pb-20 md:pb-0"> {/* added padding bottom for mobile nav likely */}
            {/* Header ... */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-dark-900">Manage Subscribers 👥</h2>
                    <p className="text-sm text-gray-500">Add new members or renew plans.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full md:w-auto bg-dark-900 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-colors"
                >
                    <Plus size={20} /> Add New Member
                </button>
            </header>

            {/* Modals ... */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4 transition-opacity">
                    <div className="bg-white p-6 md:p-8 rounded-t-3xl md:rounded-2xl w-full max-w-md shadow-2xl transform transition-transform duration-200 ease-in-out md:scale-100 scale-100">
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 md:hidden" /> {/* Mobile handle */}
                        <h3 className="text-xl font-bold mb-6">Register New Member</h3>
                        <form onSubmit={handleAddMember} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                <input
                                    required
                                    className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:border-primary-500"
                                    value={newMember.name}
                                    onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                                    placeholder="e.g. Rohini Iyer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:border-primary-500"
                                    value={newMember.phone}
                                    onChange={e => setNewMember({ ...newMember, phone: e.target.value })}
                                    placeholder="9876543210"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Select Plan</label>
                                <select
                                    className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:border-primary-500 bg-white"
                                    value={newMember.planId}
                                    onChange={e => setNewMember({ ...newMember, planId: e.target.value })}
                                >
                                    {Object.values(PLAN_TYPES).map(plan => (
                                        <option key={plan.id} value={plan.id}>{plan.name} (₹{plan.basePrice})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Renew Modal */}
            {isRenewModalOpen && selectedSubscriber && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
                    <div className="bg-white p-6 md:p-8 rounded-t-3xl md:rounded-2xl w-full max-w-md shadow-2xl animate-in slide-in-from-bottom md:zoom-in duration-200">
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 md:hidden" />
                        <h3 className="text-xl font-bold mb-2">Renew / Upgrade Plan</h3>
                        <p className="text-sm text-gray-500 mb-6">Renewing for <strong>{selectedSubscriber.name}</strong></p>

                        <form onSubmit={handleRenewSubmit} className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mb-4">
                                <strong>Current Status:</strong> {(selectedSubscriber.totalTokens || 0) - (selectedSubscriber.tokensUsed || 0)} Tokens Remaining.<br />
                                <span className="text-xs opacity-80">Unused tokens will be credited towards the new plan.</span>
                            </div>

                            {renewalDetails && (
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">New Plan Cost:</span>
                                        <span className="font-bold">₹{renewalDetails.newPlanCost}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-600">Credit (Unused Tokens):</span>
                                        <span className="font-bold text-green-600">- ₹{renewalDetails.creditValue}</span>
                                    </div>
                                    <div className="h-px bg-gray-200 my-1"></div>
                                    <div className="flex justify-between text-base font-bold text-dark-900">
                                        <span>Net Payable:</span>
                                        <span>₹{renewalDetails.netPayable}</span>
                                    </div>
                                    {renewalDetails.netPayable < 0 && (
                                        <p className="text-xs text-orange-600 mt-1">
                                            ⚠️ User has excess credit. Refund ₹{Math.abs(renewalDetails.netPayable)} or adjust manually.
                                        </p>
                                    )}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Select New Plan</label>
                                <select
                                    className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:border-primary-500 bg-white"
                                    value={newPlanForRenewal}
                                    onChange={e => handlePlanChange(e.target.value)}
                                >
                                    {Object.values(PLAN_TYPES).map(plan => (
                                        <option key={plan.id} value={plan.id}>{plan.name} (₹{plan.basePrice})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setIsRenewModalOpen(false)} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-secondary-600 text-white font-bold rounded-xl hover:bg-secondary-700 transition-colors">Confirm Renewal</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Search by Name, Phone, or ID..."
                    className="flex-[2] px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white font-medium text-gray-700"
                >
                    <option value="ALL">All Subscriptions</option>
                    <option value="DINE_IN">🍽️ Dine-In Only</option>
                    <option value="DABBA">🥡 Tiffin / Dabba</option>
                    <option value="1M">1 Meal / Day</option>
                    <option value="2M">2 Meals / Day</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {filteredSubscribers.map(sub => (
                    <div key={sub.id} className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full relative overflow-hidden active:scale-[0.99] transition-transform duration-100">
                        {/* Unique ID Badge */}
                        <div className="absolute top-0 right-0 bg-gray-50 px-3 py-1.5 rounded-bl-xl text-[10px] md:text-xs font-bold text-gray-400 flex items-center gap-1 border-b border-l border-gray-100">
                            <IdCard size={12} /> {sub.uniqueId || 'N/A'}
                        </div>

                        <div>
                            <div className="flex justify-between items-start mb-4 mt-2">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                                        <User size={20} className="md:w-6 md:h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base md:text-lg text-dark-900 leading-tight">{sub.name}</h3>
                                        <div className="flex items-center gap-1 text-xs md:text-sm text-gray-400 mt-0.5">
                                            <Smartphone size={12} className="md:w-3.5 md:h-3.5" /> {sub.phone}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5 md:mb-6">
                                <div className="bg-gray-50 p-3 rounded-xl">
                                    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide mb-1">Plan</div>
                                    <div className="font-bold text-dark-800 text-xs md:text-sm line-clamp-1">{sub.planName}</div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl">
                                    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide mb-1">Tokens Left</div>
                                    <div className="font-bold text-dark-800 text-xs md:text-sm flex items-center gap-1.5">
                                        <CalendarCheck size={14} className="text-primary-500 md:w-4 md:h-4" />
                                        {(sub.totalTokens || 0) - (sub.tokensUsed || 0)} <span className="text-gray-400 text-[10px] font-normal">/ {sub.totalTokens}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex gap-3 items-center justify-between">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold ${sub.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {sub.status}
                            </span>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewingHistory(sub)}
                                    className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                                    title="View Calendar History"
                                >
                                    <Calendar size={20} className="md:w-5 md:h-5" />
                                </button>
                                <button
                                    onClick={() => openRenewModal(sub)}
                                    className="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors text-xs md:text-sm"
                                >
                                    <RefreshCw size={14} className="md:w-4 md:h-4" /> Renew
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {viewingHistory && (
                <CalendarHistoryModal user={viewingHistory} onClose={() => setViewingHistory(null)} />
            )}

            <PasswordVerifyModal
                isOpen={showVerifyModal}
                onClose={() => setShowVerifyModal(false)}
                onSuccess={confirmRenewalAfterVerify}
                title="Confirm Renewal"
                message="This action will process a financial transaction. Please verify your identity."
            />
        </div>
    );
};

export default SubscriberCRM;
