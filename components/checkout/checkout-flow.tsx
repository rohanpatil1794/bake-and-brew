"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, LoaderCircle, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/format";
import {
  DELIVERY_FEE,
  FREE_DELIVERY_ABOVE,
  useCart,
  useCartTotal,
} from "@/lib/store/cart";

const deliverySlots = [
  "As soon as possible",
  "12:00 – 1:00 PM",
  "4:00 – 5:00 PM",
  "6:00 – 7:00 PM",
  "8:00 – 9:00 PM",
] as const;

const checkoutSchema = z.object({
  name: z.string().min(2, "Please tell us your name"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  address: z.string().min(10, "Please enter your full delivery address"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  slot: z.enum(deliverySlots),
  notes: z.string().max(200).optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

type PlacedOrder = {
  name: string;
  slot: string;
  total: number;
  itemCount: number;
};

export function CheckoutFlow() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const subtotal = useCartTotal();
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { slot: deliverySlots[0] },
  });

  // UI-only order placement — swaps for a real API call when the backend lands
  const onSubmit = async (data: CheckoutForm) => {
    await new Promise((r) => setTimeout(r, 900));
    setOrder({
      name: data.name,
      slot: data.slot,
      total,
      itemCount: items.reduce((n, i) => n + i.quantity, 0),
    });
    clear();
    window.scrollTo({ top: 0 });
  };

  if (order) return <OrderSuccess order={order} />;

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-sand text-primary">
          <ShoppingBag className="h-8 w-8" aria-hidden />
        </span>
        <h1 className="mt-6 text-4xl font-semibold text-espresso">
          Your cart is empty
        </h1>
        <p className="mt-3 text-muted">
          Fill it with something warm before checking out.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
          Browse the menu
        </Link>
      </div>
    );
  }

  const inputClass = (hasError: boolean) =>
    `mt-1.5 w-full rounded-xl border bg-surface px-4 py-3 text-sm text-espresso outline-none transition-colors duration-200 focus:border-primary ${
      hasError ? "border-error" : "border-border-warm"
    }`;

  return (
    <>
      <h1 className="text-center text-4xl font-semibold text-espresso sm:text-5xl">
        Check<span className="text-primary">out</span>
      </h1>
      <p className="mx-auto mt-4 mb-12 max-w-md text-center text-muted">
        Almost there — tell us where to bring it.
      </p>

      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_320px]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-espresso">
              Full name
            </label>
            <input
              id="name"
              autoComplete="name"
              {...register("name")}
              className={inputClass(!!errors.name)}
            />
            {errors.name && (
              <p role="alert" className="mt-1 text-xs font-medium text-error">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-semibold text-espresso">
              Mobile number
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98765 43210"
              {...register("phone")}
              className={inputClass(!!errors.phone)}
            />
            {errors.phone && (
              <p role="alert" className="mt-1 text-xs font-medium text-error">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="text-sm font-semibold text-espresso">
              Delivery address
            </label>
            <textarea
              id="address"
              rows={3}
              autoComplete="street-address"
              {...register("address")}
              className={inputClass(!!errors.address)}
            />
            {errors.address && (
              <p role="alert" className="mt-1 text-xs font-medium text-error">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="pincode" className="text-sm font-semibold text-espresso">
                Pincode
              </label>
              <input
                id="pincode"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="411001"
                {...register("pincode")}
                className={inputClass(!!errors.pincode)}
              />
              {errors.pincode && (
                <p role="alert" className="mt-1 text-xs font-medium text-error">
                  {errors.pincode.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="slot" className="text-sm font-semibold text-espresso">
                Delivery time
              </label>
              <select
                id="slot"
                {...register("slot")}
                className={inputClass(!!errors.slot)}
              >
                {deliverySlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="text-sm font-semibold text-espresso">
              Delivery notes <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="notes"
              placeholder="Ring the bell twice…"
              {...register("notes")}
              className={inputClass(!!errors.notes)}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-4 font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden />
                Placing your order…
              </>
            ) : (
              <>Place order · {formatPrice(total)}</>
            )}
          </button>
        </form>

        <aside className="h-fit rounded-3xl border border-border-warm bg-surface p-6 shadow-warm">
          <h2 className="text-lg font-semibold text-espresso">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-3 text-muted">
                <span className="min-w-0 truncate">
                  {item.quantity} × {item.name}
                </span>
                <span className="shrink-0 font-medium text-espresso">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1.5 border-t border-border-warm pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-muted">
              <dt>Delivery</dt>
              <dd>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</dd>
            </div>
            <div className="flex justify-between pt-1 text-base font-semibold text-espresso">
              <dt>Total</dt>
              <dd className="font-serif text-lg text-primary">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}

function OrderSuccess({ order }: { order: PlacedOrder }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center text-center">
      <svg viewBox="0 0 96 96" className="h-24 w-24" role="img" aria-label="Order placed">
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
      >
        <h1 className="mt-6 text-4xl font-semibold text-espresso">
          Order placed, {order.name.split(" ")[0]}!
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          {order.itemCount} {order.itemCount === 1 ? "item" : "items"} ·{" "}
          {formatPrice(order.total)} · {order.slot.toLowerCase()}. We&apos;ll
          call when we&apos;re at your door. Order tracking arrives with our
          backend — for now, trust the oven.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
          Back to the menu
        </Link>
      </motion.div>
    </div>
  );
}
