import { useEffect, useState, useMemo } from "react";
import { ArrowLeft, Download } from "lucide-react";
import { fetchRegistrations, fetchBranches, fetchPageViews } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNavigate } from "react-router-dom";
import type { Branch } from "@/types";

const chartConfig = {
  count: {
    label: "Registrations",
    color: "#0066cc",
  },
} satisfies ChartConfig;

export function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [pageViews, setPageViews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("all");

  useEffect(() => {
    Promise.all([
      fetchRegistrations(),
      fetchBranches(),
      fetchPageViews()
    ])
      .then(([regsRes, branchesRes, pageViewsRes]) => {
        setData(regsRes);
        setBranches(branchesRes);
        setPageViews(pageViewsRes);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const uniqueDates = useMemo(() => {
    const dates = new Set(data.map(d => d.preferredDate).filter(Boolean));
    return Array.from(dates).sort();
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchBranch = selectedBranch === "all" || item.preferredStore === selectedBranch;
      const matchDate = selectedDate === "all" || item.preferredDate === selectedDate;
      return matchBranch && matchDate;
    });
  }, [data, selectedBranch, selectedDate]);

  const totalRegistrations = filteredData.length;

  const byStore = useMemo(() => {
    const counts = filteredData.reduce((acc, curr) => {
      const store = curr.preferredStore || "Unknown";
      acc[store] = (acc[store] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([store, count]) => ({ store, count }))
      .sort((a, b) => b.count - a.count);
  }, [filteredData]);

  const byDate = useMemo(() => {
    const counts = filteredData.reduce((acc, curr) => {
      const date = curr.preferredDate || "Unknown";
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredData]);

  const exportToCSV = () => {
    if (filteredData.length === 0) return;

    // Define CSV headers based on db.json data structure
    const headers = ["Name", "Email", "Phone", "Preferred Store", "Preferred Date", "Registered At"];

    // Convert data to CSV format
    const csvRows = [
      headers.join(","),
      ...filteredData.map(row => {
        return [
          `"${row.name || ""}"`,
          `"${row.email || ""}"`,
          `"${row.phone || ""}"`,
          `"${row.preferredStore || ""}"`,
          `"${row.preferredDate || ""}"`,
          `"${new Date(row.createdAt).toLocaleString() || ""}"`
        ].join(",");
      })
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] py-12 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-[30px] md:text-[40px] font-semibold text-ink leading-none tracking-[-0.28px]">
              Analyst View
            </h1>
            <p className="text-[#7a7a7a] text-[17px] mt-2">
              Overview of free eye test campaign registrations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="utility" onClick={exportToCSV} className="gap-2 h-[40px] px-[20px] rounded-full border-[#e0e0e0] text-ink hover:bg-[#f5f5f7] cursor-pointer shadow-none">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-[18px] border border-[#e0e0e0]">
          <div className="flex-1 space-y-2">
            <label className="text-[13px] font-semibold text-[#7a7a7a] uppercase tracking-wider">Filter by Branch</label>
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-full h-[44px] rounded-xl border-[#e0e0e0]">
                <SelectValue placeholder="All Branches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {branches.map(b => (
                  <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-[13px] font-semibold text-[#7a7a7a] uppercase tracking-wider">Filter by Date</label>
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-full h-[44px] rounded-xl border-[#e0e0e0]">
                <SelectValue placeholder="All Dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                {uniqueDates.map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Total Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-[18px] border-[#e0e0e0] shadow-none">
            <CardHeader>
              <CardTitle className="font-display text-[21px]">Total Registrations</CardTitle>
              <CardDescription>Total users signed up for the campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-display text-[56px] font-semibold text-[#0066cc] leading-none">
                {totalRegistrations}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[18px] border-[#e0e0e0] shadow-none">
            <CardHeader>
              <CardTitle className="font-display text-[21px]">Total Page Views</CardTitle>
              <CardDescription>All-time recorded page visits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-display text-[56px] font-semibold text-ink leading-none">
                {pageViews.length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* By Store Bar Chart */}
          <Card className="rounded-[18px] border-[#e0e0e0] shadow-none">
            <CardHeader>
              <CardTitle className="font-display text-[21px]">Registrations by Branch</CardTitle>
              <CardDescription>Distribution across store locations</CardDescription>
            </CardHeader>
            <CardContent>
              {byStore.length > 0 ? (
                <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                  <BarChart accessibilityLayer data={byStore} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="store"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => value.length > 15 ? value.substring(0, 15) + "..." : value}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="flex h-[300px] items-center justify-center text-[#7a7a7a]">No data available</div>
              )}
            </CardContent>
          </Card>

          {/* By Date Line Chart */}
          <Card className="rounded-[18px] border-[#e0e0e0] shadow-none">
            <CardHeader>
              <CardTitle className="font-display text-[21px]">Registrations by Date</CardTitle>
              <CardDescription>Trend of preferred dates selected</CardDescription>
            </CardHeader>
            <CardContent>
              {byDate.length > 0 ? (
                <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                  <LineChart accessibilityLayer data={byDate} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="count" stroke="var(--color-count)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ChartContainer>
              ) : (
                <div className="flex h-[300px] items-center justify-center text-[#7a7a7a]">No data available</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
