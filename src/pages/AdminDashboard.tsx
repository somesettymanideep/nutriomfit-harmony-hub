import { useEffect, useState } from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { isAdminLoggedIn, setAdminLoggedIn, getBookings, getConsultationSettings } from "@/lib/adminStore";
import {
  LayoutDashboard,
  Settings,
  Calendar,
  FileText,
  LogOut,
  Menu,
  X,
  Users,
  Clock,
  IndianRupee,
  Video,
  Home,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    setAdminLoggedIn(false);
    navigate("/admin");
  };

  const bookings = getBookings();
  const settings = getConsultationSettings();
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;

  const navItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Overview" },
    { path: "/admin/dashboard/services", icon: FileText, label: "Services" },
    { path: "/admin/dashboard/service-images", icon: Users, label: "Client Images" },
    { path: "/admin/dashboard/videos", icon: Video, label: "Service Videos" },
    { path: "/admin/dashboard/home-videos", icon: Home, label: "Home Videos" },
    { path: "/admin/dashboard/schedule", icon: Calendar, label: "Schedule" },
    { path: "/admin/dashboard/schedule-two", icon: Calendar, label: "Schedule Two" },
    { path: "/admin/dashboard/settings", icon: Settings, label: "Settings" },
    { path: "/admin/dashboard/bookings", icon: Users, label: "Bookings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Show overview if at /admin/dashboard root
  const showOverview = location.pathname === "/admin/dashboard";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-card border-r border-border
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h1 className="font-display font-bold text-xl text-foreground">Admin Panel</h1>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive(item.path) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
                {item.label === "Bookings" && pendingBookings > 0 && (
                  <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                    {pendingBookings}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card flex items-center px-4 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </Button>
          <h2 className="font-display font-semibold text-lg text-foreground">
            {navItems.find(i => isActive(i.path))?.label || "Dashboard"}
          </h2>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {showOverview ? (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{pendingBookings}</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{settings.duration}</p>
                      <p className="text-sm text-muted-foreground">Duration</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IndianRupee className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{settings.fee}</p>
                      <p className="text-sm text-muted-foreground">Consultation Fee</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  to="/admin/dashboard/services"
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <FileText className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-display font-semibold text-foreground mb-1">Manage Services</h3>
                  <p className="text-sm text-muted-foreground">Add, edit, or remove services</p>
                </Link>

                <Link
                  to="/admin/dashboard/schedule"
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <Calendar className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-display font-semibold text-foreground mb-1">Schedule Calendar</h3>
                  <p className="text-sm text-muted-foreground">Manage monthly workout schedule</p>
                </Link>

                <Link
                  to="/admin/dashboard/settings"
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <Settings className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-display font-semibold text-foreground mb-1">Consultation Settings</h3>
                  <p className="text-sm text-muted-foreground">Update fee, duration, time slots</p>
                </Link>

                <Link
                  to="/admin/dashboard/bookings"
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <Users className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-display font-semibold text-foreground mb-1">View Bookings</h3>
                  <p className="text-sm text-muted-foreground">
                    {pendingBookings > 0 ? `${pendingBookings} pending bookings` : 'No pending bookings'}
                  </p>
                </Link>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
