"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Check,
  ImagePlus,
  Move,
  RefreshCw,
  ShoppingBag,
  TriangleAlert,
} from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/store/cart";

const MIN_RESOLUTION = 1000;
const PHOTO_PRINT_SURCHARGE = 200;

const sizes = [
  { label: '6" · serves 6–8', price: 899 },
  { label: '8" · serves 12–16', price: 1499 },
  { label: '10" · serves 20–24', price: 2199 },
] as const;

const flavors = ["Vanilla", "Chocolate", "Red Velvet", "Butterscotch"] as const;

const borders = [
  { name: "Chocolate", value: "#92400e" },
  { name: "Cream", value: "#f0e2ce" },
  { name: "Rose", value: "#e8b4b8" },
] as const;

type Shape = "round" | "rectangle";

type Photo = {
  src: string;
  lowRes: boolean;
};

export function PhotoCakeDesigner() {
  const prefersReducedMotion = useReducedMotion();
  const addItem = useCart((s) => s.addItem);

  const [photo, setPhoto] = useState<Photo | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const [shape, setShape] = useState<Shape>("round");
  const [sizeIndex, setSizeIndex] = useState(1);
  const [flavor, setFlavor] = useState<(typeof flavors)[number]>("Vanilla");
  const [border, setBorder] = useState<(typeof borders)[number]>(borders[0]);
  const [zoom, setZoom] = useState(1.15);
  const [message, setMessage] = useState("");
  const [added, setAdded] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const price = sizes[sizeIndex].price + PHOTO_PRINT_SURCHARGE;

  const loadFile = useCallback((file: File) => {
    setFileError(null);
    if (!file.type.startsWith("image/")) {
      setFileError("That doesn't look like an image — try a JPG or PNG.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileError("That image is over 10 MB — please use a smaller file.");
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      const img = new Image();
      img.onload = () => {
        // Brief pause so the progress bar reads as a real upload
        setTimeout(() => {
          setPhoto({
            src,
            lowRes:
              Math.min(img.naturalWidth, img.naturalHeight) < MIN_RESOLUTION,
          });
          setUploading(false);
        }, 700);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleAdd = () => {
    addItem({
      id: `photo-cake-${crypto.randomUUID()}`,
      name: `Photo Print Cake (${shape}, ${sizes[sizeIndex].label.split(" ")[0]}, ${flavor})`,
      price,
      kind: "photo-cake",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2">
      {/* Preview stage */}
      <div className="lg:sticky lg:top-32">
        <AnimatePresence mode="wait">
          {!photo ? (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
            >
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files[0];
                  if (file) loadFile(file);
                }}
                className={`flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed p-8 text-center transition-[border-color,background-color,transform] duration-200 ${
                  dragOver
                    ? "scale-[1.02] border-caramel bg-caramel/10"
                    : "border-border-warm bg-sand/50 hover:border-caramel"
                }`}
              >
                {uploading ? (
                  <>
                    <p className="font-serif text-xl font-semibold text-espresso">
                      Reading your photo…
                    </p>
                    <div className="h-2 w-48 overflow-hidden rounded-full bg-sand">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        style={{ originX: 0 }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-surface text-primary shadow-warm">
                      <ImagePlus className="h-8 w-8" aria-hidden />
                    </span>
                    <p className="font-serif text-xl font-semibold text-espresso">
                      Drop your photo here
                    </p>
                    <p className="max-w-xs text-sm text-muted">
                      or click to browse. JPG or PNG, at least 1000×1000px for a
                      crisp print, max 10 MB.
                    </p>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                aria-label="Upload cake photo"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) loadFile(file);
                }}
              />
              {fileError && (
                <p
                  role="alert"
                  className="mt-3 flex items-center gap-2 text-sm font-medium text-error"
                >
                  <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden />
                  {fileError}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Cake board */}
              <div className="relative flex aspect-square w-full items-center justify-center rounded-3xl bg-sand/50 p-8">
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className={`relative overflow-hidden shadow-warm-lg ${
                    shape === "round"
                      ? "aspect-square w-4/5 rounded-full"
                      : "aspect-[4/3] w-11/12 rounded-3xl"
                  }`}
                  style={{ border: `14px solid ${border.value}` }}
                >
                  <motion.img
                    src={photo.src}
                    alt="Your photo positioned on the cake"
                    drag
                    dragConstraints={{ left: -90, right: 90, top: -90, bottom: 90 }}
                    dragElastic={0.15}
                    className="h-full w-full cursor-grab object-cover active:cursor-grabbing"
                    style={{ scale: zoom }}
                    draggable={false}
                  />
                  {/* frosting sheen so the photo reads as printed, not pasted */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 30% 25%, rgba(255,251,245,0.28), transparent 55%)",
                    }}
                  />
                  {message && (
                    <p
                      className="pointer-events-none absolute right-0 bottom-4 left-0 text-center text-3xl text-cream"
                      style={{
                        fontFamily: "var(--font-script)",
                        textShadow: "0 2px 8px rgba(61,35,20,0.65)",
                      }}
                    >
                      {message}
                    </p>
                  )}
                </motion.div>
              </div>

              <p className="mt-3 flex items-center gap-2 text-xs text-muted">
                <Move className="h-4 w-4" aria-hidden />
                Drag the photo to reposition · use the zoom slider below
              </p>

              {photo.lowRes && (
                <p
                  role="alert"
                  className="mt-3 flex items-center gap-2 rounded-xl bg-error/10 px-3 py-2 text-sm font-medium text-error"
                >
                  <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden />
                  This photo may print blurry — we recommend at least
                  1000×1000px.
                </p>
              )}

              <div className="mt-4 flex w-full max-w-sm items-center gap-4">
                <label htmlFor="zoom" className="text-sm font-semibold text-espresso">
                  Zoom
                </label>
                <input
                  id="zoom"
                  type="range"
                  min="1"
                  max="2"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 accent-[#92400e]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhoto(null);
                    setZoom(1.15);
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border-warm px-3 py-1.5 text-xs font-semibold text-muted transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden />
                  Change photo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Options panel */}
      <div className="space-y-7">
        <OptionGroup label="Shape">
          <div className="flex gap-2">
            {(["round", "rectangle"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setShape(s)}
                aria-pressed={shape === s}
                className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium capitalize transition-colors duration-200 ${
                  shape === s
                    ? "border-primary bg-primary text-cream"
                    : "border-border-warm bg-surface text-muted hover:border-primary hover:text-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </OptionGroup>

        <OptionGroup label="Size">
          <div className="flex flex-wrap gap-2">
            {sizes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setSizeIndex(i)}
                aria-pressed={i === sizeIndex}
                className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  i === sizeIndex
                    ? "border-primary bg-primary text-cream"
                    : "border-border-warm bg-surface text-muted hover:border-primary hover:text-primary"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </OptionGroup>

        <OptionGroup label="Flavour">
          <div className="flex flex-wrap gap-2">
            {flavors.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFlavor(f)}
                aria-pressed={flavor === f}
                className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  flavor === f
                    ? "border-primary bg-primary text-cream"
                    : "border-border-warm bg-surface text-muted hover:border-primary hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </OptionGroup>

        <OptionGroup label="Frosting border">
          <div className="flex gap-3">
            {borders.map((b) => (
              <button
                key={b.name}
                type="button"
                onClick={() => setBorder(b)}
                aria-pressed={border.name === b.name}
                aria-label={`${b.name} border`}
                className={`h-11 w-11 cursor-pointer rounded-full border-4 transition-transform duration-200 hover:scale-105 ${
                  border.name === b.name ? "border-primary" : "border-border-warm"
                }`}
                style={{ backgroundColor: b.value }}
              />
            ))}
          </div>
        </OptionGroup>

        <OptionGroup label="Message on the cake" optional>
          <input
            type="text"
            maxLength={30}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Happy Birthday, Meera!"
            aria-label="Message on the cake"
            className="w-full rounded-xl border border-border-warm bg-surface px-4 py-3 text-sm text-espresso outline-none transition-colors duration-200 focus:border-primary"
          />
          <p className="mt-1 text-xs text-muted">{message.length}/30 characters</p>
        </OptionGroup>

        <div className="rounded-3xl border border-border-warm bg-surface p-6 shadow-warm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">
                {sizes[sizeIndex].label} · {flavor} · incl. photo print
              </p>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={price}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                  transition={{ duration: 0.2 }}
                  className="font-serif text-3xl font-semibold text-primary"
                >
                  {formatPrice(price)}
                </motion.p>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!photo || added}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-cream transition-colors duration-200 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" aria-hidden /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" aria-hidden /> Add to cart
                </>
              )}
            </button>
          </div>
          {!photo && (
            <p className="mt-3 text-xs font-medium text-secondary">
              Upload a photo to finish your cake.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function OptionGroup({
  label,
  optional = false,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-2.5 text-sm font-semibold text-espresso">
        {label}{" "}
        {optional && <span className="font-normal text-muted">(optional)</span>}
      </legend>
      {children}
    </fieldset>
  );
}
