fetch("./products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch products.json");
    }
    return response.json();
  })
  .then((products) => {
    const carouselContent = document.getElementById("carouselContent");

    // Loop through products and generate carousel items
    products.forEach((product, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;
      carouselItem.innerHTML = `<img src="${product.image}" class="d-block w-100" alt="${product.alt}">`;
      carouselContent.appendChild(carouselItem);
    });
  })
  .catch((error) => console.error("Error loading products:", error));
