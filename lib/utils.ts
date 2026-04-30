import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type React from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href");
  if (!href?.startsWith("#")) return;
  e.preventDefault();
  const target = document.querySelector(href);
  if (!target) return;
  const navHeight = document.querySelector("header")?.offsetHeight ?? 0;
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navHeight, behavior: "smooth" });
}
