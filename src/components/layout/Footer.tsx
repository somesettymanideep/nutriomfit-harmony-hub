import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import logo from "@/assets/nutriomfit-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <img
              src={logo}
              alt="NUTRIOMFIT"
              className="h-14 w-auto bg-card rounded-lg p-1"
            />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Where Science, Tradition & Wellness Meet. Transform your body,
              nourish your mind, reset your health with our holistic approach.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                aria-label="Youtube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Programs", path: "/programs" },
                { name: "Services", path: "/services" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">
              Our Programs
            </h4>
            <ul className="space-y-3">
              {[
                "Women Wellness Program",
                "90-Day Diet Program",
                "Kids Yoga",
                "LSP + Juice Fasting",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/programs"
                    className="text-primary-foreground/70 hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  +91 XXXXX XXXXX
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  hello@nutriomfit.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © {new Date().getFullYear()} NUTRIOMFIT. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/terms"
                className="text-primary-foreground/50 hover:text-primary transition-colors text-sm"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy"
                className="text-primary-foreground/50 hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/disclaimer"
                className="text-primary-foreground/50 hover:text-primary transition-colors text-sm"
              >
                Medical Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
