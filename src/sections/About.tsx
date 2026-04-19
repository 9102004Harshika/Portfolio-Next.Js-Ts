"use client";

import { motion } from "framer-motion";
import KineticCard from "@/components/KineticCard";
import { SectionWrapper } from "@/components/animations/SectionWrapper";
import { TextDecrypt } from "@/components/animations/TextDecrypt";

const About: React.FC = () => {
  const stats = [
    { value: "3+", label: "YEARS EXPERIENCE", number: "01" },
    { value: "20+", label: "PROJECTS BUILT", number: "02" },
    { value: "10+", label: "TECHNOLOGIES", number: "03" },
  ];

  return (
    <SectionWrapper id="about" className="py-20 lg:py-32 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full" suppressHydrationWarning={true}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Story */}
          <div className="lg:col-span-7 flex flex-col gap-12 relative">
            <div className="flex flex-col gap-6">
              <span className="font-display text-sm font-bold uppercase tracking-widest text-kinetic-accent">
                <TextDecrypt text="About Me" delay={0.2} />
              </span>
              <h2 className="font-display text-[clamp(2.5rem,8vw,5rem)] lg:text-7xl font-bold uppercase tracking-tighter leading-[0.9] lg:leading-none">
                <TextDecrypt text="Building software that" delay={0.4} /> <br />
                <span className="text-kinetic-accent">
                  <TextDecrypt text="makes a difference." delay={0.6} />
                </span>
              </h2>

              <div className="flex flex-col gap-6 max-w-2xl font-sans text-xl md:text-2xl text-kinetic-muted-foreground leading-tight">
                <p>
                  I&apos;m a passionate full-stack developer with a deep love for
                  crafting elegant solutions to complex problems. My journey in tech
                  evolved into a mission to build products that are technically excellent and delightful to use.
                </p>
                <p>
                  With experience spanning frontend frameworks, backend systems, and
                  cloud infrastructure, I bring a holistic approach to every project, focused on clean architecture and relentless attention to detail.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Brutalist Code Card */}
          <div className="lg:col-span-5 relative">
            <KineticCard
              title="System Info"
              className="min-h-[500px] border-kinetic-accent/50"
            >
              <div className="font-display text-sm md:text-base leading-relaxed overflow-x-auto whitespace-pre-wrap">
                <span className="text-kinetic-accent font-bold">const</span> <span className="text-kinetic-fg">harshika</span> = &#123;
                <br />
                &nbsp;&nbsp;<span className="text-kinetic-muted-foreground">role</span>: <span className="text-kinetic-accent">&quot;Full-Stack Developer&quot;</span>,
                <br />
                &nbsp;&nbsp;<span className="text-kinetic-muted-foreground">passion</span>: <span className="text-kinetic-accent">&quot;Creative Tech&quot;</span>,
                <br />
                &nbsp;&nbsp;<span className="text-kinetic-muted-foreground">focus</span>: [
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-kinetic-accent">&quot;Clean Architecture&quot;</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-kinetic-accent">&quot;User Experience&quot;</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-kinetic-accent">&quot;Performance&quot;</span>
                <br />
                &nbsp;&nbsp;],
                <br />
                &nbsp;&nbsp;<span className="text-kinetic-muted-foreground">motto</span>: <span className="text-kinetic-accent">&quot;Build it right.&quot;</span>
                <br />
                &#125;;
              </div>
            </KineticCard>

            {/* Background Massive Number */}
            <div className="absolute -top-6 -right-6 lg:-top-12 lg:-right-12 select-none pointer-events-none opacity-5">
              <span className="font-display text-[8rem] lg:text-[15rem] font-bold leading-none">
                ME
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid - Centered & Balanced */}
        <div className="mt-32 lg:mt-64 w-full flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl" suppressHydrationWarning>
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex flex-col items-center text-center gap-4 py-12 px-6 lg:py-[40px] lg:px-12 border-2 border-kinetic-border hover:border-kinetic-accent hover:bg-kinetic-accent hover:text-black transition-all duration-500 group relative overflow-hidden"
                suppressHydrationWarning={true}
              >
                <div className="font-display text-5xl lg:text-7xl font-bold group-hover:scale-110 transition-transform duration-500 relative z-10 leading-none" suppressHydrationWarning={true}>
                  {stat.value}
                </div>
                <div className="font-display text-xs lg:text-lg font-bold uppercase tracking-[0.2em] relative z-10 transition-colors duration-500 group-hover:text-black">
                  {stat.label}
                </div>
                {/* Decorative background number */}
                <span className="absolute -bottom-6 -right-6 font-display text-[6rem] lg:text-[8rem] font-bold opacity-[0.03] group-hover:opacity-10 transition-opacity group-hover:text-black">
                  {stat.number}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
