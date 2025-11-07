async function synthesize() {
  const text = document.getElementById("textInput").value;
  const voice = document.getElementById("voiceSelect").value;
  const status = document.getElementById("status");
  const audioPlayer = document.getElementById("audioPlayer");
  const downloadLink = document.getElementById("downloadLink");

  status.textContent = "Processing...";

  try {
    const response = await fetch("https://uf1ox5hmw7.execute-api.us-east-1.amazonaws.com/Prod/synthesize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice }),
    });

    const data = await response.json();

    if (data.audioUrl) {
      status.textContent = "✅ Conversion successful!";
      audioPlayer.src = data.audioUrl;
      audioPlayer.style.display = "block";

      // Show download button
      downloadLink.href = data.audioUrl;
      downloadLink.style.display = "inline-block";
    } else {
      status.textContent = "❌ Error: " + JSON.stringify(data);
    }
  } catch (err) {
    status.textContent = "⚠️ Request failed: " + err.message;
  }
}
