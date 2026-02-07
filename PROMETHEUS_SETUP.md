# Prometheus Monitoring Setup for Next.js Portfolio

This document explains the Prometheus monitoring setup for the Next.js portfolio application.

## Overview

This implementation uses the **official Prometheus Docker image** (`prom/prometheus:latest`) in a multi-container setup with Docker Compose. This approach is more secure and maintainable than using npm packages.

## Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                        Digital Ocean Droplet                     │
├─────────────────┬─────────────────────┬───────────────────────┤
│  Next.js App     │  Prometheus Server   │  (Optional) Grafana   │
│  Container       │  Container           │  Container            │
└─────────────────┴─────────────────────┴───────────────────────┘
```

## Components

### 1. Next.js Application Metrics

The Next.js application exposes metrics at `/api/metrics` endpoint with:

- **Request Counting**: Total requests, requests by path, requests by HTTP method
- **Response Tracking**: Response status codes (2xx, 4xx, 5xx)
- **Performance Metrics**: Average response times by endpoint
- **System Metrics**: Memory usage, CPU usage, uptime
- **Error Tracking**: Total error count

### 2. Prometheus Server

- **Official Image**: `prom/prometheus:latest`
- **Port**: 9090
- **Configuration**: `prometheus.yml`
- **Storage**: Persistent volume for metrics data

### 3. Docker Compose

Manages the multi-container setup with:
- Next.js application container
- Prometheus server container
- Shared network for communication
- Volume for persistent metrics storage

## Setup Instructions

### 1. Build and Start the Services

**With Docker:**
```bash
# Build and start all services
docker-compose up -d --build

# To stop the services
docker-compose down

# To view logs
docker-compose logs -f
```

**With Podman:**
```bash
# Build and start all services
podman-compose up -d --build

# To stop the services
podman-compose down

# To view logs
podman-compose logs -f
```

### 2. Access the Services

- **Next.js Application**: `http://localhost:3000`
- **Prometheus UI**: `http://localhost:9090`
- **Metrics Endpoint**: `http://localhost:3000/api/metrics`

### 3. Verify Prometheus is Scraping Metrics

1. Open Prometheus UI at `http://localhost:9090`
2. Go to "Status" > "Targets"
3. Verify that the `nextjs-app` target shows as "UP"

### 4. Query Metrics

You can query metrics directly in Prometheus:

- `nodejs_request_count` - Total requests
- `nodejs_error_count` - Total errors  
- `http_requests_total{path="/"}` - Requests to homepage
- `http_responses_total{status="5xx"}` - Server errors
- `nodejs_memory_heap_used_bytes` - Memory usage

## Prometheus Configuration

The `prometheus.yml` file contains:

```yaml
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  
  - job_name: 'nextjs-app'
    metrics_path: '/api/metrics'
    static_configs:
      - targets: ['app:3000']  # Docker service name
    scrape_interval: 10s
```

## Metrics Endpoint

The `/api/metrics` endpoint exposes metrics in Prometheus format:

```
# HELP nodejs_request_count Total number of HTTP requests
# TYPE nodejs_request_count counter
nodejs_request_count 42

# HELP http_requests_total{path="/"} Total HTTP requests to /
# TYPE http_requests_total{path="/"} counter  
http_requests_total{path="/"} 25

# HELP http_request_duration_seconds{path="/"} Average request duration
# TYPE http_request_duration_seconds{path="/"} gauge
http_request_duration_seconds{path="/"} 0.123
```

## Middleware Integration

The `app/middleware.ts` file tracks:

- All incoming HTTP requests
- Request paths and methods
- Response times
- Status codes
- Error counts

## Alerting (Future Enhancement)

To add alerting, uncomment and configure the alerting section in `prometheus.yml` and add alert rules.

## Grafana Integration (Optional)

To add Grafana for visualization:

1. Uncomment the Grafana service in `docker-compose.yml`
2. Access Grafana at `http://localhost:3001`
3. Add Prometheus as a data source
4. Create dashboards for your metrics

## Deployment to Digital Ocean

### 1. Update Docker Compose for Production

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "80:3000"  # Use port 80 for web traffic
    restart: always
    
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - prometheus_data:/prometheus
    restart: always
```

### 2. Deploy with Docker Compose

```bash
# On your Digital Ocean droplet:
docker-compose up -d --build
```

### 3. Deploy with Podman (Recommended for Security)

```bash
# Install Podman on Digital Ocean droplet
sudo apt-get update
sudo apt-get install -y podman podman-compose

# Build and start with Podman
podman-compose up -d --build

# For production systemd integration:
podman generate systemd --name portfolio_app --files
podman generate systemd --name portfolio_prometheus --files
sudo cp container-*.service /etc/systemd/system/
sudo systemctl enable --now container-portfolio_*.service
```

### 3. Secure Prometheus

Add authentication to Prometheus by:

1. Using Digital Ocean firewall rules
2. Adding basic auth via Nginx reverse proxy
3. Using Digital Ocean's private networking

## Monitoring Best Practices

1. **Resource Limits**: Set memory and CPU limits in production
2. **Retention**: Configure metrics retention in Prometheus
3. **Backups**: Regularly backup Prometheus data volume
4. **Alerts**: Set up alerts for critical metrics
5. **Security**: Secure Prometheus endpoint with authentication
6. **Container Engine**: Consider Podman for better security (daemonless, rootless)

## Troubleshooting

### Prometheus not scraping metrics

1. Check container logs: `docker-compose logs prometheus`
2. Verify network connectivity: `docker network inspect portfolio_monitoring-network`
3. Test metrics endpoint: `curl http://localhost:3000/api/metrics`
4. Check Prometheus targets: `http://localhost:9090/targets`

### High memory usage

1. Adjust scrape intervals in `prometheus.yml`
2. Limit metrics retention with `--storage.tsdb.retention.time` flag
3. Optimize the metrics being collected

## Future Enhancements

1. **Custom Business Metrics**: Track portfolio-specific metrics (views, downloads, etc.)
2. **Alerting Rules**: Add alerting for error rates, high response times
3. **Grafana Dashboards**: Pre-configured dashboards for portfolio monitoring
4. **Long-term Storage**: Integrate with remote storage solutions
5. **Service Discovery**: Auto-discovery for dynamic environments

## Security Considerations

1. **Prometheus Port**: Don't expose Prometheus port (9090) to the public internet
2. **Authentication**: Add authentication to Prometheus UI
3. **Network Isolation**: Use Docker networks to isolate monitoring traffic
4. **Data Sensitivity**: Be cautious about exposing sensitive data in metrics
