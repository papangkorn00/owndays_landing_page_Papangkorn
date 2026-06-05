import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] py-12 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <Skeleton className="h-[40px] w-[250px] rounded-md" />
            <Skeleton className="h-[20px] w-[350px] rounded-md" />
          </div>
          <Skeleton className="h-[48px] w-[150px] rounded-full" />
        </div>

        {/* Total Summary Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-[18px] border-[#e0e0e0] shadow-none">
            <CardHeader>
              <Skeleton className="h-[24px] w-[180px] rounded-md mb-2" />
              <Skeleton className="h-[16px] w-[220px] rounded-md" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[56px] w-[100px] rounded-md" />
            </CardContent>
          </Card>
        </div>

        {/* Charts Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-[18px] border-[#e0e0e0] shadow-none">
            <CardHeader>
              <Skeleton className="h-[24px] w-[200px] rounded-md mb-2" />
              <Skeleton className="h-[16px] w-[240px] rounded-md" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full rounded-md" />
            </CardContent>
          </Card>
          <Card className="rounded-[18px] border-[#e0e0e0] shadow-none">
            <CardHeader>
              <Skeleton className="h-[24px] w-[200px] rounded-md mb-2" />
              <Skeleton className="h-[16px] w-[240px] rounded-md" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
