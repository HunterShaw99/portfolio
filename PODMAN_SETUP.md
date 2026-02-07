# Podman Setup for Prometheus Monitoring

This guide explains how to run the Prometheus monitoring stack using Podman instead of Docker. Podman is a daemonless container engine that provides a more secure alternative to Docker.

## Why Podman?

Podman offers several advantages:

- **Daemonless**: No background daemon required
- **Rootless**: Can run containers as non-root user
- **Security**: Better isolation and security features
- **Compatibility**: Drop-in replacement for Docker CLI
- **Standards-based**: Uses OCI container standards

## Setup Instructions

### 1. Install Podman

```bash
# On most Linux distributions:
sudo apt-get update
sudo apt-get install -y podman podman-compose

# For Fedora/RHEL:
sudo dnf install -y podman podman-compose

# Verify installation
podman --version
podman-compose --version
```

### 2. Build and Run with Podman

```bash
# Build and start the services
podman-compose up -d --build

# To stop the services
podman-compose down

# To view logs
podman-compose logs -f
```

### 3. Podman-Specific Commands

```bash
# List running containers
podman ps

# List all containers (including stopped)
podman ps -a

# View container logs
podman logs <container_name>

# Execute command in running container
podman exec -it <container_name> /bin/sh

# Remove stopped containers
podman container prune
```

## Podman Compose vs Docker Compose

The main differences you'll notice:

| Feature | Podman Compose | Docker Compose |
|---------|---------------|----------------|
| Daemon | No daemon | Requires dockerd |
| Root | Can run rootless | Typically needs root |
| Security | More secure by default | Needs additional config |
| Commands | `podman-compose` | `docker-compose` |
| Volumes | Uses `:Z` suffix for SELinux | No special syntax |

## Podman Security Enhancements

Our `docker-compose.yml` includes Podman-specific security features:

### 1. SELinux Context (`:Z` suffix)
```yaml
volumes:
  - ./prometheus.yml:/etc/prometheus/prometheus.yml:Z
  - prometheus_data:/prometheus:Z
```

The `:Z` suffix tells Podman to relabel the volume content with a shared SELinux context, which is important for rootless containers.

### 2. Capability Dropping
```yaml
cap_drop:
  - ALL
cap_add:
  - NET_BIND_SERVICE
```

This drops all Linux capabilities except `NET_BIND_SERVICE`, which allows binding to privileged ports.

### 3. Read-Only Filesystems
```yaml
read_only: true
tmpfs:
  - /tmp:size=100M,mode=1777
```

Containers run with read-only filesystems, with only `/tmp` mounted as writable temporary storage.

### 4. Security Options
```yaml
security_opt:
  - no-new-privileges:true
```

Prevents containers from gaining additional privileges.

## Podman Networking

The setup uses a dedicated bridge network:

```yaml
networks:
  monitoring-network:
    driver: bridge
    enable_ipv6: false
```

You can inspect the network with:
```bash
podman network ls
podman network inspect monitoring-network
```

## Podman Volumes

Volumes are configured for persistent storage:

```yaml
volumes:
  prometheus_data:
    driver: local
    driver_opts:
      type: none
      device: ./prometheus_data
      o: bind
```

This creates a local directory `./prometheus_data` for persistent metrics storage.

## Podman in Production

### Rootless Operation

To run Podman rootless (recommended):

```bash
# Set up rootless Podman
podman setup

# Run as regular user
podman-compose up -d
```

### Systemd Integration

For production deployments, use systemd:

```bash
# Generate systemd service files
podman generate systemd --name portfolio_app --files
podman generate systemd --name portfolio_prometheus --files

# Copy to systemd directory
sudo cp container-portfolio_app.service /etc/systemd/system/
sudo cp container-portfolio_prometheus.service /etc/systemd/system/

# Enable and start services
sudo systemctl enable container-portfolio_app.service
sudo systemctl enable container-portfolio_prometheus.service
sudo systemctl start container-portfolio_app.service
sudo systemctl start container-portfolio_prometheus.service
```

### Resource Limits

Add resource limits to the compose file for production:

```yaml
services:
  app:
    mem_limit: 512m
    cpus: 1.0
    
  prometheus:
    mem_limit: 256m
    cpus: 0.5
```

## Troubleshooting Podman

### Common Issues

#### 0. Volume Mounting Errors

If you get errors like "special device ./prometheus_data does not exist":

```bash
# Run the setup script first
./setup-monitoring.sh

# Or manually create the directory
mkdir -p prometheus_data
chmod 755 prometheus_data
chown -R $USER:$USER prometheus_data

# Then start the containers
podman-compose up -d --build
```

#### 1. Port Binding Permissions

If you get permission errors when binding to ports < 1024:

```bash
# Option 1: Use higher ports (recommended)
ports:
  - "8080:3000"  # Instead of 80:3000

# Option 2: Allow port binding
sudo setcap 'cap_net_bind_service=+ep' /usr/bin/podman
```

#### 2. Volume Permission Issues

```bash
# Ensure directories exist and have correct permissions
mkdir -p prometheus_data
chmod 755 prometheus_data

# For rootless Podman, ensure your user owns the directories
chown -R $USER:$USER prometheus_data
```

#### 3. Network Connectivity

```bash
# Check if containers can communicate
podman exec -it app ping prometheus

# Inspect network
podman network inspect monitoring-network
```

#### 4. SELinux Issues

```bash
# Check SELinux context
ls -Z prometheus_data

# Temporarily set SELinux to permissive for testing
sudo setenforce 0
```

## Podman Compose Commands

```bash
# Build and start services
podman-compose up -d --build

# Stop services
podman-compose down

# Rebuild and restart
podman-compose down && podman-compose up -d --build

# View status
podman-compose ps

# Pull latest images
podman-compose pull

# Scale services (if needed)
podman-compose up -d --scale app=2
```

## Migration from Docker to Podman

If you're migrating from Docker:

```bash
# Stop Docker services
docker-compose down

# Clean up Docker (optional)
sudo systemctl stop docker
sudo systemctl disable docker

# Start with Podman
podman-compose up -d --build
```

## Podman Best Practices

1. **Use Rootless**: Always prefer rootless operation
2. **Minimal Privileges**: Drop all capabilities except what's needed
3. **Read-Only Filesystems**: Make containers read-only where possible
4. **Resource Limits**: Set memory and CPU limits
5. **Regular Updates**: Keep Podman and images updated
6. **Health Checks**: Add health checks to your services
7. **Logging**: Configure proper logging drivers

## Podman vs Docker Performance

Podman generally has:
- Slightly slower startup (no daemon)
- Better security posture
- Lower memory footprint (no daemon)
- More consistent with OCI standards

For this monitoring setup, the performance difference is negligible.

## Additional Podman Features

### Podman Pods

You can create pods (groups of containers):

```bash
# Create a pod
podman pod create --name monitoring-pod -p 3000:3000 -p 9090:9090

# Run containers in the pod
podman run -d --pod monitoring-pod --name app portfolio-image
podman run -d --pod monitoring-pod --name prometheus prom/prometheus:latest
```

### Podman Quadlets

For systemd integration, Podman offers quadlets:

```bash
# Create quadlet files
mkdir -p ~/.config/containers/systemd/

# Example: portfolio-app.container
[Unit]
Description=Portfolio App

[Container]
Image=portfolio:latest
PublishPort=3000:3000
Environment=NODE_ENV=production

[Install]
WantedBy=default.target
```

## Conclusion

Podman provides a secure, daemonless alternative to Docker that works perfectly with this Prometheus monitoring setup. The configuration is designed to work with both Docker and Podman, with Podman-specific optimizations for security and reliability.

For production deployments on Digital Ocean, Podman is an excellent choice due to its security features and compatibility with modern container standards.