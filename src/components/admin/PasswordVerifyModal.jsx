import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, Loader } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const PasswordVerifyModal = ({ isOpen, onClose, onSuccess, title = "Security Check", message = "Please enter your password to continue." }) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const email = auth.currentUser?.email;
            if (!email) {
                setError("No active session found.");
                setLoading(false);
                return;
            }

            // Re-authenticate (for this app's simple purpose, signIn works as verification)
            await signInWithEmailAndPassword(auth, email, password);

            // If successful
            setLoading(false);
            setPassword('');
            onSuccess();
        } catch (err) {
            console.error(err);
            setLoading(false);
            setError("Incorrect password.");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg flex items-center gap-2 text-dark-900">
                                <Lock size={20} className="text-primary-500" />
                                {title}
                            </h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-dark-900">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <p className="text-gray-600 mb-4">{message}</p>

                            {error && (
                                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
                                    <span className="font-bold">!</span> {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:border-primary-500 outline-none focus:ring-2 focus:ring-primary-100 transition-all font-mono"
                                        placeholder="••••••••"
                                        autoFocus
                                    />
                                </div>

                                <div className="flex gap-3 justify-end mt-6">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading || !password}
                                        className="px-6 py-2 bg-dark-900 text-white font-bold rounded-lg hover:bg-black transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {loading && <Loader size={16} className="animate-spin" />}
                                        Verify
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PasswordVerifyModal;
