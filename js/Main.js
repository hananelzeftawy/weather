
findLoction("cairo");
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//------------------------------------------------------------

//-------------------------------------------------------------
//   add event focusin for input  findLocation
let inputFindLocation=document.getElementById('findLoction');
inputFindLocation.addEventListener('focusin',function(){
    inputFindLocation.style.setProperty('background','#1e202b');
    inputFindLocation.style.setProperty('color','white');
});

//-------------------------------------------------------------
//   add event click for butn findLocation
let btnFindLocation=document.getElementById('btnfindLoction');
inputFindLocation.addEventListener('click',function(){
    btnFindLocation.classList.add('bg-primary');
});
//--------------------------------------------------------------
//   add two events  mouseenter  mouseleave  for nvgbar
let listItemNavBar=document.getElementsByClassName('nav-item');
for(let i=0;i<listItemNavBar.length;i++)
{
    listItemNavBar[i].addEventListener('mouseenter',function(){
    listItemNavBar[i].classList.add('border','border-2','border-primary','rounded-pill');    
    });
}

for(let i=0;i<listItemNavBar.length;i++)
{
    listItemNavBar[i].addEventListener('mouseleave',function(){
    listItemNavBar[i].classList.remove('border','border-2','border-primary','rounded-pill');    
    });
}


//-----------------------------------------------------


let allcurrent=[];
let inputLocation=document.getElementById("findLoction");
let btnFind =document.getElementById('btnfindLoction');


btnFind.addEventListener('click',function(){
 findLoction(inputLocation.value)

})


function findLoction(str){
    
    let myHttp=new XMLHttpRequest();//
    myHttp.open('GET',`http://api.weatherapi.com/v1/forecast.json?key=bd35f835f83a4e62a33180435212809&q=${str}`);
    myHttp.send();
    //current 
    myHttp.addEventListener('readystatechange',function(){
        if(myHttp.readyState==4 &&myHttp.status==200)
        {
    
        allcurrent=JSON.parse(myHttp.response);
         
         
         displayCurrent(allcurrent.location, allcurrent.current);
         displayAnother(allcurrent.forecast.forecastday);
         console.log(allcurrent);
         console.log(allcurrent.location);
         console.log(allcurrent.current);
         console.log(allcurrent.forecast.forecastday);

        }
    });
    
}


function displayCurrent(a, t) 
{ if (null != t) 
    { 
        console.log('temp : '+t.temp_c);
    var e = new Date(t.last_updated.replace(" ", "T")); 
     let n = `<div class="today forecast">\n
                 <div class="forecast-header"  id="today">\n    
                      <div class="day">${days[e.getDay()]}</div>\n    
                      <div class=" date">${e.getDate() }  ${ monthNames[e.getMonth()]}</div>\n   
                 </div>
                 
                 <div class="forecast-content " id="current">\n    
                 <div class="location"> ${a.name}</div>\n 
                  <div class="degree-info">
                    <div class="degree  ">\n <div class="num"> ${t.temp_c}<sup>o</sup>C</div>  </div>
                    \n      \n 
                       
                  <div class="forecast-icon  ">\n            
                  <img src="https:${t.condition.icon}" alt="" width=90>\n </div>
                  </div>
                  <div class="custom">${t.condition.text}</div>\n 
                <span><img src="https://routeweather.netlify.app/images/icon-umberella@2x.png" alt="" width="21" height="21">20%</span>
   <span><img src="https://routeweather.netlify.app/images/icon-wind@2x.png" alt="" width="23" height="21">18km/h</span>
   <span><img src="https://routeweather.netlify.app/images/icon-compass@2x.png" alt="" width="21" height="21">East</span>           
                  </div>


              </div> ` ; 
              
              document.getElementById("forecast").innerHTML = n 
            
    } 
} 

function displayAnother(a) { 
    let t = " "; 
    t += `\t<div class="forecast  h-100 "> 
         
    

    <div class="forecast-content">\n 
    <div class="day mx-3">${days[new Date(a[0].date.replace(" ", "T")).getDay()]}</div>\n           
    <div class="forecast-icon ">\n               
     <img src="https:${a[0].day.condition.icon}" alt="" width=48>\n            
     </div>
     </div> \n 
     
     <div class="degree">${a[0].day.maxtemp_c}<sup>o</sup>C</div>\n            
     <small>${a[0].day.mintemp_c}<sup>o</sup></small>\n            
     <div class="custom">${a[0].day.condition.text}</div>\n        
     </div>\n  

    </div> `;

  


     document.getElementById('forecast-afterOneDay').innerHTML = t 
     document.getElementById('forecast-aftertwoDay').innerHTML = t 
    } 
   