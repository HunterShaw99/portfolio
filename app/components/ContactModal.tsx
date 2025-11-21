import React, { useState, useEffect } from 'react';
import {
  XMarkIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOffice2Icon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/solid';
import {submitContactForm} from "@/app/actions/contact-form";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setServerError(null);
      setFieldErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    try {
      const result = await submitContactForm(rawData as never);


      if (result.success) {
        setIsSuccess(true);
      } else {
        setServerError(result.message);
        if (result.errors) {
          setFieldErrors(result.errors);
        }
      }
    } catch (err) {
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="card text-center group w-full sm:flex-1 sm:max-w-xs mx-auto h-36 flex flex-col justify-center items-center cursor-pointer"
      >
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform text-white">
          <EnvelopeIcon className="w-10 h-10" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-center px-2">
          Send me a message
        </p>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="relative z-50 text-left">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-0 m-auto z-50 w-full max-w-2xl h-fit max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900/95 shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-700 via-zinc-800 to-gray-700" />

            <div className="relative p-6 md:p-8">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors rounded-full hover:bg-zinc-800 focus:outline-none focus:ring-2"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white tracking-tight">Connect With Me</h2>
                <p className="text-zinc-400 mt-2 text-sm">
                  Fill out the form below and I&#39;ll get back to you within 24 hours.
                </p>
              </div>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in slide-in-from-bottom-2 fade-in duration-300">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-500">
                    <CheckCircleIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-zinc-400 max-w-xs mx-auto mb-8">
                    I have received your message and will be in touch shortly via email.
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm font-medium focus:outline-none focus:ring-2"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {serverError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                      {serverError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="First Name"
                      name="firstName"
                      icon={<UserIcon className="w-4 h-4" />}
                      placeholder="Jane"
                      error={fieldErrors.firstName}
                    />
                    <InputField
                      label="Last Name"
                      name="lastName"
                      placeholder="Doe"
                      error={fieldErrors.lastName}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      icon={<EnvelopeIcon className="w-4 h-4" />}
                      placeholder="jane@example.com"
                      error={fieldErrors.email}
                    />
                    <InputField
                      label="Phone"
                      name="phone"
                      type="tel"
                      icon={<PhoneIcon className="w-4 h-4" />}
                      placeholder="+1 (555) 000-0000"
                      error={fieldErrors.phone}
                    />
                  </div>

                  <InputField
                    label="Company (Optional)"
                    name="company"
                    icon={<BuildingOffice2Icon className="w-4 h-4" />}
                    placeholder="Acme Inc."
                    error={fieldErrors.company}
                  />

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                      <ChatBubbleBottomCenterTextIcon className="w-3.5 h-3.5" />
                      Opportunity Details
                    </label>
                    <textarea
                      name="comments"
                      rows={4}
                      className={`w-full bg-zinc-950/50 border ${fieldErrors.comments ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-indigo-500'} rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none`}
                      placeholder="Tell me about yourself and any opportunities you might have..."
                    />
                    {fieldErrors.comments && (
                      <p className="text-red-400 text-xs mt-1">{fieldErrors.comments[0]}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-600 disabled:cursor-not-allowed px-6 py-4 rounded-xl font-semibold transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    >
                      {isSubmitting ? (
                        <>
                          <ArrowPathIcon className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <PaperAirplaneIcon className="w-5 h-5 -rotate-45 mb-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string[];
}

function InputField({ label, icon, error, ...props }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="relative group">
        <input
          {...props}
          className={`w-full bg-zinc-950/50 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-zinc-800 focus:border-indigo-500'} rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all`}
        />
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1">{error[0]}</p>
      )}
    </div>
  );
}