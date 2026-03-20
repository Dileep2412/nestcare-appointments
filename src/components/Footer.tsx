import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <span className="font-serif text-xl font-bold">CareNest</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed mb-6">
            Professional homecare services delivered with compassion. Your health, our priority.
          </p>
          <div className="flex gap-3">
            <a
              href="tel:+1234567890"
              className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="mailto:care@carenest.com"
              className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif font-semibold mb-5 text-lg">Quick Links</h4>
          <div className="flex flex-col gap-3 text-sm opacity-70">
            {[
              { to: "/services", label: "Services" },
              { to: "/doctors", label: "Our Doctors" },
              { to: "/appointment", label: "Book Appointment" },
              { to: "/contact", label: "Contact Us" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:opacity-100 transition-opacity flex items-center gap-1.5 group"
              >
                <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-serif font-semibold mb-5 text-lg">Services</h4>
          <div className="flex flex-col gap-3 text-sm opacity-70">
            <span>General Checkup</span>
            <span>Physiotherapy</span>
            <span>Elderly Care</span>
            <span>Post-Surgery Care</span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif font-semibold mb-5 text-lg">Contact Info</h4>
          <div className="flex flex-col gap-4 text-sm opacity-70">
            <a href="tel:+1234567890" className="flex items-center gap-3 hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <Phone className="h-3.5 w-3.5" />
              </div>
              +1 (234) 567-890
            </a>
            <a href="mailto:care@carenest.com" className="flex items-center gap-3 hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <Mail className="h-3.5 w-3.5" />
              </div>
              care@carenest.com
            </a>
            <span className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <MapPin className="h-3.5 w-3.5" />
              </div>
              123 Health Ave, NY
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-50">
        <p>© {new Date().getFullYear()} CareNest Homecare. All rights reserved.</p>
        <p>Made with <Heart className="h-3 w-3 inline text-primary fill-primary mx-1" /> for better healthcare</p>
      </div>
    </div>
  </footer>
);

export default Footer;
