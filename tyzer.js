document.addEventListener('DOMContentLoaded', function() {
    const imageGrid = document.getElementById('image-grid');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    // Show loading spinner
    loadingSpinner.style.display = 'block';
    
    // Sample image data - REPLACE THIS WITH YOUR 10,000 IMAGES
    const imageData = [
        {
            url: 'https://example.com/image1.jpg',
            title: 'Beautiful Landscape',
            description: 'Scenic mountain view at sunset'
        },
        {
            url: 'https://example.com/image2.jpg',
            title: 'Ocean Waves',
            description: 'Powerful waves crashing on rocks'
        }
        // Add all your 10,000 images here in this format
    ];
    
    // Function to load images with lazy loading
    function loadImages() {
        const fragment = document.createDocumentFragment();
        
        imageData.forEach((image, index) => {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            
            // Create image with lazy loading
            const img = document.createElement('img');
            img.loading = 'lazy';
            img.dataset.src = image.url;
            img.alt = image.title;
            
            // Create image info
            const imageInfo = document.createElement('div');
            imageInfo.className = 'image-info';
            imageInfo.innerHTML = `
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            `;
            
            // Create download button
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'download-btn';
            downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
            downloadBtn.title = 'Download image';
            downloadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                downloadImage(image.url, image.title);
            });
            
            gridItem.appendChild(img);
            gridItem.appendChild(imageInfo);
            gridItem.appendChild(downloadBtn);
            
            fragment.appendChild(gridItem);
        });
        
        imageGrid.appendChild(fragment);
        
        // Lazy load images when they come into view
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px' // Load images 100px before they come into view
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
        
        // Hide loading spinner when images are loaded
        loadingSpinner.style.display = 'none';
    }
    
    // Function to download image
    function downloadImage(url, title) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = title.toLowerCase().replace(/\s+/g, '-') + '.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Download error:', error);
                // Fallback method if CORS prevents fetch
                window.open(url, '_blank');
            });
    }
    
    // Initial load
    loadImages();
    
    // Infinite scroll for large collections
    let isLoading = false;
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
            isLoading = true;
            // In a real implementation, you would load more images here
            // For this demo, we'll just simulate loading
            setTimeout(() => {
                isLoading = false;
            }, 1000);
        }
    });
});