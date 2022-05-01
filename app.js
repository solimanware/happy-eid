function addTextToImage(imagePath, text) {
  return new Promise(function (resolve, reject) {
    var circle_canvas = document.getElementById("canvas");
    var context = circle_canvas.getContext("2d");

    // Draw Image function
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = imagePath;
    const x = 1000;
    const y = 1000;
    img.onload = function () {
      context.drawImage(img, 0, 0, 1000, 1000);
      context.lineWidth = 1;
      context.fillStyle = "#FFFFFF";
      context.lineStyle = "#ffff00";
      context.font = "18px sans-serif";
      const width = context.measureText(text).width;
      const height = parseInt(context.font.substring(0, 2)); // gets the font size
      context.fillStyle = "#1e112c";
      context.fillRect(x - width - 2, y - height, width, height - 2);
      context.fillStyle = "#FFFFFF";
      context.fillText(text, x - width, y - 5);
      resolve("done");
    };
    img.onerror = function () {
      reject("error");
    };
  });
}

async function downloadImage(member) {
  const canvas = document.getElementById("canvas");
  const blob = await new Promise((resolve) => canvas.toBlob(resolve));

  const downloadLink = document.createElement("a");
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.download = `${member}.png`;
  downloadLink.click();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function saveFiles() {
  for (let member of names) {
    await addTextToImage("bg.jpeg", `Founding Member: ${member}`)
    await sleep(100);
    await downloadImage(member);
  }
}


saveFiles();