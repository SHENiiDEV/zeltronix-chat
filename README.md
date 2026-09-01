# Zeltrionix - AI-Powered Customer Support Platform

Zeltrionix provides AI-powered support agents for B2B and B2C companies. AI widgets integrate directly into client websites to provide instant, 24/7 customer service based exclusively on uploaded documents (PDF, DOCX, TXT, CSV).

## Key Features

- **Proprietary AI RAG Vector Integration**: Strictly grounded answers using uploaded document vector embeddings.
- **Embeddable Vanilla JS Widget**: Fast, standalone JavaScript widget script (`public/widget.js`) with Dark & Light theme modes.
- **Inertia.js + React Dashboard**: Modern admin dashboard for managing AI agents, documents, and token balances.
- **Token-Based Pricing & Billing**: Support for PRO (€30/mo) and ENTERPRISE (€100/mo) plans with token top-ups and PDF invoices.

## Quick Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/SHENiiDEV/zeltronix-chat.git
   cd zeltronix-chat
   ```

2. Install PHP & Node dependencies:
   ```bash
   composer install
   npm install
   ```

3. Environment configuration:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Database Setup & Migrations:
   ```bash
   touch database/database.sqlite
   php artisan migrate
   ```

5. Build frontend assets:
   ```bash
   npm run build
   ```

6. Start local dev server:
   ```bash
   php artisan serve
   ```

## License

Private / Proprietary Software. All rights reserved.
