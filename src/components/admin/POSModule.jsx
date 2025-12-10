import { useState, useRef } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Printer, X, Plus, History, Calendar } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { motion, AnimatePresence } from 'framer-motion';

const ThermalReceipt = ({ ref, data }) => {
    if (!data) return null;
    return (
        <div style={{ display: 'none' }}>
            <div ref={ref} style={{ width: '58mm', padding: '10px', fontFamily: 'monospace', fontSize: '12px' }}>
                <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
                    MANE MESS<br />
                    <span style={{ fontSize: '10px', fontWeight: 'normal' }}>Karvenagar, Pune</span>
                </div>
                <div style={{ borderBottom: '1px dashed #000', margin: '5px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Date: {new Date(data.timestamp).toLocaleDateString('en-IN')}</span>
                    <span>{new Date(data.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div style={{ borderBottom: '1px dashed #000', margin: '10px 0' }} />

                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>ORDER # {data.id.toString().slice(-4)}</div>

                {data.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span>{item.qty} x {item.name}</span>
                        <span>₹{item.price * item.qty}</span>
                    </div>
                ))}

                <div style={{ borderBottom: '1px dashed #000', margin: '10px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px' }}>
                    <span>TOTAL</span>
                    <span>₹{data.total}</span>
                </div>

                <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '10px' }}>
                    Thank you for visiting!<br />
                    Bon Appetit 🍛
                </div>
            </div>
        </div>
    );
};

const SalesHistoryModal = ({ onClose, onPrint }) => {
    const { sales } = useAdmin();
    // Use sales from context directly. 
    // If sales is undefined, default to empty array.
    const history = sales || [];

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl overflow-hidden"
            >
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <History size={20} className="text-gray-500" /> Transaction History
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-0">
                    {history.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                            <History size={48} className="mb-4 opacity-20" />
                            <p>No transaction history found.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {history.map((sale) => (
                                <div key={sale.id} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center group">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-dark-900">Order #{sale.id.toString().slice(-4)}</span>
                                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                <Calendar size={10} />
                                                {new Date(sale.timestamp).toLocaleString('en-IN', {
                                                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {sale.items.map(i => `${i.qty} x ${i.name}`).join(', ')}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg text-dark-900 mb-1">₹{sale.total}</div>
                                        <button
                                            onClick={() => onPrint(sale)}
                                            className="text-xs font-bold text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ml-auto"
                                        >
                                            <Printer size={12} /> Print Receipt
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const POSModule = () => {
    const { dailyMenu, addSale } = useAdmin();
    const [cart, setCart] = useState([]);
    const [lastOrder, setLastOrder] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const [receiptData, setReceiptData] = useState(null); // Data to be printed
    const receiptRef = useRef();

    // Trigger Print
    const handlePrint = (order = lastOrder) => {
        setReceiptData(order);
        // Need a slight delay to let state update and render the hidden receipt component with new data
        setTimeout(() => {
            const content = receiptRef.current;
            const printWindow = window.open('', '', 'width=300,height=600');
            if (printWindow && content) {
                printWindow.document.write('<html><body>');
                printWindow.document.write(content.innerHTML);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.print();
            }
        }, 100);
    };

    // Helper for History Modal to print specific receipt
    const handleHistoryPrint = (order) => {
        handlePrint(order);
    };

    const addToCart = (type) => {
        const price = type === 'Full' ? dailyMenu.priceFull : dailyMenu.priceHalf;
        const existing = cart.find(i => i.type === type);

        if (existing) {
            setCart(cart.map(i => i.type === type ? { ...i, qty: i.qty + 1 } : i));
        } else {
            setCart([...cart, { type, name: `${type} Thali`, price, qty: 1 }]);
        }
    };

    const removeFromCart = (type) => {
        setCart(cart.filter(i => i.type !== type));
    };

    const calculateTotal = () => cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    const handleCheckout = () => {
        if (cart.length === 0) return;

        const orderData = {
            id: Date.now(),
            items: cart,
            total: calculateTotal(),
            timestamp: new Date().toISOString()
        };

        addSale(orderData);
        setLastOrder(orderData);
        setCart([]);
        setReceiptData(orderData);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 h-auto md:h-[calc(100vh-140px)] pb-20 md:pb-0 relative">
            {/* History Modal */}
            <AnimatePresence>
                {showHistory && (
                    <SalesHistoryModal onClose={() => setShowHistory(false)} onPrint={handleHistoryPrint} />
                )}
            </AnimatePresence>

            {/* Menu Section */}
            <div className="space-y-4 md:space-y-6 order-2 md:order-1">
                <header className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-dark-900">Walk-in Order 🛍️</h2>
                        <p className="text-sm text-gray-500">Select items to bill.</p>
                    </div>
                </header>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <button
                        onClick={() => addToCart('Full')}
                        className="p-4 md:p-6 bg-white border border-primary-100 rounded-2xl shadow-sm hover:shadow-md hover:border-primary-500 transition-all text-left group active:scale-95 md:active:scale-100"
                    >
                        <div className="text-xs md:text-sm font-bold text-primary-600 mb-1 md:mb-2">FULL THALI</div>
                        <div className="text-2xl md:text-3xl font-bold text-dark-900 mb-0.5 md:mb-1">₹{dailyMenu.priceFull}</div>
                        <div className="text-[10px] md:text-xs text-gray-400">Regular Price</div>
                    </button>

                    <button
                        onClick={() => addToCart('Half')}
                        className="p-4 md:p-6 bg-white border border-secondary-100 rounded-2xl shadow-sm hover:shadow-md hover:border-secondary-500 transition-all text-left group active:scale-95 md:active:scale-100"
                    >
                        <div className="text-xs md:text-sm font-bold text-secondary-600 mb-1 md:mb-2">HALF THALI</div>
                        <div className="text-2xl md:text-3xl font-bold text-dark-900 mb-0.5 md:mb-1">₹{dailyMenu.priceHalf}</div>
                        <div className="text-[10px] md:text-xs text-gray-400">Light Eater</div>
                    </button>
                </div>

                {/* Custom Item Section */}
                <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-sm text-dark-800 mb-3 flex items-center gap-2">
                        <Plus size={16} /> Add Custom Item
                    </h4>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-2">
                        <input
                            placeholder="e.g. Masala Tak"
                            className="w-full md:flex-[2] px-3 py-3 md:py-2 rounded-xl md:rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500 transition-colors bg-gray-50 md:bg-white"
                            id="custom-name"
                        />
                        <div className="flex gap-3 md:gap-2">
                            <input
                                type="number"
                                placeholder="₹ Price"
                                className="flex-1 md:flex-1 px-3 py-3 md:py-2 rounded-xl md:rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500 transition-colors bg-gray-50 md:bg-white"
                                id="custom-price"
                            />
                            <button
                                onClick={() => {
                                    const nameInput = document.getElementById('custom-name');
                                    const priceInput = document.getElementById('custom-price');
                                    const name = nameInput.value;
                                    const price = priceInput.value;
                                    if (name && price) {
                                        setCart([...cart, { type: 'Custom', name, price: Number(price), qty: 1 }]);
                                        nameInput.value = '';
                                        priceInput.value = '';
                                    }
                                }}
                                className="md:w-auto px-6 py-3 md:py-2 bg-dark-900 text-white rounded-xl md:rounded-lg font-bold hover:bg-black text-sm transition-colors active:scale-95 md:active:scale-100 flex items-center justify-center gap-2"
                            >
                                <Plus size={16} className="md:hidden" /> <span className="md:hidden">Add Item</span><span className="hidden md:inline">Add</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-800 text-sm mb-2">Today's Special</h4>
                    <p className="text-blue-700 text-sm">{dailyMenu.special} ({dailyMenu.items.join(', ')})</p>
                </div>
            </div>

            {/* Cart / Bill Section */}
            <div className="order-1 md:order-2 bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col h-[400px] md:h-full overflow-hidden">
                <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-dark-900 text-lg">Current Bill</h3>
                    <button
                        onClick={() => setShowHistory(true)}
                        className="text-gray-500 hover:text-dark-900 p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1 text-sm font-medium"
                        title="View Sales History"
                    >
                        <History size={18} /> <span className="hidden sm:inline">History</span>
                    </button>
                </div>

                <div className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <Printer size={48} className="mb-4 opacity-20" />
                            <p>No items added</p>
                        </div>
                    ) : (
                        cart.map((item, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-dark-900 text-sm md:text-base">{item.name}</div>
                                    <div className="text-xs md:text-sm text-gray-500">₹{item.price} x {item.qty}</div>
                                </div>
                                <div className="flex items-center gap-3 md:gap-4">
                                    <span className="font-bold text-base md:text-lg">₹{item.price * item.qty}</span>
                                    <button onClick={() => removeFromCart(item.type)} className="text-red-400 hover:text-red-600 p-1">
                                        <X size={18} className="md:w-5 md:h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 md:p-6 border-t border-gray-100 space-y-3 md:space-y-4 bg-gray-50">
                    <div className="flex justify-between items-center text-lg md:text-xl font-bold text-dark-900">
                        <span>Total</span>
                        <span>₹{calculateTotal()}</span>
                    </div>

                    {lastOrder ? (
                        <div className="space-y-3">
                            <div className="bg-green-100 text-green-700 p-3 rounded-xl text-center font-bold text-sm">
                                Order #{lastOrder.id.toString().slice(-4)} Placed!
                            </div>
                            <button
                                onClick={() => handlePrint(lastOrder)}
                                className="w-full bg-dark-900 text-white py-3 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors text-sm md:text-base"
                            >
                                <Printer size={18} className="md:w-5 md:h-5" /> Print Receipt
                            </button>
                            <button
                                onClick={() => setLastOrder(null)}
                                className="w-full bg-white border border-gray-200 text-dark-900 py-3 md:py-4 rounded-xl font-bold hover:bg-gray-50 text-sm md:text-base"
                            >
                                Start New Order
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleCheckout}
                            disabled={cart.length === 0}
                            className="w-full bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary-700 text-white py-3 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-200 transition-all text-sm md:text-base"
                        >
                            Accept Payment & Print
                        </button>
                    )}

                    {/* Hidden Receipt Component - Always Rendered but Hidden */}
                    <div className="hidden">
                        <ThermalReceipt ref={receiptRef} data={receiptData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default POSModule;
