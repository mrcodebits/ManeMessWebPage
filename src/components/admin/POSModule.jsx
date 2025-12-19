
import { useState, useRef, useEffect, forwardRef } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Printer, X, Plus, Minus, History, Calendar, Settings, CheckSquare, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ThermalReceipt = forwardRef(({ data }, ref) => {
    const { t } = useTranslation();
    if (!data) return null;
    return (
        <div style={{ display: 'none' }}>
            <div ref={ref} style={{
                width: '58mm',
                boxSizing: 'border-box',
                padding: '5mm',
                margin: '0 auto',
                fontFamily: '"Courier New", Courier, monospace',
                fontSize: '12px',
                lineHeight: '1.2',
                color: '#000',
                background: '#fff'
            }}>
                <style>
                    {`
@page { margin: 0; size: 58mm auto; }
                    body { margin: 0; padding: 0; }
`}
                </style>
                <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '8px' }}>
                    <div style={{ fontSize: '16px', textTransform: 'uppercase' }}>MANE MESS</div>
                    <div style={{ fontSize: '10px', fontWeight: 'normal' }}>Karvenagar, Pune</div>
                </div>

                <div style={{ borderBottom: '1px dashed #000', margin: '4px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                    <span>{new Date(data.timestamp).toLocaleDateString('en-IN')}</span>
                    <span>{new Date(data.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div style={{ borderBottom: '1px dashed #000', margin: '8px 0' }} />

                <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>ORD #{data.id.toString().slice(-4)}</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
                    {data.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ width: '65%' }}>{item.qty} x {item.name}</span>
                            <span style={{ fontWeight: 'bold' }}>₹{item.price * item.qty}</span>
                        </div>
                    ))}
                </div>

                <div style={{ borderBottom: '1px solid #000', margin: '8px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px' }}>
                    <span>{t('pos.total')}</span>
                    <span>₹{data.total}</span>
                </div>

                <div style={{ borderBottom: '1px solid #000', margin: '8px 0' }} />

                <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '10px' }}>
                    {t('pos.thank_you')}<br />
                    {t('pos.visit_again')}
                </div>
            </div>
        </div>
    );
});
ThermalReceipt.displayName = 'ThermalReceipt';

const SalesHistoryModal = ({ onClose, onPrint }) => {
    const { t } = useTranslation();
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
                        <History size={20} className="text-gray-500" /> {t('pos.transactions')}
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-0">
                    {history.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                            <History size={48} className="mb-4 opacity-20" />
                            <p>{t('pos.no_history')}</p>
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
                                            {sale.items.map(i => `${i.qty} x ${i.name} `).join(', ')}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg text-dark-900 mb-1">₹{sale.total}</div>
                                        <button
                                            onClick={() => onPrint(sale)}
                                            className="text-xs font-bold text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ml-auto"
                                        >
                                            <Printer size={12} /> {t('common.print')}
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
    const { t } = useTranslation();
    const { dailyMenu, addSale } = useAdmin();
    const [cart, setCart] = useState([]);
    const [lastOrder, setLastOrder] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const [receiptData, setReceiptData] = useState(null); // Data to be printed
    const receiptRef = useRef();

    // Persist Auto Print Setting
    const [autoPrint, setAutoPrint] = useState(() => {
        const saved = localStorage.getItem('autoPrint');
        return saved ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        localStorage.setItem('autoPrint', JSON.stringify(autoPrint));
    }, [autoPrint]);

    // Trigger Print
    const handlePrint = (order) => {
        if (!order) return;
        setReceiptData(order);

        // Open window IMMEDIATELY to bypass mobile popup blockers
        const printWindow = window.open('', '', 'width=350,height=600');

        // Wait for React to render the receipt data into the DOM
        setTimeout(() => {
            const content = receiptRef.current;
            if (printWindow) {
                if (content) {
                    printWindow.document.write('<html><head><title>Print Receipt</title>');
                    printWindow.document.write('</head><body>');
                    printWindow.document.write(content.innerHTML);
                    printWindow.document.write('</body></html>');
                    printWindow.document.close();

                    // Small delay to ensure styles/content loaded before trigger
                    setTimeout(() => {
                        printWindow.focus();
                        printWindow.print();
                        // printWindow.close(); // Keep open on mobile for better UX if print fails
                    }, 250);
                } else {
                    printWindow.close(); // Close if something went wrong
                }
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

    const updateQuantity = (type, change) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.type === type) {
                    return { ...item, qty: Math.max(0, item.qty + change) };
                }
                return item;
            }).filter(item => item.qty > 0);
        });
    };

    const removeItem = (type) => {
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

        if (autoPrint) {
            handlePrint(orderData);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-6 lg:gap-8 h-auto lg:h-[calc(100vh-140px)] pb-24 lg:pb-0 relative">
            {/* History Modal */}
            <AnimatePresence>
                {showHistory && (
                    <SalesHistoryModal onClose={() => setShowHistory(false)} onPrint={handleHistoryPrint} />
                )}
            </AnimatePresence>

            {/* Menu Section */}
            <div className="space-y-4 md:space-y-6">
                <header className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-dark-900">{t('pos.title')}</h2>
                        <p className="text-sm text-gray-500">{t('pos.subtitle')}</p>
                    </div>
                </header>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <button
                        onClick={() => addToCart('Full')}
                        className="p-4 md:p-6 bg-white border border-primary-100 rounded-2xl shadow-sm hover:shadow-md hover:border-primary-500 transition-all text-left group active:scale-95 md:active:scale-100"
                    >
                        <div className="text-xs md:text-sm font-bold text-primary-600 mb-1 md:mb-2">{t('pos.full_thali')}</div>
                        <div className="text-2xl md:text-3xl font-bold text-dark-900 mb-0.5 md:mb-1">₹{dailyMenu.priceFull}</div>
                        <div className="text-[10px] md:text-xs text-gray-400">{t('pos.regular_price')}</div>
                    </button>

                    <button
                        onClick={() => addToCart('Half')}
                        className="p-4 md:p-6 bg-white border border-secondary-100 rounded-2xl shadow-sm hover:shadow-md hover:border-secondary-500 transition-all text-left group active:scale-95 md:active:scale-100"
                    >
                        <div className="text-xs md:text-sm font-bold text-secondary-600 mb-1 md:mb-2">{t('pos.half_thali')}</div>
                        <div className="text-2xl md:text-3xl font-bold text-dark-900 mb-0.5 md:mb-1">₹{dailyMenu.priceHalf}</div>
                        <div className="text-[10px] md:text-xs text-gray-400">{t('pos.light_eater')}</div>
                    </button>
                </div>

                {/* Custom Item Section */}
                <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-sm text-dark-800 mb-3 flex items-center gap-2">
                        <Plus size={16} /> {t('pos.add_custom')}
                    </h4>
                    <div className="flex flex-col gap-3">
                        <input
                            placeholder={t('pos.item_placeholder')}
                            className="w-full px-3 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-500 transition-colors bg-gray-50 focus:bg-white"
                            id="custom-name"
                        />
                        <div className="flex gap-3">
                            <input
                                type="number"
                                placeholder={t('pos.price_placeholder')}
                                className="flex-1 px-3 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary-500 transition-colors bg-gray-50 focus:bg-white"
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
                                className="px-6 py-3 bg-dark-900 text-white rounded-xl font-bold hover:bg-black text-sm transition-colors active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                <Plus size={16} className="md:hidden" />
                                <span>{t('pos.add_item_btn')}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-800 text-sm mb-2">{t('pos.todays_special')}</h4>
                    <p className="text-blue-700 text-sm">{dailyMenu.special} ({dailyMenu.items.join(', ')})</p>
                </div>
            </div>

            {/* Cart / Bill Section */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col h-auto lg:h-full overflow-hidden">
                <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-dark-900 text-lg">{t('pos.current_bill')}</h3>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setAutoPrint(!autoPrint)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${autoPrint
                                ? 'bg-primary-50 border-primary-200 text-primary-700'
                                : 'bg-white border-gray-200 text-gray-500'
                                }`}
                            title={t('pos.auto_print_title')}
                        >
                            {autoPrint ? <CheckSquare size={14} /> : <Square size={14} />}
                            {t('pos.auto_print')}
                        </button>
                        <button
                            onClick={() => setShowHistory(true)}
                            className="text-gray-500 hover:text-dark-900 p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1 text-sm font-medium"
                            title={t('pos.view_history')}
                        >
                            <History size={18} /> <span className="hidden sm:inline">{t('common.history')}</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto max-h-[400px] lg:max-h-none">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <Printer size={48} className="mb-4 opacity-20" />
                            <p>{t('pos.no_items')}</p>
                        </div>
                    ) : (
                        cart.map((item, i) => (
                            <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <div>
                                    <div className="font-bold text-dark-900 text-sm md:text-base">{item.name}</div>
                                    <div className="text-xs text-gray-400">₹{item.price} each</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
                                        <button
                                            onClick={() => updateQuantity(item.type, -1)}
                                            className="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-dark-900 transition-colors"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                                        <button
                                            onClick={() => updateQuantity(item.type, 1)}
                                            className="w-6 h-6 flex items-center justify-center bg-primary-50 hover:bg-primary-100 text-primary-700 rounded transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <div className="font-bold text-dark-900 min-w-[3rem] text-right">₹{item.price * item.qty}</div>
                                    <button
                                        onClick={() => removeItem(item.type)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        title="Remove Item"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 md:p-6 border-t border-gray-100 space-y-3 md:space-y-4 bg-gray-50">
                    <div className="flex justify-between items-center text-lg md:text-xl font-bold text-dark-900">
                        <span>{t('pos.total')}</span>
                        <span>₹{calculateTotal()}</span>
                    </div>

                    {lastOrder ? (
                        <div className="space-y-3">
                            <div className="bg-green-100 text-green-700 p-3 rounded-xl text-center font-bold text-sm">
                                {t('pos.order_placed')} #{lastOrder.id.toString().slice(-4)}
                            </div>
                            <button
                                onClick={() => handlePrint(lastOrder)}
                                className="w-full bg-dark-900 text-white py-3 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors text-sm md:text-base"
                            >
                                <Printer size={18} className="md:w-5 md:h-5" /> {t('pos.reprint')}
                            </button>
                            <button
                                onClick={() => setLastOrder(null)}
                                className="w-full bg-white border border-gray-200 text-dark-900 py-3 md:py-4 rounded-xl font-bold hover:bg-gray-50 text-sm md:text-base"
                            >
                                {t('pos.new_order')}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleCheckout}
                            disabled={cart.length === 0}
                            className="w-full bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary-700 text-white py-3 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-200 transition-all text-sm md:text-base"
                        >
                            {autoPrint ? (
                                <>{t('pos.accept_print')} <Printer size={16} className="ml-1 opacity-80" /></>
                            ) : (
                                t('pos.accept_payment')
                            )}
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

