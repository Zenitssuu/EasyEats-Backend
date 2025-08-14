# 🍔 EasyEats Backend

This is the backend server for **EasyEats**, a food delivery platform.  
It powers features like authentication (Auth0), restaurant search, orders, Stripe payments, Redis-based background jobs, and distance calculation via Google Maps API.

---

## 🚀 Features
- **Auth0 Authentication** (JWT validation & parsing)
- **Restaurant Management** (search, details, CRUD for owners)
- **Stripe Payment Integration** with webhooks
- **Redis Cloud Integration** for job queues (BullMQ)
- **Google Maps Distance API** for delivery distance calculation
- **Cloudinary** for media uploads
- **Rate Limiting & CORS Security**
- **Dockerized** for easy deployment
- **NGINX Reverse Proxy + HTTPS** in production

---

## 📂 Tech Stack
- **Node.js** (v22 in production)
- **Express.js**
- **MongoDB Atlas**
- **Redis Cloud**
- **Stripe**
- **Cloudinary**
- **BullMQ**
- **Docker & Docker Compose**
- **NGINX** (for reverse proxy in production)
- **Certbot** (for free HTTPS via Let's Encrypt)

---

## ⚙️ Environment Variables

Create a `.env` file for development, and `.env.production` for production.  
Required variables:

```env
NODE_ENV=production

# Auth0
AUTH0_AUDIENCE=your_audience
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com/

# Cloudinary
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name

# MongoDB
MONGODB_URI=your_mongo_atlas_uri
PORT=3000

# Stripe
STRIPE_API_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Google Maps
GOOGLE_MAPS_API_KEY=your_api_key

# Redis
REDIS_HOST_URL=your_redis_host
REDIS_CLIENT_PASSWORD=your_redis_password
REDIS_PORT=your_redis_port

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PASS=your_app_password
SMTP_USER=your_email
SMTP_PORT=465
SMTP_SECURE=true
```

---

## 🖥️ Running Locally

```bash
# 1️⃣ Install dependencies
npm install

# 2️⃣ Start the backend
npm start
```

> Ensure you have a `.env` file in the root directory.

---

## 🐳 Running with Docker (Local)

```bash
docker compose --env-file .env.production up --build
```

---

## ☁️ Deploying to AWS EC2

### 1️⃣ Launch EC2 Instance
- AMI: **Ubuntu 24.04 LTS**
- Type: **t2.micro** (Free tier eligible)
- Security group: Allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS)

### 2️⃣ Connect via SSH
```bash
ssh -i your-key.pem ubuntu@<ec2-public-dns>
```

### 3️⃣ Install Docker & Docker Compose
```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker $USER
```
(Log out & back in to apply group changes)

### 4️⃣ Upload Project
Either:
```bash
git clone <your-repo-url>
```
or use `scp` to upload files.

### 5️⃣ Add Production Env
```bash
nano .env.production
```

### 6️⃣ Start Containers
```bash
docker compose --env-file .env.production up --build -d
```

---

## 🌐 NGINX + HTTPS Setup

### 1️⃣ Install NGINX & Certbot
```bash
sudo apt install nginx
sudo apt install certbot python3-certbot-nginx
```

### 2️⃣ Configure NGINX
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Save to `/etc/nginx/sites-available/default` and reload:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### 3️⃣ Enable HTTPS
```bash
sudo certbot --nginx -d yourdomain.com
```
✅ SSL certificate is now auto-renewed.

---

## 🔄 Updating Code in Production

```bash
ssh -i your-key.pem ubuntu@<ec2-public-dns>
cd easyeats
git pull origin main
docker compose --env-file .env.production up --build -d
```

---

## 📡 API Endpoints

### Public
- `GET /api/v1/allrestaurants/search/:city`
- `GET /api/v1/allrestaurants/:restaurantId`

### Authenticated (JWT Required)
- `POST /api/v1/user/create-user`
- `POST /api/v1/user/update-user`
- `GET /api/v1/user/get-user`
- `POST /api/v1/order/create`
- `POST /api/v1/order/checkout`
- `POST /api/v1/order/checkout/webhook` *(Stripe webhook)*

---

## 📈 Monitoring
We use **UptimeRobot** to:
- Ping server every 5 min
- Alert if downtime occurs

---
