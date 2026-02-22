import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { services } from "@/lib/services-data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Services = () => (
  <Layout>
    <section className="bg-gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Our Services</h1>
        <p className="text-primary-foreground/80 max-w-xl mx-auto">
          Comprehensive homecare services delivered by certified professionals, right at your doorstep.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16 bg-secondary rounded-2xl p-10">
          <h2 className="font-serif text-2xl font-bold mb-3">Ready to Book?</h2>
          <p className="text-muted-foreground mb-6">Schedule a home visit with one of our specialists today.</p>
          <Link to="/appointment">
            <Button size="lg" className="font-semibold">
              Book Appointment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Services;
