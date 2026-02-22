import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(5).max(1000),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+1 (234) 567-890", href: "tel:+1234567890" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/1234567890" },
  { icon: Mail, label: "Email", value: "care@carenest.com", href: "mailto:care@carenest.com" },
  { icon: MapPin, label: "Address", value: "123 Health Avenue, New York, NY 10001", href: undefined },
];

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      subject: data.subject || null,
      message: data.message,
    });
    setLoading(false);

    if (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to send message." });
      return;
    }
    toast({ title: "Message Sent!", description: "We'll get back to you soon." });
    form.reset();
  };

  return (
    <Layout>
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Contact Us</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Have questions? Reach out to us anytime — we're here to help.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info + Map */}
            <div>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {contactInfo.map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-xl p-5 shadow-soft"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-semibold text-sm mb-1">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-muted-foreground text-sm hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-sm">{item.value}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="rounded-xl overflow-hidden shadow-soft h-64 lg:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2!2d-73.99!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAwLjAiTiA3M8KwNTknMjQuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="CareNest Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-2xl p-8 shadow-card"
            >
              <h2 className="font-serif text-2xl font-bold mb-6">Send Us a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject (Optional)</FormLabel>
                      <FormControl><Input placeholder="How can we help?" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl><Textarea rows={5} placeholder="Your message..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" size="lg" className="w-full font-semibold" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
