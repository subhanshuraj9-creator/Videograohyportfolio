import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Check } from 'lucide-react';
import ContactButton from './ContactButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projectType: 'Resort / Travel UGC',
  });

  const email = 'subhanshuraj9@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
      setFormData({ name: '', email: '', message: '', projectType: 'Resort / Travel UGC' });
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#121212] border border-[#2A2A2A] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl z-10 my-auto text-[#D7E2EA] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#1F1F1F] text-[#D7E2EA] hover:bg-[#2A2A2A] hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B600A8] font-semibold">
                  Bookings &amp; Collaborations
                </span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                  Let&apos;s Create Something <span className="hero-heading">Unforgettable</span>
                </h2>
                <p className="text-sm text-[#D7E2EA]/70 mt-2 font-light">
                  Direct inquiry for SUBHANSHU RAJ — Photography, Videography, Cafe &amp; Travel Reels, and AI Product Ads.
                </p>
              </div>

              {/* Direct email quick box */}
              <div className="flex items-center justify-between p-4 bg-[#181818] border border-[#282828] rounded-2xl gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-[#222222] text-[#BBCCD7]">
                    <Mail size={18} />
                  </div>
                  <span className="text-xs sm:text-sm font-mono truncate text-white">{email}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 text-xs font-medium rounded-xl bg-[#2A2A2A] hover:bg-[#333333] text-white transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : null}
                  <span>{copied ? 'Copied' : 'Copy Email'}</span>
                </button>
              </div>

              {/* Form */}
              {sent ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase">Message Sent Successfully!</h3>
                  <p className="text-sm text-[#D7E2EA]/70">
                    Thank you! Subhanshu will reach out to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1 font-medium">
                        Your Name / Brand
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex / Resort or Brand"
                        className="w-full px-4 py-3 bg-[#181818] border border-[#282828] rounded-xl text-sm text-white placeholder:text-[#555] focus:outline-none focus:border-[#B600A8] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1 font-medium">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="hello@brand.com"
                        className="w-full px-4 py-3 bg-[#181818] border border-[#282828] rounded-xl text-sm text-white placeholder:text-[#555] focus:outline-none focus:border-[#B600A8] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1 font-medium">
                      Project Scope
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#181818] border border-[#282828] rounded-xl text-sm text-white focus:outline-none focus:border-[#B600A8] transition-colors cursor-pointer"
                    >
                      <option value="Resort / Travel UGC">Resort, Hotel &amp; Travel UGC</option>
                      <option value="Cafe Reels">Cafe Reels &amp; Hospitality</option>
                      <option value="Wedding Shoot">Wedding Shoot (Photo &amp; Film)</option>
                      <option value="AI Product UGC">AI Product UGC Video &amp; Ads</option>
                      <option value="Hosted Stay">Hosted Stay Collaboration</option>
                      <option value="Custom Shoot">Custom Photography / Videography</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1 font-medium">
                      Project Details &amp; Dates
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your resort, cafe reels, wedding dates, or product UGC goals..."
                      className="w-full px-4 py-3 bg-[#181818] border border-[#282828] rounded-xl text-sm text-white placeholder:text-[#555] focus:outline-none focus:border-[#B600A8] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <ContactButton label="Send Inquiry" className="w-full sm:w-auto" />
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
