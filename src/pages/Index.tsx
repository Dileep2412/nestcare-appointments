import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Home, Star, Phone, Heart, Users, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-homecare.jpg";
import { services } from "@/lib/services-data";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const testimonials = [
  { name: "Maria Thompson", text: "CareNest provided exceptional care for my mother. The doctors were professional, punctual, and truly compassionate.", rating: 5 },
  { name: "Robert Singh", text: "After my knee surgery, the physiotherapy team visited daily. My recovery was faster than expected. Highly recommended!", rating: 5 },
  { name: "Linda Park", text: "The pediatric home visit for my newborn was so convenient. Dr. Wilson was thorough and put us at ease.", rating: 5 },
];

const whyUs = [
  { icon: Home, title: "Care at Your Doorstep", desc: "No need to travel. Our doctors come to you for a comfortable healing experience." },
  { icon: Shield, title: "Certified Professionals", desc: "All our doctors are board-certified with years of homecare experience." },
  { icon: Clock, title: "24/7 Availability", desc: "Round-the-clock support. Emergency services available anytime you need them." },
  { icon: Heart, title: "Compassionate Care", desc: "We treat every patient like family — with empathy, respect, and genuine concern." },
];

const stats = [
  { value: "500+", label: "Happy Patients" },
  { value: "50+", label: "Expert Doctors" },
  { value: "24/7", label: "Support Available" },
  { value: "4.9★", label: "Average Rating" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Caring nurse visiting patient at home" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-36">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/10"
            >
              ✦ Trusted Homecare Since 2020
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] mb-6"
            >
              Professional Healthcare, Right at Home
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-lg leading-relaxed">
              CareNest brings certified doctors, nurses, and therapists to your doorstep. Experience compassionate, personalized homecare services.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link to="/appointment">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 px-8 text-base shadow-elevated active:scale-[0.97] transition-transform">
                  Book Appointment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+1234567890">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-12 px-8 text-base active:scale-[0.97] transition-transform">
                  <Phone className="mr-2 h-4 w-4" /> Call Now
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-12 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card rounded-xl p-5 shadow-elevated text-center border border-border/50"
              >
                <p className="text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Families Trust CareNest
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              We combine medical expertise with genuine compassion to deliver healthcare that feels like family.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                variants={fadeUp}
                className="group bg-card rounded-2xl p-7 shadow-soft border border-border/40 hover:shadow-elevated hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <item.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Homecare Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tailored healthcare services designed around your comfort and convenience.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.slice(0, 4).map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                variants={fadeUp}
                className="group bg-card rounded-xl p-6 shadow-soft border border-border/40 hover:shadow-elevated hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <s.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{s.description}</p>
                <div className="flex items-center text-primary text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <Button variant="outline" size="lg" className="font-semibold h-12 px-8 active:scale-[0.97] transition-transform">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Patients Say
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real stories from real families who trust CareNest with their loved ones.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                variants={fadeUp}
                className="bg-card rounded-2xl p-8 shadow-soft border border-border/40 hover:shadow-elevated transition-shadow duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mb-6 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">{t.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">Verified Patient</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-hero rounded-2xl p-10 md:p-14 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                  Need Urgent Care?
                </h3>
                <p className="text-primary-foreground/80 max-w-md leading-relaxed">
                  Our emergency homecare team is available 24/7. Reach out now and get immediate assistance.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+1234567890">
                  <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold h-12 px-8 shadow-elevated active:scale-[0.97] transition-transform">
                    <Phone className="mr-2 h-4 w-4" /> Call Emergency
                  </Button>
                </a>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-12 px-8 active:scale-[0.97] transition-transform">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
