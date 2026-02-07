#!/bin/bash

# Script to set up Prometheus authentication
# This script generates password hashes and configures Prometheus with basic auth

echo "🔐 Setting up Prometheus authentication..."

# Check if we have the required tools
if ! command -v htpasswd &> /dev/null; then
    echo "❌ htpasswd not found. Installing apache2-utils..."
    sudo apt-get update && sudo apt-get install -y apache2-utils
fi

# Create auth directory if it doesn't exist
mkdir -p prometheus_auth

echo "📝 Creating password file..."

# Generate password file (you'll be prompted for passwords)
echo "Please enter a password for the 'admin' user:"
htpasswd -B -c prometheus_auth/prometheus.users admin

# Add additional users (optional)
read -p "Do you want to add another user? (y/n): " add_user
if [[ "$add_user" =~ ^[Yy]$ ]]; then
    read -p "Enter username: " username
    htpasswd -B prometheus_auth/prometheus.users "$username"
fi

echo "✅ Password file created: prometheus_auth/prometheus.users"

# Generate web config with the hashed password
HASHED_PASSWORD=$(grep admin prometheus_auth/prometheus.users | cut -d: -f2)

echo "📋 Updating Prometheus web configuration..."

# Create the web config file
cat > prometheus-web-config.yml << EOF
# Prometheus web configuration for basic authentication
# This file configures HTTP basic authentication for Prometheus UI and API

# Basic authentication configuration
basic_auth_users:
  admin: $HASHED_PASSWORD

# HTTP server configuration
http_server_config:
  http2: true
  enable_compression: true
EOF

echo "✅ Web configuration updated with authentication"

# Update docker-compose.yml to use the web config
if ! grep -q "web.config.file" docker-compose.yml; then
    echo "🔧 Updating docker-compose.yml..."
    
    # Add the web config volume mount
    sed -i '/- \/etc\/prometheus\/console_libraries/a\      - ./prometheus-web-config.yml:/etc/prometheus/web-config.yml:Z' docker-compose.yml
    
    # Add the web config flag
    sed -i '/--web.enable-lifecycle/a\      - --web.config.file=/etc/prometheus/web-config.yml' docker-compose.yml
    
    echo "✅ docker-compose.yml updated with web config"
else
    echo "ℹ️  Web config already configured in docker-compose.yml"
fi

echo ""
echo "🎉 Prometheus authentication setup complete!"
echo ""
echo "📋 Summary:"
echo "  - Password file: prometheus_auth/prometheus.users"
echo "  - Web config: prometheus-web-config.yml"
echo "  - Authentication: Basic Auth enabled"
echo ""
echo "🔑 Credentials:"
echo "  - Username: admin"
echo "  - Password: [the one you entered]"
echo ""
echo "🚀 To apply the changes, restart Prometheus:"
echo "  podman-compose down && podman-compose up -d --build"
echo ""
echo "🔒 After restart, Prometheus UI will require authentication!"
echo "  Access: http://localhost:9090"
echo "  You'll be prompted for username/password"