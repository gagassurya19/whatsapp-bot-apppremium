let messageCount = 0;
let startTime = Date.now();
let messagesPerMinute = 0;

const updateStats = () => {
  let elapsedTime = (Date.now() - startTime) / 1000; // elapsed time in seconds
  messagesPerMinute = Math.round((messageCount / elapsedTime) * 60);
  process.stdout.write(`\rTotal messages sent: ${messageCount} (${messagesPerMinute} messages/minute)`);
};

const countMessages = () => {
  messageCount++;
  updateStats();
};

module.exports = { countMessages };
