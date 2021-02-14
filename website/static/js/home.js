
document.addEventListener("DOMContentLoaded", () => {
  dragElement(document.getElementById("Run_button"));

  var j = create_element("1dsad");
  var d = create_element("2");
  combine_elements(j,d);

  //Js for tree view
  var toggler = document.getElementsByClassName("caret");
  var i;

  for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
  } 
});

function combine_elements(j, d){
  if (j.classList.contains("combine") || d.classList.contains("combine")) {
    if (j.classList.contains("combine") && !d.classList.contains("combine")){
      d.style.position = 'relative';
      d.style.left = '0';
      d.style.top = '0';
      j.lastChild.children[0].children[1].style.visibility = "hidden";
      var last = j.lastChild
      d.children[0].children[0].onclick = function() {decombine_elements(last,d)} 
      j.appendChild(d);
    } else if (!j.classList.contains("combine") && d.classList.contains("combine")) {
      j.style.position = 'relative';
      d.style.left = j.style.left;
      d.style.top = j.style.top;
      j.style.left = '0';
      j.style.top = '0';
      j.children[0].children[1].style.visibility = "hidden";
      var first = d.firstChild
      d.firstChild.children[0].children[0].onclick = function() {decombine_elements(j,first)} 
      d.insertBefore(j, d.firstChild);
    } else {
      var children = Array.prototype.slice.call(d.children);
      j.lastChild.children[0].children[1].style.visibility = "hidden";
      var last = j.lastChild
      var first = d.firstChild
      d.firstChild.children[0].children[0].onclick = function() {decombine_elements(last,first)} 
      children.forEach(element => {
        element.parentNode.removeChild(element);
        j.appendChild(element)
      });
      d.parentNode.removeChild(d);
    }
  } else {
    var div = document.createElement("div");
    div.classList.add("combine");
    div.style.position = "absolute";
    div.style.top = j.style.top;
    div.style.left = j.style.left;
    var container = document.getElementById('container')
    j.style.position = 'relative';
    j.style.left = '0';
    j.style.top = '0';
    d.style.position = 'relative';
    d.style.left = '0';
    d.style.top = '0';
    j.children[0].children[1].style.visibility = "hidden";
    d.children[0].children[0].onclick = function() {decombine_elements(j,d)} 
    container.appendChild(div);
    container.removeChild(j);
    container.removeChild(d);
    div.appendChild(j);
    div.appendChild(d);
    dragElement(div);
  }  
}

function decombine_elements(j, d){
  var container = document.getElementById('container')
  var parent = j.parentNode;
  j.children[0].children[1].style.visibility = "visible";
  d.children[0].children[0].onclick = function() {};
  if (j.parentNode.childElementCount > 2){
    if (j === d.parentNode.firstChild){
      j.style.position = 'absolute';
      parent.removeChild(j);
      container.appendChild(j)
      j.style.left = parent.style.left;
      j.style.top = parent.style.top;
      parent.style.left = parseInt(j.style.left,10) + j.offsetWidth + 15 + "px";
    } else if (j.parentNode.lastChild === d) {  
      d.style.position = 'absolute';
      parent.removeChild(d);
      container.appendChild(d)
      d.style.left= parseInt(parent.style.left,10) + parent.offsetWidth + 15 + "px";
      d.style.top = parent.style.top;
    } else {
      var children = Array.prototype.slice.call(parent.children);
      var condition = false;
      var div = document.createElement("div");
      div.classList.add("combine");
      div.style.position = "absolute";
      container.appendChild(div)
      children.forEach(element => {
        if (condition){
          parent.removeChild(element)
          div.appendChild(element)
        } else if (j === element) {
          condition = true;
        }
      });
        div.style.top = parent.style.top;
        div.style.left = parseInt(parent.style.left,10) + parent.offsetWidth + 15 + "px";
        dragElement(div);
    }
  } else {
    j.style.position = 'absolute';
    d.style.position = 'absolute';
    parent.removeChild(j);
    parent.removeChild(d);
    container.appendChild(j)
    container.appendChild(d)
    j.style.left = parent.style.left;
    j.style.top = parent.style.top;
    d.style.left= parseInt(j.style.left,10) + j.offsetWidth + 15 + "px";
    d.style.top = parent.style.top;
    parent.parentNode.removeChild(parent);
  }
}

function create_element(idecko){
    var div = document.createElement('div');
    div.classList.add("drag");
    div.id = idecko;
    var header = document.createElement('div');
    header.id = "mydivheader"
    header.innerHTML = idecko;

    var spaceholder = document.createElement('div');
    spaceholder.classList.add("spaceholder");

    var inpt = document.createElement('button');
    inpt.type = 'button';
    inpt.id = 'in';
    inpt.innerHTML = ' '
    inpt.classList.add('btn-connect');

    var out = document.createElement('button');
    out.type = 'button';
    out.innerHTML = " "
    out.id = 'out';
    out.classList.add('btn-connect');
  
    div.appendChild(header);
    div.appendChild(spaceholder)
    header.appendChild(inpt);
    header.appendChild(out);
  
    var container = document.getElementById('container');
    container.appendChild(div);
    dragElement(div);

    var run_but = document.getElementById("Run");
    run_but.value = run_but.value + idecko + "; ";
    return div
  }
  
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
    
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      elmnt.style.zIndex = "1";
      var sidebar = document.getElementById('sidebar')
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
      // set the element's new position:
      if ((elmnt.offsetTop - pos2) > 0){
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      } else {
        elmnt.style.top = 0 + "px";
      }
      if ((elmnt.offsetLeft - pos1) > 0){
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      } else {
        elmnt.style.left = 0 + "px";
      }


    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
      elmnt.style.zIndex = "0";
      //Připojování boxů k sobě
      var children = Array.prototype.slice.call(document.getElementById('container').children);
      children.forEach(element => {
        if (element === elmnt){} else {
          elmnttop = parseInt(elmnt.style.top,10);
          elmntleft = parseInt(elmnt.style.left,10);
          elmntright = parseInt(elmnt.style.left,10) + elmnt.offsetWidth;
          elementtop = parseInt(element.style.top,10);
          elementleft = parseInt(element.style.left,10);
          elementright = parseInt(element.style.left,10) + element.offsetWidth;
          rang = 10;
          if ((((elmnttop -rang) < elementtop) && ((elmnttop + rang) > elementtop)) && (((elmntright -rang) < elementleft) && ((elmntright + rang) > elementleft))){
            if (element.id === "Run_button"){} else {
              combine_elements(elmnt,element);
            }
          } else if ((((elmnttop -rang) < elementtop) && ((elmnttop + rang) > elementtop)) && (((elmntleft -rang) < elementright) && ((elmntleft + rang) > elementright))){
            if (elmnt.id === "Run_button"){} else {
              combine_elements(element,elmnt);
            }
          }

        } 
      });
    }
  }