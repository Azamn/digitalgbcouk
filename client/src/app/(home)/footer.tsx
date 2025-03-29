import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-white">
      {/* CTA Section */}
      <div className="mx-auto my-12 max-w-7xl rounded-2xl border border-gray-700 bg-gray-800 px-8 py-16 text-center sm:p-16">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Elevate Your Digital Strategy 🚀
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400">
          Ready to take your business to the next level? Let's talk about how we
          can boost your brand’s success.
        </p>
        <div className="mt-8">
          <Button className="group relative overflow-hidden bg-blue-500 px-8 py-5 text-lg font-medium transition-all hover:bg-blue-600">
            <span className="relative z-10">Connect With Us</span>
          </Button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-dark">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-dark">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-dark">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-dark">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-dark">
                  Email Us
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold text-dark">Address</h3>
            <div className="mt-4 flex items-start space-x-3 text-gray-400">
              <MapPin className="h-6 w-6 text-blue-400" />
              <p>
                Suite 3 First Floor, Ashley House, 86-94 High St, Hounslow TW3
                1NH, United Kingdom
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-700 pt-8 sm:flex-row">
          <p className="text-gray-500">
            © 2024 Digital GB. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 sm:mt-0">
            <a href="#" className="text-dark">
              Home
            </a>
            <a href="#" className="text-dark">
              About Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
