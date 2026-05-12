# CRB Status Checker & Report Generator

A modern, production-ready web application for accessing Credit Bureau Reports instantly. Built with Next.js 14, TypeScript, Firebase, and Tailwind CSS.

## Features

- **Authentication**: Secure email/password authentication with Firebase
- **Real-time Updates**: Firestore real-time listeners for instant data synchronization
- **Payment Integration**: Paystack payment gateway integration
- **Responsive Design**: Mobile-first design with dark mode support
- **Type-Safe**: Full TypeScript implementation with strict mode
- **Modern UI**: Beautiful UI components from shadcn/ui
- **Form Validation**: React Hook Form with Zod schema validation
- **State Management**: Lightweight state management with Zustand
- **Protected Routes**: Client-side route protection

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3.4+
- **Backend**: Firebase (Authentication + Firestore)
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner

## Project Structure

```
project/
├── app/                      # Next.js app directory
│   ├── dashboard/           # Dashboard page with real-time updates
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── purpose/             # Purpose selection page
│   ├── payment/             # Payment initiation page
│   ├── verify/              # Payment verification page
│   ├── report/              # CRB report view
│   ├── profile/             # User profile page
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Landing page
│   └── not-found.tsx        # 404 page
├── components/
│   ├── auth/                # Authentication components
│   ├── layout/              # Layout components (Header, Footer)
│   ├── providers/           # Context providers (Theme, Auth)
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── firebase.ts          # Firebase configuration
│   ├── validations.ts       # Zod validation schemas
│   └── utils.ts             # Utility functions
├── services/
│   ├── auth.service.ts      # Authentication service
│   └── payment.service.ts   # Payment service
├── store/
│   └── useAuthStore.ts      # Zustand auth store
├── hooks/
│   └── useAuthListener.ts   # Auth state listener hook
└── types/
    └── index.ts             # TypeScript type definitions
```

## Pages & Routes

1. **/** - Landing page with hero, features, and pricing
2. **/register** - User registration with full form validation
3. **/login** - User login
4. **/purpose** - Multi-select purpose selection
5. **/payment** - Paystack payment initiation
6. **/verify** - Payment verification callback
7. **/dashboard** - Real-time dashboard (protected route)
8. **/report** - Full CRB report view (protected route)
9. **/profile** - User profile management (protected route)
10. **/404** - Custom 404 page

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Get your Firebase configuration from Project Settings

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001/api
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

### 4. Firestore Security Rules

Set up the following Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 6. Build for Production

```bash
npm run build
npm run start
```

## Payment Integration

The app uses Paystack for payment processing. To integrate:

1. Create a Paystack account at [Paystack](https://paystack.com/)
2. Get your public key from the Paystack dashboard
3. Set up a backend API to handle:
   - Payment initiation (`POST /api/payment/initiate`)
   - Payment verification (`POST /api/payment/verify`)

The backend should update the user's `paymentMade` field in Firestore to `true` upon successful payment.

## Features Breakdown

### Authentication Flow

1. User registers with email, password, and personal details
2. Firebase creates authentication account
3. User data is stored in Firestore
4. Real-time auth state listener updates Zustand store
5. Protected routes check auth state before rendering

### Payment Flow

1. User selects purpose for CRB check
2. Payment page initiates Paystack payment
3. User completes payment on Paystack
4. Paystack redirects to `/verify` with reference
5. Backend verifies payment and updates Firestore
6. Dashboard real-time listener updates immediately
7. User can view their CRB report

### Real-time Updates

The dashboard uses Firestore's `onSnapshot` listener to receive real-time updates when:
- Payment status changes
- Report becomes available
- User data is updated

## Customization

### Changing Colors

Update `tailwind.config.ts` to modify the color scheme:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // ... more colors
    },
  },
}
```

### Adding New Pages

1. Create a new folder in `app/`
2. Add `page.tsx` for the page component
3. Wrap with `ProtectedRoute` if authentication is required
4. Update navigation in `Header` component

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `NEXT_PUBLIC_BACKEND_API_URL` | Backend API base URL | Yes |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack public key | Yes |

## Development Tips

- Use `npm run dev` for hot-reload development
- Run `npm run build` to check for TypeScript errors
- Use `npm run lint` to check for code quality issues
- Dark mode is automatically handled by next-themes

## Production Deployment

1. Set all environment variables in your hosting platform
2. Run `npm run build` to create production build
3. Deploy the `.next` folder and other necessary files
4. Ensure Firebase security rules are properly configured
5. Set up proper CORS headers for your backend API

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary and confidential.

## Support

For support, please contact the development team.
