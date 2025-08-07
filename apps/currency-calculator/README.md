# Cash Counter - Currency Calculator

A modern Next.js application for managing and tracking currency denominations with Supabase backend.

## Features

- **Currency Management**: Track Indian Rupee denominations (₹1, ₹2, ₹5, ₹10, ₹20, ₹50, ₹100, ₹200, ₹500)
- **Bundle & Open Notes**: Separate tracking for bundled (100 notes) and open notes
- **Real-time Calculations**: Automatic total calculation as you input values
- **History Management**: View, edit, and delete previous entries
- **Date Navigation**: Browse entries by date with easy navigation
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Authentication**: Secure user authentication with Supabase Auth
- **Notes**: Add short notes to your entries (max 16 characters)

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Icons**: React Icons
- **Styling**: Tailwind CSS with dark mode support

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd apps/currency-calculator
npm install
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to your project settings and copy the URL and anon key
3. Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Database Schema

Run the following SQL in your Supabase SQL editor:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create calculations table
CREATE TABLE calculations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  note TEXT,
  ist_timestamp TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create denominations table
CREATE TABLE denominations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  calculation_id UUID REFERENCES calculations(id) ON DELETE CASCADE,
  denomination INTEGER NOT NULL,
  count INTEGER NOT NULL,
  bundle_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on calculations
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

-- Enable RLS on denominations
ALTER TABLE denominations ENABLE ROW LEVEL SECURITY;

-- Create policies for calculations
CREATE POLICY "Users can view their own calculations" ON calculations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own calculations" ON calculations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own calculations" ON calculations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calculations" ON calculations
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for denominations
CREATE POLICY "Users can view denominations for their calculations" ON denominations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM calculations 
      WHERE calculations.id = denominations.calculation_id 
      AND calculations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert denominations for their calculations" ON denominations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM calculations 
      WHERE calculations.id = denominations.calculation_id 
      AND calculations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update denominations for their calculations" ON denominations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM calculations 
      WHERE calculations.id = denominations.calculation_id 
      AND calculations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete denominations for their calculations" ON denominations
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM calculations 
      WHERE calculations.id = denominations.calculation_id 
      AND calculations.user_id = auth.uid()
    )
  );
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Authentication Setup

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Settings
3. Configure your site URL and redirect URLs
4. Enable email confirmation if desired

## Usage

1. **Sign Up/In**: Create an account or sign in with your email
2. **Add Entries**: Input bundle and open note counts for each denomination
3. **Add Notes**: Optionally add a note to your entry (max 16 characters)
4. **Save**: Click save to store your calculation
5. **View History**: Click "History" to browse previous entries
6. **Edit/Delete**: Use the edit and delete buttons in history view
7. **Theme Toggle**: Switch between dark and light modes

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Auth.tsx          # Authentication component
│   └── CurrencyCalculator.tsx # Main calculator component
├── context/              # React context
│   └── ThemeContext.tsx  # Theme management
├── lib/                  # Utility libraries
│   └── supabase.ts       # Supabase client
└── types/                # TypeScript type definitions
    └── index.ts          # Type definitions
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
