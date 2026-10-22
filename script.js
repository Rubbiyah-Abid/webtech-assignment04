var allSlides = [];
var index = 0;

var inputArea = document.getElementById("input-area");
var previewArea = document.getElementById("preview-area");
var pageCount = document.getElementById("page-count");

var showScreen = document.getElementById("show-screen");
var showContent = document.getElementById("show-content");
var showCount = document.getElementById("show-count");

var prevBtn = document.getElementById("prev-btn");
var nextBtn = document.getElementById("next-btn");
var showPrevBtn = document.getElementById("show-prev-btn");
var showNextBtn = document.getElementById("show-next-btn");

function readSlides() {
    allSlides = inputArea.value.split("---");

    if (index >= allSlides.length) {
        index = allSlides.length - 1;
    }
    if (index < 0) {
        index = 0;
    }

    draw();
}

function toHtml(text) {
    var result = "";
    var rows = text.split("\n");

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];

        if (row.startsWith("### ")) {
            result += "<h3>" + row.substring(4) + "</h3>";
        } else if (row.startsWith("## ")) {
            result += "<h2>" + row.substring(3) + "</h2>";
        } else if (row.startsWith("# ")) {
            result += "<h1>" + row.substring(2) + "</h1>";
        } else if (row != "") {
            result += "<p>" + row + "</p>";
        }
    }

    return result;
}

function draw() {
    var content = toHtml(allSlides[index]);
    var label = (index + 1) + " / " + allSlides.length;
    var atStart = index == 0;
    var atEnd = index == allSlides.length - 1;

    previewArea.innerHTML = content;
    showContent.innerHTML = content;

    pageCount.innerText = label;
    showCount.innerText = label;

    prevBtn.disabled = atStart;
    showPrevBtn.disabled = atStart;
    nextBtn.disabled = atEnd;
    showNextBtn.disabled = atEnd;
}

function back() {
    if (index > 0) {
        index--;
        draw();
    }
}

function forward() {
    if (index < allSlides.length - 1) {
        index++;
        draw();
    }
}

function store() {
    localStorage.setItem("mySlides", inputArea.value);
    alert("Slides saved!");
}

function startShow() {
    showScreen.style.display = "flex";
    document.documentElement.requestFullscreen();
}

function endShow() {
    showScreen.style.display = "none";

    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

function expand() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        previewArea.requestFullscreen();
    }
}

document.getElementById("store-btn").onclick = store;
document.getElementById("show-btn").onclick = startShow;

prevBtn.onclick = back;
nextBtn.onclick = forward;
document.getElementById("expand-btn").onclick = expand;

showPrevBtn.onclick = back;
showNextBtn.onclick = forward;
document.getElementById("show-exit-btn").onclick = endShow;

inputArea.oninput = readSlides;

document.onkeydown = function (e) {
    if (e.ctrlKey && e.key == "s") {
        e.preventDefault();
        store();
    }

    if (e.key == "ArrowLeft" && document.activeElement != inputArea) {
        back();
    }

    if (e.key == "ArrowRight" && document.activeElement != inputArea) {
        forward();
    }

    if (e.key == "F11") {
        e.preventDefault();

        if (showScreen.style.display == "flex") {
            endShow();
        } else {
            startShow();
        }
    }
};

document.onfullscreenchange = function () {
    if (!document.fullscreenElement) {
        showScreen.style.display = "none";
    }
};

var saved = localStorage.getItem("mySlides");

if (saved) {
    inputArea.value = saved;
} else {
    inputArea.value = "# Slide 1\n## Welcome\nMy presentation\n---\n# Slide 2\n## Thank You";
}

readSlides();
