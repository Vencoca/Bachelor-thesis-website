//Vytvoření elementu kterým se dá posouvat
function create_element(ID,alternative){
    var div = document.createElement('div'); 
    div.classList.add("drag");
    div.id = ID;
    //Nadpis za který se element posouvá
    var header = document.createElement('div'); 
    header.id = ID + "header"
    header.innerHTML = ID;
    header.classList.add("mydivheader")
    //Div ve kterém jsou všechny posuvníky
    var spaceholder = document.createElement('div'); 
    spaceholder.classList.add("form-group");
    spaceholder.classList.add("px-3");
    //Tlačítka na připojování
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
    //Přidání tooltipu
    div.setAttribute("data-toggle","tooltip")
    div.setAttribute("data-placement","bottom")
    div.setAttribute("title", alternative)
    //Ajax dotaz na server jestli ma block posuvníky
    $.ajax({ 
        url: '',
        type: 'get',
        data: {
        id : ID
        },
        success: function(response){
            var slider = JSON.parse(response.slider)
            slider.forEach(element => Slider(element)); 
            var cha_field = JSON.parse(response.cha_field)
            cha_field.forEach(element => ChaField(element)); 
            var nu_field = JSON.parse(response.nu_field)
            nu_field.forEach(element => NuField(element)); 

            function Slider(Slider) { //Vytvoření posuvníku a vložení jména a čísla s současnou hodnotou
                var slider_div= document.createElement('div')
                var text = document.createElement('span')
                text.innerHTML = Slider.fields.default
                slider_div.appendChild(document.createTextNode(Slider.fields.name));
                slider_div.appendChild(document.createElement('br'));
                slider_div.appendChild(text)
                var range = document.createElement("input")
                range.setAttribute("type", "range");
                range.setAttribute("min", Slider.fields.minimum);
                range.setAttribute("max",  Slider.fields.maximum);
                range.value = Slider.fields.default;
                range.setAttribute("oninput", "updateTextInput(this.value,this);");
                range.classList.add("form-control-range")
                slider_div.appendChild(range)
                spaceholder.appendChild(slider_div)
            }
            function NuField(NuField){
                var nu_div = document.createElement('div')
                nu_div.appendChild(document.createTextNode(NuField.fields.name))
                nu_div.appendChild(document.createElement('br'));
                var number = document.createElement("input")
                number.setAttribute("type","number")
                number.setAttribute("min", NuField.fields.minimum);
                number.setAttribute("max",  NuField.fields.maximum);
                number.value = NuField.fields.default;
                nu_div.appendChild(number)
                spaceholder.appendChild(nu_div)
            }
            function ChaField(ChaField){
                var Cha_div = document.createElement('div')
                Cha_div.appendChild(document.createTextNode(ChaField.fields.name))
                Cha_div.appendChild(document.createElement('br'));
                var text = document.createElement("input")
                text.setAttribute("type","text")
                text.value = "";
                Cha_div.appendChild(text)
                spaceholder.appendChild(Cha_div)
            }
        }
    })
    //Vytvoření vztahů mezi objekty
    div.appendChild(header);
    div.appendChild(spaceholder)
    header.appendChild(inpt);
    header.appendChild(out);
    var container = document.getElementById('container');
    container.appendChild(div); //Vložení do dokumentu
    dragElement(div); //Přiřazení funkce na posouvání
    return div //Vrací Vytvořený objekt
}

//Spojování elementů
function combine_elements(j, d){
    //Spojování elementů u kterých jeden nebo oba již obsahují více elementů
    if (j.classList.contains("combine") || d.classList.contains("combine")) {
        //Spojení více se samostatným
        if (j.classList.contains("combine") && !d.classList.contains("combine")){
            d.style.position = 'relative';
            d.style.left = '0';
            d.style.top = '0';
            j.lastChild.children[0].children[1].style.visibility = "hidden";
            var last = j.lastChild
            d.children[0].children[0].onclick = function() {decombine_elements(last,d)} 
            j.appendChild(d);
        //Spojení samostatného s více    
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
        //Spojení více s více 
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
    //Spojení dvou samostatných elementů    
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
    }  
}

//Rozpojování elementů
function decombine_elements(j, d){
    var container = document.getElementById('container')
    var parent = j.parentNode;
    j.children[0].children[1].style.visibility = "visible"; //Zviditelní připojovací tlačítko
    d.children[0].children[0].onclick = function() {}; //Odstraní funkci rozpojení elementů
    //Rozpojování více elementů
    if (j.parentNode.childElementCount > 2){
        //Pokud je odpojován první element
        if (j === d.parentNode.firstChild){
            j.style.position = 'absolute';
            parent.removeChild(j);
            container.appendChild(j)
            j.style.left = parent.style.left;
            j.style.top = parent.style.top;
            parent.style.left = parseInt(j.style.left,10) + j.offsetWidth + 15 + "px";
        //Pokud je odpojován poslední element    
        } else if (j.parentNode.lastChild === d) {  
            d.style.position = 'absolute';
            parent.removeChild(d);
            container.appendChild(d)
            d.style.left= parseInt(parent.style.left,10) + parent.offsetWidth + 15 + "px";
            d.style.top = parent.style.top;
        //Pokud je rozpojování kdekoliv jinde (Zbydou 2 boxy obsahující více elementů)
        } else {
            var children = Array.prototype.slice.call(parent.children);
            var condition = false;
            var div = document.createElement("div");
            div.classList.add("combine"); //Vytvoří se nový box
            div.style.position = "absolute";
            container.appendChild(div)
            children.forEach(element => { //Projdou se elementy dokud se nenarazí na rozpojovanou část a vloží se do nového boxu
                if (condition){
                    parent.removeChild(element)
                    div.appendChild(element)
                } else if (j === element) { //Pokud procházený element je element který je levý rozpojovaný
                    condition = true;
                }
            });
            div.style.top = parent.style.top;
            div.style.left = parseInt(parent.style.left,10) + parent.offsetWidth + 15 + "px";
            dragElement(div);
        }
    //Pokud jsou rozpojované pouze 2 elementy  
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

//Funkce na updatování hodnot u sliderů
function updateTextInput(val,elmnt) {
    elmnt.previousSibling.innerHTML=val;
}