document.addEventListener("DOMContentLoaded", () => {
  Delete_box();
  Carets();
  Run_but();
});


function Libs(lib,all_block){
  var Libs = document.getElementById("Lib") //Ul v hmtl kam se má vkládat
  var lib = JSON.parse(lib) //Data z Json
  lib.forEach(element => library(element)); 
  var all_block = JSON.parse(all_block)
  all_block.forEach(element => blocks(element));
  //Vytvoří knihovny
  function library(lib){
    var li = document.createElement('li')
    var span = document.createElement('span')
    var nested = document.createElement('ul')
    nested.id = ("lib" + lib.pk)
    nested.classList.add("nested")
    span.classList.add("caret")
    span.innerHTML = lib.fields.name;
    li.appendChild(span)
    li.appendChild(nested)
    Libs.appendChild(li)
  }
  //vyplní knihovny bloky
  function blocks(block){
    var li = document.createElement('li')
    li.id = block.fields.name;
    li.addEventListener("click", function(){
      create_element(li.id)
    });
    var span = document.createElement('span')
    span.classList.add("span-click")
    var i = document.createElement('i')
    i.classList.add("fa", "fa-cubes")
    i.style.marginRight = "6px"
    span.appendChild(i)
    span.appendChild(document.createTextNode(block.fields.name))
    li.appendChild(span)
    document.getElementById("lib" + block.fields.lib).appendChild(li)
  }
}

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
    Runbut.addEventListener("click", function(){
      Run_send()
    });
    Run_button.children[1].appendChild(Runbut)
}

//Vytvoří pole pro mazání
function Delete_box(){
  var div = document.createElement('div')
  div.innerHTML = "Pro smazání přesuň zde"
  div.classList.add("dlt")
  div.id = "dlt"
  div.style.visibility = "hidden"
  var container = document.getElementById('container')
  container.appendChild(div)
}


//Funkce na odesílání dat na server
function Run_send(){
  var dta = "";
  var Run_button = document.getElementById("Run")
  if (Run_button.parentElement.classList.contains("combine")){ //Pokud je Run_button s něčím spojený
    var children = Array.prototype.slice.call(Run_button.parentElement.children)
    children.shift();
    children.forEach(element => { //Projdou se elementy
      dta = dta.concat(element.id)
      dta = dta.concat(":")
      var childrenofelement = Array.prototype.slice.call(element.children[1].children)
      childrenofelement.forEach(elmnt => {
        dta = dta.concat(elmnt.childNodes[0].nodeValue)
        dta = dta.concat("_")
        dta = dta.concat(elmnt.querySelectorAll("input")[0].value)
        dta = dta.concat(",")
      });
      dta = dta.concat(";")
    });
    $.ajax({ 
      url: '',
      type: 'post',
      data: {
      DTA : dta
      },
      success: function(response){
      }
    })
  }
}