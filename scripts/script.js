
'use strict'

let highlighted = 0;
let total = 98;
let preview = false;
let pointer;
let container;
let canCallibrate = false;


let setupScreen = () => {
    container = document.getElementsByClassName("container")[0];
    pointer = document.getElementById("pointer");
    for (let x = 1; x <= total; x++) {
        let tmp = document.createElement("div");
        tmp.classList.add("box");
        tmp.innerText = x;
        container.append(tmp);
    }
    document.body.addEventListener("click", (evt) => {
        if(canCallibrate){
            webgazer.addCallibrationPont(evt.x,evt.y);
        }
    });
}


let track = () => {
    window.saveDataAcrossSessions = true;
    webgazer.setTracker("TFFacemesh");
    webgazer.showVideoPreview(preview);
    webgazer.setGazeListener(function (data, elapsedTime) {
        if (data == null) {
            return;
        }
        let selected = document.elementFromPoint(data.x, data.y);
        pointer.style.top = data.y + "px";
        pointer.style.left = data.x + "px";;
        if (selected != undefined && selected.className == "box") {
            if (!selected.classList.contains("selected")) {
                selected.classList.add("selected");
                highlighted++;
            }
        }
        if (highlighted == total) {
            document.querySelectorAll(".box").forEach(e => e.classList.remove("selected"));
            highlighted = 0;
        }
    }
    ).begin();
    canCallibrate = true;
}


document.addEventListener("DOMContentLoaded", () => {
    setupScreen();
    track();
})

