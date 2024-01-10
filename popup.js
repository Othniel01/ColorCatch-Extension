document.addEventListener("DOMContentLoaded", function () {
  const captureBtn = document.getElementById("captureBtn");
  const colorPickerBtn = document.getElementById("colorPickerBtn");
  const colorDisplay = document.getElementById("colorDisplay");

  let capturedSnapshotUrl;

  function captureSnapshot() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs
        .captureVisibleTab(activeTab.windowId, { format: "png" })
        .then(function (dataUrl) {
          capturedSnapshotUrl = dataUrl;
          colorDisplay.innerHTML = `<img src="${dataUrl}" alt="Captured Snapshot" style="width: 100%; height: 50vh;">`;
        })
        .catch(function (error) {
          console.error("Error capturing snapshot:", error);
        });
    });
  }

  function openColorPickerPage() {
    const colorPickerPageUrl = chrome.runtime.getURL("colorPicker.html");

    const urlWithQueryParam = `${colorPickerPageUrl}?snapshotUrl=${encodeURIComponent(
      capturedSnapshotUrl
    )}`;

    chrome.tabs.create({ url: urlWithQueryParam });
  }

  captureBtn.addEventListener("click", captureSnapshot);
  colorPickerBtn.addEventListener("click", openColorPickerPage);
});
