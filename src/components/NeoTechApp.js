import React, { useState, useEffect } from "react";

export default function NeoTechApp() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [section, setSection] = useState("servicios");

  const toggleCart = () => setCartOpen(!cartOpen);

  const addToCart = (name, price) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing) {
        return prev.map((i) =>
          i.name === name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { name, price, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (index, change) => {
    setCart((prev) => {
      const copy = [...prev];
      copy[index].quantity += change;
      if (copy[index].quantity <= 0) copy.splice(index, 1);
      return copy;
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  // Escape para cerrar carrito
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && cartOpen) setCartOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [cartOpen]);

  return (
    <div className="min-h-screen gradient-bg text-white relative">
      {/* Partículas */}
      <div className="particle-bg">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${3 + i}px`,
              height: `${3 + i}px`,
              top: `${20 + i * 10}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i}s`,
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="glass-effect fixed w-full top-0 z-50 px-6 py-4 glow-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center floating shine-effect">
              <span className="text-white font-bold text-xl neon-text">N</span>
            </div>
            <span className="text-white font-bold text-2xl neon-text">
              NeoTech
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setSection("servicios")}
              className="nav-link text-white hover:text-purple-200 px-4 py-2 rounded-lg hover:bg-white/10 ripple"
            >
              Servicios
            </button>
            <button
              onClick={() => setSection("perfil")}
              className="nav-link text-white hover:text-purple-200 px-4 py-2 rounded-lg hover:bg-white/10 ripple"
            >
              Perfil
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSection("perfil")}
              className="text-white hover:text-purple-200 p-2 rounded-lg hover:bg-white/10 ripple"
              aria-label="Ir a Perfil"
            >
              👤
            </button>
            <button
              onClick={toggleCart}
              className="relative text-white hover:text-purple-200 p-2 rounded-lg hover:bg-white/10 ripple"
              aria-label="Abrir carrito"
            >
              🛒
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center pulse-glow">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido */}
      <div className="pt-20">
        {/* Servicios */}
        {section === "servicios" && (
          <section className="p-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 slide-in">
                <h1 className="text-5xl font-bold text-white mb-4">
                  Nuestros Servicios
                </h1>
                <p className="text-xl text-purple-100">
                  Soluciones tecnológicas integrales para tu negocio
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: "Soporte Técnico", price: 49 },
                  { name: "Garantía Extendida", price: 99 },
                  { name: "Instalación Express", price: 149 },
                  { name: "Desarrollo Web", price: 299 },
                  { name: "Apps Móviles", price: 399 },
                  { name: "Ciberseguridad", price: 199 },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="morphism-card p-8 hover-lift text-center"
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {s.name}
                    </h3>
                    <p className="text-purple-100 mb-6">
                      Contrata {s.name.toLowerCase()} de calidad garantizada
                    </p>
                    <button
                      onClick={() => addToCart(s.name, s.price)}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all button-3d ripple"
                    >
                      Contratar Servicio · ${s.price}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Perfil */}
        {section === "perfil" && (
          <section className="p-6">
            <div className="max-w-4xl mx-auto morphism-card p-8">
              <h2 className="text-4xl font-bold text-white mb-6">Mi Perfil</h2>
              <p className="text-purple-100 mb-6">
                Gestiona tu información personal y preferencias
              </p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    defaultValue="Juan"
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white"
                  />
                  <input
                    type="text"
                    defaultValue="Pérez"
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white"
                  />
                </div>
                <input
                  type="email"
                  defaultValue="juan.perez@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white"
                />
                <input
                  type="tel"
                  defaultValue="+1 (555) 987-6543"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white"
                />
                <textarea
                  defaultValue="Calle Principal 456, Apartamento 2B, Ciudad Ejemplo, Estado 12345"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white"
                  rows="4"
                />
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg">
                  Guardar Cambios
                </button>
              </form>
            </div>
          </section>
        )}
      </div>

      {/* Carrito */}
      {cartOpen && (
        <aside className="fixed right-0 top-0 h-full w-96 glass-effect glow-border z-50 p-6">
          <h2 className="text-2xl font-bold mb-6">Mi Carrito</h2>
          <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
            {cart.length === 0 && <p>Tu carrito está vacío</p>}
            {cart.map((item, idx) => (
              <div key={idx} className="gradient-border p-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg">{item.name}</h4>
                  <button
                    onClick={() => removeFromCart(idx)}
                    className="text-red-400"
                  >
                    ❌
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(idx, -1)}
                      className="px-3 py-1 bg-purple-600 rounded-lg"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(idx, 1)}
                      className="px-3 py-1 bg-purple-600 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold">
                    ${item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-white/20 pt-4">
            <p className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </p>
            <button
              onClick={clearCart}
              className="w-full mt-4 bg-gradient-to-r from-red-500 to-pink-500 px-4 py-3 rounded-lg"
            >
              Vaciar Carrito
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
