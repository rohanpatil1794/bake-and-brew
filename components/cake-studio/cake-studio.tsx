"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Cake,
  Check,
  Croissant,
  Layers,
  Minus,
  Plus,
  RotateCcw,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useCart, useCartDrawer } from "@/lib/store/cart";
import {
  MAX_TIERS,
  STUDIO_FLAVORS,
  STUDIO_SIZES,
  STUDIO_TOPPERS,
  studioPrice,
  studioSummary,
  useCakeStudio,
} from "@/lib/store/cake-studio";
import { CakePreview } from "@/components/cake-studio/cake-preview";

const STEPS = [
  { id: "base", label: "Size & Shape", icon: Cake },
  { id: "layers", label: "Layers & Flavours", icon: Layers },
  { id: "frosting", label: "Frosting", icon: Croissant },
  { id: "finish", label: "Finishing", icon: Sparkles },
] as const;

export function CakeStudio() {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [added, setAdded] = useState(false);

  const studio = useCakeStudio();
  const addItem = useCart((s) => s.addItem);
  const openDrawer = useCartDrawer((s) => s.openDrawer);

  const price = studioPrice(studio);
  const summary = studioSummary(studio);

  const handleAdd = () => {
    addItem({
      id: `custom-cake-${crypto.randomUUID()}`,
      name: `Custom Cake — ${summary}`,
      price,
      kind: "custom-cake",
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openDrawer();
    }, 900);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)_320px]">
      {/* Step rail */}
      <nav aria-label="Design steps" className="hidden lg:block">
        <ol className="sticky top-32 space-y-1">
          {STEPS.map((s, i) => {
            const active = i === step;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  aria-current={active ? "step" : undefined}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "bg-primary text-cream"
                      : "text-muted hover:bg-sand/70 hover:text-primary"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                      active ? "bg-cream/20" : "bg-sand"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {s.label}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Preview */}
      <div className="order-first flex min-w-0 items-start justify-center lg:order-none lg:sticky lg:top-32 lg:self-start">
        <CakePreview
          sizeIndex={studio.sizeIndex}
          shape={studio.shape}
          tiers={studio.tiers}
          frosting={studio.frosting}
          topper={studio.topper}
          message={studio.message}
        />
      </div>

      {/* Option panel */}
      <div className="min-w-0">
        {/* Mobile step tabs */}
        <div className="mb-6 flex gap-1 overflow-x-auto lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStep(i)}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                i === step
                  ? "bg-primary text-cream"
                  : "bg-sand text-muted hover:text-primary"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && <BaseStep />}
            {step === 1 && <LayersStep />}
            {step === 2 && <FrostingStep />}
            {step === 3 && <FinishStep />}
          </motion.div>
        </AnimatePresence>

        {/* Step nav */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="cursor-pointer rounded-full border border-border-warm px-5 py-2.5 text-sm font-semibold text-muted transition-colors duration-200 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
          >
            Back
          </button>
          {step < STEPS.length - 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              className="cursor-pointer rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Sticky summary / price bar */}
      <aside className="min-w-0 lg:sticky lg:top-32 lg:self-start">
        <div className="rounded-3xl border border-border-warm bg-surface p-6 shadow-warm">
          <h2 className="text-lg font-semibold text-espresso">Your creation</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{summary}</p>

          <div className="mt-5 flex items-end justify-between border-t border-border-warm pt-5">
            <span className="text-sm text-muted">Total</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={price}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                transition={{ duration: 0.2 }}
                className="font-serif text-3xl font-semibold text-primary"
              >
                {formatPrice(price)}
              </motion.span>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={added}
            className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover disabled:opacity-90"
          >
            {added ? (
              <>
                <Check className="h-5 w-5" aria-hidden /> Added to cart
              </>
            ) : (
              <>
                <ShoppingBag className="h-5 w-5" aria-hidden /> Add to cart
              </>
            )}
          </button>
          <button
            type="button"
            onClick={studio.reset}
            className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full py-2 text-xs font-semibold text-muted transition-colors duration-200 hover:text-primary"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Start over
          </button>
        </div>
      </aside>
    </div>
  );
}

function StepHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold text-espresso">{children}</h2>;
}

function Pill({
  active,
  onClick,
  children,
  label,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
        active
          ? "border-primary bg-primary text-cream"
          : "border-border-warm bg-surface text-muted hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

function BaseStep() {
  const { sizeIndex, shape, setSizeIndex, setShape } = useCakeStudio();
  return (
    <div className="space-y-7">
      <StepHeading>Start with the base</StepHeading>
      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-espresso">Size</legend>
        <div className="flex flex-wrap gap-2">
          {STUDIO_SIZES.map((s, i) => (
            <Pill key={s.label} active={i === sizeIndex} onClick={() => setSizeIndex(i)}>
              {s.label} · {s.serves}
            </Pill>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-espresso">Shape</legend>
        <div className="flex gap-2">
          {(["round", "square"] as const).map((s) => (
            <Pill key={s} active={shape === s} onClick={() => setShape(s)}>
              <span className="capitalize">{s}</span>
            </Pill>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function LayersStep() {
  const { tiers, addTier, removeTier, setTierFlavor } = useCakeStudio();
  return (
    <div className="space-y-7">
      <StepHeading>Stack your layers</StepHeading>

      <div>
        <p className="mb-2.5 text-sm font-semibold text-espresso">
          Number of layers
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => removeTier(tiers.length - 1)}
            disabled={tiers.length <= 1}
            aria-label="Remove a layer"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border-warm text-espresso transition-colors duration-200 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Minus className="h-4 w-4" aria-hidden />
          </button>
          <span className="w-8 text-center font-serif text-2xl font-semibold text-espresso">
            {tiers.length}
          </span>
          <button
            type="button"
            onClick={addTier}
            disabled={tiers.length >= MAX_TIERS}
            aria-label="Add a layer"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border-warm text-espresso transition-colors duration-200 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus className="h-4 w-4" aria-hidden />
          </button>
          <span className="text-xs text-muted">up to {MAX_TIERS} layers</span>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-semibold text-espresso">Flavour per layer</p>
        {tiers.map((flavor, i) => (
          <div key={i} className="rounded-2xl border border-border-warm bg-surface p-4">
            <p className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">
              {i === 0 ? "Bottom" : i === tiers.length - 1 ? "Top" : "Middle"} layer
            </p>
            <div className="flex flex-wrap gap-2">
              {STUDIO_FLAVORS.map((f) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setTierFlavor(i, f.name)}
                  aria-pressed={flavor === f.name}
                  className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    flavor === f.name
                      ? "border-primary bg-sand text-primary"
                      : "border-border-warm bg-surface text-muted hover:border-primary hover:text-primary"
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-border-warm"
                    style={{ backgroundColor: f.sponge }}
                    aria-hidden
                  />
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FrostingStep() {
  const { frosting, setFrosting } = useCakeStudio();
  const options = [
    {
      value: "buttercream" as const,
      title: "Buttercream",
      desc: "Soft, matte, and pipeable. The classic finish.",
      swatch: "#fdf6ec",
    },
    {
      value: "ganache" as const,
      title: "Ganache",
      desc: "Glossy dark chocolate with a dramatic drip. +₹150.",
      swatch: "#3d2314",
    },
  ];
  return (
    <div className="space-y-7">
      <StepHeading>Choose your frosting</StepHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {options.map((o) => {
          const active = frosting === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => setFrosting(o.value)}
              aria-pressed={active}
              className={`cursor-pointer rounded-2xl border p-5 text-left transition-colors duration-200 ${
                active
                  ? "border-primary bg-sand"
                  : "border-border-warm bg-surface hover:border-primary"
              }`}
            >
              <span
                className="block h-16 w-full rounded-xl border border-border-warm"
                style={{ backgroundColor: o.swatch }}
                aria-hidden
              />
              <p className="mt-3 flex items-center gap-2 font-semibold text-espresso">
                {o.title}
                {active && <Check className="h-4 w-4 text-primary" aria-hidden />}
              </p>
              <p className="mt-1 text-sm text-muted">{o.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FinishStep() {
  const { topper, setTopper, message, setMessage } = useCakeStudio();
  return (
    <div className="space-y-7">
      <StepHeading>Finishing touches</StepHeading>
      <fieldset>
        <legend className="mb-2.5 text-sm font-semibold text-espresso">
          Topper <span className="font-normal text-muted">(+₹100)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {STUDIO_TOPPERS.map((t) => (
            <Pill key={t} active={topper === t} onClick={() => setTopper(t)}>
              {t}
            </Pill>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="studio-message" className="text-sm font-semibold text-espresso">
          Message on the cake{" "}
          <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="studio-message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Happy Birthday!"
          className="mt-1.5 w-full rounded-xl border border-border-warm bg-surface px-4 py-3 text-sm text-espresso outline-none transition-colors duration-200 focus:border-primary"
        />
        <p className="mt-1 text-xs text-muted">{message.length}/24 characters</p>
      </div>
    </div>
  );
}
