function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Close sidebar when clicking outside
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const btn = document.querySelector('.mobile-menu-btn');
    if (!sidebar.contains(event.target) && event.target !== btn) {
        sidebar.classList.remove('active');
    }
});
