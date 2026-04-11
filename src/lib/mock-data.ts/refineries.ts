// src/lib/mock-data/refineries.ts

import { Refinery } from "@/types";

export const mockRefineries: Refinery[] = [
  {
    id: "ref-001",
    name: "Dangote Refinery",
    location: "Lekki Free Trade Zone, Lagos",
    status: "active",
    capacity: "650,000 bpd",
    logo: "/images/refineries/dangote.png",
    products: [
      {
        type: "AGO",
        exWorksPrice: 1120.0,
        previousPrice: 1115.0,
        lastUpdated: "2025-02-19T06:00:00Z",
        availability: "available",
      },
      {
        type: "PMS",
        exWorksPrice: 860.0,
        previousPrice: 855.0,
        lastUpdated: "2025-02-19T06:00:00Z",
        availability: "available",
      },
      {
        type: "DPK",
        exWorksPrice: 1050.0,
        previousPrice: 1050.0,
        lastUpdated: "2025-02-19T06:00:00Z",
        availability: "available",
      },
      {
        type: "JET_A1",
        exWorksPrice: 1180.0,
        previousPrice: 1175.0,
        lastUpdated: "2025-02-19T06:00:00Z",
        availability: "available",
      },
    ],
  },
  {
    id: "ref-002",
    name: "Port Harcourt Refinery (PHRC)",
    location: "Alesa-Eleme, Rivers State",
    status: "active",
    capacity: "210,000 bpd",
    logo: "/images/refineries/nnpc.png",
    products: [
      {
        type: "AGO",
        exWorksPrice: 1125.0,
        previousPrice: 1120.0,
        lastUpdated: "2025-02-19T05:00:00Z",
        availability: "available",
      },
      {
        type: "PMS",
        exWorksPrice: 865.0,
        previousPrice: 860.0,
        lastUpdated: "2025-02-19T05:00:00Z",
        availability: "limited",
      },
    ],
  },
  {
    id: "ref-003",
    name: "Warri Refinery (WRPC)",
    location: "Warri, Delta State",
    status: "limited",
    capacity: "125,000 bpd",
    logo: "/images/refineries/nnpc.png",
    products: [
      {
        type: "AGO",
        exWorksPrice: 1130.0,
        previousPrice: 1128.0,
        lastUpdated: "2025-02-18T14:00:00Z",
        availability: "limited",
      },
    ],
  },
  {
    id: "ref-004",
    name: "Kaduna Refinery (KRPC)",
    location: "Kaduna State",
    status: "inactive",
    capacity: "110,000 bpd",
    logo: "/images/refineries/nnpc.png",
    products: [],
  },
  {
    id: "ref-005",
    name: "BUA Refinery",
    location: "Akwa Ibom State",
    status: "coming-soon",
    capacity: "200,000 bpd",
    logo: "/images/refineries/bua.png",
    products: [],
    expectedLaunch: "Q4 2025",
  },
  {
    id: "ref-006",
    name: "Waltersmith Refinery",
    location: "Ibigwe, Imo State",
    status: "active",
    capacity: "5,000 bpd",
    logo: "/images/refineries/waltersmith.png",
    products: [
      {
        type: "AGO",
        exWorksPrice: 1135.0,
        previousPrice: 1130.0,
        lastUpdated: "2025-02-19T04:00:00Z",
        availability: "limited",
      },
    ],
  },
];

export const getActiveRefineries = (): Refinery[] => {
  return mockRefineries.filter((r) => r.status === "active" || r.status === "limited");
};

export const getRefineryById = (id: string): Refinery | undefined => {
  return mockRefineries.find((r) => r.id === id);
};