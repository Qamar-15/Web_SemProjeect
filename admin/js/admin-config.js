// Shared admin config — must be loaded after supabase CDN script
const SUPABASE_URL  = 'https://hchrhxblquiwfinjocnv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_31FKtpT8zxRcbt1zoDqkKA_hznbRgcP';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const Session = {
  setStaff: s => localStorage.setItem('tk_staff', JSON.stringify(s)),
  getStaff: () => { const s = localStorage.getItem('tk_staff'); return s ? JSON.parse(s) : null; },
  clearStaff: () => localStorage.removeItem('tk_staff'),
};

function requireStaff() {
  const s = Session.getStaff();
  if (!s) { location.href = '/webproject/admin/index.html'; return null; }
  return s;
}

function toast(msg, type = 'success') {
  document.querySelectorAll('.tk-toast').forEach(t => t.remove());
  const el = Object.assign(document.createElement('div'), { className:`tk-toast tk-toast-${type}`, textContent: msg });
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); }, 3000);
}

function formatPrice(n) { return 'PKR ' + Number(n).toLocaleString(); }
function formatDate(d)  { return new Date(d).toLocaleDateString('en-PK', {day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}); }
function statusLabel(s) { return s ? s[0].toUpperCase() + s.slice(1) : ''; }
function statusColor(s) {
  return ({delivered:'#22c55e',shipped:'#3b82f6',processing:'#f59e0b',
           confirmed:'#f59e0b',pending:'#9ca3af',cancelled:'#ef4444'})[s]||'#9ca3af';
}
function badge(status) {
  const c = statusColor(status);
  return `<span class="badge" style="background:${c}22;color:${c}">${statusLabel(status)}</span>`;
}
function roleBadge(role) {
  const isAdmin = role === 'admin';
  return `<span class="badge" style="background:${isAdmin?'#111':'#555'};color:#fff">${role.toUpperCase()}</span>`;
}

// Build sidebar HTML (injected by each page's renderSidebar())
function buildSidebar(staff, activePage) {
  const isAdmin = staff.role === 'admin';
  const links = [
    { href:'dashboard.html', icon:'📊', label:'Dashboard' },
    { href:'products.html',  icon:'⌚', label:'Products' },
    { href:'orders.html',    icon:'📦', label:'Orders' },
    { href:'brands.html',    icon:'🏷️',  label:'Brands' },
    ...(isAdmin ? [
      { href:'users.html',   icon:'👥', label:'Users' },
      { href:'staff.html',   icon:'🎖️',  label:'Staff' },
    ] : []),
  ];

  return `
    <div class="sb-brand">
      <div class="logo">TIME KEEPERS</div>
      <div class="sub">ADMIN PORTAL</div>
    </div>
    <div class="sb-staff">
      <div class="sb-avatar">${staff.full_name[0].toUpperCase()}</div>
      <div class="sb-info">
        <div class="name">${staff.full_name.split(' ')[0]}</div>
        <div class="role">${staff.role.toUpperCase()}</div>
      </div>
    </div>
    <nav class="sb-nav">
      ${links.map(l => `<a href="${l.href}" class="${activePage===l.href?'active':''}"><span class="icon">${l.icon}</span>${l.label}</a>`).join('')}
    </nav>
    <div class="sb-bottom">
      <a href="index.html" onclick="Session.clearStaff()"><span class="icon">↩</span>Logout</a>
    </div>`;
}
