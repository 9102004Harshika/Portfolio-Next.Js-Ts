"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import KineticButton from "@/components/KineticButton";
import { Github, Linkedin, Twitter, ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { TextDecrypt } from "@/components/animations/TextDecrypt";
import { SectionWrapper } from "@/components/animations/SectionWrapper";

const socialLinks = [
  { icon: <Github size={24} />, href: "https://github.com/9102004Harshika", label: "GITHUB" },
  { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/harshikagawade/", label: "LINKEDIN" },
  { icon: <Twitter size={24} />, href: "mailto:harshikagawade@gmail.com", label: "EMAIL" },
];

type SubmissionStatus = "IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<SubmissionStatus>("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("CRITICAL_ERR: ALL_FIELDS_REQUIRED");
      setStatus("ERROR");
      return;
    }

    setStatus("SUBMITTING");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c7eb0995-2b42-4d3c-a059-05cd2aeb5731",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("SUCCESS");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("ERROR");
        setErrorMessage(result.message || "TRANSMISSION_FAILED_CODE_0x1");
      }
    } catch (err) {
      setStatus("ERROR");
      setErrorMessage("NETWORK_ESTABLISHMENT_FAILURE_V1.0");
    }
  };

  return (
    <SectionWrapper id="contact" className="py-20 lg:py-32 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full" suppressHydrationWarning={true}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: Headline & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <span className="font-display text-sm font-bold uppercase tracking-widest text-kinetic-accent">
                <TextDecrypt text="Available Now" delay={0.2} />
              </span>
              <h2 className="font-display text-[clamp(4.5rem,10vw,8rem)] lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] lg:leading-none italic">
                <TextDecrypt text="LET'S" delay={0.4} /> <br />
                <span className="text-kinetic-accent">
                   <TextDecrypt text="CONNECT" delay={0.6} />
                </span>
              </h2>
              <p className="font-sans text-lg lg:text-2xl text-kinetic-muted-foreground leading-tight max-w-sm mt-4">
                Have a project in mind or want to collaborate? I&apos;d love to hear from you.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-kinetic-muted">Social Channels</span>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-4 border-2 border-kinetic-border hover:bg-kinetic-accent hover:text-black transition-all duration-300 group flex-1 md:flex-none justify-center md:justify-start"
                  >
                    {link.icon}
                    <span className="font-display font-bold uppercase tracking-tighter text-sm lg:text-base">{link.label}</span>
                    <ArrowUpRight className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Massive Form */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-12"
            >
              <div className="group relative">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="NAME"
                  required
                  className="w-full h-16 lg:h-24 bg-transparent border-b-2 border-kinetic-border focus:border-kinetic-accent outline-none font-display text-2xl lg:text-5xl font-bold uppercase tracking-tighter placeholder:text-kinetic-muted transition-colors"
                />
              </div>

              <div className="group relative">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="EMAIL ADDRESS"
                  required
                  className="w-full h-16 lg:h-24 bg-transparent border-b-2 border-kinetic-border focus:border-kinetic-accent outline-none font-display text-2xl lg:text-5xl font-bold uppercase tracking-tighter placeholder:text-kinetic-muted transition-colors"
                />
              </div>

              <div className="group relative">
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="YOUR MESSAGE"
                  required
                  rows={3}
                  className="w-full bg-transparent border-b-2 border-kinetic-border focus:border-kinetic-accent outline-none font-display text-2xl lg:text-5xl font-bold uppercase tracking-tighter placeholder:text-kinetic-muted transition-colors resize-none py-4"
                />
              </div>

              <div className="flex flex-col gap-6">
                <KineticButton 
                  type="submit"
                  variant="primary" 
                  size="lg" 
                  className="w-full md:w-fit"
                  disabled={status === "SUBMITTING"}
                >
                  {status === "SUBMITTING" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={24} />
                      UPLOADING_DATA...
                    </span>
                  ) : (
                    "SEND_MESSAGE [UPLOAD_DATA]"
                  )}
                </KineticButton>

                {/* Status Indicator */}
                <div className="flex flex-col gap-2">
                  <div className="h-4 overflow-hidden relative">
                    <motion.div
                      initial={{ y: 20 }}
                      animate={{ y: status === "IDLE" ? 20 : 0 }}
                      className="absolute inset-0"
                    >
                      {status === "SUBMITTING" && (
                        <span className="font-display text-[10px] text-kinetic-muted font-bold tracking-widest animate-pulse">
                          [SYSTEM: ESTABLISHING_SECURE_CONNECTION...]
                        </span>
                      )}
                      {status === "SUCCESS" && (
                        <span className="font-display text-[10px] text-green-500 font-bold tracking-widest flex items-center gap-2">
                          <CheckCircle2 size={12} />
                          [SYSTEM: MESSAGE_TRANSMITTED_SUCCESSFULLY]
                        </span>
                      )}
                      {status === "ERROR" && (
                        <span className="font-display text-[10px] text-red-500 font-bold tracking-widest flex items-center gap-2">
                          <AlertCircle size={12} />
                          [{errorMessage}]
                        </span>
                      )}
                    </motion.div>
                  </div>
                  <span className="font-display text-[10px] text-kinetic-muted font-bold tracking-widest opacity-50">
                    [SYSTEM_STATE: {status === "IDLE" ? "ENCRYPTED_TRANSMISSION_READY" : status}]
                  </span>
                </div>
              </div>
            </motion.form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 lg:mt-32 pt-12 lg:pt-16 border-t-2 border-kinetic-border flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="font-display font-bold uppercase tracking-tighter flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className="text-3xl lg:text-4xl text-kinetic-accent leading-none">HARSHIKA</span>
            <span className="text-[10px] lg:text-sm text-kinetic-muted-foreground opacity-50 tracking-widest">
               [AUTH: © 2026 // ALL_RIGHTS_RESERVED]
            </span>
          </div>
          <div className="flex gap-8 font-display text-xs font-bold uppercase tracking-widest text-kinetic-muted-foreground">
            <a href="#landing" className="hover:text-kinetic-accent transition-colors">[GOTO: TOP]</a>
            <a href="#about" className="hover:text-kinetic-accent transition-colors">[GOTO: ABOUT]</a>
            <a href="#projects" className="hover:text-kinetic-accent transition-colors">[GOTO: WORKS]</a>
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute bottom-0 right-0 select-none pointer-events-none opacity-5">
        <span className="font-display text-[10rem] lg:text-[20rem] font-bold leading-none tracking-tighter uppercase translate-y-1/2">
          HELLO
        </span>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
