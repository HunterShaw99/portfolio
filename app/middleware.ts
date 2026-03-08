import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const metrics = {
  totalRequests: 0,
  requestsByPath: new Map<string, number>(),
  requestsByMethod: new Map<string, number>(),
  requestsByStatus: new Map<string, number>(),
  responseTimes: new Map<string, number[]>(),
  errorCount: 0,
  startTime: Date.now(),
};

export function getCurrentMetrics() {
  return metrics;
}

export default async function middleware(request: NextRequest) {
  const start = Date.now();
  const path = request.nextUrl.pathname;
  const method = request.method;

  metrics.totalRequests++;

  const currentPathCount = metrics.requestsByPath.get(path) || 0;
  metrics.requestsByPath.set(path, currentPathCount + 1);

  const currentMethodCount = metrics.requestsByMethod.get(method) || 0;
  metrics.requestsByMethod.set(method, currentMethodCount + 1);

  const response = NextResponse.next();

  const responseTime = Date.now() - start;

  const currentResponseTimes = metrics.responseTimes.get(path) || [];
  currentResponseTimes.push(responseTime);
  metrics.responseTimes.set(path, currentResponseTimes);

  return response;
}

export function updateResponseStatus(status: number) {
  const statusKey = Math.floor(status / 100).toString() + "xx"; // e.g., "2xx", "4xx"
  const currentStatusCount = metrics.requestsByStatus.get(statusKey) || 0;
  metrics.requestsByStatus.set(statusKey, currentStatusCount + 1);

  if (status >= 400) {
    metrics.errorCount++;
  }
}

export const config = {
  matcher: ["/((?!api/metrics|_next/static|_next/image|favicon.ico).*)"],
};
