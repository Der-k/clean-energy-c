"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  ChevronRight,
  Handshake,
  Building2,
  Globe2,
  CheckCircle2,
  Upload,
  ChevronDown,
} from "lucide-react";

const COUNTRY_CODES = [
  { code: "+93",    iso: "af", name: "Afghanistan" },
  { code: "+358818",iso: "ax", name: "Åland Islands" },
  { code: "+355",   iso: "al", name: "Albania" },
  { code: "+213",   iso: "dz", name: "Algeria" },
  { code: "+1684",  iso: "as", name: "American Samoa" },
  { code: "+376",   iso: "ad", name: "Andorra" },
  { code: "+244",   iso: "ao", name: "Angola" },
  { code: "+1264",  iso: "ai", name: "Anguilla" },
  { code: "+672",   iso: "aq", name: "Antarctica" },
  { code: "+1268",  iso: "ag", name: "Antigua and Barbuda" },
  { code: "+54",    iso: "ar", name: "Argentina" },
  { code: "+374",   iso: "am", name: "Armenia" },
  { code: "+297",   iso: "aw", name: "Aruba" },
  { code: "+247",   iso: "sh", name: "Ascension Island" },
  { code: "+61",    iso: "au", name: "Australia" },
  { code: "+43",    iso: "at", name: "Austria" },
  { code: "+994",   iso: "az", name: "Azerbaijan" },
  { code: "+1242",  iso: "bs", name: "Bahamas" },
  { code: "+973",   iso: "bh", name: "Bahrain" },
  { code: "+880",   iso: "bd", name: "Bangladesh" },
  { code: "+1246",  iso: "bb", name: "Barbados" },
  { code: "+375",   iso: "by", name: "Belarus" },
  { code: "+32",    iso: "be", name: "Belgium" },
  { code: "+501",   iso: "bz", name: "Belize" },
  { code: "+229",   iso: "bj", name: "Benin" },
  { code: "+1441",  iso: "bm", name: "Bermuda" },
  { code: "+975",   iso: "bt", name: "Bhutan" },
  { code: "+591",   iso: "bo", name: "Bolivia" },
  { code: "+5997",  iso: "bq", name: "Bonaire" },
  { code: "+387",   iso: "ba", name: "Bosnia and Herzegovina" },
  { code: "+267",   iso: "bw", name: "Botswana" },
  { code: "+55",    iso: "br", name: "Brazil" },
  { code: "+246",   iso: "io", name: "British Indian Ocean Territory" },
  { code: "+1284",  iso: "vg", name: "British Virgin Islands" },
  { code: "+673",   iso: "bn", name: "Brunei" },
  { code: "+359",   iso: "bg", name: "Bulgaria" },
  { code: "+226",   iso: "bf", name: "Burkina Faso" },
  { code: "+257",   iso: "bi", name: "Burundi" },
  { code: "+238",   iso: "cv", name: "Cabo Verde" },
  { code: "+855",   iso: "kh", name: "Cambodia" },
  { code: "+237",   iso: "cm", name: "Cameroon" },
  { code: "+1",     iso: "ca", name: "Canada" },
  { code: "+1345",  iso: "ky", name: "Cayman Islands" },
  { code: "+236",   iso: "cf", name: "Central African Republic" },
  { code: "+235",   iso: "td", name: "Chad" },
  { code: "+56",    iso: "cl", name: "Chile" },
  { code: "+86",    iso: "cn", name: "China" },
  { code: "+6189164",iso:"cx", name: "Christmas Island" },
  { code: "+6189162",iso:"cc", name: "Cocos (Keeling) Islands" },
  { code: "+57",    iso: "co", name: "Colombia" },
  { code: "+269",   iso: "km", name: "Comoros" },
  { code: "+242",   iso: "cg", name: "Congo" },
  { code: "+243",   iso: "cd", name: "Congo (DRC)" },
  { code: "+682",   iso: "ck", name: "Cook Islands" },
  { code: "+506",   iso: "cr", name: "Costa Rica" },
  { code: "+225",   iso: "ci", name: "Côte d'Ivoire" },
  { code: "+385",   iso: "hr", name: "Croatia" },
  { code: "+53",    iso: "cu", name: "Cuba" },
  { code: "+5999",  iso: "cw", name: "Curaçao" },
  { code: "+357",   iso: "cy", name: "Cyprus" },
  { code: "+420",   iso: "cz", name: "Czech Republic" },
  { code: "+45",    iso: "dk", name: "Denmark" },
  { code: "+253",   iso: "dj", name: "Djibouti" },
  { code: "+1767",  iso: "dm", name: "Dominica" },
  { code: "+1809",  iso: "do", name: "Dominican Republic" },
  { code: "+593",   iso: "ec", name: "Ecuador" },
  { code: "+20",    iso: "eg", name: "Egypt" },
  { code: "+503",   iso: "sv", name: "El Salvador" },
  { code: "+240",   iso: "gq", name: "Equatorial Guinea" },
  { code: "+291",   iso: "er", name: "Eritrea" },
  { code: "+372",   iso: "ee", name: "Estonia" },
  { code: "+268",   iso: "sz", name: "Eswatini" },
  { code: "+251",   iso: "et", name: "Ethiopia" },
  { code: "+500",   iso: "fk", name: "Falkland Islands" },
  { code: "+298",   iso: "fo", name: "Faroe Islands" },
  { code: "+679",   iso: "fj", name: "Fiji" },
  { code: "+358",   iso: "fi", name: "Finland" },
  { code: "+33",    iso: "fr", name: "France" },
  { code: "+594",   iso: "gf", name: "French Guiana" },
  { code: "+689",   iso: "pf", name: "French Polynesia" },
  { code: "+241",   iso: "ga", name: "Gabon" },
  { code: "+220",   iso: "gm", name: "Gambia" },
  { code: "+995",   iso: "ge", name: "Georgia" },
  { code: "+49",    iso: "de", name: "Germany" },
  { code: "+233",   iso: "gh", name: "Ghana" },
  { code: "+350",   iso: "gi", name: "Gibraltar" },
  { code: "+30",    iso: "gr", name: "Greece" },
  { code: "+299",   iso: "gl", name: "Greenland" },
  { code: "+1473",  iso: "gd", name: "Grenada" },
  { code: "+590",   iso: "gp", name: "Guadeloupe" },
  { code: "+1671",  iso: "gu", name: "Guam" },
  { code: "+502",   iso: "gt", name: "Guatemala" },
  { code: "+44",    iso: "gg", name: "Guernsey" },
  { code: "+224",   iso: "gn", name: "Guinea" },
  { code: "+245",   iso: "gw", name: "Guinea-Bissau" },
  { code: "+592",   iso: "gy", name: "Guyana" },
  { code: "+509",   iso: "ht", name: "Haiti" },
  { code: "+504",   iso: "hn", name: "Honduras" },
  { code: "+852",   iso: "hk", name: "Hong Kong" },
  { code: "+36",    iso: "hu", name: "Hungary" },
  { code: "+354",   iso: "is", name: "Iceland" },
  { code: "+91",    iso: "in", name: "India" },
  { code: "+62",    iso: "id", name: "Indonesia" },
  { code: "+98",    iso: "ir", name: "Iran" },
  { code: "+964",   iso: "iq", name: "Iraq" },
  { code: "+353",   iso: "ie", name: "Ireland" },
  { code: "+44",    iso: "im", name: "Isle of Man" },
  { code: "+972",   iso: "il", name: "Israel" },
  { code: "+39",    iso: "it", name: "Italy" },
  { code: "+1876",  iso: "jm", name: "Jamaica" },
  { code: "+81",    iso: "jp", name: "Japan" },
  { code: "+44",    iso: "je", name: "Jersey" },
  { code: "+962",   iso: "jo", name: "Jordan" },
  { code: "+7",     iso: "kz", name: "Kazakhstan" },
  { code: "+254",   iso: "ke", name: "Kenya" },
  { code: "+686",   iso: "ki", name: "Kiribati" },
  { code: "+383",   iso: "xk", name: "Kosovo" },
  { code: "+965",   iso: "kw", name: "Kuwait" },
  { code: "+996",   iso: "kg", name: "Kyrgyzstan" },
  { code: "+856",   iso: "la", name: "Laos" },
  { code: "+371",   iso: "lv", name: "Latvia" },
  { code: "+961",   iso: "lb", name: "Lebanon" },
  { code: "+266",   iso: "ls", name: "Lesotho" },
  { code: "+231",   iso: "lr", name: "Liberia" },
  { code: "+218",   iso: "ly", name: "Libya" },
  { code: "+423",   iso: "li", name: "Liechtenstein" },
  { code: "+370",   iso: "lt", name: "Lithuania" },
  { code: "+352",   iso: "lu", name: "Luxembourg" },
  { code: "+853",   iso: "mo", name: "Macao" },
  { code: "+261",   iso: "mg", name: "Madagascar" },
  { code: "+265",   iso: "mw", name: "Malawi" },
  { code: "+60",    iso: "my", name: "Malaysia" },
  { code: "+960",   iso: "mv", name: "Maldives" },
  { code: "+223",   iso: "ml", name: "Mali" },
  { code: "+356",   iso: "mt", name: "Malta" },
  { code: "+692",   iso: "mh", name: "Marshall Islands" },
  { code: "+596",   iso: "mq", name: "Martinique" },
  { code: "+222",   iso: "mr", name: "Mauritania" },
  { code: "+230",   iso: "mu", name: "Mauritius" },
  { code: "+262",   iso: "yt", name: "Mayotte" },
  { code: "+52",    iso: "mx", name: "Mexico" },
  { code: "+691",   iso: "fm", name: "Micronesia" },
  { code: "+373",   iso: "md", name: "Moldova" },
  { code: "+377",   iso: "mc", name: "Monaco" },
  { code: "+976",   iso: "mn", name: "Mongolia" },
  { code: "+382",   iso: "me", name: "Montenegro" },
  { code: "+1664",  iso: "ms", name: "Montserrat" },
  { code: "+212",   iso: "ma", name: "Morocco" },
  { code: "+258",   iso: "mz", name: "Mozambique" },
  { code: "+95",    iso: "mm", name: "Myanmar" },
  { code: "+264",   iso: "na", name: "Namibia" },
  { code: "+674",   iso: "nr", name: "Nauru" },
  { code: "+977",   iso: "np", name: "Nepal" },
  { code: "+31",    iso: "nl", name: "Netherlands" },
  { code: "+687",   iso: "nc", name: "New Caledonia" },
  { code: "+64",    iso: "nz", name: "New Zealand" },
  { code: "+505",   iso: "ni", name: "Nicaragua" },
  { code: "+227",   iso: "ne", name: "Niger" },
  { code: "+234",   iso: "ng", name: "Nigeria" },
  { code: "+683",   iso: "nu", name: "Niue" },
  { code: "+6723",  iso: "nf", name: "Norfolk Island" },
  { code: "+850",   iso: "kp", name: "North Korea" },
  { code: "+389",   iso: "mk", name: "North Macedonia" },
  { code: "+1670",  iso: "mp", name: "Northern Mariana Islands" },
  { code: "+47",    iso: "no", name: "Norway" },
  { code: "+968",   iso: "om", name: "Oman" },
  { code: "+92",    iso: "pk", name: "Pakistan" },
  { code: "+680",   iso: "pw", name: "Palau" },
  { code: "+970",   iso: "ps", name: "Palestine" },
  { code: "+507",   iso: "pa", name: "Panama" },
  { code: "+675",   iso: "pg", name: "Papua New Guinea" },
  { code: "+595",   iso: "py", name: "Paraguay" },
  { code: "+51",    iso: "pe", name: "Peru" },
  { code: "+63",    iso: "ph", name: "Philippines" },
  { code: "+64",    iso: "pn", name: "Pitcairn Islands" },
  { code: "+48",    iso: "pl", name: "Poland" },
  { code: "+351",   iso: "pt", name: "Portugal" },
  { code: "+1787",  iso: "pr", name: "Puerto Rico" },
  { code: "+974",   iso: "qa", name: "Qatar" },
  { code: "+262",   iso: "re", name: "Réunion" },
  { code: "+40",    iso: "ro", name: "Romania" },
  { code: "+7",     iso: "ru", name: "Russia" },
  { code: "+250",   iso: "rw", name: "Rwanda" },
  { code: "+290",   iso: "sh", name: "Saint Helena" },
  { code: "+1869",  iso: "kn", name: "Saint Kitts and Nevis" },
  { code: "+1758",  iso: "lc", name: "Saint Lucia" },
  { code: "+590",   iso: "mf", name: "Saint Martin" },
  { code: "+508",   iso: "pm", name: "Saint Pierre and Miquelon" },
  { code: "+1784",  iso: "vc", name: "Saint Vincent and the Grenadines" },
  { code: "+685",   iso: "ws", name: "Samoa" },
  { code: "+378",   iso: "sm", name: "San Marino" },
  { code: "+239",   iso: "st", name: "São Tomé and Príncipe" },
  { code: "+966",   iso: "sa", name: "Saudi Arabia" },
  { code: "+221",   iso: "sn", name: "Senegal" },
  { code: "+381",   iso: "rs", name: "Serbia" },
  { code: "+248",   iso: "sc", name: "Seychelles" },
  { code: "+232",   iso: "sl", name: "Sierra Leone" },
  { code: "+65",    iso: "sg", name: "Singapore" },
  { code: "+1721",  iso: "sx", name: "Sint Maarten" },
  { code: "+421",   iso: "sk", name: "Slovakia" },
  { code: "+386",   iso: "si", name: "Slovenia" },
  { code: "+677",   iso: "sb", name: "Solomon Islands" },
  { code: "+252",   iso: "so", name: "Somalia" },
  { code: "+27",    iso: "za", name: "South Africa" },
  { code: "+82",    iso: "kr", name: "South Korea" },
  { code: "+211",   iso: "ss", name: "South Sudan" },
  { code: "+34",    iso: "es", name: "Spain" },
  { code: "+94",    iso: "lk", name: "Sri Lanka" },
  { code: "+249",   iso: "sd", name: "Sudan" },
  { code: "+597",   iso: "sr", name: "Suriname" },
  { code: "+4779",  iso: "sj", name: "Svalbard and Jan Mayen" },
  { code: "+46",    iso: "se", name: "Sweden" },
  { code: "+41",    iso: "ch", name: "Switzerland" },
  { code: "+963",   iso: "sy", name: "Syria" },
  { code: "+886",   iso: "tw", name: "Taiwan" },
  { code: "+992",   iso: "tj", name: "Tajikistan" },
  { code: "+255",   iso: "tz", name: "Tanzania" },
  { code: "+66",    iso: "th", name: "Thailand" },
  { code: "+670",   iso: "tl", name: "Timor-Leste" },
  { code: "+228",   iso: "tg", name: "Togo" },
  { code: "+690",   iso: "tk", name: "Tokelau" },
  { code: "+676",   iso: "to", name: "Tonga" },
  { code: "+1868",  iso: "tt", name: "Trinidad and Tobago" },
  { code: "+290",   iso: "ta", name: "Tristan da Cunha" },
  { code: "+216",   iso: "tn", name: "Tunisia" },
  { code: "+90",    iso: "tr", name: "Turkey" },
  { code: "+993",   iso: "tm", name: "Turkmenistan" },
  { code: "+1649",  iso: "tc", name: "Turks and Caicos Islands" },
  { code: "+688",   iso: "tv", name: "Tuvalu" },
  { code: "+1340",  iso: "vi", name: "U.S. Virgin Islands" },
  { code: "+256",   iso: "ug", name: "Uganda" },
  { code: "+380",   iso: "ua", name: "Ukraine" },
  { code: "+971",   iso: "ae", name: "United Arab Emirates" },
  { code: "+44",    iso: "gb", name: "United Kingdom" },
  { code: "+1",     iso: "us", name: "United States" },
  { code: "+598",   iso: "uy", name: "Uruguay" },
  { code: "+998",   iso: "uz", name: "Uzbekistan" },
  { code: "+678",   iso: "vu", name: "Vanuatu" },
  { code: "+379",   iso: "va", name: "Vatican City" },
  { code: "+58",    iso: "ve", name: "Venezuela" },
  { code: "+84",    iso: "vn", name: "Vietnam" },
  { code: "+681",   iso: "wf", name: "Wallis and Futuna" },
  { code: "+212",   iso: "eh", name: "Western Sahara" },
  { code: "+967",   iso: "ye", name: "Yemen" },
  { code: "+260",   iso: "zm", name: "Zambia" },
  { code: "+263",   iso: "zw", name: "Zimbabwe" },
];

function FlagImg({ iso, size = 24 }: { iso: string; size?: number }) {
  return (
    <Image
      src={`https://flagcdn.com/w40/${iso}.png`}
      alt=""
      width={size}
      height={Math.round(size * 0.67)}
      className="rounded-sm object-cover shrink-0"
      style={{ borderRadius: 2 }}
      unoptimized
    />
  );
}

function CountryCodePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = COUNTRY_CODES.find((c) => c.code === value) ?? COUNTRY_CODES[0];

  const filtered = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search)
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-black hover:border-[#020266]/40 hover:bg-white focus:border-[#020266] focus:outline-none focus:ring-2 focus:ring-[#020266]/10 transition-all"
        style={{ minWidth: 110 }}
      >
        <FlagImg iso={selected.iso} size={22} />
        <span className="text-sm font-semibold">{selected.code}</span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border border-slate-200 bg-white shadow-[0_16px_48px_rgba(15,23,42,0.12)] overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-slate-100">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code…"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-black placeholder:text-slate-400 focus:border-[#020266] focus:outline-none focus:ring-2 focus:ring-[#020266]/10 transition-all"
            />
          </div>

          {/* List */}
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-slate-400">No results</li>
            )}
            {filtered.map((c) => (
              <li key={`${c.code}-${c.name}`}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(c.code);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[#020266]/5 ${
                    c.code === value ? "bg-[#020266]/8 font-semibold text-[#020266]" : "text-black"
                  }`}
                >
                  <FlagImg iso={c.iso} size={22} />
                  <span className="flex-1 text-left">{c.name}</span>
                  <span className="text-slate-400 tabular-nums">{c.code}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

type SponsorForm = {
  companyName: string;
  website: string;
  description: string;
  sponsorType: string;
  firstName: string;
  lastName: string;
  email: string;
  contactCompany: string;
  designation: string;
  phone: string;
};

const initialForm: SponsorForm = {
  companyName: "",
  website: "",
  description: "",
  sponsorType: "",
  firstName: "",
  lastName: "",
  email: "",
  contactCompany: "",
  designation: "",
  phone: "",
};

export default function BecomeASponsorPage() {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [countryCode, setCountryCode] = useState("+254");
  const [form, setForm] = useState<SponsorForm>(initialForm);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateField<K extends keyof SponsorForm>(
    field: K,
    value: SponsorForm[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formData = new FormData();

      formData.append("companyName", form.companyName);
      formData.append("website", form.website);
      formData.append("description", form.description);
      formData.append("sponsorType", form.sponsorType);

      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);

      formData.append("contactCompany", form.contactCompany);
      formData.append("designation", form.designation);

      formData.append("countryCode", countryCode);
      formData.append("phone", form.phone);

      if (logoFile) {
        formData.append("logo", logoFile);
      }

     const response = await fetch("/api/sponsorship-request", {
  method: "POST",
  body: formData,
});

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      await response.json();

      setSubmitStatus("success");
      setForm(initialForm);
      setLogoFile(null);
      setFileName(null);
      setCountryCode("+254");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const validateAndSetFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Invalid file type. Please upload a JPG, JPEG, PNG, GIF, or WEBP file.");
      return;
    }
    if (file.size > 30 * 1024 * 1024) {
      alert("Maximum file size is 30 MB.");
      return;
    }
    setLogoFile(file);
    setFileName(file.name);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
  };

  return (
    <main className="bg-white pt-24">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,white_0%,white_72%,#f8fafc_100%)]" />

        <div className="relative w-full flex justify-center px-6 py-12 lg:py-16">
          <div className="w-full max-w-[1400px]">
            <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-black">
              <Link href="/" className="transition hover:text-[#020266]">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/partners" className="transition hover:text-[#020266]">Partners</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-black">Become a Sponsor</span>
            </div>

            {/* ── Two-column grid ── */}
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="max-w-3xl">
                <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#020266]">
                  Sponsorship Opportunities
                </p>
                <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-[-0.03em] text-black sm:text-5xl">
                  Become a sponsor of the Clean Energy Conference 2026
                </h1>
                <p className="mt-5 max-w-2xl text-xl leading-8 text-black">
                  Position your brand alongside senior decision-makers, investors, project developers,
                  technology providers, and public sector leaders shaping the clean energy transition
                  in Africa and Australia.
                </p>

                <div className="mt-5 grid gap-4">
                  {[
                    { Icon: Handshake, title: "Strategic visibility", body: "Showcase your company to a high-value audience through branding, speaking visibility, exhibition presence, and direct stakeholder engagement." },
                    { Icon: Building2, title: "Access the right audience", body: "Connect with policymakers, utilities, developers, financiers, EPCs, technology partners, and corporate energy stakeholders across both editions." },
                    { Icon: Globe2,    title: "Kigali and Perth editions", body: "Explore sponsorship for Kigali, Perth, or a combined 2026 conference partnership package." },
                  ].map(({ Icon, title, body }) => (
                    <div key={title} className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#020266]/5 text-[#020266]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-base font-semibold text-black">{title}</p>
                          <p className="mt-1 text-base leading-7 text-black">{body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Sticky sidebar / form ── */}
              <div className="sticky top-28 flex h-fit flex-col rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
                {/* Header */}
                <div className="bg-[#020266] px-6 py-5 rounded-t-[28px]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      <Handshake className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="font-heading text-xl font-bold text-white">Submit Sponsorship Request</h2>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="p-6 space-y-5 rounded-b-[28px]"
                >
                  {/* Company Name */}
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-semibold text-black mb-1.5">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input id="companyName" type="text" required value={form.companyName} onChange={(e) => updateField("companyName", e.target.value)} placeholder="Enter your company name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#020266] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#020266]/10 transition-all" />
                  </div>

                  {/* Website URL */}
                  <div>
                    <label htmlFor="website" className="block text-sm font-semibold text-black mb-1.5">Website URL</label>
                    <input id="website" type="url" autoComplete="url" value={form.website} onChange={(e) => updateField("website", e.target.value)} placeholder="https://yourcompany.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#020266] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#020266]/10 transition-all" />
                  </div>

                  {/* Logo upload */}
                  <div>
                    <label htmlFor="logoUpload" className="block text-sm font-semibold text-black mb-1.5">Company Logo</label>
                    <p className="text-xs text-slate-500 mb-2">File size: Up to 30 MB · Supported: JPG, JPEG, PNG, GIF, WEBP</p>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 cursor-pointer transition-all ${dragOver ? "border-[#020266] bg-[#020266]/5" : "border-slate-200 bg-slate-50 hover:border-[#020266]/40 hover:bg-[#020266]/[0.02]"}`}
                    >
                      <Upload className="h-6 w-6 text-slate-400" />
                      {fileName ? (
                        <p className="text-sm font-medium text-[#020266]">{fileName}</p>
                      ) : (
                        <p className="text-sm text-slate-500">Drop or Upload Your File Here</p>
                      )}
                      <span className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">Drop Here</span>
                    </div>
                    <input id="logoUpload" ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.gif,.webp" className="hidden" onChange={handleFileChange} />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-black mb-1.5">Description</label>
                    <textarea id="description" rows={3} value={form.description} onChange={(e) => updateField("description", e.target.value)} placeholder="Tell us about your sponsorship goals..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#020266] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#020266]/10 transition-all resize-none" />
                  </div>

                  {/* Sponsor Type */}
                  <div>
                    <label htmlFor="sponsorType" className="block text-sm font-semibold text-black mb-1.5">
                      Sponsor Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select id="sponsorType" required value={form.sponsorType} onChange={(e) => updateField("sponsorType", e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-sm text-black focus:border-[#020266] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#020266]/10 transition-all appearance-none cursor-pointer">
                        <option value="" disabled>Select sponsor type</option>
                        <option value="bronze">Bronze Sponsorship — $10,000</option>
                        <option value="industry">Industry / Session Sponsorship — $11,000</option>
                        <option value="silver">Silver Sponsorship — $15,000</option>
                        <option value="gold">Gold Sponsorship — $20,500</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="pt-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#020266] mb-4">Contact Details</p>

                    {/* First + Last name */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-black mb-1.5">First Name <span className="text-red-500">*</span></label>
                        <input id="firstName" type="text" required autoComplete="given-name" value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} placeholder="First name"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#020266] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#020266]/10 transition-all" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold text-black mb-1.5">Last Name</label>
                        <input id="lastName" type="text" autoComplete="family-name" value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} placeholder="Last name"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#020266] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#020266]/10 transition-all" />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label htmlFor="email" className="block text-sm font-semibold text-black mb-1.5">Email <span className="text-red-500">*</span></label>
                      <input id="email" type="email" required autoComplete="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="you@company.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#020266] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#020266]/10 transition-all" />
                    </div>

                    {/* Company Name (contact) */}
                    <div className="mb-3">
                      <label htmlFor="contactCompany" className="block text-sm font-semibold text-black mb-1.5">Company Name</label>
                      <input id="contactCompany" type="text" autoComplete="organization" value={form.contactCompany} onChange={(e) => updateField("contactCompany", e.target.value)} placeholder="Company name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#020266] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#020266]/10 transition-all" />
                    </div>

                    {/* Designation */}
                    <div className="mb-3">
                      <label htmlFor="designation" className="block text-sm font-semibold text-black mb-1.5">Designation</label>
                      <input id="designation" type="text" autoComplete="organization-title" value={form.designation} onChange={(e) => updateField("designation", e.target.value)} placeholder="Your role / title"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#020266] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#020266]/10 transition-all" />
                    </div>

                    {/* Phone with custom country picker */}
                    <div className="mb-1">
                      <label htmlFor="phone" className="block text-sm font-semibold text-black mb-1.5">Phone</label>
                      <div className="flex gap-2 items-stretch">
                        <CountryCodePicker value={countryCode} onChange={setCountryCode} />
                        <input
                          type="tel"
                          id="phone" autoComplete="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="700 000 000"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#020266] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#020266]/10 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit / Cancel */}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => { setForm(initialForm); setLogoFile(null); setFileName(null); setCountryCode("+254"); if (fileInputRef.current) { fileInputRef.current.value = ""; } }} className="group relative inline-flex items-center justify-center gap-2 overflow-hidden flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-black bg-white border border-slate-200 shadow-sm transition-all duration-500 ease-out hover:border-[#02026e]/60 hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(2,2,110,0.14)] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#02026e]/25 focus:ring-offset-2">
                      <span className="absolute inset-0 overflow-hidden rounded-xl"><span className="absolute left-0 top-0 h-full w-0 bg-[#02026e] transition-all duration-500 ease-out group-hover:w-full" /></span>
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Cancel</span>
                    </button>
                    <button type="submit" disabled={submitting} className="group relative inline-flex items-center justify-center gap-2 overflow-hidden flex-1 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-[#02026e] border border-[#02026e] shadow-[0_8px_24px_rgba(2,2,110,0.2)] transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_14px_36px_rgba(2,2,110,0.3)] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#02026e]/25 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none">
                      <span className="absolute inset-0 overflow-hidden rounded-xl"><span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" /></span>
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-[#02026e]">
                        {submitting ? "Submitting…" : "Submit"}
                      </span>
                    </button>
                  </div>

                  {/* Status messages */}
                  {submitStatus === "success" && (
                    <p className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm font-medium text-green-700 text-center">
                      ✓ Your sponsorship request has been submitted successfully. We'll be in touch soon!
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-700 text-center">
                      Something went wrong. Please try again or contact us directly.
                    </p>
                  )}

                  <div className="flex justify-center pt-1">
                    <Link href="/partners" className="text-sm font-semibold text-[#020266] hover:underline transition-all">
                      ← Back to Partners
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            {/* ── End two-column grid ── */}

            {/* ── Full-width section ── */}
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
                <div className="border-b border-slate-200 bg-[#020266] px-6 py-5">
                  <h2 className="font-heading text-2xl font-bold text-white">Sponsor Categories</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-[900px] w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-left">
                        <th className="border-b border-r border-slate-200 px-5 py-5 text-base font-bold uppercase text-black">Sponsor Categories</th>
                        {[
                          { name: "Bronze",           price: "$10,000.00" },
                          { name: "Industry/Session", price: "$11,000.00" },
                          { name: "Silver",           price: "$15,000.00" },
                          { name: "Gold",             price: "$20,500.00" },
                        ].map((tier) => (
                          <th key={tier.name} className="border-b border-r border-slate-200 px-5 py-5 text-center">
                            <p className="text-base font-bold uppercase tracking-wide text-black">{tier.name}</p>
                            <div className="mx-auto mt-4 h-[2px] w-full bg-red-500" />
                            <p className="mt-5 text-base font-bold text-black">{tier.price}</p>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: "Exclusive",                                    values: ["4",   true,  true,  true]  },
                        { feature: "Logo on the Conference Portal",                values: [true,  true,  true,  true]  },
                        { feature: "Logo on Social Media pages advertising event", values: [true,  true,  true,  true]  },
                        { feature: "Mention at the event",                         values: [false, true,  true,  true]  },
                        { feature: "Online Exhibition",                            values: [false, false, true,  true]  },
                        { feature: "Exhibition Booth",                             values: [false, false, false, false] },
                        { feature: "Roll-up Banner(s)",                            values: ["1",   "2",   "3",   "3"]  },
                        { feature: "Conference Pass",                              values: [true,  true,  true,  true]  },
                        { feature: "Speaking Slot",                                values: [true,  true,  true,  true]  },
                        { feature: "Promotional Material Souvenir insert",         values: [false, false, false, false] },
                        { feature: "Full Page Advert",                             values: [false, false, false, false] },
                        { feature: "Spotlight during the session",                 values: [false, false, false, false] },
                      ].map((row) => (
                        <tr key={row.feature} className="border-b border-slate-200 bg-white">
                          <td className="border-r border-slate-200 px-5 py-4 text-base font-medium text-black">{row.feature}</td>
                          {row.values.map((value, index) => (
                            <td key={index} className="border-r border-slate-200 px-5 py-4 text-center">
                              {typeof value === "boolean" ? (
                                value ? <span className="text-xl font-bold text-green-600">✓</span>
                                      : <span className="text-xl font-bold text-red-500">⊖</span>
                              ) : (
                                <span className="text-base font-semibold text-black">{value}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 flex w-full justify-center">
                <Link href="https://clean-energy.zohobackstage.com/kigali#/sponsors?lang=en"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-10 py-4 text-base font-semibold text-white bg-[#02026e] border border-[#02026e] shadow-[0_10px_30px_rgba(2,2,110,0.18)] transition-all duration-500 ease-out hover:border-[#02026e]/60 hover:scale-[1.04] hover:shadow-[0_18px_50px_rgba(2,2,110,0.28)] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#02026e]/25 focus:ring-offset-2 focus:ring-offset-white">
                  <span className="absolute inset-0 overflow-hidden rounded-2xl"><span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" /></span>
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#02026e]">Become a Sponsor</span>
                </Link>
              </div>

              <div className="mt-8 w-full rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#020266]">Why sponsor</p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Strengthen brand credibility in the clean energy market",
                    "Support dialogue around energy transition, investment, and innovation",
                    "Build commercial relationships with high-level attendees",
                    "Gain tailored visibility through curated sponsorship packages",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#020266]" />
                      <span className="text-base leading-7 text-black">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}