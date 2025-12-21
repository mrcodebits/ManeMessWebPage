import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, AlertTriangle, Edit2, X } from 'lucide-react';

const PlanSettings = () => {
    const { planSettings, updatePlanPrice } = useAdmin();
    const toast = useToast();
    const [editingId, setEditingId] = useState(null);
    const [tempPrice, setTempPrice] = useState('');

    const handleEdit = (plan) => {
        setEditingId(plan.id);
        setTempPrice(plan.basePrice);
    };

    const handleSave = async (planId) => {
        if (!tempPrice || isNaN(tempPrice) || Number(tempPrice) < 0) {
            toast.error("Please enter a valid positive price.");
            return;
        }
        await updatePlanPrice(planId, tempPrice);
        setEditingId(null);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex gap-3 text-sm text-yellow-800">
                <AlertTriangle size={20} className="shrink-0" />
                <div>
                    <strong>Important:</strong> Price changes will only apply to <u>New Subscriptions</u> and <u>Plan Renewals</u>.
                    Existing active plans will retain their current rates until they expire.
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(planSettings).map((plan) => (
                    <div key={plan.id} className="bg-white border p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-dark-900">{plan.name}</h4>
                                <span className={`text-xs px-2 py-0.5 rounded border ${plan.type === 'DINE_IN' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                    {plan.type === 'DINE_IN' ? 'Dine-In' : 'Tiffin Service'}
                                </span>
                            </div>
                            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {plan.mealsPerDay} Meal{plan.mealsPerDay > 1 ? 's' : ''}/Day
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                            {editingId === plan.id ? (
                                <div className="flex items-center gap-2 w-full animate-in slide-in-from-right duration-200">
                                    <span className="font-bold text-gray-500">₹</span>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                                        value={tempPrice}
                                        onChange={(e) => setTempPrice(e.target.value)}
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => handleSave(plan.id)}
                                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                        title="Save"
                                    >
                                        <Save size={16} />
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                                        title="Cancel"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="text-2xl font-bold text-primary-600">
                                        ₹{plan.basePrice}
                                        <span className="text-xs text-gray-400 font-normal ml-1">/ month</span>
                                    </div>
                                    <button
                                        onClick={() => handleEdit(plan)}
                                        className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                                        title="Edit Price"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanSettings;
