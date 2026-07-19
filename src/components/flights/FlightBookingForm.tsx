"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import AirportSelect, { Airport } from "./AirportSelect";
import TripTypeTabs, { TripType } from "./TripTypeTabs";
import TravelersClassPicker, { Travelers, TravelClass } from "./TravelersClassPicker";

type Leg = { origin: Airport | null; destination: Airport | null; date: string };

const countryCodes = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+61", label: "🇦🇺 +61" },
];

const todayStr = () => new Date().toISOString().split("T")[0];

export default function FlightBookingForm() {
  const [tripType, setTripType] = useState<TripType>("ONE_WAY");

  const [origin, setOrigin] = useState<Airport | null>(null);
  const [destination, setDestination] = useState<Airport | null>(null);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [multiCityLegs, setMultiCityLegs] = useState<Leg[]>([
    { origin: null, destination: null, date: "" },
    { origin: null, destination: null, date: "" },
  ]);

  const [travelers, setTravelers] = useState<Travelers>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [travelClass, setTravelClass] = useState<TravelClass>("ECONOMY");
  const [preferredAirline, setPreferredAirline] = useState("");
  const [budget, setBudget] = useState("");

  const [contact, setContact] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
  });

  const [fieldError, setFieldError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const swapOriginDestination = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const updateLeg = (index: number, patch: Partial<Leg>) => {
    setMultiCityLegs((prev) =>
      prev.map((leg, i) => (i === index ? { ...leg, ...patch } : leg))
    );
  };

  const addLeg = () => {
    if (multiCityLegs.length >= 5) return;
    setMultiCityLegs((prev) => [...prev, { origin: null, destination: null, date: "" }]);
  };

  const removeLeg = (index: number) => {
    if (multiCityLegs.length <= 2) return;
    setMultiCityLegs((prev) => prev.filter((_, i) => i !== index));
  };

  const swapLeg = (index: number) => {
    setMultiCityLegs((prev) =>
      prev.map((leg, i) =>
        i === index ? { ...leg, origin: leg.destination, destination: leg.origin } : leg
      )
    );
  };

  const validate = (): string | null => {
    if (travelers.adults < 1) return "At least 1 adult is required.";
    if (travelers.adults + travelers.children + travelers.infants > 9)
      return "Maximum 9 travellers allowed per booking.";

    if (budget && (Number(budget) < 1000 || Number(budget) % 1000 !== 0))
      return "Budget must be at least ₹1,000, in increments of ₹1,000.";

    if (tripType === "ONE_WAY" || tripType === "ROUND_TRIP") {
      if (!origin || !destination) return "Please select both origin and destination.";
      if (origin.code === destination.code)
        return "Origin and destination cannot be the same.";
      if (!departureDate) return "Please select a departure date.";
      if (departureDate < todayStr()) return "Departure date cannot be in the past.";
      if (tripType === "ROUND_TRIP") {
        if (!returnDate) return "Please select a return date.";
        if (returnDate < departureDate)
          return "Return date cannot be before the departure date.";
      }
    }

    if (tripType === "MULTI_CITY") {
      for (let i = 0; i < multiCityLegs.length; i++) {
        const leg = multiCityLegs[i];
        if (!leg.origin || !leg.destination)
          return `Please select origin and destination for flight ${i + 1}.`;
        if (leg.origin.code === leg.destination.code)
          return `Origin and destination cannot be the same for flight ${i + 1}.`;
        if (!leg.date) return `Please select a date for flight ${i + 1}.`;
        if (leg.date < todayStr()) return `Flight ${i + 1}'s date cannot be in the past.`;
        if (i > 0 && leg.date < multiCityLegs[i - 1].date)
          return `Flight ${i + 1}'s date cannot be before flight ${i}'s date.`;
      }
    }

    if (contact.phone.length !== 10) {
      return "Please enter a valid 10-digit phone number.";
    }
    if (!contact.name || !contact.email || !contact.phone)
      return "Please fill in your contact details.";

    return null;
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldError("");

    const error = validate();
    if (error) {
      setFieldError(error);
      return;
    }

    const legs =
      tripType === "MULTI_CITY"
        ? multiCityLegs.map((leg) => ({
            originCode: leg.origin!.code,
            originCity: leg.origin!.city,
            destinationCode: leg.destination!.code,
            destinationCity: leg.destination!.city,
            date: leg.date,
          }))
        : tripType === "ROUND_TRIP"
        ? [
            {
              originCode: origin!.code,
              originCity: origin!.city,
              destinationCode: destination!.code,
              destinationCity: destination!.city,
              date: departureDate,
            },
            {
              originCode: destination!.code,
              originCity: destination!.city,
              destinationCode: origin!.code,
              destinationCity: origin!.city,
              date: returnDate,
            },
          ]
        : [
            {
              originCode: origin!.code,
              originCity: origin!.city,
              destinationCode: destination!.code,
              destinationCity: destination!.city,
              date: departureDate,
            },
          ];

    setStatus("submitting");
    try {
      const res = await fetch("/api/flight-enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripType,
          legs,
          adults: travelers.adults,
          children: travelers.children,
          infants: travelers.infants,
          travelClass,
          preferredAirline: preferredAirline || undefined,
          budget: budget ? Number(budget) : undefined,
          name: contact.name,
          email: contact.email,
          phone: `${contact.countryCode} ${contact.phone}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setFieldError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      setStatus("success");
    } catch {
      setFieldError("Network error. Please check your connection and try again.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#fdece2] border border-orange/30 rounded-brand px-6 py-10 text-center max-w-xl mx-auto">
        <p className="text-navy font-semibold text-lg mb-1">
          Thank you, {contact.name}!
        </p>
        <p className="text-[14px] text-muted">
          Your flight enquiry has been received. Our team will get back to you with
          the best fares shortly.
        </p>
      </div>
    );
  }

  const inputClass = "w-full border border-line rounded-lg px-3.5 py-2.5 text-sm";
  const labelClass = "block text-[12.5px] font-semibold text-navy mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-5 px-4 sm:px-0">
      <TripTypeTabs value={tripType} onChange={setTripType} />

      {(tripType === "ONE_WAY" || tripType === "ROUND_TRIP") && (
        <div className="bg-white border border-line rounded-brand p-5">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end mb-4">
            <AirportSelect label="From" value={origin} onChange={setOrigin} />
            <button
              type="button"
              onClick={swapOriginDestination}
              className="w-9 h-9 rounded-full border border-line bg-cream text-navy flex items-center justify-center hover:bg-orange hover:text-white hover:border-orange transition-colors mb-0.5 mx-auto sm:mx-0 rotate-90 sm:rotate-0"
              aria-label="Swap origin and destination"
            >
              ⇄
            </button>
            <AirportSelect label="To" value={destination} onChange={setDestination} />
          </div>
          <div className={`grid ${tripType === "ROUND_TRIP" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} gap-3.5`}>
            <div>
              <label className={labelClass}>Departure Date</label>
              <input
                type="date"
                min={todayStr()}
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className={inputClass}
              />
            </div>
            {tripType === "ROUND_TRIP" && (
              <div>
                <label className={labelClass}>Return Date</label>
                <input
                  type="date"
                  min={departureDate || todayStr()}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className={inputClass}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {tripType === "MULTI_CITY" && (
        <div className="space-y-3.5">
          {multiCityLegs.map((leg, i) => (
            <div key={i} className="bg-white border border-line rounded-brand p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] font-bold text-navy">Flight {i + 1}</span>
                {multiCityLegs.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeLeg(i)}
                    className="text-[12px] text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end mb-3.5">
                <AirportSelect
                  label="From"
                  value={leg.origin}
                  onChange={(a) => updateLeg(i, { origin: a })}
                />
                <button
                  type="button"
                  onClick={() => swapLeg(i)}
                  className="w-9 h-9 rounded-full border border-line bg-cream text-navy flex items-center justify-center hover:bg-orange hover:text-white hover:border-orange transition-colors mb-0.5 mx-auto sm:mx-0 rotate-90 sm:rotate-0"
                  aria-label={`Swap flight ${i + 1} origin and destination`}
                >
                  ⇄
                </button>
                <AirportSelect
                  label="To"
                  value={leg.destination}
                  onChange={(a) => updateLeg(i, { destination: a })}
                />
              </div>
              <div>
                <label className={labelClass}>Date</label>
                <input
                  type="date"
                  min={i > 0 ? multiCityLegs[i - 1].date || todayStr() : todayStr()}
                  value={leg.date}
                  onChange={(e) => updateLeg(i, { date: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          ))}
          {multiCityLegs.length < 5 && (
            <button
              type="button"
              onClick={addLeg}
              className="w-full border-2 border-dashed border-line rounded-brand py-3 text-[13px] font-semibold text-orange-dark hover:border-orange transition-colors"
            >
              + Add Flight
            </button>
          )}
        </div>
      )}

      <TravelersClassPicker
        travelers={travelers}
        onTravelersChange={setTravelers}
        travelClass={travelClass}
        onClassChange={setTravelClass}
      />

      <div className="bg-white border border-line rounded-brand p-5">
        <h4 className="text-sm font-bold text-navy uppercase tracking-wide mb-3.5">
          Additional Details (Optional)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className={labelClass}>Preferred Airline</label>
            <input
              placeholder="e.g. IndiGo, Emirates"
              value={preferredAirline}
              onChange={(e) => setPreferredAirline(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Budget (per person, ₹)</label>
            <input
              type="number"
              min={1000}
              max={1e10}
              step={1000}
              placeholder="e.g. 15000"
              value={budget}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  setBudget(val);
                  return;
                }
                const num = Number(val);
                setBudget(num > 1e10 ? String(1e10) : val);
              }}
              onBlur={(e) => {
                const val = Number(e.target.value);
                if (val > 0 && val < 1000) setBudget("1000");
              }}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-line rounded-brand p-5">
        <h4 className="text-sm font-bold text-navy uppercase tracking-wide mb-3.5">
          Contact Information
        </h4>
        <div className="space-y-3.5">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              required
              placeholder="e.g. Ankit Sharma"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              required
              type="email"
              placeholder="you@example.com"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <div className="flex gap-2">
              <select
                value={contact.countryCode}
                onChange={(e) => setContact({ ...contact, countryCode: e.target.value })}
                className="border border-line rounded-lg px-2 py-2.5 text-sm bg-white shrink-0"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                required
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="10-digit mobile number"
                value={contact.phone}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                  })
                }
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {fieldError && <p className="text-red-600 text-sm">{fieldError}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-orange text-white font-semibold rounded-full py-3.5 hover:bg-orange-dark transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Search Flights →"}
      </button>
    </form>
  );
}