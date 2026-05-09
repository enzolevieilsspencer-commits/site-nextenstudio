"use client";

import * as React from "react";
import { motion, type Transition } from "motion/react";

import { cn } from "@/lib/utils";
import { LiquidGlass } from "@/components/ui/liquid-glass";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  cardClassName?: string;
}) => {
  const transition: Transition = React.useMemo(
    () => ({
      duration: props.duration || 10,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    }),
    [props.duration],
  );

  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={transition}
        className="flex flex-col gap-6 pb-6"
      >
        {new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={`${index}-${i}`}
                className={cn("w-full max-w-xs", props.cardClassName)}
              >
                <div className="transition-all duration-700 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,2.2)] hover:-translate-y-1">
                  <LiquidGlass className="p-7" glow="none" blur={false}>
                    <p className="text-sm leading-6 text-foreground/80">
                      {text}
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={name}
                        className="h-10 w-10 rounded-full object-cover ring-1 ring-white/15"
                        loading="lazy"
                      />
                      <div className="flex flex-col">
                        <div className="text-sm font-medium tracking-tight leading-5 text-white">
                          {name}
                        </div>
                        <div className="text-sm leading-5 text-foreground/60 tracking-tight">
                          {role}
                        </div>
                      </div>
                    </div>
                  </LiquidGlass>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

