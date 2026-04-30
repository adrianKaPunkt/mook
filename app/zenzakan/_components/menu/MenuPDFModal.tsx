"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Download } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

type Props = {
  locale: "de" | "en";
  menuPdfUrl: string;
  onClose: () => void;
};

const ZOOM_STEP = 0.25;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;

const MenuPDFModal = ({ locale, menuPdfUrl, onClose }: Props) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches,
  );
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPage(1);
  }, []);

  const goNext = useCallback(() => setPage((p) => Math.min(p + 1, numPages)), [numPages]);
  const goPrev = useCallback(() => setPage((p) => Math.max(p - 1, 1)), []);
  const zoomIn = useCallback(
    () => setZoom((z) => Math.min(+(z + ZOOM_STEP).toFixed(2), ZOOM_MAX)),
    [],
  );
  const zoomOut = useCallback(
    () => setZoom((z) => Math.max(+(z - ZOOM_STEP).toFixed(2), ZOOM_MIN)),
    [],
  );
  const resetZoom = useCallback(() => setZoom(1), []);

  const handlePageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      if (e.clientX - left > width / 2) goNext();
      else goPrev();
    },
    [goNext, goPrev],
  );

  // Mobile: fit page to container width. Desktop: fit page to container height.
  // containerRef sits inside sm:p-4 padding, so contentRect already excludes it.
  const pageProps =
    containerSize.width === 0 && containerSize.height === 0
      ? {}
      : isMobile
        ? { width: Math.floor(containerSize.width * zoom) }
        : { height: Math.floor(containerSize.height * zoom) };

  return (
    <div
      className="fixed scrollbar inset-0 z-50 flex items-center justify-center bg-black/80 sm:px-4 sm:py-6"
      role="dialog"
      aria-modal="true"
      aria-label={locale === "de" ? "Speisekarte als PDF" : "Menu PDF"}
      onClick={onClose}
    >
      {/*
        Mobile:  w-full h-full  — fills the screen edge-to-edge
        Desktop: w-auto h-full  — wraps to the PDF's rendered width
      */}
      <div
        className="flex h-full w-full flex-col overflow-hidden bg-zinc-950 shadow-2xl sm:w-auto sm:max-w-[calc(100vw-2rem)] sm:border sm:border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
          <span className="font-body text-sm uppercase tracking-[0.25em] text-foreground/80">
            {locale === "de" ? "Speisekarte" : "Menu"}
            {numPages > 0 && (
              <span className="ml-3 text-foreground/40">
                {page} / {numPages}
              </span>
            )}
          </span>

          <div className="flex items-center gap-2">
            {/* Zoom controls — desktop only */}
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={zoomOut}
                disabled={zoom <= ZOOM_MIN}
                className="inline-flex size-8 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition hover:border-accent hover:text-accent disabled:opacity-30"
                aria-label={locale === "de" ? "Verkleinern" : "Zoom out"}
              >
                <ZoomOut className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={resetZoom}
                className="min-w-12 text-center text-xs text-foreground/50 transition hover:text-accent"
                aria-label={locale === "de" ? "Zoom zurücksetzen" : "Reset zoom"}
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={zoomIn}
                disabled={zoom >= ZOOM_MAX}
                className="inline-flex size-8 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition hover:border-accent hover:text-accent disabled:opacity-30"
                aria-label={locale === "de" ? "Vergrößern" : "Zoom in"}
              >
                <ZoomIn className="size-4" aria-hidden="true" />
              </button>
              <div className="mx-2 h-5 w-px bg-foreground/20" />
            </div>

            <a
              href={menuPdfUrl}
              download
              className="inline-flex size-10 items-center justify-center rounded-full border border-foreground/30 text-foreground/80 transition hover:border-accent hover:text-accent"
              aria-label={locale === "de" ? "PDF herunterladen" : "Download PDF"}
            >
              <Download className="size-5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-10 items-center justify-center rounded-full border border-foreground/30 text-foreground/80 transition hover:border-accent hover:text-accent"
              aria-label={locale === "de" ? "PDF schließen" : "Close PDF"}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* PDF canvas — ref captures content-box size (excludes padding) */}
        <div ref={containerRef} className="relative min-h-0 flex-1 overflow-auto bg-zinc-900">
          <div
            className="flex min-h-full cursor-pointer items-center justify-center sm:p-4"
            onClick={handlePageClick}
            title={
              locale === "de"
                ? "Links: vorherige Seite · Rechts: nächste Seite"
                : "Left: previous page · Right: next page"
            }
          >
            <Document
              file={menuPdfUrl}
              onLoadSuccess={onLoadSuccess}
              loading={
                <div className="flex h-64 items-center justify-center text-sm text-foreground/40">
                  {locale === "de" ? "Wird geladen…" : "Loading…"}
                </div>
              }
              error={
                <div className="flex h-64 flex-col items-center justify-center gap-4 p-8 text-center text-foreground">
                  <p className="text-sm text-foreground/60">
                    {locale === "de" ? "PDF konnte nicht geladen werden." : "Could not load PDF."}
                  </p>
                  <a
                    href={menuPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-full border border-primary bg-primary px-5 py-2 text-sm uppercase tracking-[0.2em] text-white transition hover:border-accent hover:bg-accent"
                  >
                    {locale === "de" ? "PDF öffnen" : "Open PDF"}
                  </a>
                </div>
              }
            >
              <Page
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                {...pageProps}
              />
            </Document>
          </div>

          {/* Desktop: side arrow overlays */}
          {numPages > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                disabled={page <= 1}
                className="absolute left-2 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/60 backdrop-blur transition hover:bg-black/70 hover:text-white disabled:opacity-0 sm:inline-flex"
                aria-label={locale === "de" ? "Vorherige Seite" : "Previous page"}
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                disabled={page >= numPages}
                className="absolute right-2 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/60 backdrop-blur transition hover:bg-black/70 hover:text-white disabled:opacity-0 sm:inline-flex"
                aria-label={locale === "de" ? "Nächste Seite" : "Next page"}
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {/* Mobile bottom bar */}
        <div className="flex shrink-0 items-center justify-between border-t border-border bg-zinc-950 px-4 py-2 sm:hidden">
          <button
            type="button"
            onClick={goPrev}
            disabled={page <= 1}
            className="inline-flex size-10 items-center justify-center text-foreground/60 transition hover:text-accent disabled:opacity-30"
            aria-label={locale === "de" ? "Vorherige Seite" : "Previous page"}
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={zoomOut}
              disabled={zoom <= ZOOM_MIN}
              className="inline-flex size-8 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition hover:border-accent hover:text-accent disabled:opacity-30"
              aria-label={locale === "de" ? "Verkleinern" : "Zoom out"}
            >
              <ZoomOut className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={resetZoom}
              className="min-w-12 text-center text-xs text-foreground/50 transition hover:text-accent"
              aria-label={locale === "de" ? "Zoom zurücksetzen" : "Reset zoom"}
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={zoomIn}
              disabled={zoom >= ZOOM_MAX}
              className="inline-flex size-8 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 transition hover:border-accent hover:text-accent disabled:opacity-30"
              aria-label={locale === "de" ? "Vergrößern" : "Zoom in"}
            >
              <ZoomIn className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={goNext}
              disabled={page >= numPages}
              className="inline-flex size-10 items-center justify-center text-foreground/60 transition hover:text-accent disabled:opacity-30"
              aria-label={locale === "de" ? "Nächste Seite" : "Next page"}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
            <a
              href={menuPdfUrl}
              download
              className="inline-flex size-10 items-center justify-center text-foreground/60 transition hover:text-accent"
              aria-label={locale === "de" ? "PDF herunterladen" : "Download PDF"}
            >
              <Download className="size-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPDFModal;
