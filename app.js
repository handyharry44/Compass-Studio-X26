async function initStudio() {
    try {
        const response = await fetch('inventory.json');
        const items = await response.json();
        const gallery = document.getElementById('studio-gallery');

        gallery.innerHTML = items.map(item => {
            const isAvailable = item.status === "Available";
            
            // Logic for status class and label text
            const statusClass = isAvailable ? "status-available" : "status-sold";
            const statusText = isAvailable ? "AVAILABLE" : "SOLD";

            return `
                <article class="product-card">
                    <span class="serial-tag">${item.serial}</span>
                    <img src="${item.image}" alt="${item.name}">
                    <div class="info">
                        <p class="specs">${item.specs}</p>
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <span class="price">${item.price}</span>
                    </div>
                    <span class="status-banner ${statusClass}">${statusText}</span>
                </article>
            `;
        }).join('');
    } catch (err) {
        console.error("Studio Registry Error:", err);
    }
}

initStudio();