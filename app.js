document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("zipForm");
  const error = document.getElementById("error");
  const resultBox = document.getElementById("result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    error.textContent = "";
    resultBox.classList.add("hidden");

    const zip = document.getElementById("zipInput").value.trim();

    if (!/^\d{5}$/.test(zip)) {
      error.textContent = "Please enter a valid 5-digit ZIP code.";
      return;
    }

    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zip}`);

      if (!response.ok) {
        throw new Error("ZIP code not found.");
      }

      const data = await response.json();
      const place = data.places[0];

      document.getElementById("city").textContent = place["place name"];
      document.getElementById("state").textContent = place["state"];
      document.getElementById("lat").textContent = place["latitude"];
      document.getElementById("lng").textContent = place["longitude"];

      resultBox.classList.remove("hidden");

    } catch (err) {
      error.textContent = "Could not fetch ZIP code details.";
      console.error(err);
    }
  });
});
