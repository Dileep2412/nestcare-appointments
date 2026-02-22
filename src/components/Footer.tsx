import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-accent fill-accent" />
            <span className="font-serif text-xl font-bold">CareNest</span>
          </div>
          <p className="text-sm opacity-70">
            Professional homecare services delivered with compassion. Your health, our priority.
          </p>
        </div>
        <div>
          <h4 className="font-serif font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/services" className="hover:opacity-100 transition-opacity">Services</Link>
            <Link to="/doctors" className="hover:opacity-100 transition-opacity">Our Doctors</Link>
            <Link to="/appointment" className="hover:opacity-100 transition-opacity">Book Appointment</Link>
            <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link>
          </div>
        </div>
        <div>
          <h4 className="font-serif font-semibold mb-4">Services</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <span>General Checkup</span>
            <span>Physiotherapy</span>
            <span>Elderly Care</span>
            <span>Post-Surgery Care</span>
          </div>
        </div>
        <div>
          <h4 className="font-serif font-semibold mb-4">Contact Info</h4>
          <div className="flex flex-col gap-3 text-sm opacity-70">
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:opacity-100">
              <Phone className="h-4 w-4" /> +1 (234) 567-890
            </a>
            <a href="mailto:care@carenest.com" className="flex items-center gap-2 hover:opacity-100">
              <Mail className="h-4 w-4" /> care@carenest.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> 123 Health Ave, NY
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-50">
        © {new Date().getFullYear()} CareNest Homecare. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
