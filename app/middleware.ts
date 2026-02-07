// Middleware for tracking request metrics
// This middleware will track all incoming requests and update metrics

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory metrics (could be replaced with Redis in production)
const metrics = {
    totalRequests: 0,
    requestsByPath: new Map<string, number>(),
    requestsByMethod: new Map<string, number>(),
    requestsByStatus: new Map<string, number>(),
    responseTimes: new Map<string, number[]>(),
    errorCount: 0,
    startTime: Date.now()
}

export function middleware(request: NextRequest) {
    const start = Date.now()
    const path = request.nextUrl.pathname
    const method = request.method
    
    // Increment total request count
    metrics.totalRequests++
    
    // Track requests by path
    const currentPathCount = metrics.requestsByPath.get(path) || 0
    metrics.requestsByPath.set(path, currentPathCount + 1)
    
    // Track requests by method
    const currentMethodCount = metrics.requestsByMethod.get(method) || 0
    metrics.requestsByMethod.set(method, currentMethodCount + 1)
    
    // Continue with the request
    const response = NextResponse.next()
    
    // Calculate response time after the request completes
    const responseTime = Date.now() - start
    
    // Track response times by path
    const currentResponseTimes = metrics.responseTimes.get(path) || []
    currentResponseTimes.push(responseTime)
    metrics.responseTimes.set(path, currentResponseTimes)
    
    // Track status codes (we'll do this in a separate function since we can't modify response here)
    
    return response
}

// Helper function to get current metrics (can be used by the /api/metrics endpoint)
export function getCurrentMetrics() {
    return metrics
}

// Update metrics with response status (this would need to be called from API routes)
export function updateResponseStatus(status: number) {
    const statusKey = Math.floor(status / 100).toString() + 'xx'  // e.g., "2xx", "4xx"
    const currentStatusCount = metrics.requestsByStatus.get(statusKey) || 0
    metrics.requestsByStatus.set(statusKey, currentStatusCount + 1)
    
    if (status >= 400) {
        metrics.errorCount++
    }
}

// Configuration for middleware - apply to all routes except static files and metrics endpoint
export const config = {
    matcher: [
        '/((?!api/metrics|_next/static|_next/image|favicon.ico).*)',
    ],
}