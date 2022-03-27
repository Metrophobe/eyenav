
'use strict'

import { webgazer } from "./webgazer.js";



let highlighted = 0;
let total = 98;
let preview = false;


let init = () => {
    window.saveDataAcrossSessions = true;
    webgazer.setTracker("TFFacemesh");
    webgazer.showVideoPreview(preview);
    webgazer.setGazeListener(function (data, elapsedTime) {
        if (data == null) {
            return;
        }
        let selected = document.elementFromPoint(data.x,data.y);
        if(selected!= undefined && selected.className == "box"){
            if(!selected.classList.contains("selected")){
                selected.classList.add("selected");
                highlighted++;
            }
        }
        if(highlighted==total){
            document.querySelectorAll(".box").forEach(e => e.classList.remove("selected"));
            highlighted = 0;
        }
    }).begin();

}


document.addEventListener("DOMContentLoaded", () => {
    //init();
    let container = document.getElementsByClassName("container")[0];
    init();
    for (let x = 1; x <= total; x++) {
        let tmp = document.createElement("div");
        tmp.classList.add("box");
        tmp.innerText = x;
        container.append(tmp);
    }
})

