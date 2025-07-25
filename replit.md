# WarpCut - AI-Powered Video Editor

## Overview

WarpCut is a full-stack web application that provides AI-powered video editing capabilities in the browser. The application focuses on reducing video editing time from hours to minutes through automated features like silence removal, filler word detection, and smart cropping. It's designed to be simple enough for an 8-year-old to use while providing professional-quality results.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: Zustand for global state management
- **Routing**: Wouter for client-side routing
- **Data Fetching**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection**: Neon Database serverless PostgreSQL
- **Storage**: In-memory storage for development with database fallback for production

### Video Processing Architecture
- **Local Processing**: Client-side video processing using FFmpeg WebAssembly
- **Speech Recognition**: Whisper.wasm for local transcription (English + Hindi/Hinglish)
- **Privacy-First**: All video processing happens locally unless user opts for cloud acceleration

## Key Components

### Client-Side Components
1. **Upload Section**: Drag-and-drop video upload interface with file validation
2. **Processing Section**: Real-time progress tracking for AI operations
3. **Editor Section**: Main editing interface with video player, transcript editor, and timeline
4. **Video Player**: Custom video player with playback controls and time tracking
5. **Word Playground**: Text-based editing interface for transcript manipulation
6. **Timeline**: Visual waveform representation with cut segments
7. **Control Panel**: Quick actions and export options
8. **Style Studio**: Caption styling and formatting options

### Server-Side Components
1. **Project Management**: CRUD operations for video projects
2. **Storage Layer**: Abstracted storage interface with memory and database implementations
3. **API Routes**: RESTful endpoints for project management
4. **Static Serving**: Development and production asset serving

### Database Schema
- **Video Projects Table**: Stores project metadata, transcript data, cuts, and settings
- **Transcript Segments**: Individual word/phrase data with timing and deletion flags
- **Cut Segments**: Marked silence, filler words, or manual cuts
- **Video Settings**: Caption styles, crop modes, and export preferences

## Data Flow

1. **Video Upload**: User uploads video file → Client validates and stores locally
2. **Processing Pipeline**: 
   - Audio extraction using FFmpeg.wasm
   - Speech-to-text transcription using Whisper.wasm
   - Automatic silence and filler word detection
   - Project metadata saved to database
3. **Editing Phase**: 
   - Real-time transcript editing updates local state
   - Changes synchronized with server for persistence
   - Timeline reflects all cuts and modifications
4. **Export Process**: 
   - Apply all cuts and effects using FFmpeg.wasm
   - Generate final video with selected format and quality
   - Download processed video to user's device

## External Dependencies

### Core Libraries
- **@ffmpeg/ffmpeg**: WebAssembly video processing
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database operations and migrations
- **@tanstack/react-query**: Server state management and caching
- **react-dropzone**: File upload interface
- **zustand**: Client-side state management

### UI/UX Libraries
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Type safety and developer experience
- **drizzle-kit**: Database migration management

## Deployment Strategy

### Development Environment
- **Local Processing**: All video operations run in browser using WebAssembly
- **Memory Storage**: Projects stored in memory for quick development iteration
- **Hot Module Replacement**: Vite provides instant feedback during development

### Production Environment
- **Database**: PostgreSQL hosted on Neon for project persistence
- **Static Assets**: Client-side application served as static files
- **API Server**: Express.js server handling project management and metadata
- **Client-Side Processing**: Maintains privacy-first approach with local video processing

### Build Process
1. **Frontend Build**: Vite compiles React application to optimized static assets
2. **Backend Build**: esbuild bundles Node.js server with external dependencies
3. **Database Migrations**: Drizzle handles schema updates and migrations
4. **Environment Variables**: Database URL and other secrets managed through environment

### Scalability Considerations
- **Stateless Server**: All video processing happens client-side
- **Minimal Database Load**: Only metadata and project settings stored
- **CDN-Ready**: Static assets can be served from CDN for global distribution
- **Horizontal Scaling**: API server can be replicated without video processing overhead