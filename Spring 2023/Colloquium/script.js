window.addEventListener("scroll", function() {
    var headerHeight = document.getElementById("header").offsetHeight;
    var leftColumn = document.querySelector(".left");
    if (window.pageYOffset > headerHeight) {
        leftColumn.classList.add("fixed");
    } else {
        leftColumn.classList.remove("fixed");
    }
});

const sections = document.querySelectorAll('.section');
const links = document.querySelectorAll('a[id^="link"]');

const options = {
    threshold: 0.5
};

let activeLink = null;

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector(`a[href="#${id}"]`);
        if (entry.isIntersecting && activeLink !== link) {
            if (activeLink) {
                activeLink.classList.remove('active');
            }
            activeLink = link;
            activeLink.classList.add('active');
        }
    });
}, options);

sections.forEach(section => observer.observe(section));