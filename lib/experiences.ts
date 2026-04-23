import type { ElementType } from "react";
import {
  Mountain, TreePine, Sun,
  Palette, ChefHat, Camera, Layers,
  Map, Building2,
  Trophy, Zap, Activity,
} from "lucide-react";

export interface Experience {
  id: string;
  name: string;
  street: string;
  duration: string;
  price: string;
  image?: string;
  gradient?: { from: string; to: string };
  Icon?: ElementType;
  badge?: { label: string; variant: "pick" | "urgent" };
  category: "weekly" | "outdoors" | "climbing" | "creative" | "culture" | "sport";
}

export const experiences: Experience[] = [
  // ── Weekly picks (real photos) ──────────────────────────────────────────
  {
    id: "prado",
    name: "Visit Museo del Prado",
    street: "Calle de Ruiz de Alarcón, 23",
    duration: "2–3 h",
    price: "Free–€15",
    image: "/images/experiences/Museo del prado.jpg",
    badge: { label: "This week's pick", variant: "pick" },
    category: "weekly",
  },
  {
    id: "rastro",
    name: "El Rastro flea market",
    street: "Calle de la Ribera de Curtidores",
    duration: "Sunday morning",
    price: "Free",
    image: "/images/experiences/El rastro.jpg",
    badge: { label: "Only this Sunday", variant: "urgent" },
    category: "weekly",
  },
  {
    id: "retiro",
    name: "Paddleboating in Retiro",
    street: "Parque del Retiro",
    duration: "1 h",
    price: "€6",
    image: "/images/experiences/RETIRO WATERBOARD.jpeg",
    category: "weekly",
  },

  // ── Hikes & Outdoors ────────────────────────────────────────────────────
  {
    id: "pedriza-hike",
    name: "Hike La Pedriza",
    street: "Manzanares el Real",
    duration: "3–5 h",
    price: "Free",
    image: "/images/experiences/hike-la-pedriza.jpg",
    category: "outdoors",
  },
  {
    id: "cercedilla",
    name: "Cercedilla mountain trail",
    street: "Cercedilla, Sierra de Guadarrama",
    duration: "2–4 h",
    price: "Free",
    gradient: { from: "#14532d", to: "#15803d" },
    Icon: TreePine,
    category: "outdoors",
  },
  {
    id: "siete-picos",
    name: "Sunrise at Siete Picos",
    street: "Cercedilla trailhead",
    duration: "5–6 h",
    price: "Free",
    gradient: { from: "#0c1445", to: "#1e3a5f" },
    Icon: Sun,
    category: "outdoors",
  },
  {
    id: "el-pardo",
    name: "El Pardo forest walk",
    street: "Monte de El Pardo",
    duration: "1–2 h",
    price: "Free",
    gradient: { from: "#052e16", to: "#065f46" },
    Icon: TreePine,
    category: "outdoors",
  },

  // ── Rock Climbing ───────────────────────────────────────────────────────
  {
    id: "pedriza-climb",
    name: "Rock climbing at La Pedriza",
    street: "La Pedriza, Manzanares el Real",
    duration: "Half day",
    price: "Free",
    image: "/images/experiences/rock-climbing.jpg",
    category: "climbing",
  },
  {
    id: "sharma-boulder",
    name: "Indoor bouldering at Sharma",
    street: "Calle de Yeseros, 14, Vallecas",
    duration: "2 h",
    price: "€12",
    gradient: { from: "#3d1515", to: "#7f1d1d" },
    Icon: Mountain,
    category: "climbing",
  },

  // ── Creative ────────────────────────────────────────────────────────────
  {
    id: "pottery",
    name: "Pottery class in Malasaña",
    street: "Malasaña",
    duration: "2 h",
    price: "€35",
    image: "/images/experiences/pottery.jpg",
    category: "creative",
  },
  {
    id: "paella",
    name: "Paella cooking masterclass",
    street: "La Latina",
    duration: "3 h",
    price: "€45",
    image: "/images/experiences/paella.jpg",
    category: "creative",
  },
  {
    id: "photo-walk",
    name: "Photography walk in Chueca",
    street: "Chueca",
    duration: "90 min",
    price: "Free",
    gradient: { from: "#1c1917", to: "#44403c" },
    Icon: Camera,
    category: "creative",
  },
  {
    id: "street-art",
    name: "Street art workshop in Lavapiés",
    street: "Lavapiés",
    duration: "3 h",
    price: "€25",
    gradient: { from: "#1a1333", to: "#4c1d95" },
    Icon: Palette,
    category: "creative",
  },

  // ── Tours & Culture ─────────────────────────────────────────────────────
  {
    id: "latina-walk",
    name: "La Latina neighbourhood walk",
    street: "La Latina",
    duration: "2 h",
    price: "Free",
    gradient: { from: "#1c1917", to: "#292524" },
    Icon: Map,
    category: "culture",
  },
  {
    id: "flamenco",
    name: "Flamenco show at Casa Patas",
    street: "Calle de los Cañizares, 10",
    duration: "90 min",
    price: "€35",
    image: "/images/experiences/flamenco.jpg",
    category: "culture",
  },
  {
    id: "rooftop-tour",
    name: "Rooftop tour of Madrid",
    street: "Plaza Mayor area",
    duration: "1.5 h",
    price: "€20",
    gradient: { from: "#1e1b4b", to: "#312e81" },
    Icon: Building2,
    category: "culture",
  },
  {
    id: "reina-sofia",
    name: "Visit Reina Sofía",
    street: "Calle de Santa Isabel, 52",
    duration: "2–3 h",
    price: "Free–€10",
    gradient: { from: "#0c0a09", to: "#1c1917" },
    Icon: Layers,
    category: "culture",
  },

  // ── Sport & Tournaments ─────────────────────────────────────────────────
  {
    id: "padel",
    name: "Padel at Club de Campo",
    street: "Casa de Campo",
    duration: "2 h",
    price: "€8/person",
    image: "/images/experiences/padel.jpg",
    category: "sport",
  },
  {
    id: "chess-retiro",
    name: "Chess tournament in Retiro",
    street: "Parque del Retiro",
    duration: "Sundays",
    price: "Free",
    gradient: { from: "#1c1917", to: "#292524" },
    Icon: Trophy,
    category: "sport",
  },
  {
    id: "trail-run",
    name: "Trail running in Casa de Campo",
    street: "Casa de Campo",
    duration: "90 min",
    price: "€15",
    gradient: { from: "#052e16", to: "#065f46" },
    Icon: Zap,
    category: "sport",
  },
  {
    id: "volleyball",
    name: "Beach volleyball at Madrid Río",
    street: "Madrid Río, Matadero",
    duration: "2 h",
    price: "€5",
    gradient: { from: "#0c4a6e", to: "#0369a1" },
    Icon: Activity,
    category: "sport",
  },
];

// IDs shown in the dashboard feed (in order)
export const DASHBOARD_FEED_IDS = [
  "rastro",
  "pedriza-hike",
  "flamenco",
  "retiro",
  "pedriza-climb",
  "pottery",
  "padel",
];

export const dashboardSections = [
  { label: "Hikes & Outdoors", category: "outdoors" as const },
  { label: "Rock Climbing",    category: "climbing" as const },
  { label: "Creative",         category: "creative" as const },
  { label: "Tours & Culture",  category: "culture"  as const },
  { label: "Sport & Events",   category: "sport"    as const },
];
