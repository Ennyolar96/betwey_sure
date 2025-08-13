# Football Predictions App - Technical Test Submission

## 📌 Assignment Overview

### Backend Requirements (Node.js/NestJS/MongoDB)

1. Create NestJS service integrating with football predictions API
2. Endpoint: `/predictions?date=YYYY-MM-DD`
3. Filter matches with home win chance > 50%
4. Implement:
   - Input validation (date format)
   - Error handling
   - Modular structure (controller → service → API client)
5. **Bonus**: MongoDB caching for same-date requests

### Frontend Requirements (Next.js/Tailwind)

1. Page with:
   - Date picker input
   - Match display (cards/table)
   - Home win % > 50% filter
   - Loading states
   - Empty state handling
2. **Bonus**:
   - Team search filter
   - Mobile responsiveness
   - Match time & competition display

## ✅ Implemented Solutions

### Backend Implementation

```markdown
- Created `PredictionsModule` with:
  - `PredictionsController` (route handling)
  - `PredictionsService` (business logic)
  - `FootballApiService` (external API client)
- Features:
  - ✅ Date validation pipe (`YYYY-MM-DD` format)
  - ✅ API response filtering (home_win > 50%)
  - ✅ Error handling (API failures, bad requests)
  - ✅ MongoDB caching
- Tech used:
  - NestJS framework
  - Axios for API calls
  - Mongoose for MongoDB
  - Class-validator for DTOs
```

### Frontend Implementation

```markdown
- Created `predictions` page with:
  - 📅 Date picker
  - 🃏 Card-based match display
  - 🔍 Team search functionality
  - 📱 Fully responsive design
- Features:
  - ✅ Real API consumption (from backend)
  - ✅ Loading spinner
  - ✅ "No matches" empty state
  - ✅ Win percentage visualization
- Tech used:
  - Next.js App Router
  - Tailwind CSS
  - Axios for data fetching
```

## 🛠️ How to Run

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🕒 Development Timeline

- Backend API NestJS
- Basic API integration
- MongoDB caching
- Frontend scaffolding
- API consumption logic
- Basic UI components
- Polish UI with Tailwind
- Implement bonus features

## 🔍 Code Structure Highlights

### Backend

```
src/
    app/
    ├── prediction/
    │   ├── dto/            # Validation schemas
    │   ├── model/       # MongoDB models
    │   ├── interfaces/     # Type definitions
    │   ├── predictions.controller.ts
    │   ├── predictions.service.ts
    global/
        common
        config
        helper
        service
```

### Frontend

```
src/
└── app/
    ── page.tsx        # Main view

    ── components/     # Reusable UI
    ── assets/          # images
    ── Modules/          # pages
```
# betwey_sure
