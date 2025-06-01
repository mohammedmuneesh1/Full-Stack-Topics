


















// BASE VERSION OF SERVER HEALTH CHECK

// 3. SERVER HEALTH CHECK EVERY 5 MINUTES
// cron.schedule('*/1 * * * *', async () => {
//     console.log('🔍 Checking server health every 5 minutes');
    
//     // try {
//         // Get system information
//         const healthData = {
//             timestamp: new Date(),
//             uptime: process.uptime(),
//             memory: {
//                 used: process.memoryUsage(),
//                 system: {
//                     total: os.totalmem(),
//                     free: os.freemem(),
//                     usage: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2) + '%'
//                 }
//             },
//             cpu: {
//                 loadAverage: os.loadavg(),
//                 cpuCount: os.cpus().length
//             },
//             platform: os.platform(),
//             nodeVersion: process.version,
//             pid: process.pid
//         };

//         console.log('healthData', healthData);
        

// });








//OUTPUT 

// const data = {
//      timestamp: 2025-06-01T16:25:00.034Z,
//     uptime: 43.5256558,
//     memory: { 
//         used: {
//  rss: 166289408, (RESIDENT SET SIZE) , TOTAL MEMORY(RAM) USED BY NODE.JS PROCESS

//  heapTotal: 119377920,
//  heapUsed: 116426344, external: 7796621, arrayBuffers: 4861127 },
//          system: { total: 16869548032, free: 2476486656, usage: '85.32%' } },
//           cpu: { loadAverage: [ 0, 0, 0 ], cpuCount: 16 },
//            platform: 'win32',
//             nodeVersion: 'v22.16.0',
//              pid: 21140 } 


// I'll explain each line of your health data in detail:
// Line-by-Line Breakdown:
// timestamp: 2025-06-01T16:25:00.034Z

// What: When this health check was performed
// Value: June 1st, 2025 at 4:25 PM UTC (with 34 milliseconds precision)
// Purpose: Track when measurements were taken for historical analysis

// uptime: 43.5256558

// What: How long your Node.js process has been running
// Value: 43.52 seconds (about 43 seconds and 526 milliseconds)
// Purpose: Monitor if your app restarts frequently (indicates crashes)

// Memory Section:
// memory.used.rss: 166289408

// What: Resident Set Size - total memory used by your Node.js process
// Value: 166,289,408 bytes = 158.6 MB
// Purpose: Track total RAM consumption by your app

// memory.used.heapTotal: 119377920

// What: Total heap memory allocated by V8 JavaScript engine
// Value: 119,377,920 bytes = 113.8 MB
// Purpose: Shows how much memory V8 has reserved for JavaScript objects

// memory.used.heapUsed: 116426344

// What: Actual heap memory currently being used
// Value: 116,426,344 bytes = 111.0 MB
// Calculation: 111.0MB / 113.8MB = 97.5% heap usage ⚠️
// Purpose: Critical metric - high usage means potential memory issues

// memory.used.external: 7796621

// What: Memory used by C++ objects bound to JavaScript
// Value: 7,796,621 bytes = 7.4 MB
// Examples: Buffers, streams, native modules
// Purpose: Track non-JavaScript memory usage



// memory.used.arrayBuffers: 4861127

// What: Memory used specifically by ArrayBuffer objects
// Value: 4,861,127 bytes = 4.6 MB
// Examples: Binary data, typed arrays, file buffers
// Purpose: Track binary data memory consumption

// System Memory:
// memory.system.total: 16869548032

// What: Total RAM installed on your computer
// Value: 16,869,548,032 bytes = 16 GB
// Purpose: Know your system's total memory capacity

// memory.system.free: 2476486656

// What: Currently available RAM
// Value: 2,476,486,656 bytes = 2.3 GB
// Purpose: Monitor if system is running out of memory

// memory.system.usage: '85.32%'

// What: Percentage of total system memory being used
// Calculation: (16GB - 2.3GB) / 16GB = 85.32%
// Status: Elevated but not critical
// Purpose: Overall system memory health

// CPU Section:
// cpu.loadAverage: [0, 0, 0]

// What: System load averages over 1, 5, and 15 minutes
// Values:

// 0 = Last 1 minute average
// 0 = Last 5 minutes average
// 0 = Last 15 minutes average


// Meaning: No CPU stress - system is idle
// Good Range: Below number of CPU cores (you have 16)

// cpu.cpuCount: 16

// What: Number of CPU cores/threads available
// Value: 16 cores
// Purpose: Determine if load average is high (load > core count = overloaded)

// Platform Info:
// platform: 'win32'

// What: Operating system type
// Value: Windows (32-bit API, but can be 64-bit Windows)
// Purpose: OS-specific optimizations and feature availability

// nodeVersion: 'v22.16.0'

// What: Version of Node.js runtime
// Value: Version 22.16.0 (very recent/cutting edge)
// Purpose: Compatibility and feature availability

// pid: 21140

// What: Process ID assigned by operating system
// Value: 21140
// Purpose: Identify this specific process for monitoring/debugging

// Summary Status:

// ✅ CPU: Excellent (no load)
// ⚠️ Node.js Memory: High (97.5% heap usage)
// ✅ System Memory: Acceptable (85% usage)
// ✅ Overall: Healthy but watch memory

// Your system is performing well, but the Node.js process is using almost all its allocated heap memory!