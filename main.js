document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("image-track");
    const images = document.getElementsByClassName("image");

    if (track) {
        track.dataset.prevPercentage = "0";

        window.onmousedown = e => {
            track.dataset.mouseDownAt = e.clientX;
        }

        window.onmousemove = e => {
            if (track.dataset.mouseDownAt === "0") return;
            const mouseDelta = e.clientX - parseFloat(track.dataset.mouseDownAt);
            const maxDelta = window.innerWidth / 2;
            const percentage = (mouseDelta / maxDelta) * 100;
            const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

            const limitedPercentage = Math.max(-100, Math.min(0, nextPercentage));

            track.dataset.percentage = limitedPercentage;
            track.style.transform = `translate(${limitedPercentage}%, -50%)`;

            track.animate(
                { transform: [`translate(${limitedPercentage}%, -50%)`, `translate(${limitedPercentage}%, -50%)`] },
                { duration: 1200, fill: "forwards" }
            );

            for (let i = 0; i < images.length; i++) {
                images[i].animate(
                    { objectPosition: [`${100 + nextPercentage}% center`, `${100 + nextPercentage}% center`] },
                    { duration: 1200, fill: "forwards" }
                );
            }
        }

        window.onmouseup = () => {
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage;
        }
    } else {
        console.error("Element with ID 'image-track' not found.");
    }
});
