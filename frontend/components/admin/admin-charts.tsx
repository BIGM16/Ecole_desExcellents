"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getEnrollmentTrend } from "@/lib/services/stats.service";

interface EnrollmentChartData {
  month: string;
  etudiants: number;
  cours: number;
}

const performanceData = [
  { category: "Excellent", count: 145 },
  { category: "Très Bien", count: 98 },
  { category: "Bien", count: 56 },
  { category: "Assez Bien", count: 25 },
];

export function AdminCharts() {
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentChartData[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getEnrollmentTrend();

        // Transformer les données pour les charts
        const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"];
        const formatted: EnrollmentChartData[] = months.map((month, idx) => ({
          month,
          etudiants: Math.floor(Math.random() * 100 + 200), // Données simulées
          cours: Math.floor(Math.random() * 20 + 50),
        }));

        setEnrollmentData(formatted);
      } catch (err: any) {
        const message = err.message || "Erreur lors du chargement";
        setError(message);
        console.error("Erreur trends:", message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrend();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-8 bg-muted rounded w-1/2 mb-4" />
            <div className="h-64 bg-muted rounded" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Erreur: {error}</div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Évolution des inscriptions */}
      <Card className="p-6 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Évolution des Inscriptions
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={enrollmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
            <XAxis dataKey="month" stroke="oklch(0.65 0 0)" />
            <YAxis stroke="oklch(0.65 0 0)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.15 0 0)",
                border: "1px solid oklch(0.25 0 0)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="etudiants"
              stroke="oklch(0.7 0.18 85)"
              strokeWidth={2}
              name="Étudiants"
            />
            <Line
              type="monotone"
              dataKey="cours"
              stroke="oklch(0.6 0.15 85)"
              strokeWidth={2}
              name="Cours"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Performance des étudiants */}
      <Card className="p-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Distribution des Performances
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
            <XAxis dataKey="category" stroke="oklch(0.65 0 0)" />
            <YAxis stroke="oklch(0.65 0 0)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.15 0 0)",
                border: "1px solid oklch(0.25 0 0)",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="count"
              fill="oklch(0.7 0.18 85)"
              name="Nombre d'étudiants"
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
