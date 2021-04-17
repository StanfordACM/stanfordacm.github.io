const toggle = (id) => {
    let classes = document.getElementById(id).parentNode.classList;
    if (classes) {
        classes.toggle("hidden");
        if (classes.value.includes("hidden")) {
            document.getElementById(id).firstChild.textContent += " (Click to Expand)";
        } else {
            if (document.getElementById(id).firstChild.textContent.includes("Click to Expand")) {
                document.getElementById(id).firstChild.textContent = document.getElementById(id).firstChild.textContent.replace(" (Click to Expand)", "")
            }
        }
    }
}