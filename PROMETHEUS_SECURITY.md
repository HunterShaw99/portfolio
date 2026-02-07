# Prometheus Security Guide

This guide covers security best practices for Prometheus monitoring, including authentication, authorization, and network security.

## 🔒 Authentication Options

### 1. Basic Authentication (Implemented)

**Status**: ✅ Available via `setup-prometheus-auth.sh`

Basic authentication provides a simple username/password protection for Prometheus UI and API.

#### Setup

```bash
# Run the authentication setup
npm run monitoring:auth-setup

# Or for complete secure setup
npm run monitoring:secure-setup
```

#### How it works

- Uses HTTP Basic Auth (RFC 2617)
- Passwords are stored as bcrypt hashes
- Configuration file: `prometheus-web-config.yml`
- Password file: `prometheus_auth/prometheus.users`

#### Example Configuration

```yaml
# prometheus-web-config.yml
basic_auth_users:
  admin: $2y$12$hashedpassword1234567890
  user2: $2y$12$anotherhashedpassword987654
```

### 2. Reverse Proxy Authentication (Recommended for Production)

**Status**: ⚠️ Not implemented (requires separate web server)

Use Nginx or Apache as a reverse proxy with advanced authentication:

#### Nginx Example

```nginx
server {
    listen 80;
    server_name prometheus.example.com;

    location / {
        auth_basic "Prometheus Access";
        auth_basic_user_file /etc/nginx/.htpasswd;

        proxy_pass http://localhost:9090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Benefits

- Centralized authentication management
- SSL/TLS termination
- Additional security headers
- Rate limiting
- IP whitelisting

### 3. Network-Level Security

#### Firewall Rules

```bash
# Allow only specific IPs to access Prometheus port
sudo ufw allow from 192.168.1.0/24 to any port 9090
sudo ufw deny 9090
```

#### VPN Access

- Require VPN connection to access monitoring
- Use WireGuard, OpenVPN, or Tailscale
- Zero Trust Network Access (ZTNA)

### 4. Prometheus Enterprise Authentication

- **Prometheus Operator**: Integrates with Kubernetes RBAC
- **Thanos**: Adds multi-tenancy and authentication
- **Cortex**: Cloud-native Prometheus with auth

## 🛡️ Security Best Practices

### 1. Never Expose Prometheus Publicly

❌ **Bad**: `ports: "9090:9090"` exposed to internet
✅ **Good**: Internal network only + VPN

### 2. Use Strong Passwords

```bash
# Generate strong bcrypt hash
htpasswd -B -C 12 -n admin
```

### 3. Rotate Credentials Regularly

```bash
# Rotate passwords every 90 days
htpasswd -B prometheus_auth/prometheus.users admin
podman-compose restart prometheus
```

### 4. Enable TLS/HTTPS

```yaml
# prometheus-web-config.yml
tls_server_config:
  cert_file: /etc/prometheus/ssl/server.crt
  key_file: /etc/prometheus/ssl/server.key
```

### 5. Principle of Least Privilege

- Create separate users for different teams
- Use read-only access for most users
- Limit admin access

### 6. Monitor Authentication Logs

```promql
# Monitor failed login attempts
sum(rate(prometheus_http_requests_total{handler="/api/v1/query", code="401"}[5m])) by (instance)
```

## 🔐 Implementation Details

### Password File Format

The password file uses bcrypt hashes in the format:

```
username:$2y$12$hashedpassword1234567890
username2:$2y$12$anotherhashedpassword987654
```

### Generating Passwords

```bash
# Install htpasswd (if not available)
sudo apt-get install apache2-utils

# Create new password file
htpasswd -B -c prometheus_auth/prometheus.users admin

# Add additional users
htpasswd -B prometheus_auth/prometheus.users another_user

# Generate hash without file
htpasswd -B -n admin
```

### Docker Compose Configuration

```yaml
# Volume mount for web config
volumes:
  - ./prometheus-web-config.yml:/etc/prometheus/web-config.yml:Z

# Command line flag
command:
  - '--web.config.file=/etc/prometheus/web-config.yml'
```

## 🚨 Common Security Mistakes

### ❌ Exposing Prometheus to Internet

```yaml
# BAD - exposes Prometheus to all interfaces
ports:
  - "9090:9090"
```

### ❌ Using Weak Passwords

```bash
# BAD - weak password
htpasswd -B -c users.txt admin
# Password: "password123"
```

### ❌ Committing Password Files

```bash
# BAD - password file in git
git add prometheus_auth/prometheus.users
git commit -m "Add prometheus users"
```

### ❌ No Authentication at All

```yaml
# BAD - no authentication configured
# No web.config.file flag
```

## 🎯 Recommended Security Setup

### For Development

```bash
npm run monitoring:auth-setup  # Basic auth
npm run monitoring:start
```

### For Production

```bash
# 1. Set up reverse proxy (Nginx/Apache)
# 2. Configure TLS/HTTPS
# 3. Set up firewall rules
# 4. Use VPN for access
# 5. Enable authentication
# 6. Set up monitoring for failed logins
```

## 🔧 Advanced Security Options

### 1. OAuth2 Proxy

```yaml
# Use oauth2-proxy as authentication layer
oauth2-proxy:
  image: quay.io/oauth2-proxy/oauth2-proxy:latest
  ports:
    - "4180:4180"
  environment:
    OAUTH2_PROXY_PROVIDER: "github"
    OAUTH2_PROXY_CLIENT_ID: "your-client-id"
    OAUTH2_PROXY_CLIENT_SECRET: "your-client-secret"
```

### 2. Mutual TLS (mTLS)

```yaml
# Client certificate authentication
web_config:
  tls_config:
    client_auth_type: "RequireAndVerifyClientCert"
    client_ca_file: "/etc/prometheus/ssl/ca.crt"
```

### 3. IP Whitelisting

```nginx
# Nginx IP whitelisting
allow 192.168.1.0/24;
allow 10.0.0.0/8;
deny all;
```

## 📊 Monitoring Security Metrics

### Failed Login Attempts

```promql
sum(rate(prometheus_http_requests_total{code="401"}[5m])) by (instance)
```

### Successful Logins

```promql
sum(rate(prometheus_http_requests_total{code="200", handler="/api/v1/query"}[5m])) by (instance)
```

### High Request Rates (Potential Brute Force)

```promql
sum(rate(prometheus_http_requests_total[1m])) by (instance) > 100
```

## 🔄 Password Rotation Procedure

### 1. Generate New Password

```bash
htpasswd -B prometheus_auth/prometheus.users admin
```

### 2. Update Web Config

```bash
HASHED_PASSWORD=$(grep admin prometheus_auth/prometheus.users | cut -d: -f2)
sed -i "s|admin:.*|admin: $HASHED_PASSWORD|" prometheus-web-config.yml
```

### 3. Restart Prometheus

```bash
podman-compose restart prometheus
```

### 4. Notify Users

```bash
echo "Prometheus password has been rotated" | mail -s "Password Update" team@example.com
```

## 🛑 Emergency Access

### If Locked Out

```bash
# Remove web config to disable authentication temporarily
podman exec -it prometheus rm /etc/prometheus/web-config.yml
podman exec -it prometheus kill -HUP 1

# Fix the issue, then restore authentication
podman-compose restart prometheus
```

## 📚 Additional Resources

- [Prometheus Security Documentation](https://prometheus.io/docs/operating/security/)
- [HTTP Basic Auth RFC](https://tools.ietf.org/html/rfc2617)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

## 🎉 Summary

✅ **Basic Authentication**: Implemented and ready to use
✅ **Password Management**: Secure bcrypt hashing
✅ **Configuration**: Easy setup with `npm run monitoring:auth-setup`
✅ **Best Practices**: Comprehensive security guidelines

**Remember**: Security is an ongoing process. Regularly review and update your authentication mechanisms!