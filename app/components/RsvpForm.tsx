"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

type GuestEntry = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  notes: string;
};

// Fields used by the guest form.
const fields = [
  {
    label: "First name",
    name: "firstName",
    placeholder: "Enter first name",
    icon: "user",
    type: "text",
  },
  {
    label: "Last name",
    name: "lastName",
    placeholder: "Enter last name",
    icon: "user",
    type: "text",
  },
  {
    label: "Contact number",
    name: "contactNumber",
    placeholder: "Enter contact number",
    icon: "phone",
    type: "tel",
  },
];

function FieldIcon({ type }: { type: string }) {
  if (type === "phone") {
    return (
      <svg
        aria-hidden="true"
        className="h-5 w-5 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.75 5.75c0-1.1.9-2 2-2h1.82c.86 0 1.62.55 1.9 1.36l.73 2.14a2 2 0 0 1-.45 2.02l-.9.9a11.25 11.25 0 0 0 5.98 5.98l.9-.9a2 2 0 0 1 2.02-.45l2.14.73c.81.28 1.36 1.04 1.36 1.9v1.82c0 1.1-.9 2-2 2h-.75C9.35 21.25 2.75 14.65 2.75 6.5v-.75Z"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-slate-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 7.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM5.25 20.25a6.75 6.75 0 0 1 13.5 0"
      />
    </svg>
  );
}

function getInitials(entry: GuestEntry) {
  return `${entry.firstName.charAt(0)}${entry.lastName.charAt(0)}`.toUpperCase();
}

export default function RsvpForm() {
  const [entries, setEntries] = useState<GuestEntry[]>([]);

  // Add the form values to the local guest list.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const entry = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      contactNumber: String(formData.get("contactNumber") ?? "").trim(),
      notes: String(formData.get("notes") ?? "").trim(),
    };
    const nextEntries = [...entries, entry];

    setEntries(nextEntries);
    event.currentTarget.reset();
  }

  async function handleConfirmGuests() {
    if (entries.length === 0) {
      return;
    }

    // Convert the local state names to the Supabase column names.
    const guests = entries.map((entry) => ({
      first_name: entry.firstName,
      last_name: entry.lastName,
      contact_number: entry.contactNumber,
      notes: entry.notes,
    }));

    const { error } = await supabase.from("guests").insert(guests);

    if (error) {
      console.error(error);
      return;
    }

    setEntries([]);
  }

  // Remove every guest from the local list.
  function handleClearList() {
    setEntries([]);
  }

  // Remove only the clicked guest row.
  function handleRemoveEntry(indexToRemove: number) {
    setEntries(entries.filter((_, index) => index !== indexToRemove));
  }

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-3 text-slate-950">
      <section className="mx-auto w-full max-w-[446px]">
        <header className="mb-3 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 8.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4.5 19.25a6 6 0 0 1 11.5-2.39M18 7.75v5M20.5 10.25h-5M17.25 15.25a4.5 4.5 0 0 1 4.5 4.5"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-[25px] font-bold leading-tight tracking-normal">
              RSVP Form
            </h1>
            <p className="mt-1 text-sm leading-none text-slate-600">
              Please enter the attending guest(s) below.
            </p>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-[10px] bg-white px-3 py-3 shadow-[0_6px_24px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70"
        >
          <div className="space-y-2.5">
            {fields.map((field) => (
              <label key={field.name} htmlFor={field.name} className="block">
                <span className="mb-1.5 block text-sm font-bold leading-none text-slate-800">
                  {field.label}
                </span>
                <span className="flex h-10 items-center gap-2.5 rounded-[7px] border border-slate-300 bg-white px-3 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]">
                  <FieldIcon type={field.icon} />
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-700 outline-none placeholder:text-slate-500"
                  />
                </span>
              </label>
            ))}

            <label htmlFor="notes" className="block">
              <span className="mb-1.5 block text-sm font-bold leading-none text-slate-800">
                Special requests / notes
              </span>
              <span className="flex h-16 items-start gap-2.5 rounded-[7px] border border-slate-300 bg-white px-3 py-2.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]">
                <svg
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 4.75h9.5l4 4v10.5h-13.5V4.75ZM14.75 4.75v4h4M8.75 15.25l5.8-5.8a1.6 1.6 0 1 1 2.26 2.26l-5.8 5.8-2.76.5.5-2.76Z"
                  />
                </svg>
                <textarea
                  id="notes"
                  name="notes"
                  maxLength={50}
                  placeholder="Allergies, accessibility needs, etc."
                  className="min-w-0 flex-1 resize-none bg-transparent pt-0.5 text-[15px] leading-tight text-slate-700 outline-none placeholder:text-slate-500"
                />
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-3 flex h-10 w-full items-center justify-center gap-2.5 rounded-[7px] bg-blue-600 text-base font-bold text-white shadow-[0_7px_14px_rgba(37,99,235,0.28)]"
          >
            <span className="text-2xl font-light leading-none">+</span>
            <span>Add guest</span>
          </button>
        </form>

        <section className="mt-3 rounded-[10px] bg-white px-3 py-3 shadow-[0_6px_24px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
          <header className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01"
                  />
                </svg>
              </div>
              <h2 className="text-base font-bold text-slate-950">Guest List</h2>
            </div>

            <span className="rounded-[7px] bg-blue-50 px-2.5 py-1 text-sm font-bold text-blue-700">
              {entries.length} {entries.length === 1 ? "guest" : "guests"} added
            </span>
          </header>

          <div className="space-y-2">
            {entries.length === 0 ? (
              <p className="rounded-[7px] border border-dashed border-slate-300 px-3 py-3 text-center text-sm font-medium text-slate-500">
                No guests added yet
              </p>
            ) : null}

            {entries.map((entry, index) => (
              <article
                key={`${entry.firstName}-${entry.lastName}-${index}`}
                className="flex min-h-16 items-center gap-2.5 rounded-[7px] border border-slate-200 bg-white px-3 py-2 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-900">
                  {getInitials(entry)}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-slate-950">
                    {`${entry.firstName} ${entry.lastName}`}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.9"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.75 5.75c0-1.1.9-2 2-2h1.82c.86 0 1.62.55 1.9 1.36l.73 2.14a2 2 0 0 1-.45 2.02l-.9.9a11.25 11.25 0 0 0 5.98 5.98l.9-.9a2 2 0 0 1 2.02-.45l2.14.73c.81.28 1.36 1.04 1.36 1.9v1.82c0 1.1-.9 2-2 2h-.75C9.35 21.25 2.75 14.65 2.75 6.5v-.75Z"
                      />
                    </svg>
                    <span className="truncate">{entry.contactNumber}</span>
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-600">
                    {entry.notes}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveEntry(index)}
                  aria-label="Delete guest"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] bg-red-50 text-red-500"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.9"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.75 7.75v10M15.25 7.75v10M4.75 6.25h14.5M10 4.25h4M6.25 6.25l.75 14h10l.75-14"
                    />
                  </svg>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-3 rounded-[10px] bg-white px-3 py-3 shadow-[0_6px_24px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70">
          <button
            type="button"
            onClick={handleConfirmGuests}
            className="flex h-10 w-full items-center justify-center gap-2.5 rounded-[7px] bg-green-600 text-base font-bold text-white shadow-[0_7px_14px_rgba(22,163,74,0.22)]"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.75 12.25 2.25 2.25 4.75-5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>Confirm Guests</span>
          </button>

          <button
            type="button"
            onClick={handleClearList}
            className="mt-2 flex h-10 w-full items-center justify-center gap-2.5 rounded-[7px] border border-slate-300 bg-white text-base font-bold text-slate-600"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.75 7.75v10M15.25 7.75v10M4.75 6.25h14.5M10 4.25h4M6.25 6.25l.75 14h10l.75-14"
              />
            </svg>
            <span>Clear list</span>
          </button>
        </section>
      </section>
    </main>
  );
}
