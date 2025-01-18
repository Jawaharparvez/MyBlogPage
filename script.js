// Cache selectors for better performance
const blogPosts = document.querySelectorAll('.blog-post');
const menuItems = document.querySelectorAll('.menu__item');

// Add hover animations for blog posts
blogPosts.forEach((post) => {
  post.addEventListener('mouseenter', () => {
    post.classList.add('hovered');
  });

  post.addEventListener('mouseleave', () => {
    post.classList.remove('hovered');
  });
});

// Close menu on item click
menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    document.getElementById('menu__toggle').checked = false;
  });
});

// Add "Read More" functionality
const readMoreButtons = document.querySelectorAll('.read-more-btn');
readMoreButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const post = event.target.closest('.blog-post');
    const content = post.querySelector('.full-content').innerHTML;

    // Create modal structure
    const overlay = document.createElement('div');
    overlay.classList.add('blog-overlay');

    const blogModal = document.createElement('div');
    blogModal.classList.add('blog-modal');
    blogModal.innerHTML = `
      <h2>${post.querySelector('.post-title').textContent}</h2>
      <div>${content}</div>
      <div class="modal-buttons">
        <button class="read-full-btn">Read Full Article</button>
        <button class="close-btn" aria-label="Close Modal">Close</button>
      </div>
    `;

    overlay.appendChild(blogModal);
    document.body.appendChild(overlay);

    // Trigger the modal opening animation
    requestAnimationFrame(() => {
      blogModal.style.transform = 'scale(1)';
    });

    // Add functionality to "Read Full Article" button
    blogModal.querySelector('.read-full-btn').addEventListener('click', () => {
      window.location.href = 'Notes.html'; // Replace with the actual URL
    });

    // Close modal on overlay click or button click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.classList.contains('close-btn')) {
        blogModal.style.transform = 'scale(0)';
        setTimeout(() => {
          document.body.removeChild(overlay);
        }, 300); // Make sure this time matches the CSS transition duration
      }
    });
  });
});
