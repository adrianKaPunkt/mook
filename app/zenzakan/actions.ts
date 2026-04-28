"use server";

import { cookies } from "next/headers";
import { hasLocale } from "./dictionaries";

export async function setLocale(locale: string) {
  if (!hasLocale(locale)) return;
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });
}
