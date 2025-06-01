import express from "express";
import cron from 'node-cron';
import os from 'os'
import { exec } from 'child_process';
import { promisify } from 'util';
import http from 'http'
const app = express();

const execAsync = promisify(exec);



cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
})

const server = http.createServer(app);
server.listen(3000, () => console.log("Server started on port 3000"));

//hello


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
        
//         // Check disk space (Linux/Mac)
//     //     try {
//     //         if (os.platform() !== 'win32') {
//     //             const { stdout } = await execAsync('df -h / | tail -1');
//     //             const diskInfo = stdout.trim().split(/\s+/);
//     //             healthData.disk = {
//     //                 size: diskInfo[1],
//     //                 used: diskInfo[2],
//     //                 available: diskInfo[3],
//     //                 usage: diskInfo[4]
//     //             };
//     //         }
//     //     } catch (diskError) {
//     //         healthData.disk = { error: 'Could not fetch disk info' };
//     //     }
        
//     //     // Health status determination
//     //     const memoryUsagePercent = (healthData.memory.used.heapUsed / healthData.memory.used.heapTotal) * 100;
//     //     const systemMemoryUsagePercent = parseFloat(healthData.memory.system.usage);
        
//     //     healthData.status = 'healthy';
//     //     healthData.alerts = [];
        
//     //     if (memoryUsagePercent > 80) {
//     //         healthData.status = 'warning';
//     //         healthData.alerts.push('High memory usage detected');
//     //     }
        
//     //     if (systemMemoryUsagePercent > 90) {
//     //         healthData.status = 'critical';
//     //         healthData.alerts.push('Critical system memory usage');
//     //     }
        
//     //     if (healthData.cpu.loadAverage[0] > os.cpus().length) {
//     //         healthData.status = 'warning';
//     //         healthData.alerts.push('High CPU load detected');
//     //     }
        
//     //     systemHealth = healthData;
        
//     //     // Log critical issues
//     //     if (healthData.status === 'critical') {
//     //         console.log('🚨 CRITICAL HEALTH ALERT:', healthData.alerts);
//     //         logs.push({ 
//     //             action: 'CRITICAL_HEALTH_ALERT', 
//     //             alerts: healthData.alerts, 
//     //             timestamp: new Date() 
//     //         });
            
//     //         // In real app, send immediate alert email/SMS
//     //     }
        
//     //     console.log(`✅ Health check completed - Status: ${healthData.status}`);
        
//     // } catch (error) {
//     //     console.error('❌ Health check failed:', error);
//     //     systemHealth = { 
//     //         status: 'error', 
//     //         error: error.message, 
//     //         timestamp: new Date() 
//     //     };
//     // }
// });


cron.schedule('*/1 * * * *', async () => {
    console.log('🔍 Checking server health every 5 minutes');
        const healthData = {
            timestamp: new Date(),
            uptime: process.uptime(),
            memory: {
                used: process.memoryUsage(),
                system: {
                    total: os.totalmem(),
                    free: os.freemem(),
                    usage: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2) + '%'
                }
            },
            cpu: {
                loadAverage: os.loadavg(),
                cpuCount: os.cpus().length
            },
            platform: os.platform(),
            nodeVersion: process.version,
            pid: process.pid
        };

        console.log('healthData', healthData);
});





// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT, shutting down gracefully');
    process.exit(0);
});





// --- Graceful Shutdown Utility ---
export const stopServer = async () => {
  console.log('🛑 Stopping server...');
  return new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) {
        console.error('❌ Error while stopping server:', err);
        return reject(err);
      }
      console.log('✅ Server stopped gracefully.');
      resolve();
    });
  });
};

