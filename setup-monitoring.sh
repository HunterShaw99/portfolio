#!/bin/bash

# Setup script for Prometheus monitoring with Podman/Docker
# This script ensures all necessary directories exist and have proper permissions

echo "🚀 Setting up Prometheus monitoring..."

# Create required directories
echo "📁 Creating required directories..."
mkdir -p prometheus_data
echo "✅ Created prometheus_data directory"

# Set proper permissions (especially important for Podman rootless)
echo "🔐 Setting up permissions..."
chmod 755 prometheus_data
if command -v podman &> /dev/null; then
    echo "🐋 Podman detected - setting up for rootless operation"
    # Ensure current user owns the directories
    chown -R $USER:$USER prometheus_data
    # Set SELinux context if available
    if command -v chcon &> /dev/null; then
        chcon -R -t container_file_t prometheus_data || true
    fi
else
    echo "🐳 Docker detected - using standard permissions"
fi

# Create a simple test file to verify volume mounting
cat > prometheus_data/test-volume.txt << 'EOF'
This file verifies that the volume mount is working correctly.
Created at: $(date)
EOF

echo "✅ Volume setup complete!"

# Check if podman-compose is available
echo "🔍 Checking container runtime..."
if command -v podman-compose &> /dev/null; then
    echo "✅ podman-compose is available"
    RUNTIME="podman-compose"
elif command -v docker-compose &> /dev/null; then
    echo "✅ docker-compose is available"
    RUNTIME="docker-compose"
else
    echo "❌ Neither podman-compose nor docker-compose found"
    echo "Please install one of them:"
    echo "  - For Podman: sudo apt-get install podman-compose"
    echo "  - For Docker: sudo apt-get install docker-compose"
    exit 1
fi

echo ""
echo "📋 Setup Summary:"
echo "  - Directories created: prometheus_data/"
echo "  - Permissions configured for current user"
echo "  - Container runtime: $RUNTIME"
echo ""
echo "🚀 Ready to start monitoring!"
echo ""
echo "To start the monitoring stack, run:"
echo "  npm run monitoring:start"
echo "  # or"
echo "  $RUNTIME up -d --build"
echo ""
echo "To verify everything is working:"
echo "  curl http://localhost:3000/api/metrics"
echo "  # Check Prometheus UI at http://localhost:9090"