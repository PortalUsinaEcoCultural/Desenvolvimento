function expandImage(img) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("expandedImage");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

