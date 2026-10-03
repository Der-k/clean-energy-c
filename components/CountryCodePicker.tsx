"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

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

export default function CountryCodePicker({
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
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-full items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-black hover:border-[#020266]/50 focus:border-[#020266] focus:outline-none focus:ring-2 focus:ring-[#020266]/15"
        style={{ minWidth: 104 }}
      >
        <FlagImg iso={selected.iso} size={22} />
        <span>{selected.code}</span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-100 p-3">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code…"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-black placeholder:text-slate-400 focus:border-[#020266] focus:outline-none focus:ring-2 focus:ring-[#020266]/15"
            />
          </div>

          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-slate-500">No results</li>
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
                    c.code === value ? "bg-[#020266]/10 font-semibold text-[#020266]" : "text-black"
                  }`}
                >
                  <FlagImg iso={c.iso} size={22} />
                  <span className="flex-1 text-left">{c.name}</span>
                  <span className="tabular-nums text-slate-500">{c.code}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}