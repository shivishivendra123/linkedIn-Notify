// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'arrowUpPressed') {
    alert('Text copied to clipboard!');
  }

  if (message.type === 'arrowDownPressed') {
    alert('Text copied to clipboard!');
  }
});

