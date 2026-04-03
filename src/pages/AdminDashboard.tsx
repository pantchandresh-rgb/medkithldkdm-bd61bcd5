import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck, Clock, CheckCircle2, Activity,
  Search, Download, Trash2, Eye, UserCheck, RefreshCw,
  LayoutDashboard, BookOpen, BarChart3, Settings, LogOut,
  Menu, X, Heart, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BookOpen, label: "Bookings" },
  { icon: BarChart3, label: "Analytics", badge: "Soon" },
  { icon: Settings, label: "Settings", badge: "Soon" },
];

const summaryCards = [
  { label: "Total Bookings", value: 128, icon: CalendarCheck, color: "from-primary/10 to-primary/5", iconColor: "text-primary" },
  { label: "Today's Bookings", value: 12, icon: Clock, color: "from-secondary/10 to-secondary/5", iconColor: "text-secondary" },
  { label: "Active Requests", value: 7, icon: Activity, color: "from-amber-500/10 to-amber-500/5", iconColor: "text-amber-500" },
  { label: "Completed", value: 109, icon: CheckCircle2, color: "from-emerald-500/10 to-emerald-500/5", iconColor: "text-emerald-500" },
];

type BookingStatus = "Pending" | "Assigned" | "Completed";

interface Booking {
  id: number;
  name: string;
  phone: string;
  city: string;
  area: string;
  service: string;
  address: string;
  technician: string;
  dateTime: string;
  status: BookingStatus;
}

const mockBookings: Booking[] = [
  { id: 1, name: "Rajesh Kumar", phone: "9876543210", city: "Haldwani", area: "Banbhoolpura", service: "IV Drip", address: "123 Main St", technician: "Nurse Priya", dateTime: "2026-04-03 10:00", status: "Assigned" },
  { id: 2, name: "Sunita Devi", phone: "9812345678", city: "Kathgodam", area: "Station Road", service: "Blood Test", address: "45 Market Rd", technician: "—", dateTime: "2026-04-03 11:30", status: "Pending" },
  { id: 3, name: "Amit Sharma", phone: "9898765432", city: "Haldwani", area: "Mukhani", service: "ECG", address: "78 Park Ave", technician: "Tech Rahul", dateTime: "2026-04-02 09:00", status: "Completed" },
  { id: 4, name: "Meena Joshi", phone: "9911223344", city: "Haldwani", area: "Tikonia", service: "Injection", address: "12 Hill View", technician: "Nurse Anjali", dateTime: "2026-04-03 14:00", status: "Assigned" },
  { id: 5, name: "Vikram Singh", phone: "9988776655", city: "Kathgodam", area: "Ranibagh", service: "Physiotherapy", address: "90 Lake Rd", technician: "—", dateTime: "2026-04-04 08:00", status: "Pending" },
  { id: 6, name: "Pooja Rawat", phone: "9922334455", city: "Haldwani", area: "Kaladhungi Rd", service: "Nurse Visit", address: "34 Green Colony", technician: "Nurse Priya", dateTime: "2026-04-01 16:00", status: "Completed" },
];

const statusStyles: Record<BookingStatus, string> = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Assigned: "bg-primary/10 text-primary border-primary/20",
  Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [bookings, setBookings] = useState(mockBookings);

  const filtered = bookings.filter((b) => {
    const matchSearch = !searchQuery || b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.phone.includes(searchQuery);
    const matchCity = cityFilter === "all" || b.city === cityFilter;
    const matchService = serviceFilter === "all" || b.service === serviceFilter;
    return matchSearch && matchCity && matchService;
  });

  const markCompleted = (id: number) => setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: "Completed" as BookingStatus } : b));

  const exportCSV = () => {
    const headers = "Name,Phone,City,Area,Service,Address,Technician,Date,Status\n";
    const rows = filtered.map((b) => `${b.name},${b.phone},${b.city},${b.area},${b.service},"${b.address}",${b.technician},${b.dateTime},${b.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "medkit-bookings.csv";
    a.click();
  };

  const cities = [...new Set(mockBookings.map((b) => b.city))];
  const services = [...new Set(mockBookings.map((b) => b.service))];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card fixed inset-y-0 left-0 z-40">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-border">
          <Heart className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-lg text-foreground">MedKit</span>
          <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0">Admin</Badge>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.badge && <Badge variant="outline" className="ml-auto text-[10px] px-1.5 py-0">{item.badge}</Badge>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <a href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" /> Back to Website
          </a>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 inset-y-0 w-64 bg-card border-r border-border flex flex-col">
            <div className="h-16 flex items-center justify-between px-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                <span className="font-display font-bold text-foreground">MedKit</span>
              </div>
              <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  {item.badge && <Badge variant="outline" className="ml-auto text-[10px]">{item.badge}</Badge>}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-border">
              <a href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="w-4 h-4" /> Back to Website
              </a>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-lg border-b border-border flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-lg font-display font-bold text-foreground">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="gradient-primary border-0 text-primary-foreground">Admin</Badge>
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${card.color} rounded-2xl p-5 border border-border/50 shadow-card`}
              >
                <div className="flex items-center justify-between mb-3">
                  <card.icon className={`w-8 h-8 ${card.iconColor}`} />
                </div>
                <p className="text-3xl font-display font-bold text-foreground">{card.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Search, Filter & Actions */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-card rounded-2xl border border-border p-4 md:p-6 shadow-card space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Bookings
              </h2>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={exportCSV} className="gap-1.5 rounded-lg">
                  <Download className="w-4 h-4" /> Export CSV
                </Button>
                <Button size="sm" variant="outline" onClick={() => setBookings(mockBookings)} className="gap-1.5 rounded-lg text-destructive border-destructive/30 hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" /> Reset
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or phone"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 rounded-lg"
                />
              </div>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-full sm:w-40 rounded-lg"><SelectValue placeholder="City" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-full sm:w-44 rounded-lg"><SelectValue placeholder="Service" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            {filtered.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <CalendarCheck className="w-12 h-12 mx-auto text-muted-foreground/40" />
                <p className="text-muted-foreground font-medium">No bookings found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 md:-mx-6">
                <div className="min-w-[900px] px-4 md:px-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Phone</TableHead>
                        <TableHead className="font-semibold">City</TableHead>
                        <TableHead className="font-semibold">Service</TableHead>
                        <TableHead className="font-semibold">Technician</TableHead>
                        <TableHead className="font-semibold">Date & Time</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((b, i) => (
                        <TableRow key={b.id} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                          <TableCell className="font-medium text-foreground">{b.name}</TableCell>
                          <TableCell className="text-muted-foreground">{b.phone}</TableCell>
                          <TableCell className="text-muted-foreground">{b.city}</TableCell>
                          <TableCell className="text-foreground">{b.service}</TableCell>
                          <TableCell className="text-muted-foreground">{b.technician}</TableCell>
                          <TableCell className="text-muted-foreground whitespace-nowrap">{b.dateTime}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusStyles[b.status]}`}>
                              {b.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {b.status !== "Completed" && (
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-emerald-600" onClick={() => markCompleted(b.id)}>
                                  <CheckCircle2 className="w-4 h-4" />
                                </Button>
                              )}
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
