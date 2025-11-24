import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, Save, Calculator, Wallet, ArrowRightLeft, FileDown, ChevronLeft, ChevronRight, BedDouble, Scan, Loader2, Users, X, Phone, Sparkles, BrainCircuit, IdCard, MapPin, FileSpreadsheet, CalendarDays, CalendarClock } from 'lucide-react';

// --- Gemini API Configuration ---
// IMPORTANT: You need to get your own API key from Google AI Studio
// and place it here for the AI features to work.
const apiKey = "YOUR_GEMINI_API_KEY"; 

// --- Room Data ---
const ROOM_DATA = [
    // Building A - Floor 1
    { id: 'A101', type: 'Standard', price: 400, group: 'ตึก A ชั้น 1' },
    { id: 'A102', type: 'Standard', price: 400, group: 'ตึก A ชั้น 1' },
    { id: 'A103', type: 'Standard', price: 400, group: 'ตึก A ชั้น 1' },
    { id: 'A104', type: 'Standard', price: 400, group: 'ตึก A ชั้น 1' },
    { id: 'A105', type: 'Standard', price: 400, group: 'ตึก A ชั้น 1' },
    { id: 'A106', type: 'Standard Twin', price: 500, group: 'ตึก A ชั้น 1' },
    { id: 'A107', type: 'Standard Twin', price: 500, group: 'ตึก A ชั้น 1' },
    { id: 'A108', type: 'Standard Twin', price: 500, group: 'ตึก A ชั้น 1' },
    { id: 'A109', type: 'Standard Twin', price: 500, group: 'ตึก A ชั้น 1' },
    { id: 'A110', type: 'Standard Twin', price: 500, group: 'ตึก A ชั้น 1' },
    { id: 'A111', type: 'Standard', price: 400, group: 'ตึก A ชั้น 1' },
    // Building A - Floor 2
    { id: 'A201', type: 'Standard', price: 400, group: 'ตึก A ชั้น 2' },
    { id: 'A202', type: 'Standard', price: 400, group: 'ตึก A ชั้น 2' },
    { id: 'A203', type: 'Standard', price: 400, group: 'ตึก A ชั้น 2' },
    { id: 'A204', type: 'Standard', price: 400, group: 'ตึก A ชั้น 2' },
    { id: 'A205', type: 'Standard', price: 400, group: 'ตึก A ชั้น 2' },
    { id: 'A206', type: 'Standard', price: 400, group: 'ตึก A ชั้น 2' },
    { id: 'A207', type: 'Standard', price: 400, group: 'ตึก A ชั้น 2' },
    { id: 'A208', type: 'Standard', price: 400, group: 'ตึก A ชั้น 2' },
    { id: 'A209', type: 'Standard', price: 400, group: 'ตึก A ชั้น 2' },
    { id: 'A210', type: 'Standard', price: 400, group: 'ตึก A ชั้น 2' },
    { id: 'A211', type: 'Standard', price: 400, group: 'ตึก A ชั้น 2' },
    // Building B - Floor 1
    { id: 'B101', type: 'Standard', price: 400, group: 'ตึก B ชั้น 1' },
    { id: 'B102', type: 'Standard', price: 400, group: 'ตึก B ชั้น 1' },
    { id: 'B103', type: 'Standard', price: 400, group: 'ตึก B ชั้น 1' },
    { id: 'B104', type: 'Standard', price: 400, group: 'ตึก B ชั้น 1' },
    { id: 'B105', type: 'Standard', price: 400, group: 'ตึก B ชั้น 1' },
    { id: 'B106', type: 'Standard', price: 400, group: 'ตึก B ชั้น 1' },
    { id: 'B107', type: 'Standard', price: 400, group: 'ตึก B ชั้น 1' },
    { id: 'B108', type: 'Standard', price: 400, group: 'ตึก B ชั้น 1' },
    { id: 'B109', type: 'Standard', price: 400, group: 'ตึก B ชั้น 1' },
    { id: 'B110', type: 'Standard', price: 400, group: 'ตึก B ชั้น 1' },
    { id: 'B111', type: 'Standard Twin', price: 500, group: 'ตึก B ชั้น 1' },
    // Building B - Floor 2
    { id: 'B201', type: 'Standard', price: 400, group: 'ตึก B ชั้น 2' },
    { id: 'B202', type: 'Standard', price: 400, group: 'ตึก B ชั้น 2' },
    { id: 'B203', type: 'Standard', price: 400, group: 'ตึก B ชั้น 2' },
    { id: 'B204', type: 'Standard', price: 400, group: 'ตึก B ชั้น 2' },
    { id: 'B205', type: 'Standard', price: 400, group: 'ตึก B ชั้น 2' },
    { id: 'B206', type: 'Standard', price: 400, group: 'ตึก B ชั้น 2' },
    { id: 'B207', type: 'Standard', price: 400, group: 'ตึก B ชั้น 2' },
    { id: 'B208', type: 'Standard', price: 400, group: 'ตึก B ชั้น 2' },
    { id: 'B209', type: 'Standard', price: 400, group: 'ตึก B ชั้น 2' },
    { id: 'B210', type: 'Standard', price: 400, group: 'ตึก B ชั้น 2' },
    { id: 'B211', type: 'Standard', price: 400, group: 'ตึก B ชั้น 2' },
    // Zone N
    { id: 'N1', type: 'Standard Twin', price: 600, group: 'โซน N' },
    { id: 'N2', type: 'Standard', price: 500, group: 'โซน N' },
    { id: 'N3', type: 'Standard', price: 500, group: 'โซน N' },
    { id: 'N4', type: 'Standard Twin', price: 600, group: 'โซน N' },
    { id: 'N5', type: 'Standard Twin', price: 600, group: 'โซน N' },
    { id: 'N6', type: 'Standard Twin', price: 600, group: 'โซน N' },
    { id: 'N7', type: 'Standard', price: 500, group: 'โซน N' },
];

const groupedRooms = ROOM_DATA.reduce((acc, room) => {
    if (!acc[room.group]) acc[room.group] = [];
    acc[room.group].push(room);
    return acc;
}, {});

export default function App() {
    // --- Firebase Setup ---
    const [user, setUser] = useState(null);
    const [db, setDb] = useState(null);
    const [appId, setAppId] = useState(null);

    // --- App State ---
    const todayStr = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(todayStr);
    const [loading, setLoading] = useState(false);
    
    const [startCash, setStartCash] = useState(3000);
    const [transactions, setTransactions] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [remark, setRemark] = useState("");

    // Form State
    const [newTx, setNewTx] = useState({ 
        room: '', name: '', phone: '', 
        idCard: '', address: '',
        price: 0, deposit: 0, cashIn: 0, transferIn: 0, note: '' 
    });
    const [newExp, setNewExp] = useState({ name: '', amount: 0, type: 'refund' });
    const [paymentType, setPaymentType] = useState('cash');

    // UI State
    const [ocrLoading, setOcrLoading] = useState(false);
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState("");
    const [aiLoading, setAiLoading] = useState(false);

    // Helper: Is Booking Mode? (Selected Date > Today)
    const isBookingMode = selectedDate > todayStr;

    // --- Initialize Firebase ---
    useEffect(() => {
        const initFirebase = async () => {
            if (!window.firebaseModules) {
                 setTimeout(initFirebase, 200);
                 return;
            }
            const { initializeApp, getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken, getFirestore } = window.firebaseModules;
            try {
                const firebaseConfig = JSON.parse(window.__firebase_config || '{}');
                const app = initializeApp(firebaseConfig);
                const auth = getAuth(app);
                const firestore = getFirestore(app);
                const currentAppId = window.__app_id || 'default-hotel-app';

                setDb(firestore);
                setAppId(currentAppId);

                if (window.__initial_auth_token) {
                    await signInWithCustomToken(auth, window.__initial_auth_token);
                } else {
                    await signInAnonymously(auth);
                }
                onAuthStateChanged(auth, (u) => setUser(u));
            } catch (err) { console.error("Firebase Error:", err); }
        };
        initFirebase();
    }, []);

    // --- Load Scripts (html2pdf) ---
    useEffect(() => {
        const loadScript = (src, id) => {
            if (document.getElementById(id)) return;
            const script = document.createElement('script');
            script.id = id;
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
            return script;
        };
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js", "html2pdf-script");
    }, []);

    // --- Helper: Call Gemini API ---
    const callGemini = async (prompt, imageBase64 = null) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`;
        let parts = [{ text: prompt }];
        if (imageBase64) {
            parts.push({ inline_data: { mime_type: "image/jpeg", data: imageBase64 } });
        }
        const payload = { contents: [{ parts: parts }] };
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "API Error");
        }
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    };

    // --- Feature: AI Scan ---
    const handleAIScan = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setOcrLoading(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Data = reader.result.split(',')[1];
            const prompt = `
                Analyze this image. It could be a Thai bank transfer slip or a Thai ID Card.
                Return ONLY a valid JSON object.
                If it's a slip, use this format: { "type": "slip", "amount": 123.45, "name": "SENDER_NAME" }
                If it's an ID card, use this format: { "type": "idcard", "name": "FULL_NAME", "idCard": "1234567890123", "address": "FULL_ADDRESS" }
                If unsure, return: { "type": "unknown" }
            `;
            try {
                const resultText = await callGemini(prompt, base64Data);
                const result = JSON.parse(resultText.replace(/```json/g, '').replace(/```/g, '').trim());

                if (result.type === 'slip' && result.amount > 0) {
                    setPaymentType('transfer');
                    setNewTx(prev => ({ ...prev, transferIn: parseFloat(result.amount), cashIn: 0, name: result.name || prev.name }));
                    alert(`✨ สแกนสลิปสำเร็จ! ยอด: ${result.amount}`);
                } else if (result.type === 'idcard' && result.idCard) {
                    setNewTx(prev => ({ ...prev, name: result.name || prev.name, idCard: result.idCard || prev.idCard, address: result.address || prev.address }));
                    alert(`✨ สแกนบัตรประชาชนสำเร็จ! ชื่อ: ${result.name}`);
                } else {
                    alert("AI อ่านข้อมูลไม่ชัดเจน หรือไม่ใช่ไฟล์ที่รองรับ");
                }
            } catch (error) { alert("AI Error: " + error.message); } 
            finally { setOcrLoading(false); e.target.value = null; }
        };
    };

    // --- Feature: AI Analysis ---
    const handleAIAnalysis = async () => {
        if (transactions.length === 0) { alert("ยังไม่มีข้อมูลสำหรับสรุป"); return; }
        setAiLoading(true);
        setAiAnalysis("กำลังวิเคราะห์...");
        const dailyData = {
            date: selectedDate,
            total_income: summary.totalCashIn + summary.totalTransferIn,
            number_of_guests: transactions.length,
            transactions: transactions.map(t => ({ room: t.room, price: t.price, payment_method: t.cashIn > 0 ? 'cash' : 'transfer' }))
        };
        try {
            const result = await callGemini(`You are a hotel manager's assistant. Analyze this daily report and provide a short, encouraging summary in Thai (2-3 sentences max). Data: ${JSON.stringify(dailyData)}`);
            setAiAnalysis(result);
        } catch (error) { setAiAnalysis("เกิดข้อผิดพลาดในการวิเคราะห์"); }
        finally { setAiLoading(false); }
    };

    // --- CSV Export Function ---
    const downloadCSV = () => {
        if (transactions.length === 0 && expenses.length === 0) {
            alert("ไม่มีข้อมูลสำหรับวันที่นี้");
            return;
        }
        const headers = ["ประเภท","ห้อง/รายการ","ชื่อลูกค้า/รายละเอียด","เบอร์โทร","เลขบัตร","ที่อยู่","ค่าห้อง","มัดจำ","รับเงินสด","รับเงินโอน","รายจ่าย","หมายเหตุ"];
        const txRows = transactions.map(t => [ "รายรับ", `"${t.room}"`, `"${t.name}"`, `"${t.phone}"`, `'${t.idCard}'`, `"${t.address}"`, t.price || 0, t.deposit || 0, t.cashIn || 0, t.transferIn || 0, "0", `"${t.note}"`].join(','));
        const expRows = expenses.map(e => ["รายจ่าย", "-", `"${e.name}"`, "-", "-", "-", "0", "0", "0", "0", e.amount || 0, `"${e.type === 'refund' ? 'คืนมัดจำ' : 'ซื้อของ'}"`].join(','));
        const csvContent = "\uFEFF" + [headers.join(','), ...txRows, ...expRows].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `Hotel_Report_${selectedDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // --- Navigation & PDF ---
    const changeDate = (offset) => {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() + offset);
        setSelectedDate(date.toISOString().split('T')[0]);
        setAiAnalysis("");
    };

    const downloadPDF = () => {
        if (!window.html2pdf) { alert("ระบบ PDF กำลังโหลด..."); return; }
        window.html2pdf().set({ margin: 0.3, filename: `Report_${selectedDate}.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } }).from(document.getElementById('main-content')).save();
    };

    // --- Firebase Sync ---
    useEffect(() => {
        if (!user || !db || !appId) return;
        const { doc, onSnapshot } = window.firebaseModules;
        const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'daily_logs', selectedDate);
        setLoading(true);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setStartCash(data.startCash || 3000);
                setTransactions(data.transactions || []);
                setExpenses(data.expenses || []);
                setRemark(data.remark || "");
                setAiAnalysis(data.aiAnalysis || "");
            } else {
                setStartCash(3000); setTransactions([]); setExpenses([]); setRemark(""); setAiAnalysis("");
            }
            setLoading(false);
        }, (err) => { console.error(err); setLoading(false); });
        return () => unsubscribe();
    }, [user, db, selectedDate, appId]);

    const saveData = async () => {
        if (!user || !db || !appId) return;
        const { doc, setDoc } = window.firebaseModules;
        try {
            await setDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'daily_logs', selectedDate), {
                startCash, transactions, expenses, remark, aiAnalysis, updatedAt: new Date()
            }, { merge: true });
        } catch (e) { console.error("Save error", e); }
    };

    useEffect(() => {
        const handler = setTimeout(() => { saveData(); }, 1500);
        return () => clearTimeout(handler);
    }, [startCash, transactions, expenses, remark, aiAnalysis]);

    // --- Calculations ---
    const summary = useMemo(() => {
        const totalCashIn = transactions.reduce((sum, t) => sum + Number(t.cashIn || 0), 0);
        const totalTransferIn = transactions.reduce((sum, t) => sum + Number(t.transferIn || 0), 0);
        const totalRefundCash = expenses.filter(e => e.type === 'refund').reduce((sum, e) => sum + Number(e.amount || 0), 0);
        const totalExpenseCash = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + Number(e.amount || 0), 0);
        const totalCashOut = totalRefundCash + totalExpenseCash;
        const expectedDrawerCash = Number(startCash) + totalCashIn - totalCashOut;
        const cashToSend = expectedDrawerCash > 3000 ? expectedDrawerCash - 3000 : 0;
        const cashToKeep = expectedDrawerCash > 3000 ? 3000 : expectedDrawerCash;
        return { totalCashIn, totalTransferIn, totalCashOut, expectedDrawerCash, cashToSend, cashToKeep };
    }, [startCash, transactions, expenses]);

    // --- Form Handlers ---
    const handleRoomChange = (e) => {
        const roomId = e.target.value;
        const room = ROOM_DATA.find(r => r.id === roomId);
        setNewTx(prev => ({...prev, room: roomId, price: room ? room.price : 0, note: room ? room.type : ''}));
    };
    const addTransaction = (e) => {
        e.preventDefault();
        if (!newTx.room) return;
        setTransactions(prev => [...prev, { ...newTx, id: Date.now() }]);
        setNewTx({ room: '', name: '', phone: '', idCard: '', address: '', price: 0, deposit: 0, cashIn: 0, transferIn: 0, note: '' });
        setPaymentType('cash');
    };
    const removeTransaction = (id) => { if(confirm('ยืนยันการลบ?')) setTransactions(prev => prev.filter(t => t.id !== id)); };
    const addExpense = (e) => {
        e.preventDefault();
        if (!newExp.name || !newExp.amount) return;
        setExpenses(prev => [...prev, { ...newExp, id: Date.now() }]);
        setNewExp({ name: '', amount: 0, type: 'refund' });
    };
    const removeExpense = (id) => { if(confirm('ยืนยันการลบ?')) setExpenses(prev => prev.filter(e => e.id !== id)); };

    return (
        <div id="main-content" className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20 shadow-xl font-sans">
            
            <header className="bg-blue-800 text-white p-4 sticky top-0 z-10 shadow-md">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-lg font-bold flex items-center gap-2"><Wallet size={20} /> บัญชีโรงแรม</h1>
                    <div className="flex gap-2">
                         <button onClick={() => setShowGuestModal(true)} data-html2canvas-ignore="true" className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-xs flex items-center gap-1"><Users size={14} /> ลูกค้า</button>
                         <button onClick={downloadCSV} data-html2canvas-ignore="true" className="bg-green-500/80 hover:bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1"><FileSpreadsheet size={14} /> CSV</button>
                         <button onClick={downloadPDF} data-html2canvas-ignore="true" className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-xs flex items-center gap-1"><FileDown size={14} /> PDF</button>
                    </div>
                </div>
                <div className={`rounded-lg p-2 mb-3 transition-colors ${isBookingMode ? 'bg-orange-600/90' : 'bg-blue-900/60'}`}>
                     <div className="flex justify-between items-center text-xs text-white/90 mb-1 px-1">
                        <span>
                            {isBookingMode ? <CalendarClock size={14} className="inline mr-1"/> : <CalendarDays size={14} className="inline mr-1"/>}
                            {isBookingMode ? 'โหมดจองล่วงหน้า' : 'รายการประจำวัน'}
                        </span>
                     </div>
                     <div className="flex items-center justify-between">
                        <button onClick={() => changeDate(-1)} className="p-1 hover:text-yellow-300 text-white"><ChevronLeft size={24} /></button>
                        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-transparent text-white font-bold text-center w-32 outline-none cursor-pointer" />
                        <button onClick={() => changeDate(1)} className="p-1 hover:text-yellow-300 text-white"><ChevronRight size={24} /></button>
                     </div>
                </div>
                <div className="flex justify-between items-center bg-blue-900/50 p-2 rounded-lg">
                    <span className="text-sm text-blue-100">เงินทอนตั้งต้น:</span>
                    <div className="flex items-center gap-1"><span className="text-xs">฿</span><input type="number" value={startCash} onChange={(e) => setStartCash(Number(e.target.value))} className="w-20 bg-transparent text-right font-bold text-yellow-300 outline-none border-b border-blue-400 focus:border-yellow-300" /></div>
                </div>
            </header>

            <main className="p-3 space-y-6">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200" data-html2canvas-ignore="true">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className={`${isBookingMode ? 'text-orange-600' : 'text-blue-800'} font-bold flex items-center gap-1`}>
                            <Plus size={16} /> {isBookingMode ? 'จองห้องพัก' : 'รับลูกค้า'}
                        </h2>
                        <div className="relative">
                            <input type="file" accept="image/*" onChange={handleAIScan} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={ocrLoading} />
                            <button className={`flex items-center gap-1 ${ocrLoading ? 'bg-purple-100 text-purple-700' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'} text-xs px-2 py-1 rounded transition shadow-sm`}>
                                {ocrLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />} {ocrLoading ? 'AI Reading...' : 'สแกน AI'}
                            </button>
                        </div>
                    </div>

                    <form onSubmit={addTransaction} className="space-y-2">
                         <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1">
                                <select value={newTx.room} onChange={handleRoomChange} className="w-full p-2 border rounded text-sm bg-white" required>
                                    <option value="">เลือกห้อง</option>
                                    {Object.keys(groupedRooms).map(group => (<optgroup label={group} key={group}>{groupedRooms[group].map(room => (<option value={room.id} key={room.id}>{room.id}</option>))}</optgroup>))}
                                    <optgroup label="อื่นๆ"><option value="ชั่วคราว">ชั่วคราว</option><option value="อื่นๆ">อื่นๆ</option></optgroup>
                                </select>
                            </div>
                            <input placeholder="ชื่อลูกค้า" value={newTx.name} onChange={e=>setNewTx({...newTx, name: e.target.value})} className="col-span-2 p-2 border rounded text-sm" />
                        </div>
                        
                        <div className="relative">
                            <input placeholder="เบอร์โทรศัพท์" value={newTx.phone} onChange={e=>setNewTx({...newTx, phone: e.target.value})} className="w-full p-2 border rounded text-sm" />
                            <Phone size={12} className="text-gray-400 absolute top-2.5 right-2.5"/>
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <input placeholder="เลขบัตรประชาชน 13 หลัก" value={newTx.idCard} onChange={e=>setNewTx({...newTx, idCard: e.target.value})} className="w-full p-2 border rounded text-sm" />
                                <IdCard size={12} className="text-gray-400 absolute top-2.5 right-2.5"/>
                            </div>
                            <div className="relative">
                                <textarea placeholder="ที่อยู่ตามบัตรประชาชน" value={newTx.address} onChange={e=>setNewTx({...newTx, address: e.target.value})} className="w-full p-2 border rounded text-sm h-16" />
                                <MapPin size={12} className="text-gray-400 absolute top-2.5 right-2.5"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="relative"><label className="text-xs text-gray-500 absolute -top-2 left-1 bg-white px-1">ค่าห้อง</label><input type="number" placeholder="0" value={newTx.price || ''} onChange={e=>setNewTx({...newTx, price: e.target.value})} className="w-full p-2 border rounded text-sm" /></div>
                            <div className="relative"><label className="text-xs text-gray-500 absolute -top-2 left-1 bg-white px-1">มัดจำ</label><input type="number" placeholder="0" value={newTx.deposit || ''} onChange={e=>setNewTx({...newTx, deposit: e.target.value})} className="w-full p-2 border rounded text-sm" /></div>
                        </div>

                        <div className="bg-gray-50 p-2 rounded border border-gray-200 space-y-2">
                            <label className="text-xs font-bold text-gray-700">ช่องทางการชำระเงิน</label>
                            <select value={paymentType} onChange={(e) => { const type = e.target.value; setPaymentType(type); if(type === 'cash') setNewTx(prev => ({...prev, transferIn: 0})); if(type === 'transfer') setNewTx(prev => ({...prev, cashIn: 0})); }} className="w-full p-2 border rounded text-sm bg-white">
                                <option value="cash">เงินสด</option>
                                <option value="transfer">เงินโอน</option>
                                <option value="split">แยกจ่าย</option>
                            </select>
                            {paymentType === 'cash' && (<div className="relative mt-2"><label className="text-xs text-green-700 font-bold absolute -top-2 left-1 bg-gray-50 px-1">ยอดเงินสด</label><input type="number" placeholder="0" value={newTx.cashIn || ''} onChange={e=>setNewTx({...newTx, cashIn: e.target.value, transferIn: 0})} className="w-full p-2 border border-green-200 rounded text-sm text-green-800 font-bold" /></div>)}
                            {paymentType === 'transfer' && (<div className="relative mt-2"><label className="text-xs text-blue-700 font-bold absolute -top-2 left-1 bg-gray-50 px-1">ยอดโอน</label><input type="number" placeholder="0" value={newTx.transferIn || ''} onChange={e=>setNewTx({...newTx, transferIn: e.target.value, cashIn: 0})} className="w-full p-2 border border-blue-200 rounded text-sm text-blue-800 font-bold" /></div>)}
                            {paymentType === 'split' && (
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                     <div className="relative"><label className="text-xs text-green-700 font-bold absolute -top-2 left-1 bg-gray-50 px-1">รับเงินสด</label><input type="number" placeholder="0" value={newTx.cashIn || ''} onChange={e=>setNewTx({...newTx, cashIn: e.target.value})} className="w-full p-2 border border-green-200 rounded text-sm text-green-800 font-bold" /></div>
                                     <div className="relative"><label className="text-xs text-blue-700 font-bold absolute -top-2 left-1 bg-gray-50 px-1">รับเงินโอน</label><input type="number" placeholder="0" value={newTx.transferIn || ''} onChange={e=>setNewTx({...newTx, transferIn: e.target.value})} className="w-full p-2 border border-blue-200 rounded text-sm text-blue-800 font-bold" /></div>
                                </div>
                            )}
                        </div>
                        <input placeholder="หมายเหตุ" value={newTx.note} onChange={e=>setNewTx({...newTx, note: e.target.value})} className="w-full p-2 border rounded text-xs" />
                        <button type="submit" className={`w-full text-white py-2 rounded font-bold shadow-sm active:scale-95 transition-transform ${isBookingMode ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                            {isBookingMode ? 'บันทึกการจอง' : 'บันทึกรายการ'}
                        </button>
                    </form>
                </div>
                
                {transactions.length > 0 && (<div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className={`px-3 py-2 text-xs font-bold uppercase tracking-wider flex justify-between items-center ${isBookingMode ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-500'}`}><span>รายการ ({selectedDate})</span></div>
                    <table className="w-full text-sm text-left"><thead className="bg-gray-50 text-gray-600 text-xs uppercase border-b border-gray-100"><tr><th className="p-2 font-semibold">ห้อง</th><th className="p-2 text-right font-semibold">สด</th><th className="p-2 text-right font-semibold">โอน</th><th className="p-2 w-8" data-html2canvas-ignore="true"></th></tr></thead>
                        <tbody className="divide-y divide-gray-100">{transactions.map(t => (<tr key={t.id}><td className="p-2"><div className="font-bold text-gray-800 flex items-center gap-1">{t.room}</div><div className="text-xs text-gray-500">{t.name}</div></td><td className="p-2 text-right font-medium text-green-700">{Number(t.cashIn) > 0 ? Number(t.cashIn).toLocaleString() : '-'}</td><td className="p-2 text-right font-medium text-blue-700">{Number(t.transferIn) > 0 ? Number(t.transferIn).toLocaleString() : '-'}</td><td className="p-2 text-center" data-html2canvas-ignore="true"><button onClick={() => removeTransaction(t.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button></td></tr>))}</tbody>
                    </table>
                </div>)}

                <div className="bg-white p-3 rounded-lg shadow-sm border border-red-100">
                    <h2 className="text-red-800 font-bold mb-2 flex items-center gap-1"><ArrowRightLeft size={16} /> จ่ายเงินสดออก</h2>
                    <form onSubmit={addExpense} className="flex gap-2 items-end mb-3" data-html2canvas-ignore="true">
                        <div className="flex-1 space-y-1"><select value={newExp.type} onChange={e=>setNewExp({...newExp, type: e.target.value})} className="w-full p-1 border rounded text-xs bg-gray-50"><option value="refund">คืนเงินมัดจำ</option><option value="expense">ซื้อของ/ค่าใช้จ่าย</option></select><input placeholder="รายละเอียด" value={newExp.name} onChange={e=>setNewExp({...newExp, name: e.target.value})} className="w-full p-2 border rounded text-sm" required /></div>
                        <div className="w-24"><input type="number" placeholder="บาท" value={newExp.amount || ''} onChange={e=>setNewExp({...newExp, amount: e.target.value})} className="w-full p-2 border rounded text-sm text-red-600 font-bold text-right" required /></div>
                        <button type="submit" className="bg-red-500 text-white p-2 rounded shadow-sm"><Plus size={20} /></button>
                    </form>
                    <ul className="space-y-2">{expenses.map(e => (<li key={e.id} className="flex justify-between items-center text-sm border-b border-gray-100 pb-1"><div><span className={`text-xs px-1 rounded mr-2 ${e.type==='refund' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>{e.type === 'refund' ? 'คืนมัดจำ' : 'จ่าย'}</span>{e.name}</div><div className="flex items-center gap-3"><span className="text-red-600 font-bold">-{Number(e.amount).toLocaleString()}</span><button onClick={() => removeExpense(e.id)} className="text-gray-400 hover:text-red-500" data-html2canvas-ignore="true"><Trash2 size={14} /></button></div></li>))}</ul>
                </div>

                <div className="bg-slate-800 text-white p-4 rounded-xl shadow-lg border border-slate-700">
                    <h2 className="text-center font-bold text-lg mb-4 flex justify-center items-center gap-2"><Calculator size={20} /> สรุปปิดยอดประจำวัน</h2>
                    {aiAnalysis && (<div className="bg-indigo-900/50 border border-indigo-500/30 p-3 rounded-lg mb-4 text-sm text-indigo-100 relative"><div className="flex items-center gap-2 font-bold mb-1 text-indigo-300"><BrainCircuit size={16} /> Gemini Insight</div>{aiAnalysis}</div>)}
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-300"><span>เงินทอนตั้งต้น</span><span>{startCash.toLocaleString()}</span></div>
                        <div className="flex justify-between text-green-400"><span>+ รับเงินสดรวม</span><span>+{summary.totalCashIn.toLocaleString()}</span></div>
                        <div className="flex justify-between text-red-400 border-b border-gray-600 pb-2"><span>- จ่ายเงินสดออก</span><span>-{summary.totalCashOut.toLocaleString()}</span></div>
                        <div className="flex justify-between items-center pt-2 text-xl font-bold text-yellow-400"><span>เงินสดในลิ้นชัก</span><span>{summary.expectedDrawerCash.toLocaleString()} ฿</span></div>
                    </div>
                    <button onClick={handleAIAnalysis} disabled={aiLoading} className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-2 rounded font-bold flex items-center justify-center gap-2 text-sm transition">{aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} {aiLoading ? 'AI Analyzing...' : 'วิเคราะห์ภาพรวม'}</button>
                    <div className="mt-4 bg-slate-700/50 p-3 rounded border border-slate-600">
                        <div className="flex justify-between items-center mb-1"><span className="text-gray-300">เก็บไว้ทอน (ยกไป)</span><span className="font-bold">{summary.cashToKeep.toLocaleString()}</span></div>
                        <div className="flex justify-between items-center text-lg"><span className="text-green-300">ส่งเจ้าของ/เข้าบัญชี</span><span className="font-bold text-green-300">{summary.cashToSend.toLocaleString()}</span></div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-4 text-center">
                        <div><div className="text-xs text-gray-400">ยอดเงินโอน (เช็คแอป)</div><div className="text-blue-400 font-bold text-lg">{summary.totalTransferIn.toLocaleString()}</div></div>
                        <div><div className="text-xs text-gray-400">ยอดขายรวม</div><div className="text-white font-bold text-lg">{(summary.totalCashIn + summary.totalTransferIn).toLocaleString()}</div></div>
                    </div>
                </div>

                <div className="text-center text-xs text-gray-400 mt-8 pb-4" data-html2canvas-ignore="true">{loading ? <span className="flex items-center justify-center gap-1"><Loader2 size={12} className="animate-spin"/> กำลังโหลด...</span> : `บันทึกอัตโนมัติ • ${user ? 'ออนไลน์' : 'กำลังเชื่อมต่อ...'}`}</div>
            </main>

            {showGuestModal && (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="bg-blue-800 text-white p-3 flex justify-between items-center"><h3 className="font-bold flex items-center gap-2"><Users size={18} /> รายชื่อผู้เข้าพัก ({selectedDate})</h3><button onClick={() => setShowGuestModal(false)} className="text-white hover:bg-blue-700 p-1 rounded"><X size={20} /></button></div>
                    <div className="p-3 bg-gray-50 border-b text-sm text-gray-500">รวม {transactions.length} ห้อง</div>
                    <div className="overflow-y-auto flex-1 p-0">
                        <table className="w-full text-sm text-left"><thead className="bg-gray-100 text-gray-600 font-bold sticky top-0"><tr><th className="p-3 border-b">ห้อง</th><th className="p-3 border-b">ข้อมูลลูกค้า</th><th className="p-3 border-b">เอกสาร</th></tr></thead>
                            <tbody className="divide-y divide-gray-100">
                                {transactions.length === 0 ? (<tr><td colSpan="3" className="p-8 text-center text-gray-400">ไม่มีข้อมูล</td></tr>) : (transactions.map((t, i) => (<tr key={i} className="hover:bg-gray-50">
                                    <td className="p-3 font-bold text-blue-800 align-top">{t.room}</td>
                                    <td className="p-3 align-top"><div className="font-medium">{t.name || '-'}</div>{t.phone && <div className="text-xs text-gray-500 mt-1"><Phone size={10} className="inline"/> {t.phone}</div>}</td>
                                    <td className="p-3 text-xs text-gray-600 align-top space-y-1">{t.idCard ? <div className="flex items-center gap-1"><IdCard size={10}/> {t.idCard}</div> : '-'}{t.address && <div className="flex items-start gap-1"><MapPin size={10} className="mt-0.5 min-w-[10px]"/> <span className="break-words w-full">{t.address}</span></div>}</td>
                                </tr>)))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-3 border-t bg-gray-50 text-right"><button onClick={() => setShowGuestModal(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm font-bold hover:bg-gray-300">ปิด</button></div>
                </div>
            </div>)}
        </div>
    );
}