document.addEventListener("DOMContentLoaded", () => {
    var j = create_element("1dsad");
    var d = create_element("2");
    combine_elements(j,d);
    Carets();
    Run_but();
});

//Js pro ovládání rozklikávacího menu
function Carets(){
    var toggler = document.getElementsByClassName("caret");
    var i;  
    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
      });
    } 
}

//Vytvoří RUN tlačítko
function Run_but(){
    var Run_button = create_element("Run")
    Run_button.children[0].children[0].style.visibility = "hidden"
    Run_button.style.top = "40%"
    Run_button.style.left = "15%"
    Run_button.children[1].classList.remove("form-group")
    Run_button.children[1].classList.add("spaceholder")
    var Runbut = document.createElement('button')
    Runbut.id = "Run"
    Runbut.innerHTML = "▶️"
    Runbut.classList.add("Run")
    Run_button.children[1].appendChild(Runbut)
}