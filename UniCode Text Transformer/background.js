chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelectedText') {
    chrome.tabs.executeScript(
      {
        code: 'window.getSelection().toString();'
      },
      ([selectedText]) => {
        sendResponse({ selectedText: selectedText });
      }
    );
    return true;
  }
});
