import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';
import { SALON_SERVICES } from '../config/salonConfig';
import { Calendar, Clock, User, Phone, CheckCircle2, MessageSquare, Download, MapPin, AlertCircle } from 'lucide-react';

export const BookAppointmentPage: React.FC = () => {
  const { config, mensPackages, womensPackages } = useSalon();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(SALON_SERVICES[0]?.title || '');
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

  const todayStr = new Date().toISOString().split('T')[0];

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name';
    }

    const cleanedPhone = phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;
    if (!cleanedPhone) {
      errs.phone = 'Mobile number is required';
    } else if (!phoneRegex.test(cleanedPhone)) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!preferredDate) {
      errs.preferredDate = 'Please select your preferred date';
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

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

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

  return (
    <>
      <SeoHead
        title="Book an Appointment | ART OF SCISSOR Unisex Salon Burari"
        description="Schedule a salon appointment at ART OF SCISSOR Unisex Salon near Rani Public School, Burari. Select your preferred date, time, and service with instant WhatsApp confirmation."
        canonicalPath="/book-appointment"
      />

      <div className="bg-[#0C0D0E] min-h-screen">
        <Breadcrumbs items={[{ label: 'Book an Appointment' }]} />

        <section className="py-12 lg:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Reserve Your Chair
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              Book an Appointment
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light">
              Submit your inquiry to generate an official salon pass and send your preferred timing
              directly to our front desk via WhatsApp.
            </p>
          </div>

          <div className="bg-[#141619] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 shadow-2xl">
            {!submittedPass ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="bg-[#1C1F26] border border-[#D4AF37]/15 rounded-lg p-3.5 text-xs text-neutral-300 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p>
                    <strong>Inquiry Notice:</strong> Submitting prepares your appointment details
                    and launches WhatsApp. Slot confirmation is finalized by our salon team.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
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
                        placeholder="Your full name"
                        className={`w-full pl-9 pr-3 py-2.5 bg-[#0C0D0E] border rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] ${
                          errors.fullName ? 'border-red-500' : 'border-white/10'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone */}
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
                        className={`w-full pl-9 pr-3 py-2.5 bg-[#0C0D0E] border rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] ${
                          errors.phone ? 'border-red-500' : 'border-white/10'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Select Service or Special Package <span className="text-[#D4AF37]">*</span>
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0C0D0E] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37]"
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
                            Men&apos;s {p.name} ({p.estimatedDuration})
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Women's Special Packages">
                      {womensPackages
                        .filter((p) => !p.isDraft)
                        .map((p) => (
                          <option key={p.id} value={`Women: ${p.name}`}>
                            Women&apos;s {p.name} ({p.estimatedDuration})
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className={`w-full pl-9 pr-3 py-2.5 bg-[#0C0D0E] border rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] ${
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
                      Preferred Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-[#0C0D0E] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37]"
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

                {/* Notes */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Styling Notes / Preferences (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific requests or sensitivities..."
                    className="w-full px-3 py-2 bg-[#0C0D0E] border border-white/10 rounded-lg text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consent-page"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 rounded bg-[#0C0D0E] border-white/20 text-[#D4AF37] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="consent-page" className="text-xs text-neutral-400 cursor-pointer">
                    I consent to sharing my inquiry details with ART OF SCISSOR via WhatsApp or phone
                    for scheduling purposes.
                  </label>
                </div>
                {errors.consent && <p className="text-[11px] text-red-400">{errors.consent}</p>}

                {/* Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-[#D4AF37] hover:bg-[#dfbe58] text-black font-semibold text-xs tracking-wide uppercase rounded-lg transition-colors flex items-center justify-center gap-2 shadow cursor-pointer active:scale-98"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Inquiry on WhatsApp</span>
                  </button>
                  <a
                    href={`tel:${config.secondaryPhoneRaw}`}
                    className="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded-lg transition-colors text-center inline-flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <span>Call Direct ({config.secondaryPhone})</span>
                  </a>
                </div>
              </form>
            ) : (
              /* Pass Display */
              <div className="space-y-6">
                <div className="p-4 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-emerald-200 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-white">Inquiry Sent via WhatsApp!</h3>
                    <p className="text-xs text-emerald-300 mt-0.5">
                      Your appointment request has been initiated. Our team will verify chair
                      availability.
                    </p>
                  </div>
                </div>

                <div className="bg-[#0C0D0E] border-2 border-dashed border-[#D4AF37]/40 rounded-xl p-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div>
                      <span className="text-[10px] tracking-wider text-[#D4AF37] uppercase font-semibold">
                        SALON APPOINTMENT PASS
                      </span>
                      <h4 className="text-lg font-serif font-bold text-white">ART OF SCISSOR</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 block">REFERENCE</span>
                      <span className="font-mono text-sm text-[#D4AF37] font-bold">
                        {submittedPass.inquiryId}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                    <div>
                      <span className="text-neutral-500 block">Client</span>
                      <span className="text-neutral-200 font-medium">{submittedPass.fullName}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Phone</span>
                      <span className="text-neutral-200 font-mono">{submittedPass.phone}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Service</span>
                      <span className="text-[#D4AF37] font-medium">
                        {submittedPass.serviceName}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Preferred Time</span>
                      <span className="text-neutral-200 font-medium">
                        {submittedPass.date} · {submittedPass.time}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-3 text-xs text-neutral-400 flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>
                      Ground Floor, Plot No. 7, St. No. 7, near Rani Public School, Burari, Delhi
                      110084
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={downloadCalendarEvent}
                    className="flex-1 py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#D4AF37]" />
                    <span>Download Calendar Event (.ics)</span>
                  </button>
                  <button
                    onClick={() => setSubmittedPass(null)}
                    className="flex-1 py-3 px-4 bg-[#D4AF37] hover:bg-[#dfbe58] text-black text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer"
                  >
                    Create New Inquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
