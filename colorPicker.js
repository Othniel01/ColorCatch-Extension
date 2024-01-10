document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const snapshotUrl = urlParams.get("snapshotUrl");

  const canvas = document.getElementById("snapshotCanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
  };

  img.src = snapshotUrl;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.willReadFrequently = true;

  const overlay = document.querySelector(".overlay");
  const colorPreview = overlay.querySelector(".color-preview");
  const hexCode = overlay.querySelector(".hex-code");

  function handleCanvasClick(event) {
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;

    const color = getColorAtCursor(x, y);

    updateHexValue(color);
    updateColorPreview(color);
  }

  function getColorAtCursor(x, y) {
    const imageData = ctx.getImageData(x, y, 1, 1);
    const [r, g, b, a] = imageData.data;
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function toHex(value) {
    const hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  function updateHexValue(color) {
    if (hexCode) {
      hexCode.textContent = color;
    }
  }

  function updateColorPreview(color) {
    if (colorPreview) {
      colorPreview.style.backgroundColor = color;
    }
  }

  canvas.addEventListener("click", handleCanvasClick);
});
