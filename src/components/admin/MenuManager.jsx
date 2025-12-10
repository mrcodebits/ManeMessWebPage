import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Save, Image as ImageIcon } from 'lucide-react';

const MenuManager = () => {
    const { dailyMenu, updateMenu } = useAdmin();
    const [formData, setFormData] = useState({ ...dailyMenu });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemsChange = (e) => {
        const items = e.target.value.split(',').map(i => i.trim());
        setFormData(prev => ({ ...prev, items }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMenu(formData);
        alert('Menu Updated Successfully!');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-dark-900">Daily Menu Manager 🍛</h2>
                <p className="text-gray-500">Update the "Today's Special" on the website.</p>
            </header>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-dark-700 mb-2">Special Dish Name</label>
                    <input
                        name="special"
                        value={formData.special}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="e.g. Shrikhand Puri"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-dark-700 mb-2">Menu Items (Comma Separated)</label>
                    <textarea
                        value={formData.items.join(', ')}
                        onChange={handleItemsChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500 h-24 resize-none"
                        placeholder="Item 1, Item 2, Item 3"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-dark-700 mb-2">Full Plate Price (₹)</label>
                        <input
                            name="priceFull"
                            type="number"
                            value={formData.priceFull}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-dark-700 mb-2">Half Plate Price (₹)</label>
                        <input
                            name="priceHalf"
                            type="number"
                            value={formData.priceHalf}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-dark-700 mb-2">Image URL <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <div className="flex gap-2">
                        <input
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="https://..."
                        />
                        <button type="button" className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200">
                            <ImageIcon size={20} />
                        </button>
                    </div>
                    {formData.imageUrl && (
                        <div className="mt-4 rounded-xl overflow-hidden h-40 border border-gray-200">
                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-200 transition-all flex justify-center items-center gap-2"
                >
                    <Save size={20} /> Update Menu
                </button>
            </form>
        </div>
    );
};

export default MenuManager;
