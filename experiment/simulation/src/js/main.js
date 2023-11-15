var menu_score = -1; 
function dispmenu()
{
 
  var ms =window.matchMedia("(max-width:850px)"); 
    if(ms.matches)
    {
      if(menu_score==0)
      {
        menu_score=-1;
    document.getElementById("main-sec").setAttribute("style","width:100%");
   // document.getElementById("des").setAttribute("style","min-height:450px");
    document.getElementById("navbar").setAttribute("style","display:block");
   // document.getElementById("csec").setAttribute("style","min-height:450px");
    document.body.style.backgroundColor="rgba(0,0,0,0.1)";
    window.addEventListener('mouseup', function(event){
      var box = document.getElementById('navbar');
      if (event.target != box && event.target.parentNode != box){
        box.style.display = 'none';
        document.body.style.backgroundColor="white";
        if(event.target != document.getElementById("head-btn"))
          menu_score=0;
      document.getElementById("csec").setAttribute("style","min-height:150px");
      document.getElementById("main-sec").setAttribute("style","width:100%");
      document.getElementById("des").setAttribute("style","min-height:150px");
        }});
  }
  else{
    document.getElementById("navbar").setAttribute("style","display:none");
         document.getElementById("csec").setAttribute("style","min-height:150px");
      document.getElementById("main-sec").setAttribute("style","width:100%");
      document.getElementById("des").setAttribute("style","min-height:150px");
      menu_score=0;
  }
      }

else
{
  if(menu_score==0)
      {
    document.getElementById("navbar").setAttribute("style","display:block");
    document.getElementById("csec").setAttribute("style","min-height:450px");
    document.getElementById("main-sec").setAttribute("style","width:80vw");
        document.getElementById("des").setAttribute("style","min-height:450px");
   menu_score = -1;
  }
  else{
    document.getElementById("navbar").setAttribute("style","display:none");
         document.getElementById("csec").setAttribute("style","min-height:150px");
      document.getElementById("main-sec").setAttribute("style","width:100%");
      document.getElementById("des").setAttribute("style","min-height:150px");
      menu_score=0;
  }
      }
}

    


function myFunction(x) {
  x.classList.toggle("change");
}

function prequiz()
{
let radioButtons = document.querySelectorAll('input[name="pre1"]');
let selectedans;
let said;
let count=0;
            for (const radioButton of radioButtons) {
                if (radioButton.checked) {
                    selectedans = radioButton.value;
                    break;
                }
            }
            if(selectedans==1)
              said="pre11";
            else if(selectedans==2)
              said="pre12";
            else if(selectedans==3)
              said="pre13";
            else if(selectedans==4)
              said="pre14";
          if(selectedans!=2)
            {count=count+1;
              console.log(said);
              document.getElementById(said).setAttribute("style","color:red");}
              else
                document.getElementById(said).setAttribute("style","color:lightgreen");
  radioButtons = document.querySelectorAll('input[name="pre2"]');
       for (const radioButton of radioButtons) {
                if (radioButton.checked) {
                    selectedans = radioButton.value;
                      said=radioButton.id;
                    break;
                }
            }
            if(selectedans==1)
              said="pre21";
            else if(selectedans==2)
              said="pre22";
            else if(selectedans==3)
              said="pre23";
            else if(selectedans==4)
              said="pre24";
          if(selectedans!=4)
            {count=count+1;
              document.getElementById(said).setAttribute("style","color:red");}
              else
                document.getElementById(said).setAttribute("style","color:lightgreen");

document.getElementById("preresult").innerHTML="You got " + (2-count).toFixed(0) + " answers correct out of 2";
}
function postquiz()
{
let radioButtons = document.querySelectorAll('input[name="post1"]');
let selectedans;
let said;
let count=0;
            for (const radioButton of radioButtons) {
                if (radioButton.checked) {
                    selectedans = radioButton.value;
                    break;
                }
            }
            if(selectedans==1)
              said="post11";
            else if(selectedans==2)
              said="post12";
            else if(selectedans==3)
              said="post13";
            else if(selectedans==4)
              said="post14";
          if(selectedans!=4)
            {count=count+1;
              console.log(said);
              document.getElementById(said).setAttribute("style","color:red");}
              else
                document.getElementById(said).setAttribute("style","color:lightgreen");
  radioButtons = document.querySelectorAll('input[name="post2"]');
       for (const radioButton of radioButtons) {
                if (radioButton.checked) {
                    selectedans = radioButton.value;
                      said=radioButton.id;
                    break;
                }
            }
            if(selectedans==1)
              said="post21";
            else if(selectedans==2)
              said="post22";
            else if(selectedans==3)
              said="post23";
            else if(selectedans==4)
              said="post24";
          if(selectedans!=1)
            {count=count+1;
              document.getElementById(said).setAttribute("style","color:red");}
              else
                document.getElementById(said).setAttribute("style","color:lightgreen");

document.getElementById("preresult").innerHTML="You got " + (2-count).toFixed(0) + " answers correct out of 2";
}