#!/bin/bash

# Quick test script to verify volume setup works

echo "🧪 Testing volume setup..."

# Create the directory if it doesn't exist
if [ ! -d "prometheus_data" ]; then
    echo "📁 Creating prometheus_data directory..."
    mkdir -p prometheus_data
    echo "✅ Directory created"
else
    echo "✅ prometheus_data directory already exists"
fi

# Test writing to the directory
echo "📝 Testing write permissions..."
echo "Volume test: $(date)" > prometheus_data/volume_test.txt
if [ $? -eq 0 ]; then
    echo "✅ Write permissions OK"
else
    echo "❌ Write permissions failed"
    exit 1
fi

# Test reading from the directory
if [ -f "prometheus_data/volume_test.txt" ]; then
    echo "✅ Read permissions OK"
    echo "   Content: $(cat prometheus_data/volume_test.txt)"
else
    echo "❌ Read permissions failed"
    exit 1
fi

# Clean up test file
rm prometheus_data/volume_test.txt

echo ""
echo "🎉 Volume setup test passed!"
echo ""
echo "You can now run:"
echo "  npm run monitoring:start"
echo "  # or"
echo "  podman-compose up -d --build"