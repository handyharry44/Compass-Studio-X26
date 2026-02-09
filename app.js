async function initStudio() {
  try {
    const response = await fetch("inventory.json");
    const items = await response.json();
    const gallery = document.getElementById("studio-gallery");

    gallery.innerHTML = items
      .map((item) => {
        const isAvailable = item.status === "Available";

        // Logic for status class and label text
        const statusClass = isAvailable ? "status-available" : "status-sold";
        const statusText = isAvailable ? "Available" : "Sold"; // "Archived" sounds more premium than "Sold"

        return `
                <article class="product-card">
                    <div class="card-header">
                        <span class="serial-tag">${item.serial}</span>
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                    </div>
                    <div class="info">
                        <span class="specs">${item.specs}</span>
                        <h3>${item.name}</h3>
                        <p class="desc">${item.description}</p>
                        
                        <div class="card-footer">
                            <span class="price">${item.price}</span>
                            <span class="status-badge ${statusClass}">${statusText}</span>
                        </div>
                    </div>
                </article>
            `;
      })
      .join("");
  } catch (err) {
    console.error("Studio Registry Error:", err);
    // Fallback for user if JSON fails
    document.getElementById("studio-gallery").innerHTML =
      `<p style="font-family:monospace; color:red;">Error loading registry data.</p>`;
  }
}

initStudio();
