# DevTools Dashboard

A centralized dashboard for managing and monitoring multiple Next.js applications in the monorepo.

## Features

- **Process Management**: Start, stop, and monitor multiple applications
- **Port Management**: Automatic port assignment and conflict resolution
- **Real-time Status**: Live status updates for all applications
- **Process Logging**: Detailed logging of process operations and errors
- **Browser Integration**: Automatic browser opening for started applications

## Applications Managed

| Application | Port | Description |
|-------------|------|-------------|
| Portfolio   | 3000 | Personal portfolio website |
| BidWriter   | 3001 | Bid writing application |
| OMCanvas    | 3002 | Canvas-based application |
| CV360       | 3003 | CV management system |

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Access to the monorepo

### Installation

1. Navigate to the monorepo root:
   ```bash
   cd /path/to/monorepo
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running DevTools

1. Start the DevTools dashboard:
   ```bash
   pnpm --filter devtools dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3999
   ```

## Usage

### Starting Applications

1. Click the "Start" button next to any application in the dashboard
2. The application will start on its designated port
3. A browser window will automatically open to the application

### Stopping Applications

1. Click the "Stop" button next to any running application
2. The application will be gracefully terminated

### Monitoring Status

- Green status indicator: Application is running
- Red status indicator: Application is stopped
- Port number is displayed for each application
- Last started time is shown for running applications

## Technical Details

### Process Management

- Processes are managed using Node.js child processes
- Process states are persisted in `processes.json`
- Automatic cleanup of terminated processes
- Port conflict detection and resolution

### Logging

- Detailed logs are written to `devtools.log`
- Logs include:
  - Process start/stop events
  - Port conflicts
  - Error messages
  - Process output (stdout/stderr)

### Port Management

- Each application has a designated port
- Port conflicts are automatically detected
- Conflicting processes are terminated
- Ports are released before starting new processes

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - DevTools will automatically attempt to free the port
   - Check `devtools.log` for details
   - Manually kill the process if needed: `lsof -ti:PORT | xargs kill -9`

2. **Process Not Starting**
   - Check the logs in `devtools.log`
   - Verify the application exists in the monorepo
   - Ensure all dependencies are installed

3. **Status Not Updating**
   - Refresh the dashboard
   - Check the browser console for errors
   - Verify the API endpoint is responding

### Logging

Logs are available in:
- Browser console: Frontend issues
- Terminal: Backend process logs
- `devtools.log`: Detailed process management logs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is part of the monorepo and follows its licensing terms.
