document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModal');
    const ratingModal = document.getElementById('ratingModal');
    const closeModalBtn = document.querySelector('.close');
    const submitRatingBtn = document.getElementById('submitRating');
    const ratingStars = document.querySelectorAll('.rating i');
    const reviewsContainer = document.getElementById('reviewsContainer');
    let selectedRating = 0;

    // Function to open the modal
    function openModal() {
        ratingModal.style.display = 'block';
    }

    // Function to close the modal
    function closeModal() {
        ratingModal.style.display = 'none';
    }

    // Event listener to open the modal
    openModalBtn.addEventListener('click', openModal);

    // Event listener to close the modal
    closeModalBtn.addEventListener('click', closeModal);

    // Event listener to handle star rating selection
    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-rating');
            ratingStars.forEach(s => s.classList.remove('selected'));
            for (let i = 0; i < selectedRating; i++) {
                ratingStars[i].classList.add('selected');
            }
        });
    });

    // Event listener to submit the rating, name, and optional comment
    submitRatingBtn.addEventListener('click', () => {
        if (selectedRating > 0) {
            const commentText = document.getElementById('commentText').value;
            const nameText = document.getElementById('nameText').value || 'Anonymous';
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
                <div class="review-stars">
                    ${'<i class="fas fa-star"></i>'.repeat(selectedRating)}
                    ${'<i class="far fa-star"></i>'.repeat(5 - selectedRating)}
                </div>
                <p><strong>${nameText}</strong></p>
                <p>${commentText ? commentText : 'No comment provided.'}</p>
            `;
            reviewsContainer.appendChild(reviewElement);
            closeModal();
            selectedRating = 0;
            ratingStars.forEach(star => star.classList.remove('selected'));
            document.getElementById('commentText').value = '';
            document.getElementById('nameText').value = '';
        } else {
            alert('Please select a rating');
        }
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target == ratingModal) {
            closeModal();
        }
    });
});
