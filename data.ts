import type {
  VitalStat,
  DiseaseRisk,
  WearableDevice,
  ChatMessage,
  Patient,
  TrendPoint,
} from "@/types";

export const vitalStats: VitalStat[] = [
  {
    id: "health-score",
    label: "Health Score",
    value: "92",
    unit: "/100",
    status: "low",
    trend: [78, 82, 85, 88, 90, 91, 92],
    icon: "Activity",
  },
  {
    id: "heart-rate",
    label: "Heart Rate",
    value: "72",
    unit: "bpm",
    status: "low",
    trend: [70, 74, 71, 75, 73, 72, 72],
    icon: "Heart",
  },
  {
    id: "blood-pressure",
    label: "Blood Pressure",
    value: "118/76",
    unit: "mmHg",
    status: "low",
    trend: [122, 120, 119, 121, 118, 117, 118],
    icon: "Gauge",
  },
  {
    id: "blood-oxygen",
    label: "Blood Oxygen",
    value: "98",
    unit: "%",
    status: "low",
    trend: [96, 97, 97, 98, 98, 99, 98],
    icon: "Droplets",
  },
  {
    id: "sleep-quality",
    label: "Sleep Quality",
    value: "86",
    unit: "%",
    status: "low",
    trend: [70, 75, 80, 78, 84, 85, 86],
    icon: "Moon",
  },
  {
    id: "stress-level",
    label: "Stress Level",
    value: "Low",
    unit: "",
    status: "medium",
    trend: [40, 38, 45, 30, 28, 25, 22],
    icon: "Brain",
  },
  {
    id: "calories",
    label: "Calories",
    value: "1,840",
    unit: "kcal",
    status: "low",
    trend: [1600, 1700, 1750, 1800, 1820, 1790, 1840],
    icon: "Flame",
  },
  {
    id: "steps",
    label: "Daily Steps",
    value: "8,432",
    unit: "steps",
    status: "low",
    trend: [6000, 7200, 6800, 7900, 8100, 8000, 8432],
    icon: "Footprints",
  },
];

export const diseaseRisks: DiseaseRisk[] = [
  {
    id: "heart-disease",
    name: "Heart Disease",
    riskPercent: 12,
    confidence: 94,
    level: "low",
    recommendation: "Maintain current cardio routine and low-sodium diet.",
  },
  {
    id: "diabetes",
    name: "Diabetes",
    riskPercent: 34,
    confidence: 89,
    level: "medium",
    recommendation: "Reduce refined sugar intake and monitor glucose weekly.",
  },
  {
    id: "stroke",
    name: "Stroke",
    riskPercent: 9,
    confidence: 91,
    level: "low",
    recommendation: "Blood pressure is well controlled, continue monitoring.",
  },
  {
    id: "kidney-disease",
    name: "Kidney Disease",
    riskPercent: 18,
    confidence: 87,
    level: "low",
    recommendation: "Stay hydrated and keep protein intake balanced.",
  },
  {
    id: "hypertension",
    name: "Hypertension",
    riskPercent: 61,
    confidence: 92,
    level: "high",
    recommendation: "Consult your doctor about sodium intake and stress levels.",
  },
  {
    id: "liver-disease",
    name: "Liver Disease",
    riskPercent: 15,
    confidence: 85,
    level: "low",
    recommendation: "Continue limiting alcohol and maintain a balanced diet.",
  },
];

export const wearableDevices: WearableDevice[] = [
  { id: "apple-watch", name: "Apple Watch Series 9", brand: "Apple", connected: true, battery: 82, lastSync: "2 min ago" },
  { id: "samsung-watch", name: "Galaxy Watch 6", brand: "Samsung", connected: true, battery: 64, lastSync: "5 min ago" },
  { id: "fitbit", name: "Fitbit Charge 6", brand: "Fitbit", connected: false, battery: 12, lastSync: "3 hrs ago" },
  { id: "ecg-monitor", name: "ECG Monitor Pro", brand: "MedTech", connected: true, battery: 91, lastSync: "1 min ago" },
  { id: "bp-monitor", name: "BP Monitor X1", brand: "Omron", connected: true, battery: 55, lastSync: "10 min ago" },
  { id: "glucose-sensor", name: "Glucose Sensor G7", brand: "Dexcom", connected: false, battery: 40, lastSync: "1 hr ago" },
  { id: "smart-ring", name: "Smart Ring Aura", brand: "Oura", connected: true, battery: 73, lastSync: "just now" },
];

export const chatSuggestions: string[] = [
  "Why is my heart rate high?",
  "Explain my blood report.",
  "Give diet plan.",
  "Can I exercise today?",
];

export const initialChat: ChatMessage[] = [
  {
    id: "1",
    role: "ai",
    content: "Hi Alex, I'm your LifeTwin AI health assistant. Ask me anything about your vitals, reports, or wellness plan.",
    timestamp: "09:00 AM",
  },
];

export const patients: Patient[] = [
  { id: "p1", name: "Alex Johnson", age: 34, healthScore: 92, riskLevel: "low", vitals: { heartRate: 72, bp: "118/76", spo2: 98 }, lastVisit: "Jul 10, 2026" },
  { id: "p2", name: "Priya Sharma", age: 41, healthScore: 78, riskLevel: "medium", vitals: { heartRate: 88, bp: "132/85", spo2: 96 }, lastVisit: "Jul 8, 2026" },
  { id: "p3", name: "Michael Chen", age: 58, healthScore: 61, riskLevel: "high", vitals: { heartRate: 95, bp: "148/94", spo2: 93 }, lastVisit: "Jul 5, 2026" },
  { id: "p4", name: "Sarah Williams", age: 29, healthScore: 88, riskLevel: "low", vitals: { heartRate: 68, bp: "112/72", spo2: 99 }, lastVisit: "Jul 11, 2026" },
  { id: "p5", name: "Rahul Verma", age: 47, healthScore: 70, riskLevel: "medium", vitals: { heartRate: 81, bp: "128/82", spo2: 97 }, lastVisit: "Jul 9, 2026" },
];

export const heartRateTrend: TrendPoint[] = [
  { label: "Mon", value: 70 }, { label: "Tue", value: 74 }, { label: "Wed", value: 71 },
  { label: "Thu", value: 76 }, { label: "Fri", value: 73 }, { label: "Sat", value: 69 }, { label: "Sun", value: 72 },
];

export const bloodPressureTrend: TrendPoint[] = [
  { label: "Mon", value: 120 }, { label: "Tue", value: 122 }, { label: "Wed", value: 119 },
  { label: "Thu", value: 121 }, { label: "Fri", value: 118 }, { label: "Sat", value: 117 }, { label: "Sun", value: 118 },
];

export const sleepTrend: TrendPoint[] = [
  { label: "Mon", value: 6.5 }, { label: "Tue", value: 7.1 }, { label: "Wed", value: 6.8 },
  { label: "Thu", value: 7.4 }, { label: "Fri", value: 7.6 }, { label: "Sat", value: 8.1 }, { label: "Sun", value: 7.9 },
];

export const activityTrend: TrendPoint[] = [
  { label: "Mon", value: 6000 }, { label: "Tue", value: 7200 }, { label: "Wed", value: 6800 },
  { label: "Thu", value: 7900 }, { label: "Fri", value: 8100 }, { label: "Sat", value: 8000 }, { label: "Sun", value: 8432 },
];

export const diseaseRiskTrend: TrendPoint[] = [
  { label: "Jan", value: 22 }, { label: "Feb", value: 20 }, { label: "Mar", value: 19 },
  { label: "Apr", value: 17 }, { label: "May", value: 16 }, { label: "Jun", value: 15 }, { label: "Jul", value: 14 },
];

export const emergencyTimeline = [
  { time: "09:42 AM", event: "Elevated heart rate detected (128 bpm)", status: "warning" },
  { time: "09:43 AM", event: "AI verified reading with ECG sensor", status: "info" },
  { time: "09:44 AM", event: "Notification sent to emergency contacts", status: "success" },
  { time: "09:46 AM", event: "Heart rate stabilized to 84 bpm", status: "success" },
];

export const digitalTwinOrgans = [
  { id: "heart", label: "Heart", value: "72 bpm", position: "top-[38%] left-[46%]" },
  { id: "brain", label: "Brain", value: "Normal", position: "top-[8%] left-[46%]" },
  { id: "lungs", label: "Lungs", value: "16 rpm", position: "top-[32%] left-[62%]" },
  { id: "kidneys", label: "Kidneys", value: "Normal", position: "top-[52%] left-[34%]" },
  { id: "bp", label: "Blood Pressure", value: "118/76", position: "top-[60%] left-[64%]" },
  { id: "temp", label: "Temperature", value: "98.4°F", position: "top-[18%] left-[28%]" },
  { id: "spo2", label: "SpO2", value: "98%", position: "top-[70%] left-[40%]" },
  { id: "pulse", label: "Pulse", value: "72 bpm", position: "top-[45%] left-[20%]" },
];
