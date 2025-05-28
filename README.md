# MayaCode User Dashboard - Full Stack Application

A comprehensive user dashboard application with React frontend and Node.js backend, designed to help users manage their integration process with AI assistance.

## Project Structure

```
copy-of-mayacode-user-dashboard/
├── backend/                 # Node.js/Express backend
│   ├── data/               # Sample data
│   ├── middleware/         # Express middleware
│   ├── routes/            # API routes
│   ├── package.json
│   └── server.js
├── services/              # Frontend API services
├── components/            # React components
├── App.tsx               # Main React application
├── package.json          # Frontend dependencies
└── README.md
```

## Features

### Frontend
- **React 19** with TypeScript
- **Progressive Loading**: Initially shows 2-3 entries, loads more on demand
- **Multi-language Support**: English, Spanish, German
- **AI Chat Integration**: Google Gemini-powered assistant
- **Responsive Design**: Mobile-first approach
- **Task Management**: Track progress on various integration tasks
- **Document Management**: Organize and manage important documents

### Backend
- **Node.js/Express** RESTful API
- **Progressive Loading**: API supports initial load + pagination
- **CORS Support**: Configured for frontend integration
- **Error Handling**: Comprehensive error handling middleware
- **Security**: Helmet.js for security headers

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env file with your configuration

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:3001`

### 2. Frontend Setup

```bash
# Navigate to project root
cd ..

# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local file with your configuration

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Base URL: `http://localhost:3001/api/v1`

- **GET** `/user/profile` - Get user profile data
- **GET** `/user/actions` - Get user actions with progressive loading
- **GET** `/user/actions/:id` - Get specific action details
- **GET** `/user/documents` - Get user documents with progressive loading
- **GET** `/user/dashboard-summary` - Get dashboard overview data
- **GET** `/health` - Health check endpoint

### Progressive Loading

The API implements progressive loading:
- Initial load: Returns first 2-3 items (`loadMore=false`)
- Load more: Returns paginated results (`loadMore=true`)
- Supports filtering by status and type

Example:
```bash
# Initial load (first 3 actions)
curl "http://localhost:3001/api/v1/user/actions"

# Load more (next page)
curl "http://localhost:3001/api/v1/user/actions?page=2&loadMore=true"

# Filter by status
curl "http://localhost:3001/api/v1/user/actions?status=In%20Progress"
```

## Environment Variables

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
API_VERSION=v1
```

### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:3001/api/v1
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Data Flow

1. **Initial Load**: Frontend fetches dashboard summary and first 2-3 items
2. **Progressive Loading**: User can load more items as needed
3. **Filtering**: Backend handles status-based filtering
4. **Real-time Updates**: AI chat provides contextual assistance

## Development

### Adding New Features

1. **Backend**: Add routes in `backend/routes/`
2. **Frontend**: Add API calls in `services/api.ts`
3. **Components**: Create/update React components
4. **Types**: Update TypeScript interfaces in `types.ts`

### Testing

```bash
# Test backend endpoints
curl http://localhost:3001/health
curl http://localhost:3001/api/v1/user/profile

# Frontend testing
npm run build
npm run preview
```

## Key Features Implemented

✅ **Progressive Loading**: Shows 2-3 entries initially, loads more on demand  
✅ **Backend API**: Full RESTful API with Express.js  
✅ **Frontend Integration**: React app connected to backend  
✅ **Error Handling**: Comprehensive error handling on both ends  
✅ **CORS Configuration**: Proper cross-origin setup  
✅ **Environment Configuration**: Flexible environment-based setup  

## Next Steps

- Database integration (PostgreSQL/MongoDB)
- User authentication (JWT)
- Real-time notifications (WebSocket)
- File upload functionality
- Advanced filtering and search
- Unit and integration tests

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS_ORIGIN matches frontend URL
2. **API Connection**: Verify VITE_API_BASE_URL in frontend .env.local
3. **Port Conflicts**: Change PORT in backend .env if 3001 is occupied

### Logs

- Backend logs: Check terminal running `npm run dev` in backend/
- Frontend logs: Check browser console and terminal running frontend dev server
