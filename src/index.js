const navItems = document.querySelectorAll(".nav-item")
console.log(navItems);

navItems.forEach(item => {
    //smooth scroll
    item.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = item.getAttribute("href").substring(1);
        console.log(targetId);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: "smooth"
        });
    });
})

