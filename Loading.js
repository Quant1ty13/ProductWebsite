window.addEventListener("load", () => {
    const Loading = document.querySelector(".Loading");
    Loading.classList.add("Loading-hidden");
    Loading.addEventListener(transitionend, () => {
        document.body.removeChild("Loading");
    })
})