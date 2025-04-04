document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const locationInput = document.getElementById("location-input");
    const categorySelect = document.getElementById("category-select");
    const jobListings = document.querySelectorAll(".job-listings article");

    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        const locationTerm = locationInput.value.toLowerCase();
        const categoryTerm = categorySelect.value;
        
        jobListings.forEach(job => {
            const title = job.querySelector("h3").textContent.toLowerCase();
            const location = job.querySelector("p:nth-child(3)").textContent.toLowerCase();
            const category = job.dataset.category;
            
            if ((title.includes(searchTerm) || searchTerm === "") &&
                (location.includes(locationTerm) || locationTerm === "") &&
                (category === categoryTerm || categoryTerm === "all")) {
                job.style.display = "block";
            } else {
                job.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", filterJobs);
    locationInput.addEventListener("input", filterJobs);
    categorySelect.addEventListener("change", filterJobs);
});
