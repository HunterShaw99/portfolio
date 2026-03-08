import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentMetrics } from "../../middleware";

export async function GET(request: NextRequest) {
  const appMetrics = getCurrentMetrics();

  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  const now = Date.now();

  const avgResponseTimes: Record<string, number> = {};
  appMetrics.responseTimes.forEach((times, path) => {
    if (times.length > 0) {
      const avg = times.reduce((sum, time) => sum + time, 0) / times.length;
      avgResponseTimes[path.replace(/\//g, "_").replace(/\W/g, "_")] = avg;
    }
  });

  const metrics = `
# HELP nodejs_request_count Total number of HTTP requests
# TYPE nodejs_request_count counter
nodejs_request_count ${appMetrics.totalRequests}

# HELP nodejs_error_count Total number of errors
# TYPE nodejs_error_count counter
nodejs_error_count ${appMetrics.errorCount}

# HELP nodejs_request_rate Request rate per second
# TYPE nodejs_request_rate gauge
nodejs_request_rate ${(appMetrics.totalRequests / uptime).toFixed(2)}

# HELP nodejs_uptime Node.js process uptime in seconds
# TYPE nodejs_uptime gauge
nodejs_uptime ${uptime}

# HELP nodejs_memory_heap_used_bytes Node.js heap memory usage in bytes
# TYPE nodejs_memory_heap_used_bytes gauge
nodejs_memory_heap_used_bytes ${memoryUsage.heapUsed}

# HELP nodejs_memory_heap_total_bytes Node.js total heap size in bytes
# TYPE nodejs_memory_heap_total_bytes gauge
nodejs_memory_heap_total_bytes ${memoryUsage.heapTotal}

# HELP nodejs_memory_rss_bytes Node.js resident set size in bytes
# TYPE nodejs_memory_rss_bytes gauge
nodejs_memory_rss_bytes ${memoryUsage.rss}

# HELP nodejs_last_request_timestamp Timestamp of last request
# TYPE nodejs_last_request_timestamp gauge
nodejs_last_request_timestamp ${now}

# HELP process_cpu_usage CPU usage percentage
# TYPE process_cpu_usage gauge
process_cpu_usage ${((process.cpuUsage().user / (uptime * 1000000)) * 100).toFixed(2)}

# HELP nodejs_active_requests Currently active requests
# TYPE nodejs_active_requests gauge
nodejs_active_requests 1

# HTTP Request Metrics by Path
${Array.from(appMetrics.requestsByPath.entries())
  .map(([path, count]) => {
    const safePath = path.replace(/\//g, "_").replace(/\W/g, "_");
    return `# HELP http_requests_total{path="${safePath}"} Total HTTP requests to ${path}
# TYPE http_requests_total{path="${safePath}"} counter
http_requests_total{path="${safePath}"} ${count}`;
  })
  .join("\n\n")}

# HTTP Request Metrics by Method
${Array.from(appMetrics.requestsByMethod.entries())
  .map(([method, count]) => {
    return `# HELP http_requests_total{method="${method}"} Total HTTP requests by method ${method}
# TYPE http_requests_total{method="${method}"} counter
http_requests_total{method="${method}"} ${count}`;
  })
  .join("\n\n")}

# HTTP Response Status Metrics
${Array.from(appMetrics.requestsByStatus.entries())
  .map(([status, count]) => {
    return `# HELP http_responses_total{status="${status}"} Total HTTP responses by status ${status}
# TYPE http_responses_total{status="${status}"} counter
http_responses_total{status="${status}"} ${count}`;
  })
  .join("\n\n")}

# Average Response Times by Path
${Object.entries(avgResponseTimes)
  .map(([path, avgTime]) => {
    return `# HELP http_request_duration_seconds{path="${path}"} Average request duration in seconds for ${path}
# TYPE http_request_duration_seconds{path="${path}"} gauge
http_request_duration_seconds{path="${path}"} ${(avgTime / 1000).toFixed(3)}`;
  })
  .join("\n\n")}
`;

  return new NextResponse(metrics, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; version=0.0.4; charset=utf-8",
    },
  });
}

export async function POST(request: NextRequest) {
  const appMetrics = getCurrentMetrics();
  appMetrics.errorCount++;
  return NextResponse.json({
    status: "error recorded",
    errorCount: appMetrics.errorCount,
  });
}
