document
  .getElementById("colorpicker")
  .addEventListener("input", function (event) {
    var colorValue = event.target.value;

    document.getElementById("hexcolor").value = colorValue;
  });

document.addEventListener("DOMContentLoaded", function () {
  const hexColorInput = document.getElementById("hexcolor");
  const copyButton = document.getElementById("copyButton");

  copyButton.addEventListener("click", function () {
    navigator.clipboard
      .writeText(hexColorInput.value)
      .then(() => {
        alert("Hex color value has been copied: " + hexColorInput.value);
      })
      .catch((error) => {
        console.error("Failed to copy hex color to clipboard:", error);
      });
  });
});
