const toggle = (id) => {
    let classes = document.getElementById(id).parentNode.classList;
    if (classes) {
        classes.toggle("hidden");
    }
}