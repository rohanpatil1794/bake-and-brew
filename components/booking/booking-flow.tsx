"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CalendarPlus,
  Check,
  Clock,
  Gift,
  LoaderCircle,
  MapPin,
  Phone,
} from "lucide-react";
import { site } from "@/lib/site";
import { Calendar } from "@/components/booking/calendar";
import { staggerContainer, staggerItem } from "@/components/motion/reveal";

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8] as const;

const SLOT_GROUPS = [
  { label: "Lunch", slots: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM"] },
  {
    label: "Dinner",
    slots: ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"],
  },
] as const;

/** Deterministic mock availability — replaced by the reservations API later. */
function isSlotBooked(dateKey: string, slot: string): boolean {
  let hash = 0;
  for (const ch of `${dateKey}|${slot}`) {
    hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  }
  return Math.abs(hash) % 4 === 0;
}

const occasions = [
  "Just a meal",
  "Birthday",
  "Anniversary",
  "Date night",
  "Business meet",
  "Other",
] as const;

const detailsSchema = z.object({
  name: z.string().min(2, "Please tell us your name"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address"),
  occasion: z.enum(occasions),
  requests: z.string().max(300).optional(),
});

type DetailsForm = z.infer<typeof detailsSchema>;

type Booking = {
  name: string;
  partySize: number;
  dateKey: string;
  slot: string;
  occasion: string;
};

function formatDateKey(dateKey: string, style: "long" | "short" = "long"): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: style === "long" ? "long" : "short",
    day: "numeric",
    month: style === "long" ? "long" : "short",
  });
}

/** Google Calendar template URL for a 90-minute reservation. */
function calendarUrl(booking: Booking): string {
  const [y, m, d] = booking.dateKey.split("-").map(Number);
  const [time, meridiem] = booking.slot.split(" ");
  const [rawHour, minute] = time.split(":").map(Number);
  const hour = (rawHour % 12) + (meridiem === "PM" ? 12 : 0);
  const start = new Date(y, m - 1, d, hour, minute);
  const end = new Date(start.getTime() + 90 * 60 * 1000);
  const stamp = (dt: Date) =>
    `${dt.getFullYear()}${String(dt.getMonth() + 1).padStart(2, "0")}${String(
      dt.getDate(),
    ).padStart(2, "0")}T${String(dt.getHours()).padStart(2, "0")}${String(
      dt.getMinutes(),
    ).padStart(2, "0")}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Table for ${booking.partySize} at ${site.name}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    location: site.address,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function BookingFlow() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [partySize, setPartySize] = useState<number | null>(null);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);

  const dateRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    setTimeout(
      () =>
        ref.current?.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        }),
      120,
    );
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DetailsForm>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { occasion: occasions[0] },
  });

  const occasion = watch("occasion");
  const treatOccasion = occasion === "Birthday" || occasion === "Anniversary";

  const onSubmit = async (data: DetailsForm) => {
    if (!partySize || !dateKey || !slot) return;
    await new Promise((r) => setTimeout(r, 900));
    setBooking({
      name: data.name,
      partySize,
      dateKey,
      slot,
      occasion: data.occasion,
    });
    window.scrollTo({ top: 0 });
  };

  if (booking) return <BookingSuccess booking={booking} />;

  if (!mounted) return null;

  const summaryParts = [
    partySize ? `Table for ${partySize}` : null,
    dateKey ? formatDateKey(dateKey, "short") : null,
    slot,
  ].filter(Boolean);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="space-y-12">
        {/* Step 1 — party size */}
        <Step number={1} title="How many of you?" done={partySize !== null}>
          <div className="flex flex-wrap gap-2">
            {PARTY_SIZES.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setPartySize(n);
                  if (!dateKey) scrollTo(dateRef);
                }}
                aria-pressed={partySize === n}
                className={`h-12 w-12 cursor-pointer rounded-full border text-sm font-semibold transition-colors duration-200 ${
                  partySize === n
                    ? "border-primary bg-primary text-cream"
                    : "border-border-warm bg-surface text-espresso hover:border-primary hover:text-primary"
                }`}
              >
                {n}
              </button>
            ))}
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex h-12 items-center gap-2 rounded-full border border-border-warm bg-surface px-4 text-sm font-semibold text-muted transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              <Phone className="h-4 w-4" aria-hidden />
              9+? Call us
            </a>
          </div>
        </Step>

        {/* Step 2 — date */}
        <div ref={dateRef} className="scroll-mt-32">
          <Step
            number={2}
            title="Pick a date"
            done={dateKey !== null}
            locked={partySize === null}
          >
            <Calendar
              selected={dateKey}
              onSelect={(key) => {
                setDateKey(key);
                setSlot(null);
                scrollTo(timeRef);
              }}
            />
          </Step>
        </div>

        {/* Step 3 — time */}
        <div ref={timeRef} className="scroll-mt-32">
          <Step
            number={3}
            title="Pick a time"
            done={slot !== null}
            locked={dateKey === null}
          >
            {dateKey ? (
              <motion.div
                key={dateKey}
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="space-y-5"
              >
                {SLOT_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="flex items-center gap-2 text-sm font-semibold text-muted">
                      <Clock className="h-4 w-4 text-secondary" aria-hidden />
                      {group.label}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {group.slots.map((s) => {
                        const booked = isSlotBooked(dateKey, s);
                        return (
                          <motion.button
                            key={s}
                            variants={staggerItem}
                            type="button"
                            disabled={booked}
                            onClick={() => {
                              setSlot(s);
                              scrollTo(detailsRef);
                            }}
                            aria-pressed={slot === s}
                            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:line-through disabled:opacity-35 ${
                              slot === s
                                ? "border-primary bg-primary text-cream"
                                : "border-border-warm bg-surface text-espresso hover:border-primary hover:text-primary"
                            }`}
                          >
                            {s}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <p className="text-sm text-muted">Pick a date first.</p>
            )}
          </Step>
        </div>

        {/* Step 4 — details */}
        <div ref={detailsRef} className="scroll-mt-32">
          <Step number={4} title="Your details" done={false} locked={slot === null}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-lg space-y-5">
              <Field label="Full name" id="bk-name" error={errors.name?.message}>
                <input
                  id="bk-name"
                  autoComplete="name"
                  {...register("name")}
                  className={inputClass(!!errors.name)}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Mobile number" id="bk-phone" error={errors.phone?.message}>
                  <input
                    id="bk-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="98765 43210"
                    {...register("phone")}
                    className={inputClass(!!errors.phone)}
                  />
                </Field>
                <Field label="Email" id="bk-email" error={errors.email?.message}>
                  <input
                    id="bk-email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className={inputClass(!!errors.email)}
                  />
                </Field>
              </div>

              <Field label="Occasion" id="bk-occasion" error={errors.occasion?.message}>
                <select
                  id="bk-occasion"
                  {...register("occasion")}
                  className={inputClass(!!errors.occasion)}
                >
                  {occasions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>

              <AnimatePresence>
                {treatOccasion && (
                  <motion.p
                    key="treat"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 overflow-hidden rounded-xl bg-sand px-3 py-2 text-sm font-medium text-muted"
                  >
                    <Gift className="h-4 w-4 shrink-0 text-secondary" aria-hidden />
                    Lovely — we&apos;ll add a little treat on the house.
                  </motion.p>
                )}
              </AnimatePresence>

              <Field
                label="Special requests"
                id="bk-requests"
                error={errors.requests?.message}
                optional
              >
                <textarea
                  id="bk-requests"
                  rows={3}
                  placeholder="Window seat, high chair, surprise candle…"
                  {...register("requests")}
                  className={inputClass(!!errors.requests)}
                />
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-4 font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden />
                    Reserving your table…
                  </>
                ) : (
                  <>Confirm booking{summaryParts.length === 3 && ` · ${summaryParts.join(" · ")}`}</>
                )}
              </button>
            </form>
          </Step>
        </div>
      </div>

      {/* Live summary rail */}
      <aside className="hidden lg:block">
        <div className="sticky top-32 rounded-3xl border border-border-warm bg-surface p-6 shadow-warm">
          <h2 className="text-lg font-semibold text-espresso">Your table</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <SummaryLine done={partySize !== null}>
              {partySize ? `Table for ${partySize}` : "Party size"}
            </SummaryLine>
            <SummaryLine done={dateKey !== null}>
              {dateKey ? formatDateKey(dateKey) : "Date"}
            </SummaryLine>
            <SummaryLine done={slot !== null}>{slot ?? "Time"}</SummaryLine>
          </ul>
          <div className="mt-5 border-t border-border-warm pt-4 text-xs leading-relaxed text-muted">
            <p className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
              {site.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}
            </p>
            <p className="mt-2 flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden />
              {site.address}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Step({
  number,
  title,
  done,
  locked = false,
  children,
}: {
  number: number;
  title: string;
  done: boolean;
  locked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={`Step ${number}: ${title}`}
      className={`transition-opacity duration-300 ${locked ? "pointer-events-none opacity-40" : ""}`}
    >
      <h2 className="flex items-center gap-3 text-2xl font-semibold text-espresso">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full text-base transition-colors duration-300 ${
            done ? "bg-success text-cream" : "bg-primary text-cream"
          }`}
        >
          {done ? <Check className="h-5 w-5" aria-hidden /> : number}
        </span>
        {title}
      </h2>
      <div className="mt-5 pl-0 sm:pl-12">{children}</div>
    </section>
  );
}

function SummaryLine({ done, children }: { done: boolean; children: React.ReactNode }) {
  return (
    <li
      className={`flex items-center gap-2 transition-colors duration-200 ${
        done ? "font-medium text-espresso" : "text-muted/60"
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full ${
          done ? "bg-success text-cream" : "border border-border-warm"
        }`}
      >
        {done && <Check className="h-3 w-3" aria-hidden />}
      </span>
      {children}
    </li>
  );
}

function Field({
  label,
  id,
  error,
  optional = false,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-espresso">
        {label}{" "}
        {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-xs font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `mt-1.5 w-full rounded-xl border bg-surface px-4 py-3 text-sm text-espresso outline-none transition-colors duration-200 focus:border-primary ${
    hasError ? "border-error" : "border-border-warm"
  }`;
}

function BookingSuccess({ booking }: { booking: Booking }) {
  const prefersReducedMotion = useReducedMotion();
  const treat = booking.occasion === "Birthday" || booking.occasion === "Anniversary";

  return (
    <div className="flex flex-col items-center text-center">
      <svg viewBox="0 0 96 96" className="h-24 w-24" role="img" aria-label="Table booked">
        <motion.circle
          cx="48"
          cy="48"
          r="42"
          fill="none"
          stroke="#4d7c4a"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.path
          d="M30 50 l13 13 l24 -28"
          fill="none"
          stroke="#4d7c4a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <h2 className="mt-6 text-4xl font-semibold text-espresso">
          You&apos;re booked, {booking.name.split(" ")[0]}!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Table for {booking.partySize} · {formatDateKey(booking.dateKey)} ·{" "}
          {booking.slot}. We&apos;ll send a confirmation to your phone.
          {treat && " And yes — the treat is on us."}
        </p>

        <a
          href={calendarUrl(booking)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover"
        >
          <CalendarPlus className="h-5 w-5" aria-hidden />
          Add to Google Calendar
        </a>

        <div className="mt-10 rounded-3xl border border-border-warm bg-surface p-6 text-sm text-muted shadow-warm">
          <p className="flex items-center justify-center gap-2 font-semibold text-espresso">
            <MapPin className="h-4 w-4 text-secondary" aria-hidden />
            {site.address}
          </p>
          <p className="mt-2">
            {site.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
