import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";

const API_BASE = "http://localhost:8080";

// --- SECURITY INTERCEPTOR ---
// This attaches your security token to every request automatically
axios.interceptors.request.use(config => {
  const token = localStorage.getItem("msd_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ==========================================
// 1. LOGIN COMPONENT (JWT Ready)
// ==========================================
const Login = ({ setToken }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // In production, your Java backend sends a real token. 
      // For now, we simulate the "Handshake"
      if (user === "jabir" && pass === "msd2026") {
        const fakeToken = "MSD_SECURE_" + btoa(user);
        localStorage.setItem("msd_token", fakeToken);
        setToken(fakeToken);
        navigate("/admin");
      } else {
        alert("Invalid Credentials!");
      }
    } catch (err) { alert("Server Error"); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-3xl shadow-2xl border-t-8 border-blue-700 w-full max-w-md">
        <h2 className="text-3xl font-black text-gray-800 mb-6 text-center tracking-tighter uppercase">MSD Admin Panel</h2>
        <input type="text" placeholder="Username" className="w-full p-4 border-2 rounded-xl mb-4 outline-none focus:border-blue-500" onChange={(e) => setUser(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-4 border-2 rounded-xl mb-6 outline-none focus:border-blue-500" onChange={(e) => setPass(e.target.value)} required />
        <button className="w-full bg-blue-700 text-white py-4 rounded-xl font-black hover:bg-blue-800 transition">Secure Entry</button>
      </form>
    </div>
  );
};

// ==========================================
// 2. HOME STOREFRONT
// ==========================================
const Home = ({ products, cart, addToCart, decreaseQty }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const displayProducts = products.filter(p => 
    `${p.name} ${p.brand}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to show stock status
  const getStockStatus = (qty) => {
    if (qty <= 0) return <span className="text-red-600 font-bold text-xs uppercase">Out of Stock</span>;
    if (qty === 1) return <span className="text-orange-600 font-bold text-xs uppercase">Only 1 Left!</span>;
    if (qty === 2) return <span className="text-orange-500 font-bold text-xs uppercase">Only 2 Left!</span>;
    if (qty <= 5) return <span className="text-orange-400 font-bold text-xs uppercase">Few items left</span>;
    return <span className="text-green-600 font-bold text-xs uppercase">In Stock</span>;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase italic">MSD Store</h2>
        <input type="text" placeholder="Search appliances..." className="w-full md:w-96 p-4 rounded-2xl border-2 outline-none focus:border-blue-500 shadow-sm" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayProducts.map((p) => {
          // Check if this specific product is in the cart
          const cartItem = cart.find(item => item.id === p.id);
          const isInCart = !!cartItem;

          return (
            <div key={p.id} className="bg-white rounded-3xl shadow-lg overflow-hidden border p-6 flex flex-col h-full">
              <img src={p.imageUrl || "https://via.placeholder.com/300"} className="w-full h-48 object-cover rounded-2xl mb-4" alt="" />
              <span className="text-blue-600 font-black text-[10px] tracking-widest uppercase">{p.brand}</span>
              <h3 className="text-xl font-bold mb-4 flex-grow">{p.name}</h3>
              <p className="text-2xl font-black text-green-600 mb-6">₹{p.price?.toLocaleString()}</p>
              
              <div className="grid grid-cols-1 gap-3">
  {isInCart ? (
    /* Side-by-Side Layout: Quantity Controls + Checkout Button */
    <div className="grid grid-cols-2 gap-3 items-center">
      <div className="flex items-center justify-between bg-blue-50 border-2 border-blue-200 rounded-2xl p-1 h-12">
        <button 
          onClick={() => decreaseQty(p.id)} 
          className="bg-white text-blue-700 w-8 h-8 rounded-lg font-black text-lg shadow-sm hover:bg-red-50 hover:text-red-600 transition"
        >
          -
        </button>
        <span className="font-black text-blue-800 text-xs">{cartItem.cartQty}</span>
        <button 
          onClick={() => addToCart(p)} 
          disabled={cartItem.cartQty >= p.quantity}
          className="bg-white text-blue-700 w-8 h-8 rounded-lg font-black text-lg shadow-sm hover:bg-green-50 hover:text-green-600 transition disabled:opacity-30"
        >
          +
        </button>
      </div>

      <button 
        onClick={() => navigate("/cart")}
        className="h-12 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-tighter text-[10px] hover:bg-black transition shadow-lg active:scale-95"
      >
        Checkout →
      </button>
    </div>
  ) : (
    /* INITIAL ADD BUTTON (Full Width) */
    <>
      <button 
        disabled={p.quantity <= 0}
        onClick={() => addToCart(p)} 
        className="w-full bg-blue-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition shadow-lg active:scale-95 disabled:bg-gray-300"
      >
        {p.quantity <= 0 ? "Out of Stock" : "Add Cart"}
      </button>
      
      {/* Small subtle link for those who haven't added yet */}
      <button 
        onClick={() => navigate("/cart")}
        className="w-full py-1 text-gray-400 font-black text-[10px] uppercase tracking-tighter hover:text-blue-600 transition"
      >
        View Basket
      </button>
    </>
  )}
</div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// 3. CART (Fixed with complete logic)
// ==========================================
const Cart = ({ cart, setCart }) => {
  const [orderComplete, setOrderComplete] = useState(false);
  const total = cart.reduce((sum, item) => sum + (item.price * (item.cartQty || 1)), 0);

  // --- 1. THE MISSING FUNCTION ---
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    for (const item of cart) {
      const orderData = { 
        customerName: e.target[0].value, 
        phoneNumber: e.target[1].value, 
        address: e.target[2].value, 
        totalAmount: item.price * (item.cartQty || 1),
        status: "PENDING",
        productId: item.id,
        productName: item.name,
        quantity: item.cartQty || 1 
      };

      try {
        await axios.post(`${API_BASE}/api/orders`, orderData);
      } catch (err) {
        console.error("Sync failed for:", item.name);
      }
    }

    setCart([]);
    localStorage.removeItem("msd_cart");
    setOrderComplete(true);
  };

  // --- 2. THE QUANTITY LOGIC ---
  const updateQuantity = (id, delta) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        const currentQty = item.cartQty || 1;
        const newQty = currentQty + delta;
        // Check against actual stock quantity from backend
        if (newQty >= 1 && newQty <= item.quantity) {
          return { ...item, cartQty: newQty };
        } else if (newQty > item.quantity) {
          alert(`Only ${item.quantity} units available in MSD Inventory!`);
        }
      }
      return item;
    });
    setCart(newCart);
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  if (orderComplete) return (
    <div className="p-20 text-center">
      <h1 className="text-5xl font-black text-blue-800">Order Placed! ✅</h1>
      <Link to="/" className="text-blue-600 font-bold underline mt-6 inline-block tracking-widest uppercase text-xs">Return to Shop</Link>
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-black mb-10 uppercase italic tracking-tighter">Your Basket</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE: ITEM LIST */}
        <div className="lg:col-span-2 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between bg-white p-6 rounded-3xl border shadow-sm items-center">
                <div>
                  <p className="font-black uppercase leading-tight">{item.name}</p>
                  <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">Stock: {item.quantity}</p>
                </div>
                
                <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-2xl border">
                  <button onClick={() => updateQuantity(item.id, -1)} className="font-black text-xl hover:text-blue-600 w-6">-</button>
                  <span className="font-black w-8 text-center">{item.cartQty || 1}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="font-black text-xl hover:text-blue-600 w-6">+</button>
                </div>

                <div className="flex items-center gap-4">
                   <p className="font-black text-sm">₹{((item.price) * (item.cartQty || 1)).toLocaleString()}</p>
                   <button onClick={() => removeItem(item.id)} className="text-red-500 font-black text-[10px] uppercase hover:underline p-2">✕</button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-gray-200 text-center">
              <p className="text-gray-400 font-black uppercase tracking-widest mb-6">Your basket is currently empty</p>
              <Link to="/" className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase inline-block shadow-lg hover:bg-blue-800 transition">
                Browse Appliances
              </Link>
            </div>
          )}
        </div>

        {/* RIGHT SIDE: CHECKOUT FORM (Only shows if cart has items) */}
        {cart.length > 0 && (
          <form onSubmit={handlePlaceOrder} className="bg-white p-8 rounded-[2.5rem] shadow-2xl border-t-8 border-green-500 h-fit">
            <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Total Payable</p>
            <h2 className="text-4xl font-black mb-6">₹{total.toLocaleString()}</h2>
            <input type="text" placeholder="Full Name" className="w-full p-4 border rounded-xl mb-4 outline-none focus:border-green-500" required />
            <input type="text" placeholder="Mobile Number" className="w-full p-4 border rounded-xl mb-4 outline-none focus:border-green-500" required />
            <textarea placeholder="Delivery Address" className="w-full p-4 border rounded-xl mb-6 outline-none focus:border-green-500" required />
            <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-black uppercase hover:bg-black transition">Confirm Order</button>
          </form>
        )}
      </div>
    </div>
  );
};


// ==========================================
// 4. ADMIN PANEL (FULL INVENTORY & ORDERS)
// ==========================================
  
 const Admin = ({ products, fetchProducts, setToken }) => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [orders, setOrders] = useState([]);
  const [orderSearch, setOrderSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", brand: "", price: "", category: "Washing Machine", quantity: 1, imageFile: null 
  });

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/orders`);
      setOrders(res.data);
    } catch (err) { console.error("Order Fetch Error"); }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [fetchProducts, fetchOrders]);

    // PRODUCT:  ${order.address}
  // --- INVOICE GENERATOR ---
       // --- UPDATED INVOICE GENERATOR ---
  const generateInvoice = (order) => {
    const doc = `
      MSD APPLIANCES - VIJAYAPURA
      ---------------------------
      INVOICE ID: #MSD-${order.id}
      PRODUCT:    ${order.productName || "Appliance Service/Unit"}
      ---------------------------
      
      CUSTOMER: ${order.customerName.toUpperCase()}
      CONTACT:  ${order.phoneNumber}
      ADDRESS:  ${order.address}
      ---------------------------
      TOTAL AMOUNT: ₹${order.totalAmount.toLocaleString()}
      STATUS: ${order.status}
      DATE: ${new Date().toLocaleDateString()}
      ---------------------------
      Authorized Signatory: JABIR
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<pre style="font-family:monospace; padding:40px; font-size:16px;">${doc}</pre>`);
    printWindow.print();
  };

  const handleUpdateStatus = async (id) => {
    try {
      await axios.put(`${API_BASE}/api/orders/${id}/status`, "DELIVERED", {
        headers: { "Content-Type": "text/plain" }
      });
      fetchOrders();
    } catch (err) { alert("Update failed"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("brand", formData.brand);
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    data.append("category", formData.category);
    if (formData.imageFile) data.append("image", formData.imageFile);

    try {
      if (editId) await axios.put(`${API_BASE}/api/products/${editId}`, data);
      else await axios.post(`${API_BASE}/api/products/add`, data);
      
      setFormData({ name: "", brand: "", price: "", category: "Washing Machine", quantity: 1, imageFile: null });
      setEditId(null);
      fetchProducts();
      alert("MSD Inventory Synchronized!");
    } catch (err) { alert("Action Failed. Check Java Server."); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this appliance from MSD Inventory?")) {
      await axios.delete(`${API_BASE}/api/products/${id}`);
      fetchProducts();
    }
  };

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.phoneNumber.includes(orderSearch)
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tighter">MSD ADMIN</h2>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Vijayapura Control Center</p>
        </div>
        <button onClick={() => { localStorage.removeItem("msd_token"); setToken(null); }} 
                className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-black text-xs uppercase hover:bg-red-600 hover:text-white transition">
          Logout 🔒
        </button>
      </div>

      {/* NAVIGATION & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <div className="flex gap-4 bg-white p-2 rounded-2xl shadow-sm border w-fit">
          <button onClick={() => setActiveTab("inventory")} className={`px-8 py-3 rounded-xl font-black transition ${activeTab === 'inventory' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400'}`}>Inventory</button>
          <button onClick={() => setActiveTab("orders")} className={`relative px-8 py-3 rounded-xl font-black transition ${activeTab === 'orders' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400'}`}>
            Orders
            {orders.filter(o => o.status !== 'DELIVERED').length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded-full border-2 border-white animate-pulse">
                {orders.filter(o => o.status !== 'DELIVERED').length}
              </span>
            )}
          </button>
        </div>

        {activeTab === "orders" && (
          <input 
            type="text" 
            placeholder="Search Customer..." 
            className="w-full md:w-80 p-3 rounded-xl border-2 outline-none focus:border-green-500 shadow-sm"
            onChange={(e) => setOrderSearch(e.target.value)}
          />
        )}
      </div>

      {activeTab === "inventory" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* INVENTORY FORM */}
          <form onSubmit={handleSubmit} className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] shadow-xl border-t-8 border-blue-600 h-fit space-y-4">
            <h3 className="font-black text-xs uppercase text-gray-400">{editId ? "Update Item" : "New Stock Entry"}</h3>
            <input type="text" placeholder="Product Name" className="w-full p-4 bg-gray-50 rounded-xl border outline-none focus:border-blue-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            <div className="flex gap-2">
              <input type="text" placeholder="Brand" className="w-1/2 p-4 bg-gray-50 rounded-xl border" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} required />
              <input type="number" placeholder="Stock" className="w-1/2 p-4 bg-blue-50 border-2 border-blue-100 rounded-xl font-black" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} required />
            </div>
            <input type="number" placeholder="Price (INR)" className="w-full p-4 bg-gray-50 rounded-xl border" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            <input type="file" className="w-full text-[10px] p-2 border-2 border-dashed rounded-xl" onChange={e => setFormData({...formData, imageFile: e.target.files[0]})} required={!editId} />
            <button disabled={loading} className="w-full bg-blue-700 text-white py-4 rounded-xl font-black shadow-lg hover:bg-blue-800 transition active:scale-95 uppercase">
                {loading ? "Syncing..." : (editId ? "Save Changes" : "Add to Shop")}
            </button>
            {editId && <button type="button" onClick={() => {setEditId(null); setFormData({name:"", brand:"", price:"", category:"Washing Machine", quantity: 1, imageFile: null})}} className="w-full text-gray-400 font-bold text-[10px] uppercase">Cancel Edit</button>}
          </form>

          {/* INVENTORY LIST */}
          <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-800 text-white text-[10px] uppercase font-black tracking-widest">
                <tr><th className="p-6">Product</th><th className="p-6 text-center">Stock</th><th className="p-6 text-right">Actions</th></tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-6">
                      <p className="font-black text-gray-900 uppercase leading-none">{p.name}</p>
                      <span className="text-blue-500 text-[10px] font-black uppercase tracking-tighter">{p.brand} • ₹{p.price.toLocaleString()}</span>
                    </td>
                    <td className="p-6 text-center font-black text-blue-700">{p.quantity}</td>
                    <td className="p-6 text-right space-x-6">
                      <button onClick={() => { setEditId(p.id); setFormData({...p}); window.scrollTo(0,0); }} className="text-blue-600 font-black text-[10px] uppercase">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-500 font-black text-[10px] uppercase">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ORDERS LIST */
        <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-900 text-white text-[10px] uppercase font-black tracking-widest">
              <tr><th className="p-6">Customer</th><th className="p-6">Amount</th><th className="p-6 text-center">Invoice</th><th className="p-6 text-right">Action</th></tr>
            </thead>
            <tbody>
              {filteredOrders.map(o => (
                <tr key={o.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-6 font-black uppercase text-gray-800">
                    {o.customerName}<br/><span className="text-blue-500 text-xs font-normal tracking-normal">{o.phoneNumber}</span>
                  </td>
                  <td className="p-6 font-black text-gray-900">₹{o.totalAmount?.toLocaleString()}</td>
                  <td className="p-6 text-center">
                    <button onClick={() => generateInvoice(o)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-[10px] font-black hover:bg-blue-600 hover:text-white transition uppercase">Print 📄</button>
                  </td>
                  <td className="p-6 text-right">
                    {o.status === 'DELIVERED' ? (
                      <span className="inline-block bg-gray-100 text-gray-400 px-6 py-2 rounded-xl font-black text-[10px] uppercase">Delivered ✅</span>
                    ) : (
                      <button onClick={() => handleUpdateStatus(o.id)} className="bg-green-600 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase shadow-lg hover:bg-green-700 transition">Mark Delivery</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 5. MAIN APP (State Coordinator)
// ==========================================
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("msd_cart") || "[]"));
  const [token, setToken] = useState(localStorage.getItem("msd_token"));

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/products`);
      setProducts(res.data);
    } catch (e) { console.error("Backend Down"); }
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, cartQty: (item.cartQty || 1) + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, cartQty: 1 }]);
    }
  };

  const decreaseQty = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.cartQty > 1) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, cartQty: item.cartQty - 1 } : item
        );
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  useEffect(() => {
    fetchProducts();
    localStorage.setItem("msd_cart", JSON.stringify(cart));
  }, [cart, fetchProducts]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <nav className="bg-white p-6 shadow-sm flex justify-between items-center border-b sticky top-0 z-50">
          <Link to="/" className="text-2xl font-black text-blue-800">MSD APPLIANCES</Link>
          <div className="flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <Link to="/">Store</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/cart" className="bg-blue-600 px-6 py-2 rounded-xl text-white">
              Cart ({cart.reduce((acc, item) => acc + (item.cartQty || 1), 0)})
            </Link>
          </div>
        </nav>

        <Routes>
          {/* FIXED: Single Home route with ALL necessary props */}
          <Route path="/" element={
            <Home 
              products={products} 
              cart={cart} 
              addToCart={addToCart} 
              decreaseQty={decreaseQty} 
            />
          } />
          
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/admin" element={token ? <Admin products={products} fetchProducts={fetchProducts} setToken={setToken} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;