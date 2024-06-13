let requestCounter = {};
let resetTimer;
const time = 5 * 1000;
const requestLimit = 4;

const resetCounters = () => {
  requestCounter = {};
  clearTimeout(resetTimer);
  resetTimer = setTimeout(resetCounters, time);
};
resetCounters(); // Start the timer

export default async function rateLimit(req, res) {
  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  const clientIp = ({ ip }).ip;

  requestCounter[clientIp] = requestCounter[clientIp] || 0;

  if (requestCounter[clientIp] >= requestLimit) {
    return true; // Rate limit exceeded 🚫
  } else {
    console.log('Request count for IP:', clientIp, '=', ++requestCounter[clientIp]);
    return null; // Proceed with the request ✅
  }
}