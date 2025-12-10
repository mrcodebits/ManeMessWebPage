import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Save, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminNotepad = () => {
    const { adminNotes, updateNotes } = useAdmin();
    const [localText, setLocalText] = useState('');
    const [saving, setSaving] = useState(false);

    // Sync from context when it changes (initial load)
    useEffect(() => {
        setLocalText(adminNotes);
    }, [adminNotes]);

    const handleSave = async () => {
        setSaving(true);
        await updateNotes(localText);
        setTimeout(() => setSaving(false), 500); // Fake delay for UX
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full bg-yellow-50/50">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-yellow-800 flex items-center gap-2">
                    <span>📒</span> Admin Notepad
                </h3>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="text-xs flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full hover:bg-yellow-200 transition-colors disabled:opacity-50"
                >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {saving ? 'Saving...' : 'Save Notes'}
                </button>
            </div>
            <textarea
                value={localText}
                onChange={(e) => setLocalText(e.target.value)}
                placeholder="Type important reminders here..."
                className="w-full flex-1 p-4 bg-yellow-50 border border-yellow-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300 font-handwriting text-gray-700 leading-relaxed"
                style={{ minHeight: '200px' }}
            />
            <p className="text-xs text-yellow-600 mt-2 text-right opacity-70">
                Notes are shared with all admins & saved automatically.
            </p>
        </div>
    );
};

export default AdminNotepad;
