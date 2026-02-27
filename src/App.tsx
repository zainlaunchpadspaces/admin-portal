import { useState } from "react";

const theme = {
  bg: "#0a0e1a", surface: "#111827", surfaceAlt: "#1a2235", border: "#1e2d45",
  accent: "#00c8ff", accentGlow: "rgba(0,200,255,0.15)", success: "#00e676",
  warning: "#ffab00", danger: "#ff3d71", text: "#e8edf5", textMuted: "#6b7a99", purple: "#7c4dff",
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${theme.bg}; color: ${theme.text}; font-family: 'Space Grotesk', sans-serif; }
  ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: ${theme.surface}; } ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 3px; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes glow { 0%,100%{box-shadow:0 0 8px rgba(0,200,255,0.15)} 50%{box-shadow:0 0 24px rgba(0,200,255,0.35)} }
`;

// ── DATA ──────────────────────────────────────────────────────────────────
const INIT_CLIENTS = [
  { id: 1, name: "TechCorp Inc.", contact: "John Smith", email: "john@techcorp.com", phone: "555-0101", plan: "Business 1Gbps", mrr: 450, status: "active", joined: "2024-01-15", address: "123 Tech Ave, Downtown" },
  { id: 2, name: "Sunset Cafe", contact: "Maria Garcia", email: "maria@sunsetcafe.com", phone: "555-0202", plan: "Standard 100Mbps", mrr: 120, status: "active", joined: "2024-03-08", address: "456 Main St" },
  { id: 3, name: "Rivera Law Firm", contact: "Carlos Rivera", email: "carlos@riveralaw.com", phone: "555-0303", plan: "Business 500Mbps", mrr: 280, status: "suspended", joined: "2023-11-20", address: "789 Legal Blvd" },
  { id: 4, name: "Greenfield School", contact: "Dr. Lisa Park", email: "lisa@greenfield.edu", phone: "555-0404", plan: "Education 200Mbps", mrr: 180, status: "active", joined: "2024-02-01", address: "321 Campus Rd" },
  { id: 5, name: "Harbor Hotel", contact: "Tom Nguyen", email: "tom@harborhotel.com", phone: "555-0505", plan: "Business 1Gbps", mrr: 520, status: "active", joined: "2023-09-14", address: "1 Harbor View" },
  { id: 6, name: "Pine Street Clinic", contact: "Dr. Amy Chen", email: "amy@pineclinic.com", phone: "555-0606", plan: "Standard 100Mbps", mrr: 120, status: "overdue", joined: "2024-04-22", address: "88 Medical Plaza" },
];

const INIT_CONNECTIONS = [
  { id: 1, clientId: 1, ip: "192.168.1.10", device: "Cisco ASR 1001", location: "Downtown DC", status: "online", uptime: "99.8%", latency: 12, bandwidth: "856 Mbps / 1 Gbps" },
  { id: 2, clientId: 1, ip: "192.168.1.11", device: "Cisco Catalyst 9200", location: "Branch Office", status: "online", uptime: "98.2%", latency: 18, bandwidth: "420 Mbps / 500 Mbps" },
  { id: 3, clientId: 2, ip: "10.0.0.5", device: "Ubiquiti EdgeRouter", location: "Main Street", status: "offline", uptime: "87.1%", latency: null, bandwidth: "—" },
  { id: 4, clientId: 3, ip: "172.16.0.8", device: "Cisco ISR 4331", location: "Legal District", status: "suspended", uptime: "—", latency: null, bandwidth: "—" },
  { id: 5, clientId: 4, ip: "10.20.0.1", device: "Cisco Meraki MX", location: "Campus", status: "online", uptime: "99.5%", latency: 9, bandwidth: "178 Mbps / 200 Mbps" },
  { id: 6, clientId: 5, ip: "192.168.10.1", device: "Cisco ASR 1002", location: "Waterfront", status: "online", uptime: "99.9%", latency: 7, bandwidth: "940 Mbps / 1 Gbps" },
  { id: 7, clientId: 6, ip: "10.5.0.2", device: "Generic Router", location: "Medical Plaza", status: "online", uptime: "95.3%", latency: 28, bandwidth: "88 Mbps / 100 Mbps" },
];

const INIT_INVOICES = [
  { id: "INV-001", clientId: 1, amount: 450, due: "2026-03-01", status: "paid", method: "stripe" },
  { id: "INV-002", clientId: 2, amount: 120, due: "2026-03-01", status: "pending", method: "square" },
  { id: "INV-003", clientId: 3, amount: 280, due: "2026-02-01", status: "overdue", method: "stripe" },
  { id: "INV-004", clientId: 4, amount: 180, due: "2026-03-01", status: "paid", method: "square" },
  { id: "INV-005", clientId: 5, amount: 520, due: "2026-03-01", status: "pending", method: "stripe" },
  { id: "INV-006", clientId: 6, amount: 120, due: "2026-02-15", status: "overdue", method: "stripe" },
];

const INIT_TICKETS = [
  { id: "TK-001", clientId: 1, subject: "Slow speeds on branch link", priority: "medium", status: "open", created: "2026-02-15", tech: "Maria S." },
  { id: "TK-002", clientId: 2, subject: "Connection completely down", priority: "critical", status: "in-progress", created: "2026-02-17", tech: "James K." },
  { id: "TK-003", clientId: 6, subject: "Intermittent drops", priority: "high", status: "open", created: "2026-02-16", tech: "Unassigned" },
  { id: "TK-004", clientId: 5, subject: "Need VLAN configuration", priority: "low", status: "resolved", created: "2026-02-10", tech: "Maria S." },
];


const INIT_USERS = [
  { id: 1, name: "Admin User", email: "admin@dataconnections.io", role: "admin", status: "active", clientId: null, joined: "2023-01-01", lastLogin: "2026-02-19" },
  { id: 2, name: "John Smith", email: "john@techcorp.com", role: "client", status: "active", clientId: 1, joined: "2024-01-15", lastLogin: "2026-02-18" },
  { id: 3, name: "Maria Garcia", email: "maria@sunsetcafe.com", role: "client", status: "active", clientId: 2, joined: "2024-03-08", lastLogin: "2026-02-15" },
  { id: 4, name: "James K.", email: "james@dataconnections.io", role: "admin", status: "active", clientId: null, joined: "2023-06-01", lastLogin: "2026-02-19" },
  { id: 5, name: "Maria S.", email: "marias@dataconnections.io", role: "admin", status: "active", clientId: null, joined: "2023-08-15", lastLogin: "2026-02-19" },
];

const PLANS = [
  { id: 1, name: "Standard 100Mbps", price: 120, down: 100, up: 20 },
  { id: 2, name: "Education 200Mbps", price: 180, down: 200, up: 50 },
  { id: 3, name: "Business 500Mbps", price: 280, down: 500, up: 100 },
  { id: 4, name: "Business 1Gbps", price: 450, down: 1000, up: 250 },
];

// ── UI PRIMITIVES ──────────────────────────────────────────────────────────
const StatusDot = ({ status }) => {
  const colors = { online: theme.success, offline: theme.danger, suspended: theme.textMuted, overdue: theme.warning, active: theme.success, pending: theme.warning, paid: theme.success, "in-progress": theme.accent };
  return <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: colors[status] || theme.textMuted, animation: status === "online" || status === "active" ? "pulse 2s infinite" : "none", marginRight: 6 }} />;
};

const Badge = ({ label, type }) => {
  const colors = { online: theme.success, offline: theme.danger, suspended: theme.textMuted, overdue: theme.warning, active: theme.success, pending: theme.warning, paid: theme.success, critical: theme.danger, high: theme.warning, medium: theme.accent, low: theme.success, "in-progress": theme.accent, open: theme.warning, resolved: theme.success };
  const c = colors[type || label?.toLowerCase()] || theme.textMuted;
  return <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", background: `${c}22`, color: c, border: `1px solid ${c}44` }}>{label}</span>;
};

const Card = ({ children, style: s = {}, onClick }) => (
  <div onClick={onClick} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 20, animation: "fadeIn 0.3s ease", cursor: onClick ? "pointer" : "default", transition: "border-color 0.2s, transform 0.15s", ...s }}
    onMouseEnter={e => { if (onClick) { e.currentTarget.style.borderColor = theme.accent; e.currentTarget.style.transform = "translateY(-2px)"; } }}
    onMouseLeave={e => { if (onClick) { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.transform = "translateY(0)"; } }}>
    {children}
  </div>
);

const StatCard = ({ label, value, sub, color = theme.accent }) => (
  <Card>
    <div style={{ color: theme.textMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 700, color, fontFamily: "'JetBrains Mono'" }}>{value}</div>
    {sub && <div style={{ color: theme.textMuted, fontSize: 12, marginTop: 4 }}>{sub}</div>}
  </Card>
);

const Btn = ({ children, onClick, variant = "primary", size = "md", style: s = {} }) => {
  const bg = variant === "primary" ? theme.accent : variant === "danger" ? theme.danger : variant === "success" ? theme.success : variant === "ghost" ? "transparent" : theme.surfaceAlt;
  const color = variant === "ghost" || variant === "secondary" ? theme.text : "#000";
  return (
    <button onClick={onClick} style={{ background: bg, color, border: `1px solid ${variant === "ghost" ? theme.border : bg}`, borderRadius: 8, padding: size === "sm" ? "5px 12px" : "9px 18px", fontSize: size === "sm" ? 12 : 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s", ...s }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
      {children}
    </button>
  );
};

const Input = ({ label, value, onChange, type = "text", placeholder }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <div style={{ color: theme.textMuted, fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ width: "100%", background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "9px 12px", color: theme.text, fontSize: 14, fontFamily: "inherit", outline: "none" }}
      onFocus={e => e.target.style.borderColor = theme.accent}
      onBlur={e => e.target.style.borderColor = theme.border} />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <div style={{ color: theme.textMuted, fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>}
    <select value={value} onChange={onChange} style={{ width: "100%", background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "9px 12px", color: theme.text, fontSize: 14, fontFamily: "inherit", outline: "none" }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const Modal = ({ title, onClose, children, wide }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}
    onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 28, width: wide ? 700 : 480, maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto", animation: "fadeIn 0.2s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: theme.textMuted, fontSize: 20, cursor: "pointer" }}>✕</button>
      </div>
      {children}
    </div>
  </div>
);


const RoleTag = ({ role }) => {
  const isAdmin = role === "admin";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: isAdmin ? `${theme.purple}22` : `${theme.accentGlow}`, color: isAdmin ? theme.purple : theme.accent, border: `1px solid ${isAdmin ? theme.purple : theme.accent}44` }}>
      {isAdmin ? "⚙ Admin" : "👤 Client"}
    </span>
  );
};

// ── CLIENT PROFILE VIEW ────────────────────────────────────────────────────
function ClientProfile({ client, connections, invoices, tickets, onBack, onUpdate, setConnections }) {
  const [addConnModal, setAddConnModal] = useState(false);
  const [connForm, setConnForm] = useState({ ip: "", device: "", location: "", status: "online", latency: "", bandwidth: "" });

  const handleAddConnection = () => {
    if (!connForm.ip || !connForm.device || !connForm.location) return;
    setConnections(prev => [...prev, {
      id: Date.now(), clientId: client.id, ip: connForm.ip, device: connForm.device,
      location: connForm.location, status: connForm.status,
      uptime: connForm.status === "online" ? "100%" : "—",
      latency: connForm.status === "online" ? (Number(connForm.latency) || 15) : null,
      bandwidth: connForm.bandwidth || "—"
    }]);
    setAddConnModal(false);
    setConnForm({ ip: "", device: "", location: "", status: "online", latency: "", bandwidth: "" });
  };

  const clientConns = connections.filter(c => c.clientId === client.id);
  const clientInvs = invoices.filter(i => i.clientId === client.id);
  const clientTkts = tickets.filter(t => t.clientId === client.id);
  const totalPaid = clientInvs.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const totalOwed = clientInvs.filter(i => i.status !== "paid").reduce((s, i) => s + i.amount, 0);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <button onClick={onBack} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "8px 14px", color: theme.text, fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>← Back</button>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${theme.accent}33, ${theme.purple}33)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏢</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{client.name}</div>
              <div style={{ color: theme.textMuted, fontSize: 13 }}>{client.contact} · {client.email} · {client.phone}</div>
            </div>
          </div>
        </div>
        <Badge label={client.status} />
        {client.status === "active" && <Btn variant="danger" size="sm" onClick={() => onUpdate({ ...client, status: "suspended" })}>Suspend</Btn>}
        {client.status === "suspended" && <Btn variant="success" size="sm" onClick={() => onUpdate({ ...client, status: "active" })}>Reactivate</Btn>}
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Plan" value={client.plan.split(" ")[1] || client.plan} sub={client.plan} color={theme.purple} />
        <StatCard label="Monthly Rate" value={`$${client.mrr}`} sub="per month" color={theme.accent} />
        <StatCard label="Total Paid" value={`$${totalPaid}`} sub="all time" color={theme.success} />
        <StatCard label="Outstanding" value={`$${totalOwed}`} sub="due now" color={totalOwed > 0 ? theme.warning : theme.success} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Connections */}
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>🌐 Connections ({clientConns.length})</span>
            <Btn size="sm" onClick={() => setAddConnModal(true)}>+ Add Connection</Btn>
          </div>
          {clientConns.length === 0 && <div style={{ color: theme.textMuted, fontSize: 13 }}>No connections found.</div>}
          {clientConns.map(c => (
            <div key={c.id} style={{ padding: "12px 0", borderBottom: `1px solid ${theme.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}><StatusDot status={c.status} />{c.location}</span>
                <Badge label={c.status} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                <div style={{ fontSize: 11, color: theme.textMuted }}>IP: <span style={{ color: theme.accent, fontFamily: "'JetBrains Mono'" }}>{c.ip}</span></div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>Device: {c.device}</div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>Latency: <span style={{ color: c.latency > 20 ? theme.warning : theme.success }}>{c.latency ? `${c.latency}ms` : "—"}</span></div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>Bandwidth: {c.bandwidth}</div>
              </div>
            </div>
          ))}
        </Card>

        {/* Invoices */}
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>💳 Invoices ({clientInvs.length})</div>
          {clientInvs.length === 0 && <div style={{ color: theme.textMuted, fontSize: 13 }}>No invoices found.</div>}
          {clientInvs.map(inv => (
            <div key={inv.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${theme.border}` }}>
              <div>
                <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono'", color: theme.accent }}>{inv.id}</div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>Due: {inv.due} · {inv.method}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 700, fontFamily: "'JetBrains Mono'" }}>${inv.amount}</span>
                <Badge label={inv.status} />
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Tickets */}
      <Card>
        <div style={{ fontWeight: 700, marginBottom: 16 }}>🎫 Support Tickets ({clientTkts.length})</div>
        {clientTkts.length === 0 && <div style={{ color: theme.textMuted, fontSize: 13 }}>No tickets on record.</div>}
        <div style={{ display: "grid", gap: 10 }}>
          {clientTkts.map(t => (
            <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: theme.bg, borderRadius: 8 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{t.subject}</div>
                <div style={{ color: theme.textMuted, fontSize: 11, marginTop: 3 }}>{t.id} · {t.created} · Tech: {t.tech}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Badge label={t.priority} />
                <Badge label={t.status} type={t.status} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Client info */}
      <Card style={{ marginTop: 20 }}>
        <div style={{ fontWeight: 700, marginBottom: 14 }}>📋 Account Info</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[["Company", client.name], ["Contact", client.contact], ["Email", client.email], ["Phone", client.phone], ["Address", client.address], ["Member Since", client.joined]].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 11, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{k}</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </div>
      </Card>

      {addConnModal && (
        <Modal title="Add Network Connection" onClose={() => setAddConnModal(false)} wide>
          <div style={{ background: `${theme.accent}10`, border: `1px solid ${theme.accent}30`, borderRadius: 10, padding: "10px 14px", marginBottom: 18, fontSize: 13, color: theme.textMuted }}>
            Adding a connection for <strong style={{ color: theme.text }}>{client.name}</strong>.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 18px" }}>
            <Input label="IP Address *" value={connForm.ip} onChange={e => setConnForm(p => ({ ...p, ip: e.target.value }))} placeholder="192.168.1.1" />
            <Input label="Location / Site Name *" value={connForm.location} onChange={e => setConnForm(p => ({ ...p, location: e.target.value }))} placeholder="Main Office" />
            <Input label="Device / Router *" value={connForm.device} onChange={e => setConnForm(p => ({ ...p, device: e.target.value }))} placeholder="Cisco ASR 1001" />
            <Select label="Initial Status" value={connForm.status} onChange={e => setConnForm(p => ({ ...p, status: e.target.value }))} options={[{ value: "online", label: "Online" }, { value: "offline", label: "Offline" }, { value: "suspended", label: "Suspended" }]} />
            <Input label="Latency (ms)" value={connForm.latency} onChange={e => setConnForm(p => ({ ...p, latency: e.target.value }))} placeholder="e.g. 12" />
            <Input label="Bandwidth" value={connForm.bandwidth} onChange={e => setConnForm(p => ({ ...p, bandwidth: e.target.value }))} placeholder="e.g. 856 Mbps / 1 Gbps" />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
            <Btn variant="ghost" onClick={() => setAddConnModal(false)}>Cancel</Btn>
            <Btn onClick={handleAddConnection} disabled={!connForm.ip || !connForm.device || !connForm.location}>Add Connection</Btn>
          </div>
        </Modal>
      )}

    </div>
  );
}

// ── MAIN VIEWS ─────────────────────────────────────────────────────────────
function Dashboard({ clients, connections, invoices, tickets, setPage }) {
  const online = connections.filter(c => c.status === "online").length;
  const offline = connections.filter(c => c.status === "offline").length;
  const totalMRR = clients.reduce((s, c) => s + c.mrr, 0);
  const openTickets = tickets.filter(t => t.status !== "resolved").length;
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Dashboard</div>
        <div style={{ color: theme.textMuted, fontSize: 14 }}>Welcome back — here's your network at a glance</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard label="Online Connections" value={online} sub={`${offline} offline`} color={theme.success} />
        <StatCard label="Monthly Revenue" value={`$${totalMRR.toLocaleString()}`} sub="Across all clients" color={theme.accent} />
        <StatCard label="Active Clients" value={clients.filter(c => c.status === "active").length} sub={`${clients.length} total`} color={theme.purple} />
        <StatCard label="Open Tickets" value={openTickets} sub="Require attention" color={theme.warning} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <div style={{ fontWeight: 600, marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
            <span>🌐 Network Status</span>
            <button onClick={() => setPage("network")} style={{ background: "none", border: "none", color: theme.accent, fontSize: 12, cursor: "pointer" }}>View All →</button>
          </div>
          {connections.slice(0, 5).map(c => {
            const client = clients.find(cl => cl.id === c.clientId);
            return (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${theme.border}` }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}><StatusDot status={c.status} />{client?.name}</div>
                  <div style={{ color: theme.textMuted, fontSize: 11, marginTop: 2, paddingLeft: 14 }}>{c.ip} · {c.device}</div>
                </div>
                <Badge label={c.status} />
              </div>
            );
          })}
        </Card>
        <Card>
          <div style={{ fontWeight: 600, marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
            <span>🎫 Recent Tickets</span>
            <button onClick={() => setPage("tickets")} style={{ background: "none", border: "none", color: theme.accent, fontSize: 12, cursor: "pointer" }}>View All →</button>
          </div>
          {tickets.map(t => {
            const client = clients.find(cl => cl.id === t.clientId);
            return (
              <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${theme.border}` }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{client?.name}</div>
                  <div style={{ color: theme.textMuted, fontSize: 11, marginTop: 2 }}>{t.subject}</div>
                </div>
                <Badge label={t.priority} />
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

function Clients({ clients, setClients, connections, setConnections, invoices, tickets, setTickets, setInvoices }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState(null);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", email: "", phone: "", plan: "Standard 100Mbps", mrr: "120", address: "" });

  if (selectedClient) {
    const live = clients.find(c => c.id === selectedClient.id);
    return <ClientProfile client={live || selectedClient} connections={connections} setConnections={setConnections} invoices={invoices} tickets={tickets}
      onBack={() => setSelectedClient(null)}
      onUpdate={(updated) => { setClients(prev => prev.map(c => c.id === updated.id ? updated : c)); setSelectedClient(updated); }} />;
  }

  const filtered = clients.filter(c => {
    const matchFilter = filter === "all" || c.status === filter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    const plan = PLANS.find(p => p.name === form.plan);
    setClients(prev => [...prev, { id: Date.now(), ...form, mrr: plan?.price || Number(form.mrr), status: "active", joined: new Date().toISOString().split("T")[0] }]);
    setModal(false); setForm({ name: "", contact: "", email: "", phone: "", plan: "Standard 100Mbps", mrr: "120", address: "" });
  };

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>Clients</div>
          <div style={{ color: theme.textMuted, fontSize: 14 }}>Click any client to view their full profile</div>
        </div>
        <Btn onClick={() => setModal(true)}>+ Add Client</Btn>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {["all", "active", "suspended", "overdue"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${filter === f ? theme.accent : theme.border}`, background: filter === f ? theme.accentGlow : "transparent", color: theme.text, fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{f}</button>
        ))}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, contact..."
          style={{ marginLeft: "auto", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "8px 14px", color: theme.text, fontFamily: "inherit", fontSize: 13, width: 280, outline: "none" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {filtered.map(c => {
          const clientConns = connections.filter(cn => cn.clientId === c.id);
          const onlineCount = clientConns.filter(cn => cn.status === "online").length;
          const offlineCount = clientConns.filter(cn => cn.status === "offline").length;
          return (
            <Card key={c.id} onClick={() => setSelectedClient(c)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${theme.accent}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏢</div>
                <Badge label={c.status} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{c.name}</div>
              <div style={{ color: theme.textMuted, fontSize: 12, marginBottom: 2 }}>{c.contact} · {c.email}</div>
              <div style={{ color: theme.textMuted, fontSize: 12, marginBottom: 14 }}>{c.plan}</div>
              <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontWeight: 700, color: theme.accent }}>${c.mrr}<span style={{ color: theme.textMuted, fontSize: 11 }}>/mo</span></div>
                {clientConns.length === 0
                  ? <span style={{ fontSize: 11, color: theme.warning, background: `${theme.warning}18`, border: `1px solid ${theme.warning}33`, borderRadius: 6, padding: "3px 8px" }}>📡 No connection</span>
                  : <div style={{ fontSize: 12 }}><span style={{ color: theme.success }}>● {onlineCount} online</span>{offlineCount > 0 && <span style={{ color: theme.danger, marginLeft: 8 }}>● {offlineCount} offline</span>}</div>}
              </div>
            </Card>
          );
        })}
      </div>

      {modal && (
        <Modal title="Add New Client" onClose={() => setModal(false)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
            <Input label="Company Name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Acme Corp" />
            <Input label="Contact Name" value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} placeholder="John Smith" />
            <Input label="Email *" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="john@acme.com" />
            <Input label="Phone" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="555-0100" />
            <Input label="Address" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="123 Business Ave" />
            <Select label="Service Plan" value={form.plan} onChange={e => { const plan = PLANS.find(p => p.name === e.target.value); setForm(p => ({ ...p, plan: e.target.value, mrr: String(plan?.price || p.mrr) })); }} options={PLANS.map(p => ({ value: p.name, label: `${p.name} — $${p.price}/mo` }))} />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <Btn variant="ghost" onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={handleAdd}>Add Client</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function NetworkMonitor({ clients, connections, setConnections }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("all");

  const clientOptions = ["all", ...clients.map(c => ({ id: c.id, name: c.name }))];
  const filtered = connections.filter(c => {
    const client = clients.find(cl => cl.id === c.clientId);
    const matchStatus = filter === "all" || c.status === filter;
    const matchClient = selectedClientId === "all" || c.clientId === Number(selectedClientId);
    const matchSearch = client?.name.toLowerCase().includes(search.toLowerCase()) || c.ip.includes(search) || c.device.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchClient && matchSearch;
  });

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>Network Monitor</div>
          <div style={{ color: theme.textMuted, fontSize: 14 }}>Real-time connection status across all clients</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {[{ label: "All", val: "all" }, { label: "Online", val: "online" }, { label: "Offline", val: "offline" }, { label: "Suspended", val: "suspended" }].map(f => (
          <button key={f.val} onClick={() => setFilter(f.val)}
            style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${filter === f.val ? theme.accent : theme.border}`, background: filter === f.val ? theme.accentGlow : "transparent", color: theme.text, fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{f.label} ({f.val === "all" ? connections.length : connections.filter(c => c.status === f.val).length})</button>
        ))}
        <select value={selectedClientId} onChange={e => setSelectedClientId(e.target.value)}
          style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "7px 12px", color: theme.text, fontFamily: "inherit", fontSize: 12, outline: "none" }}>
          <option value="all">All Companies</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
          style={{ marginLeft: "auto", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "7px 14px", color: theme.text, fontFamily: "inherit", fontSize: 13, width: 220, outline: "none" }} />
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: theme.surfaceAlt }}>
              {["", "Company", "IP Address", "Device", "Location", "Latency", "Bandwidth", "Uptime", "Status", "Action"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.07em", color: theme.textMuted, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const client = clients.find(cl => cl.id === c.clientId);
              return (
                <tr key={c.id} style={{ borderTop: `1px solid ${theme.border}`, transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = theme.surfaceAlt}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "14px 14px" }}><StatusDot status={c.status} /></td>
                  <td style={{ padding: "14px 14px", fontWeight: 600, fontSize: 13 }}>{client?.name}</td>
                  <td style={{ padding: "14px 14px", fontFamily: "'JetBrains Mono'", fontSize: 12, color: theme.accent }}>{c.ip}</td>
                  <td style={{ padding: "14px 14px", fontSize: 12, color: theme.textMuted }}>{c.device}</td>
                  <td style={{ padding: "14px 14px", fontSize: 12 }}>{c.location}</td>
                  <td style={{ padding: "14px 14px", fontFamily: "'JetBrains Mono'", fontSize: 12, color: c.latency ? (c.latency > 20 ? theme.warning : theme.success) : theme.textMuted }}>{c.latency ? `${c.latency}ms` : "—"}</td>
                  <td style={{ padding: "14px 14px", fontSize: 12 }}>{c.bandwidth}</td>
                  <td style={{ padding: "14px 14px", fontSize: 12 }}>{c.uptime}</td>
                  <td style={{ padding: "14px 14px" }}><Badge label={c.status} /></td>
                  <td style={{ padding: "14px 14px" }}>
                    {c.status === "offline" && <Btn size="sm" onClick={() => setConnections(prev => prev.map(x => x.id === c.id ? { ...x, status: "online", latency: 14, bandwidth: "90 Mbps / 100 Mbps" } : x))}>↺ Restart</Btn>}
                    {c.status === "online" && <Btn size="sm" variant="ghost">Details</Btn>}
                    {c.status === "suspended" && <Btn size="sm" variant="ghost">Resume</Btn>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Billing({ clients, invoices, setInvoices }) {
  const [modal, setModal] = useState(false);
  const [payModal, setPayModal] = useState(null);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ clientId: "", amount: "", due: "", method: "stripe" });

  const filtered = filter === "all" ? invoices : invoices.filter(i => i.status === filter);
  const totalPaid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === "pending").reduce((s, i) => s + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === "overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><div style={{ fontSize: 24, fontWeight: 700 }}>Billing</div><div style={{ color: theme.textMuted, fontSize: 14 }}>Stripe & Square payment management</div></div>
        <Btn onClick={() => setModal(true)}>+ New Invoice</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard label="Collected" value={`$${totalPaid}`} color={theme.success} />
        <StatCard label="Pending" value={`$${totalPending}`} color={theme.warning} />
        <StatCard label="Overdue" value={`$${totalOverdue}`} color={theme.danger} />
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {["all", "pending", "paid", "overdue"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${filter === f ? theme.accent : theme.border}`, background: filter === f ? theme.accentGlow : "transparent", color: theme.text, fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{f}</button>
        ))}
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: theme.surfaceAlt }}>
              {["Invoice", "Company", "Amount", "Due Date", "Method", "Status", "Action"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.07em", color: theme.textMuted, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(inv => {
              const client = clients.find(c => c.id === inv.clientId);
              return (
                <tr key={inv.id} style={{ borderTop: `1px solid ${theme.border}`, transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = theme.surfaceAlt}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "14px 16px", fontFamily: "'JetBrains Mono'", fontSize: 12, color: theme.accent }}>{inv.id}</td>
                  <td style={{ padding: "14px 16px", fontWeight: 600, fontSize: 13 }}>{client?.name}</td>
                  <td style={{ padding: "14px 16px", fontFamily: "'JetBrains Mono'", fontWeight: 600 }}>${inv.amount}</td>
                  <td style={{ padding: "14px 16px", fontSize: 13, color: inv.status === "overdue" ? theme.danger : theme.text }}>{inv.due}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: inv.method === "stripe" ? "#635bff22" : "#00b9a922", color: inv.method === "stripe" ? "#8b83ff" : "#00b9a9", border: `1px solid ${inv.method === "stripe" ? "#635bff44" : "#00b9a944"}` }}>
                      {inv.method === "stripe" ? "⚡ Stripe" : "◼ Square"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}><Badge label={inv.status} /></td>
                  <td style={{ padding: "14px 16px" }}>
                    {inv.status !== "paid" && <Btn size="sm" onClick={() => setPayModal(inv)}>Process</Btn>}
                    {inv.status === "paid" && <span style={{ color: theme.textMuted, fontSize: 12 }}>✓ Done</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {modal && (
        <Modal title="Create Invoice" onClose={() => setModal(false)}>
          <Select label="Client" value={form.clientId} onChange={e => setForm(p => ({ ...p, clientId: Number(e.target.value) }))} options={[{ value: "", label: "Select client..." }, ...clients.map(c => ({ value: c.id, label: c.name }))]} />
          <Input label="Amount ($)" type="number" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} />
          <Input label="Due Date" type="date" value={form.due} onChange={e => setForm(p => ({ ...p, due: e.target.value }))} />
          <Select label="Payment Method" value={form.method} onChange={e => setForm(p => ({ ...p, method: e.target.value }))} options={[{ value: "stripe", label: "⚡ Stripe" }, { value: "square", label: "◼ Square" }]} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <Btn variant="ghost" onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={() => { if (form.clientId && form.amount) { setInvoices(prev => [...prev, { id: `INV-${String(prev.length + 1).padStart(3, "0")}`, clientId: form.clientId, amount: Number(form.amount), due: form.due, status: "pending", method: form.method }]); setModal(false); } }}>Create</Btn>
          </div>
        </Modal>
      )}

      {payModal && (
        <Modal title={`Process Payment — ${payModal.id}`} onClose={() => setPayModal(null)}>
          <div style={{ background: theme.bg, borderRadius: 10, padding: 16, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: theme.textMuted }}>Company</span><span style={{ fontWeight: 600 }}>{clients.find(c => c.id === payModal.clientId)?.name}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><span style={{ color: theme.textMuted }}>Amount</span><span style={{ fontWeight: 700, color: theme.accent, fontFamily: "'JetBrains Mono'" }}>${payModal.amount}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: theme.textMuted }}>Method</span><span style={{ color: payModal.method === "stripe" ? "#8b83ff" : "#00b9a9", fontWeight: 600 }}>{payModal.method === "stripe" ? "⚡ Stripe" : "◼ Square"}</span></div>
          </div>
          <div style={{ border: `1px solid ${payModal.method === "stripe" ? "#635bff44" : "#00b9a944"}`, borderRadius: 10, padding: 16, marginBottom: 16, background: payModal.method === "stripe" ? "#635bff11" : "#00b9a911" }}>
            <div style={{ color: payModal.method === "stripe" ? "#8b83ff" : "#00b9a9", fontWeight: 700, marginBottom: 10 }}>{payModal.method === "stripe" ? "⚡ Stripe" : "◼ Square"} Payment</div>
            <Input label="Card Number" placeholder={payModal.method === "stripe" ? "4242 4242 4242 4242" : "4111 1111 1111 1111"} value="" onChange={() => {}} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <Input label="Expiry" placeholder="MM/YY" value="" onChange={() => {}} />
              <Input label="CVC" placeholder="123" value="" onChange={() => {}} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="ghost" onClick={() => setPayModal(null)}>Cancel</Btn>
            <Btn onClick={() => { setInvoices(prev => prev.map(i => i.id === payModal.id ? { ...i, status: "paid" } : i)); setPayModal(null); }}>Confirm Payment</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Tickets({ clients, tickets, setTickets }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ clientId: "", subject: "", priority: "medium" });

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div><div style={{ fontSize: 24, fontWeight: 700 }}>Support Tickets</div><div style={{ color: theme.textMuted, fontSize: 14 }}>Track and resolve client issues</div></div>
        <Btn onClick={() => setModal(true)}>+ New Ticket</Btn>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {tickets.map(t => {
          const client = clients.find(c => c.id === t.clientId);
          return (
            <Card key={t.id} style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: theme.accent }}>{t.id}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{t.subject}</div>
                    <div style={{ color: theme.textMuted, fontSize: 12, marginTop: 2 }}>{client?.name} · {t.created} · {t.tech}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <Badge label={t.priority} />
                  <Badge label={t.status} type={t.status} />
                  {t.status !== "resolved" && <Btn size="sm" onClick={() => setTickets(prev => prev.map(x => x.id === t.id ? { ...x, status: "resolved" } : x))}>Resolve</Btn>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      {modal && (
        <Modal title="Create Ticket" onClose={() => setModal(false)}>
          <Select label="Client" value={form.clientId} onChange={e => setForm(p => ({ ...p, clientId: Number(e.target.value) }))} options={[{ value: "", label: "Select client..." }, ...clients.map(c => ({ value: c.id, label: c.name }))]} />
          <Input label="Subject" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="Describe the issue" />
          <Select label="Priority" value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))} options={[{ value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }, { value: "critical", label: "Critical" }]} />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <Btn variant="ghost" onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={() => { if (form.clientId && form.subject) { setTickets(prev => [...prev, { id: `TK-${String(prev.length + 1).padStart(3, "0")}`, clientId: form.clientId, subject: form.subject, priority: form.priority, status: "open", created: new Date().toISOString().split("T")[0], tech: "Unassigned" }]); setModal(false); setForm({ clientId: "", subject: "", priority: "medium" }); } }}>Submit</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Reports({ clients, connections, invoices }) {
  const mrr = clients.reduce((s, c) => s + c.mrr, 0);
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Reports</div>
      <div style={{ color: theme.textMuted, fontSize: 14, marginBottom: 24 }}>Business analytics and insights</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard label="Total MRR" value={`$${mrr}`} color={theme.success} />
        <StatCard label="ARR" value={`$${(mrr * 12).toLocaleString()}`} color={theme.accent} />
        <StatCard label="Avg/Client" value={`$${Math.round(mrr / clients.length)}`} color={theme.purple} />
        <StatCard label="Network Uptime" value="98.4%" color={theme.success} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <div style={{ fontWeight: 600, marginBottom: 16 }}>Revenue by Client</div>
          {clients.map(c => (
            <div key={c.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span>{c.name}</span><span style={{ fontFamily: "'JetBrains Mono'", color: theme.accent }}>${c.mrr}</span>
              </div>
              <div style={{ height: 6, background: theme.bg, borderRadius: 3 }}>
                <div style={{ height: "100%", width: `${(c.mrr / mrr) * 100}%`, background: theme.accent, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{ fontWeight: 600, marginBottom: 16 }}>Network Status</div>
          {[{ label: "Online", count: connections.filter(c => c.status === "online").length, color: theme.success }, { label: "Offline", count: connections.filter(c => c.status === "offline").length, color: theme.danger }, { label: "Suspended", count: connections.filter(c => c.status === "suspended").length, color: theme.textMuted }].map(s => (
            <div key={s.label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}><span style={{ color: s.color }}>{s.label}</span><span>{s.count}</span></div>
              <div style={{ height: 6, background: theme.bg, borderRadius: 3 }}>
                <div style={{ height: "100%", width: `${(s.count / connections.length) * 100}%`, background: s.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${theme.border}`, marginTop: 16, paddingTop: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Invoice Summary</div>
            {["paid", "pending", "overdue"].map(s => {
              const total = invoices.filter(i => i.status === s).reduce((a, b) => a + b.amount, 0);
              return <div key={s} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}><span style={{ textTransform: "capitalize" }}>{s}</span><span style={{ fontFamily: "'JetBrains Mono'", color: theme.accent }}>${total}</span></div>;
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}


// ── USER MANAGEMENT ────────────────────────────────────────────────────────
function UserManagement({ users, setUsers, clients }) {
  const [modal, setModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "client", clientId: "", status: "active" });
  const [errors, setErrors] = useState({});

  const filtered = users.filter(u => {
    const matchRole = filter === "all" || u.role === filter;
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const validate = () => {
    const e = {};
    if (!form.name) e.name = true;
    if (!form.email || !form.email.includes("@")) e.email = true;
    if (!editUser && !form.password) e.password = true;
    if (form.role === "client" && !form.clientId) e.clientId = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openAdd = () => {
    setForm({ name: "", email: "", password: "", role: "client", clientId: clients[0]?.id || "", status: "active" });
    setErrors({}); setEditUser(null); setModal(true);
  };

  const openEdit = (u) => {
    setForm({ name: u.name, email: u.email, password: "", role: u.role, clientId: u.clientId || "", status: u.status });
    setErrors({}); setEditUser(u); setModal(true);
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editUser) {
      setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, name: form.name, email: form.email, role: form.role, clientId: form.role === "admin" ? null : Number(form.clientId), status: form.status } : u));
    } else {
      setUsers(prev => [...prev, { id: Date.now(), name: form.name, email: form.email, role: form.role, clientId: form.role === "admin" ? null : Number(form.clientId), status: form.status, joined: new Date().toISOString().split("T")[0], lastLogin: "Never" }]);
    }
    setModal(false);
  };

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>User Management</div>
          <div style={{ color: theme.textMuted, fontSize: 14, marginTop: 2 }}>Create and manage admin and client portal accounts</div>
        </div>
        <Btn onClick={openAdd}>+ Create Account</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Users" value={users.length} color={theme.accent} />
        <StatCard label="Admins" value={users.filter(u => u.role === "admin").length} sub="Staff accounts" color={theme.purple} />
        <StatCard label="Clients" value={users.filter(u => u.role === "client").length} sub="Customer accounts" color={theme.success} />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        {["all", "admin", "client"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${filter === f ? theme.accent : theme.border}`, background: filter === f ? theme.accentGlow : "transparent", color: theme.text, fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
            {f === "all" ? "All Users" : f === "admin" ? "⚙ Admins" : "👤 Clients"}
          </button>
        ))}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
          style={{ marginLeft: "auto", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "8px 14px", color: theme.text, fontFamily: "inherit", fontSize: 13, width: 280, outline: "none" }} />
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: theme.surfaceAlt }}>
              {["User", "Email", "Role", "Linked Client", "Status", "Joined", "Last Login", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.07em", color: theme.textMuted, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => {
              const linkedClient = clients.find(c => c.id === u.clientId);
              return (
                <tr key={u.id} style={{ borderTop: `1px solid ${theme.border}`, transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = theme.surfaceAlt}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: u.role === "admin" ? `${theme.purple}33` : `${theme.accent}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: u.role === "admin" ? theme.purple : theme.accent, flexShrink: 0 }}>
                        {u.name[0].toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: theme.textMuted }}>{u.email}</td>
                  <td style={{ padding: "14px 16px" }}><RoleTag role={u.role} /></td>
                  <td style={{ padding: "14px 16px", fontSize: 12 }}>{linkedClient ? <span style={{ color: theme.accent }}>{linkedClient.name}</span> : <span style={{ color: theme.textMuted }}>—</span>}</td>
                  <td style={{ padding: "14px 16px" }}><StatusDot status={u.status} /><span style={{ fontSize: 12, textTransform: "capitalize" }}>{u.status}</span></td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: theme.textMuted }}>{u.joined}</td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: theme.textMuted }}>{u.lastLogin}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Btn size="sm" variant="ghost" onClick={() => openEdit(u)}>Edit</Btn>
                      {u.status === "active"
                        ? <Btn size="sm" variant="danger" onClick={() => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, status: "inactive" } : x))}>Disable</Btn>
                        : <Btn size="sm" variant="success" onClick={() => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, status: "active" } : x))}>Enable</Btn>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ padding: 40, textAlign: "center", color: theme.textMuted }}>No users found.</div>}
      </Card>

      {modal && (
        <Modal title={editUser ? "Edit Account" : "Create Account"} onClose={() => setModal(false)}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ color: theme.textMuted, fontSize: 11, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Account Role</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {["admin", "client"].map(r => (
                <button key={r} onClick={() => setForm(p => ({ ...p, role: r }))}
                  style={{ padding: "14px", border: `2px solid ${form.role === r ? (r === "admin" ? theme.purple : theme.accent) : theme.border}`, borderRadius: 10, background: form.role === r ? (r === "admin" ? `${theme.purple}18` : theme.accentGlow) : "transparent", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", textAlign: "left" }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{r === "admin" ? "⚙" : "👤"}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: form.role === r ? (r === "admin" ? theme.purple : theme.accent) : theme.text, textTransform: "capitalize" }}>{r}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 3 }}>
                    {r === "admin" ? "Full portal access, manage clients & billing" : "Client portal access, sees their own data only"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div style={{ gridColumn: "1/-1" }}>
              <Input label={errors.name ? "Full Name ⚠ Required" : "Full Name"} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Jane Doe" />
            </div>
            <Input label={errors.email ? "Email ⚠ Invalid" : "Email"} type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="jane@example.com" />
            <Input label={editUser ? "Password (blank = keep)" : errors.password ? "Password ⚠ Required" : "Password"} type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" />
          </div>

          {form.role === "client" && (
            <div style={{ background: theme.bg, borderRadius: 10, padding: 14, marginBottom: 14, border: `1px solid ${errors.clientId ? theme.danger : theme.border}` }}>
              <div style={{ color: theme.textMuted, fontSize: 11, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Link to Client {errors.clientId && <span style={{ color: theme.danger }}>⚠ Required</span>}
              </div>
              <select value={form.clientId} onChange={e => setForm(p => ({ ...p, clientId: e.target.value }))}
                style={{ width: "100%", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "9px 12px", color: theme.text, fontSize: 14, fontFamily: "inherit", outline: "none" }}>
                <option value="">Select a client company...</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name} — {c.plan}</option>)}
              </select>
              <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 6 }}>This user will only see their company data in the client portal.</div>
            </div>
          )}

          <Select label="Status" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} />

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
            <Btn variant="ghost" onClick={() => setModal(false)}>Cancel</Btn>
            <Btn onClick={handleSave}>{editUser ? "Save Changes" : "Create Account"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── APP SHELL ──────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", icon: "⬡", label: "Dashboard" },
  { id: "network", icon: "◈", label: "Network" },
  { id: "clients", icon: "◉", label: "Clients" },
  { id: "billing", icon: "◆", label: "Billing" },
  { id: "tickets", icon: "◫", label: "Tickets" },
  { id: "users", icon: "◍", label: "Users" },
  { id: "reports", icon: "◪", label: "Reports" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [clients, setClients] = useState(INIT_CLIENTS);
  const [users, setUsers] = useState(INIT_USERS);
  const [connections, setConnections] = useState(INIT_CONNECTIONS);
  const [invoices, setInvoices] = useState(INIT_INVOICES);
  const [tickets, setTickets] = useState(INIT_TICKETS);

  const offlineCount = connections.filter(c => c.status === "offline").length;
  const openTickets = tickets.filter(t => t.status !== "resolved").length;

  return (
    <>
      <style>{globalCSS}</style>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: theme.surface, borderRight: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "22px 18px 18px", borderBottom: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${theme.accent}, ${theme.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, animation: "glow 3s infinite" }}>⬡</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: "-0.01em" }}>Data Connections</div>
                <div style={{ color: theme.textMuted, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em" }}>Admin Portal</div>
              </div>
            </div>
          </div>
          <nav style={{ flex: 1, padding: "12px 10px" }}>
            {NAV.map(n => {
              const badge = n.id === "network" ? offlineCount : n.id === "tickets" ? openTickets : 0;
              const active = page === n.id;
              return (
                <button key={n.id} onClick={() => setPage(n.id)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", background: active ? theme.accentGlow : "transparent", color: active ? theme.accent : theme.textMuted, fontFamily: "inherit", fontSize: 14, fontWeight: active ? 600 : 400, cursor: "pointer", marginBottom: 2, transition: "all 0.15s", textAlign: "left", borderLeft: active ? `2px solid ${theme.accent}` : "2px solid transparent" }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = theme.surfaceAlt; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                  <span style={{ fontSize: 16 }}>{n.icon}</span>
                  <span style={{ flex: 1 }}>{n.label}</span>
                  {badge > 0 && <span style={{ background: theme.danger, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "1px 6px" }}>{badge}</span>}
                </button>
              );
            })}
          </nav>
          <div style={{ padding: "12px 14px 16px", borderTop: `1px solid ${theme.border}` }}>
            <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Client Portal Link</div>
            <div style={{ background: theme.bg, borderRadius: 8, padding: "8px 10px", fontSize: 11, color: theme.accent, fontFamily: "'JetBrains Mono'", wordBreak: "break-all" }}>dataconnections.app/portal</div>
          </div>
          <div style={{ padding: "12px 14px 16px", borderTop: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.purple}, ${theme.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#000" }}>A</div>
              <div><div style={{ fontSize: 13, fontWeight: 600 }}>Admin</div><div style={{ fontSize: 10, color: theme.textMuted }}>admin@dataconnections.io</div></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
          {page === "dashboard" && <Dashboard clients={clients} connections={connections} invoices={invoices} tickets={tickets} setPage={setPage} />}
          {page === "network" && <NetworkMonitor clients={clients} connections={connections} setConnections={setConnections} />}
          {page === "clients" && <Clients clients={clients} setClients={setClients} connections={connections} setConnections={setConnections} invoices={invoices} tickets={tickets} setTickets={setTickets} setInvoices={setInvoices} />}
          {page === "users" && <UserManagement users={users} setUsers={setUsers} clients={clients} />}
          {page === "billing" && <Billing clients={clients} invoices={invoices} setInvoices={setInvoices} />}
          {page === "tickets" && <Tickets clients={clients} tickets={tickets} setTickets={setTickets} />}
          {page === "reports" && <Reports clients={clients} connections={connections} invoices={invoices} />}
        </div>
      </div>
    </>
  );
}
