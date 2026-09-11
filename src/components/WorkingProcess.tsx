import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import strategyImg from '../assets/images/hero_marketing_woman_1785151053923.jpg';
import calendarImg from '../assets/images/service_05_content_1785159289967.jpg';
import implementationImg from '../assets/images/service_04_performance_1785159268960.jpg';
import reportingImg from '../assets/images/service_02_digital_mktg_1785159228386.jpg';

interface ProcessStep {
  id: string;
  stepNum: string;
  title: string;
  description: string;
  image: string;
}

export const WorkingProcess: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<string>('01');

  const steps: ProcessStep[] = [
    {
      id: '01',
      stepNum: '(Step 01)',
      title: 'Strategy Building',
      description:
        'We analyze your business, market, and goals to craft a customized strategy that aligns with your brand\'s growth objectives.',
      image: strategyImg,
    },
    {
      id: '02',
      stepNum: '(Step 02)',
      title: 'Flow Calendar Work',
      description:
        'We create a detailed content and task calendar, scheduling every activity to ensure timely execution and seamless team coordination.',
      image: calendarImg,
    },
    {
      id: '03',
      stepNum: '(Step 03)',
      title: 'Implementation',
      description:
        'We execute the planned strategy across all channels, bringing campaigns, content, and designs to life with precision and consistency.',
      image: implementationImg,
    },
    {
      id: '04',
      stepNum: '(Step 04)',
      title: 'Weekly Reporting',
      description:
        'We track performance, analyze key metrics, and share transparent weekly reports, keeping you informed on progress and results achieved.',
      image: reportingImg,
    },
  ];

  return (
    <section id="working-process" className="w-full bg-white py-10 sm:py-20 font-canva select-none">
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Title */}
        <h2 className="text-[28px] sm:text-[46px] lg:text-[52px] font-extrabold text-[#5B6A50] text-center mb-6 sm:mb-12 tracking-tight">
          Working Process
        </h2>

        {/* Top Divider Line */}
        <div className="w-full h-[1.5px] bg-stone-300/80 mb-10 sm:mb-14" />

        {/* Desktop View: Horizontal Expanded Accordion (lg:flex) */}
        <div className="hidden lg:flex w-full h-[380px] gap-3 lg:gap-5 items-stretch justify-center">
          {steps.map((step, index) => {
            const isActive = activeStepId === step.id;

            return (
              <React.Fragment key={step.id}>
                {/* Vertical Separator Line between steps */}
                {index > 0 && (
                  <div className="w-[1.5px] bg-stone-300/70 my-2 self-stretch shrink-0" />
                )}

                <motion.div
                  layout
                  onClick={() => setActiveStepId(step.id)}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className={`relative rounded-xl cursor-pointer p-3 sm:p-4 flex overflow-hidden ${
                    isActive
                      ? 'flex-[3.8] bg-stone-50/80 border border-stone-200/80 shadow-xs'
                      : 'flex-[1] hover:bg-stone-50/40 items-center justify-center min-w-[90px]'
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isActive ? (
                      /* ACTIVE STEP CONTENT - Horizontal layout with Image */
                      <motion.div
                        key={`active-${step.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full grid grid-cols-12 gap-5 items-center h-full p-1"
                      >
                        {/* Text Content Left */}
                        <div className="col-span-7 flex flex-col justify-center pr-2">
                          <span className="text-[#5B6A50] italic font-semibold text-[15px] sm:text-[17px] tracking-tight mb-1">
                            {step.stepNum}
                          </span>
                          <h3 className="text-[#131C30] font-black text-[26px] xl:text-[32px] leading-tight mb-3 tracking-tight">
                            {step.title}
                          </h3>
                          <div className="w-12 h-[2px] bg-stone-300 mb-4" />
                          <p className="text-[#334155] font-medium text-[15px] xl:text-[16px] leading-[1.65]">
                            {step.description}
                          </p>
                        </div>

                        {/* Image Right */}
                        <div className="col-span-5 flex items-center justify-center h-full">
                          <div className="w-full h-full max-h-[310px] rounded-xl overflow-hidden border border-stone-200/60 bg-stone-100">
                            <img
                              src={step.image}
                              alt={step.title}
                              loading="lazy"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* INACTIVE STEP CONTENT - Rotated -90deg layout */
                      <motion.div
                        key={`inactive-${step.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="w-full h-full flex items-center justify-center relative overflow-hidden select-none"
                      >
                        <div className="-rotate-90 transform w-[310px] shrink-0 flex flex-col gap-2 text-left pointer-events-none">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[#5B6A50] italic font-semibold text-[14px]">
                              {step.stepNum}
                            </span>
                            <h3 className="text-[#131C30] font-extrabold text-[19px] xl:text-[21px] tracking-tight">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-[#334155] font-normal text-[13px] leading-[1.55] opacity-90 line-clamp-2">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile / Tablet View: Vertical Interactive Accordion (< lg) */}
        <div className="flex lg:hidden flex-col gap-3.5 sm:gap-4">
          {steps.map((step) => {
            const isActive = activeStepId === step.id;

            return (
              <div
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`border-2 rounded-2xl p-4 sm:p-5 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-stone-50/90 border-[#5B6A50] shadow-sm'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="text-[#5B6A50] italic font-bold text-[14px] sm:text-[16px] shrink-0">
                      {step.stepNum}
                    </span>
                    <h3 className="text-[#131C30] font-extrabold text-[17px] sm:text-[20px] tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-[#5B6A50] font-bold text-lg shrink-0">
                    {isActive ? '−' : '+'}
                  </div>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden mt-3 pt-3 border-t border-stone-200/80"
                    >
                      <p className="text-[#334155] font-medium text-[14px] sm:text-[15px] leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <div className="rounded-xl overflow-hidden max-h-[220px] bg-stone-100 border border-stone-200/60">
                        <img
                          src={step.image}
                          alt={step.title}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};


