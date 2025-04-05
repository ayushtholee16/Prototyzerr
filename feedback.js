// Star rating interaction
const stars = document.querySelectorAll('.star');
stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        stars.forEach((s, i) => {
            s.classList.toggle('active', i <= index);
        });
    });
});

// Form submission handling
document.getElementById('feedbackForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const successMessage = document.querySelector('.success-message');
    successMessage.style.display = 'block';
    e.target.reset();
    stars.forEach(star => star.classList.remove('active'));
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
});

document.addEventListener("DOMContentLoaded", function () {
    const feedbackForm = document.getElementById("feedbackForm");
    const ratingStars = document.querySelectorAll(".star");
    const feedbackList = document.createElement("div");
    feedbackList.className = "feedback-list";
    document.querySelector(".container").appendChild(feedbackList);
    
    let selectedRating = 0;
    
    // Handle star rating selection
    ratingStars.forEach((star, index) => {
        star.addEventListener("click", () => {
            selectedRating = index + 1;
            ratingStars.forEach((s, i) => {
                s.style.color = i < selectedRating ? "gold" : "gray";
            });
        });
    });
    
    // Load feedback from local storage
    function loadFeedback() {
        feedbackList.innerHTML = "";
        const storedFeedback = JSON.parse(localStorage.getItem("feedbacks")) || [];
        storedFeedback.forEach((feedback, index) => {
            const feedbackItem = document.createElement("div");
            feedbackItem.className = "feedback-item";
            feedbackItem.innerHTML = `
                <p><strong>Rating:</strong> ${feedback.rating} ★</p>
                <p><strong>Type:</strong> ${feedback.type}</p>
                <p><strong>Feedback:</strong> ${feedback.message}</p>
                <p><strong>Email:</strong> ${feedback.email ? feedback.email : "N/A"}</p>
                <button onclick="deleteFeedback(${index})">Delete</button>
            `;
            feedbackList.appendChild(feedbackItem);
        });
    }
    
    loadFeedback();
    
    feedbackForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const type = feedbackForm.querySelector("select").value;
        const message = feedbackForm.querySelector("textarea").value.trim();
        const email = feedbackForm.querySelector("input[type='email']").value.trim();
        
        if (selectedRating === 0 || message === "") {
            alert("Please provide a rating and feedback message.");
            return;
        }
        
        const newFeedback = { rating: selectedRating, type, message, email };
        const storedFeedback = JSON.parse(localStorage.getItem("feedbacks")) || [];
        storedFeedback.push(newFeedback);
        localStorage.setItem("feedbacks", JSON.stringify(storedFeedback));
        
        feedbackForm.reset();
        selectedRating = 0;
        ratingStars.forEach(s => s.style.color = "gray");
        loadFeedback();
    });
    
    window.deleteFeedback = function (index) {
        let storedFeedback = JSON.parse(localStorage.getItem("feedbacks")) || [];
        storedFeedback.splice(index, 1);
        localStorage.setItem("feedbacks", JSON.stringify(storedFeedback));
        loadFeedback();
    };
});
