// GSAP Animations
gsap.from(".gallery-item", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
  });
  
  // Filtering Functionality
  const filters = document.querySelectorAll(".filters button");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const gallery = document.querySelector(".gallery");
  
  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      filters.forEach((f) => f.classList.remove("active"));
      filter.classList.add("active");
  
      const category = filter.getAttribute("data-filter");
  
      galleryItems.forEach((item) => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          gsap.to(item, { opacity: 1, scale: 1, duration: 0.5 });
        } else {
          gsap.to(item, { opacity: 0, scale: 0.8, duration: 0.5 });
        }
      });
    });
  });
  
  // Search Functionality
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
  
    // Create an array of gallery items
    const itemsArray = Array.from(galleryItems);
  
    // Filter items based on search term
    const filteredItems = itemsArray.filter((item) => {
      const title = item.getAttribute("data-title").toLowerCase();
      const description = item.getAttribute("data-description").toLowerCase();
      return title.includes(searchTerm) || description.includes(searchTerm);
    });
  
    // Clear the gallery
    gallery.innerHTML = "";
  
    // Append matching items to the top
    filteredItems.forEach((item) => {
      gallery.appendChild(item);
      gsap.from(item, { opacity: 0, y: 50, duration: 0.5 });
    });
  
    // Append non-matching items below
    itemsArray.forEach((item) => {
      if (!filteredItems.includes(item)) {
        gallery.appendChild(item);
        gsap.from(item, { opacity: 0, y: 50, duration: 0.5 });
      }
    });
  });
  
  // Lightbox Functionality
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.querySelector(".caption");
  const closeBtn = document.querySelector(".close");
  
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      gsap.from("#lightbox", { opacity: 0, duration: 0.5 });
      lightboxImg.src = img.src;
      lightboxCaption.textContent = img.alt;
    });
  });
  
  closeBtn.addEventListener("click", () => {
    gsap.to("#lightbox", { opacity: 0, duration: 0.5, onComplete: () => {
      lightbox.style.display = "none";
    }});
  });
  
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      gsap.to("#lightbox", { opacity: 0, duration: 0.5, onComplete: () => {
        lightbox.style.display = "none";
      }});
    }
  });