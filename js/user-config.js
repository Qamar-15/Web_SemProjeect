// ── Supabase Client (User Side) ──────────────────────────────────
const SUPABASE_URL      = 'https://hchrhxblquiwfinjocnv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_31FKtpT8zxRcbt1zoDqkKA_hznbRgcP';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Session ──────────────────────────────────────────────────────
const Session = {
  setUser:   u  => localStorage.setItem('tk_user', JSON.stringify(u)),
  getUser:   () => { const u = localStorage.getItem('tk_user'); return u ? JSON.parse(u) : null; },
  clearUser: () => localStorage.removeItem('tk_user'),
};

function requireUser() {
  const u = Session.getUser();
  if (!u) { location.href = 'index.html'; return null; }
  return u;
}

// ── Cart (localStorage) ──────────────────────────────────────────
const Cart = {
  get()      { const c = localStorage.getItem('tk_cart'); return c ? JSON.parse(c) : []; },
  save(c)    { localStorage.setItem('tk_cart', JSON.stringify(c)); },
  add(product, qty = 1) {
    const cart = this.get();
    const idx  = cart.findIndex(i => i.productId === product.id);
    if (idx >= 0) { cart[idx].quantity += qty; }
    else {
      cart.push({
        productId: product.id,
        name:      product.name,
        brandName: product.brandName ?? product.brands?.name ?? '',
        price:     product.price,
        image:     product.image_url ?? '',
        quantity:  qty,
      });
    }
    this.save(cart);
  },
  remove(pid)       { this.save(this.get().filter(i => i.productId !== pid)); },
  updateQty(pid, q) {
    if (q <= 0) { this.remove(pid); return; }
    const c = this.get();
    const idx = c.findIndex(i => i.productId === pid);
    if (idx >= 0) { c[idx].quantity = q; this.save(c); }
  },
  clear()  { localStorage.removeItem('tk_cart'); },
  count()  { return this.get().reduce((s, i) => s + i.quantity, 0); },
  total()  { return this.get().reduce((s, i) => s + i.price * i.quantity, 0); },
};

// ── Helpers ──────────────────────────────────────────────────────
function formatPrice(n) {
  return 'PKR ' + Number(n).toLocaleString();
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-PK', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function statusLabel(s) { return s ? s[0].toUpperCase() + s.slice(1) : ''; }

function statusColor(s) {
  const map = {
    delivered:  '#22c55e',
    shipped:    '#3b82f6',
    processing: '#f59e0b',
    confirmed:  '#f59e0b',
    pending:    '#9ca3af',
    cancelled:  '#ef4444',
  };
  return map[s] || '#9ca3af';
}

function toast(msg, type = 'success') {
  document.querySelectorAll('.tk-toast').forEach(t => t.remove());
  const el = document.createElement('div');
  el.className   = `tk-toast tk-toast-${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 400);
  }, 3000);
}
