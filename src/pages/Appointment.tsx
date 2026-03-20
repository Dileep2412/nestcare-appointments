import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, CalendarDays, Stethoscope, MapPin, CreditCard, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { services } from "@/lib/services-data";
import { Link } from "react-router-dom";

const schema = z.object({
  patient_name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone required").max(20),
  email: z.string().trim().email("Valid email required").max(255),
  service: z.string().min(1, "Select a service"),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  address: z.string().trim().min(5, "Address is required").max(500),
  google_maps_link: z.string().trim().min(5, "Google Maps location link is required").max(500),
  problem: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof schema>;

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM",
];

const pricingFeatures = [
  "No advance payment required",
  "Pay directly to the doctor after service",
  "Cash and UPI accepted",
];

const Appointment = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      patient_name: "", phone: "", email: "", service: "",
      date: "", time: "", address: "", google_maps_link: "", problem: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await supabase.from("appointments").insert({
      patient_name: data.patient_name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      date: data.date,
      time: data.time,
      address: data.address,
      google_maps_link: data.google_maps_link,
      problem: data.problem || null,
    });
    setLoading(false);

    if (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to submit. Please try again." });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center max-w-md mx-auto p-10 bg-card rounded-2xl shadow-elevated border border-border/40"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-serif text-3xl font-bold mb-4 text-foreground">Request Received!</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Your appointment request has been received. Our team will assign a doctor and contact you shortly.
            </p>
            <Link to="/">
              <Button variant="outline" className="font-medium active:scale-[0.97] transition-transform">
                Back to Home <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-gradient-hero py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-5 backdrop-blur-sm">
              Easy Booking
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-5 leading-tight">
              Book an Appointment
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg leading-relaxed">
              Fill in your details and our team will assign the best doctor for your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="relative -mt-10 z-20 mb-4">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-2xl mx-auto bg-card rounded-2xl p-8 shadow-elevated border border-border/50"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="font-serif text-xl font-semibold text-foreground">Transparent Pricing</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-primary">₹499</span>
                  <span className="text-muted-foreground text-sm">/ basic home visit</span>
                </div>
                <ul className="space-y-2">
                  {pricingFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed italic">
                  Additional charges (if any) will be informed by the assigned doctor before treatment. We believe in complete transparency.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl p-8 md:p-10 shadow-soft border border-border/40"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">Appointment Details</h2>
                <p className="text-sm text-muted-foreground">All fields marked are required</p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField control={form.control} name="patient_name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Name</FormLabel>
                      <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="service" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Service</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Choose a service" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Date</FormLabel>
                      <FormControl><Input type="date" min={new Date().toISOString().split('T')[0]} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="time" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Time</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((t) => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl><Textarea placeholder="Your full address for the home visit" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="google_maps_link" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> Share Your Google Maps Location
                    </FormLabel>
                    <FormControl><Input placeholder="Paste your Google Maps location link here" {...field} /></FormControl>
                    <p className="text-xs text-muted-foreground">
                      Open Google Maps, tap on your location, click Share, and paste the link here.
                    </p>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="problem" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problem Description (Optional)</FormLabel>
                    <FormControl><Textarea placeholder="Briefly describe your symptoms or health concern" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" size="lg" className="w-full font-semibold h-12 text-base active:scale-[0.97] transition-transform" disabled={loading}>
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                  ) : (
                    <>Submit Appointment Request <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </form>
            </Form>

            {/* Trust */}
            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Your information is secure and will only be used for appointment purposes.
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Appointment;
