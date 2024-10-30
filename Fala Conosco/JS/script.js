document.addEventListener("DOMContentLoaded", function() {
    var dropdownElements = document.querySelectorAll('.dropdown-toggle');
    dropdownElements.forEach(function(element) {
        element.addEventListener('click', function(event) {
            event.preventDefault();
            var dropdownMenu = this.nextElementSibling;
            dropdownMenu.classList.toggle('show');
        });
    });

    // Close dropdown menu when clicking outside
    document.addEventListener('click', function(event) {
        dropdownElements.forEach(function(element) {
            var dropdownMenu = element.nextElementSibling;
            if (!element.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    });
});