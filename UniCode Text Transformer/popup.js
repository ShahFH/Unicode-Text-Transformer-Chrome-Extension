document.addEventListener('DOMContentLoaded', () => {
  // Get the reference to the Transform button in the popup
  const transformButton = document.getElementById('transform-button');

  // Add a click event listener to the Transform button
  transformButton.addEventListener('click', () => {
    // Send a message to the background script to transform the selected text
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(tab.id, { action: 'getSelectedText' }, response => {
        if (response && response.selectedText) {
          // Send a message to the content script to transform the text
          chrome.runtime.sendMessage({ action: 'transformText', text: response.selectedText }, response => {
            if (response && response.transformedText) {
              // Copy the transformed text to the clipboard
              navigator.clipboard.writeText(response.transformedText)
                .then(() => {
                  console.log('Transformed text copied to clipboard:', response.transformedText);
                  // Show a success message to the user
                  alert('Transformed text copied to clipboard!');
                })
                .catch(error => {
                  console.error('Error copying transformed text to clipboard:', error);
                  // Show an error message to the user
                  alert('Error copying transformed text to clipboard. Please try again.');
                });
            }
          });
        }
      });
    });
  });
});
