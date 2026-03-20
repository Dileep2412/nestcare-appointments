import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Trash2, Search, Filter, ShieldCheck, Loader2, Heart, Calendar, Users, CheckCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin");
        if (data && data.length > 0) setAuthed(true);
      }
      setChecking(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session) {
        const { data } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin");
        setAuthed(!!(data && data.length > 0));
      } else {
        setAuthed(false);
      }
    });

    checkSession();
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoginLoading(false);
    if (error) {
      toast({ variant: "destructive", title: "Login Failed", description: error.message });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
  };

  const { data: appointments, isLoading } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: authed,
  });

  const { data: doctors } = useQuery({
    queryKey: ["doctors-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("doctors").select("name");
      if (error) throw error;
      return data;
    },
    enabled: authed,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, string> }) => {
      const { error } = await supabase.from("appointments").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      toast({ title: "Updated successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("appointments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      toast({ title: "Appointment deleted" });
    },
  });

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl p-8 md:p-10 shadow-elevated w-full max-w-md border border-border/50"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-7 w-7 text-primary fill-primary" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground text-sm mt-1">CareNest Administration Panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1.5" placeholder="admin@carenest.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1.5" placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full h-11 font-semibold active:scale-[0.97] transition-transform" disabled={loginLoading}>
              {loginLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : "Sign In"}
            </Button>
          </form>
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Secure admin access only
          </div>
        </motion.div>
      </div>
    );
  }

  const filtered = appointments?.filter((a) => {
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    const matchSearch = searchTerm === "" || a.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) || a.phone.includes(searchTerm);
    return matchStatus && matchSearch;
  });

  const totalCount = appointments?.length || 0;
  const pendingCount = appointments?.filter(a => a.status === "Pending").length || 0;
  const confirmedCount = appointments?.filter(a => a.status === "Confirmed").length || 0;
  const completedCount = appointments?.filter(a => a.status === "Completed").length || 0;

  const dashStats = [
    { icon: Calendar, label: "Total", value: totalCount, color: "text-primary" },
    { icon: Loader2, label: "Pending", value: pendingCount, color: "text-amber-600" },
    { icon: Users, label: "Confirmed", value: confirmedCount, color: "text-blue-600" },
    { icon: CheckCircle, label: "Completed", value: completedCount, color: "text-emerald-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-lg bg-card/80">
        <div className="flex items-center gap-3">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          <h1 className="font-serif text-xl font-bold text-foreground">CareNest Admin</h1>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="active:scale-[0.97] transition-transform">
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {dashStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-card rounded-xl p-5 shadow-soft border border-border/40"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl shadow-soft border border-border/40 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-accent/30">
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Patient</th>
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Service</th>
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Date/Time</th>
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Status</th>
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Doctor</th>
                  <th className="text-left px-5 py-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={6} className="px-5 py-12 text-center text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></td></tr>
                ) : filtered?.length === 0 ? (
                  <tr><td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">No appointments found.</td></tr>
                ) : (
                  filtered?.map((a) => (
                    <tr key={a.id} className="border-b border-border/50 last:border-0 hover:bg-accent/20 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-medium text-foreground">{a.patient_name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.phone}</p>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{a.service}</td>
                      <td className="px-5 py-4">
                        <p className="text-foreground">{a.date}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                      </td>
                      <td className="px-5 py-4">
                        <Select
                          value={a.status}
                          onValueChange={(v) => updateMutation.mutate({ id: a.id, updates: { status: v } })}
                        >
                          <SelectTrigger className="h-8 w-28 border-0 p-0">
                            <Badge variant="outline" className={`${statusColors[a.status] || ""} font-medium`}>
                              {a.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-5 py-4">
                        <Select
                          value={a.assigned_doctor}
                          onValueChange={(v) => updateMutation.mutate({ id: a.id, updates: { assigned_doctor: v } })}
                        >
                          <SelectTrigger className="h-8 w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Not Assigned">Not Assigned</SelectItem>
                            {doctors?.map((d) => (
                              <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-5 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 active:scale-[0.95] transition-transform"
                          onClick={() => {
                            if (confirm("Delete this appointment?")) deleteMutation.mutate(a.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
