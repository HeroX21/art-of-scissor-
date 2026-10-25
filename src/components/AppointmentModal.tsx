import React, { useState, useEffect } from 'react';
import { useSalon } from '../context/SalonContext';
import { SALON_SERVICES } from '../config/salonConfig';
import { X, Calendar, Clock, User, Phone, CheckCircle2, MessageSquare, Download, MapPin, AlertCircle } from 'lucide-react';

export const AppointmentModal: React.FC = () => {
  const {
    config,
    mensPackages,
    womensPackages,
    isAppointmentModalOpen,
    closeAppointmentModal,
    selectedPrefill
  } = useSalon();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedPass, setSubmittedPass] = useState<{
    inquiryId: string;
    fullName: string;
    phone: string;
    serviceName: string;
    date: string;
    time: string;
    notes: string;
  } | null>(null);

  // Set minimum date to today (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (selectedPrefill) {
      setSelectedService(selectedPrefill);
    } else if (!selectedService && SALON_SERVICES.length > 0) {
      setSelectedService(SALON_SERVICES[0].title);
    }
  }, [selectedPrefill]);

  if (!isAppointmentModalOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name';
    }

    // Indian phone number regex: optional +91 or 0, followed by 6, 7, 8, or 9 and 9 digits
    const cleanedPhone = phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;
    if (!cleanedPhone) {
      errs.phone = 'Mobile number is required';
    } else if (!phoneRegex.test(cleanedPhone)) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)';
    }

    if (!preferredDate) {
      errs.preferredDate = 'Please select your preferred appointment date';
    }

    if (!consent) {
      errs.consent = 'Please confirm consent to submit the inquiry';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const inquiryId = `AOS-${Math.floor(100000 + Math.random() * 900000)}`;
    const passData = {
      inquiryId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      serviceName: selectedService || 'Salon Consultation',
      date: preferredDate,
      time: preferredTime,
      notes: notes.trim()
    };

    setSubmittedPass(passData);

    // Build pre-filled WhatsApp message
    const message = `*ART OF SCISSOR — Salon Appointment Inquiry*
Reference: ${inquiryId}
Name: ${passData.fullName}
Phone: ${passData.phone}
Requested Service: ${passData.serviceName}
Preferred Date: ${passData.date}
Preferred Time: ${passData.time}
${passData.notes ? `Notes: ${passData.notes}\n` : ''}
Hello ART OF SCISSOR, I would like to book this appointment. Please confirm available timings.`;

    const cleanNumber = config.primaryPhoneRaw.replace(/\D/g, '');
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab/window
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Calendar .ics download generator
  const downloadCalendarEvent = () => {
    if (!submittedPass) return;
    const startIso = `${submittedPass.date.replace(/-/g, '')}T110000`;
    const endIso = `${submittedPass.date.replace(/-/g, '')}T120000`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ART OF SCISSOR Unisex Salon//Appointment//EN',
      'BEGIN:VEVENT',
      `UID:${submittedPass.inquiryId}@artofscissor.com`,
      `DTSTAMP:${startIso}Z`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      `SUMMARY:Salon Appointment Inquiry - ART OF SCISSOR (${submittedPass.serviceName})`,
      `DESCRIPTION:Salon inquiry for ${submittedPass.serviceName}. Reference: ${submittedPass.inquiryId}. Phone: ${config.primaryPhone}`,
      `LOCATION:${config.address.fullFormatted}`,
      'STATUS:TENTATIVE',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ART-OF-SCISSOR-Appointment-${submittedPass.inquiryId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetForm = () => {
    setSubmittedPass(null);
    setFullName('');
    setPhone('');
    setPreferredDate('');
    setNotes('');
    setErrors({});
    closeAppointmentModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
    >
      <div className="relative w-full max-w-lg bg-[#141619] border border-[#D4AF37]/30 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#181B20] border-b border-white/10">
          <div>
            <h2 id="appointment-modal-title" className="text-lg font-serif font-bold text-[#F4F4F0]">
              {submittedPass ? 'Appointment Inquiry Pass' : 'Book an Appointment'}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              ART OF SCISSOR Unisex Salon · Burari, Delhi
            </p>
          </div>
          <button
            onClick={handleResetForm}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!submittedPass ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#1C1F26] border border-[#D4AF37]/15 rounded-lg p-3 text-xs text-neutral-300 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <p>
                  Submitting will create your inquiry and launch WhatsApp with pre-filled details.
                  Slot confirmation is provided directly by our salon manager.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Full Name <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className={`w-full pl-9 pr-3 py-2 bg-[#0C0D0E] border rounded-lg text-sm text-[#F4F4F0] placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Mobile Number (WhatsApp) <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 95822 53329"
                    className={`w-full pl-9 pr-3 py-2 bg-[#0C0D0E] border rounded-lg text-sm text-[#F4F4F0] placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
              </div>

              {/* Service or Package Selection */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Service or Special Package <span className="text-[#D4AF37]">*</span>
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0C0D0E] border border-white/10 rounded-lg text-sm text-[#F4F4F0] focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <optgroup label="Individual Services">
                    {SALON_SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} ({s.approxTime})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Men's Special Packages">
                    {mensPackages
                      .filter((p) => !p.isDraft)
                      .map((p) => (
                        <option key={p.id} value={`Men: ${p.name}`}>
                          Men's {p.name} ({p.estimatedDuration})
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Women's Special Packages">
                    {womensPackages
                      .filter((p) => !p.isDraft)
                      .map((p) => (
                        <option key={p.id} value={`Women: ${p.name}`}>
                          Women's {p.name} ({p.estimatedDuration})
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Preferred Date <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                    <input
                      type="date"
                      min={todayStr}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 bg-[#0C0D0E] border rounded-lg text-sm text-[#F4F4F0] focus:outline-none focus:border-[#D4AF37] transition-colors ${
                        errors.preferredDate ? 'border-red-500' : 'border-white/10'
                      }`}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#0C0D0E] border border-white/10 rounded-lg text-sm text-[#F4F4F0] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:30 PM">01:30 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                      <option value="07:30 PM">07:30 PM</option>
                      <option value="08:30 PM">08:30 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Styling Notes / Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. skin sensitivity, specific fade length, wedding occasion"
                  className="w-full px-3 py-2 bg-[#0C0D0E] border border-white/10 rounded-lg text-sm text-[#F4F4F0] placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 rounded bg-[#0C0D0E] border-white/20 text-[#D4AF37] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="consent" className="text-xs text-neutral-400 cursor-pointer">
                  I consent to sharing my inquiry details with ART OF SCISSOR via WhatsApp or phone
                  for appointment scheduling.
                </label>
              </div>
              {errors.consent && <p className="text-[11px] text-red-400">{errors.consent}</p>}

              {/* Submit Button */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#D4AF37] hover:bg-[#dfbe58] text-black font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>

                <div className="text-center">
                  <span className="text-xs text-neutral-500">Don&apos;t use WhatsApp? </span>
                  <a
                    href={`tel:${config.secondaryPhoneRaw}`}
                    className="text-xs text-[#D4AF37] hover:underline font-mono"
                  >
                    Call Secondary Line: {config.secondaryPhone}
                  </a>
                </div>
              </div>
            </form>
          ) : (
            /* Booking Voucher / Pass View */
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 p-4 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-emerald-200">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-white">Inquiry Sent via WhatsApp!</h3>
                  <p className="text-xs text-emerald-300/90 mt-0.5">
                    Your appointment request has been generated. Please keep this pass for your reference.
                  </p>
                </div>
              </div>

              {/* Physical Pass Card */}
              <div className="bg-[#0C0D0E] border-2 border-dashed border-[#D4AF37]/40 rounded-xl p-5 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] tracking-wider text-[#D4AF37] uppercase font-semibold">
                      SALON APPOINTMENT PASS
                    </span>
                    <h4 className="text-base font-serif font-bold text-white">ART OF SCISSOR</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 block">REFERENCE ID</span>
                    <span className="font-mono text-xs text-[#D4AF37] font-bold">
                      {submittedPass.inquiryId}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div>
                    <span className="text-neutral-500 block">Client</span>
                    <span className="text-neutral-200 font-medium">{submittedPass.fullName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Contact</span>
                    <span className="text-neutral-200 font-mono">{submittedPass.phone}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Requested Service</span>
                    <span className="text-[#D4AF37] font-medium">{submittedPass.serviceName}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Target Slot</span>
                    <span className="text-neutral-200 font-medium">
                      {submittedPass.date} · {submittedPass.time}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 text-[11px] text-neutral-400">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Near Rani Public School, West Sant Nagar, Burari, Delhi 110084</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={downloadCalendarEvent}
                  className="flex-1 py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Save to Calendar (.ics)</span>
                </button>

                <button
                  onClick={handleResetForm}
                  className="flex-1 py-2.5 px-3 bg-[#D4AF37] hover:bg-[#dfbe58] text-black text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer"
                >
                  Done / Close Pass
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
