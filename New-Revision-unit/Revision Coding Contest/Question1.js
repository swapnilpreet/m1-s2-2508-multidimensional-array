function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args); 
        }, delay);
    };
}

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", debounce(() => {
    console.log("Searching for:", searchInput.value);
}, 500));