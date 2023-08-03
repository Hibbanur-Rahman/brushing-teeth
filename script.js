var image=document.querySelectorAll('.image');
var options=document.querySelector('.options');
var showCollections=document.querySelector('.show-selections');
var submit=document.querySelector('.submit');
var sidebar=document.querySelector('.sidebar');
var navToggel=document.querySelector('.nav-toggel');
var main=document.querySelector('.main');
var first=document.querySelector('.first');
var second=document.querySelector('.second');
var third=document.querySelector('.third');
var another=document.querySelectorAll('.another');

// speech speaking
let speech = new SpeechSynthesisUtterance();
speech.lang = "en"; //for language english
speech.volume=1; //for volume default is 1 min is 0 and max is 1
speech.pitch=2; // for pitch default is 1, min is 0 and max is 2
speech.rate=1; //for rate the speech default is 1, min is 0.1 and max is 10

image.forEach((element) => {
    element.addEventListener('click',()=>{
        element.style.border='5px solid green';
        element.style.borderRadius='20px';
        element.style.boxShadow='2px 5px 13px 5px rgb(201, 201, 201)'
        element.style.transition='all 0.3s ease-in-out';
        if(element.nextElementSibling.nextElementSibling.innerHTML){
            speech.text=element.nextElementSibling.nextElementSibling.innerHTML;
            window.speechSynthesis.speak(speech);
        }
        console.log(speech.text);
    })
});


//toggel-bar for sidebar
var navCount=0;
sidebar.style.marginLeft='-25%';
navToggel.addEventListener('click',()=>{
    if(navCount==0){
        sidebar.style.marginLeft='0%';
        sidebar.style.transition='all 0.5s ease-in-out';
        navCount=1;
    }
    else{
        sidebar.style.marginLeft='-25%';
        sidebar.style.transition='all 0.5s ease-in-out';
        navCount=0;
    }
    
})
//sidebar removing when the event is not at nav bar
another.forEach((element)=>{
    element.addEventListener('click', ()=>{
        sidebar.style.marginLeft='-25%';
        sidebar.style.transition='all 0.5s ease-in-out';
        navCount=0;
    })
})

//choosing the sidebar pageimg
var pageImg=document.querySelectorAll('.pageImg');
pageImg.forEach((element)=>{
    element.addEventListener('click',()=>{
        if(element==pageImg[0]){
            first.classList.remove('hide');
            second.classList.add('hide');
            third.classList.add('hide');
        }
        else if(element==pageImg[1]){
            first.classList.add('hide');
            second.classList.remove('hide');
            third.classList.add('hide');
        }
        else{
            first.classList.add('hide');
            second.classList.add('hide');
            third.classList.remove('hide');
        }
    })
})

//option generating
var itemListing='';
var images=[
    {
        src : "./images/1.png",
        value : 1,
    },
    {
        src : "./images/2.png",
        value : 2,
    },
    {
        src : "./images/3.png",
        value : 3,
    },
    {
        src : "./images/4.png",
        value : 4,
    },
    {
        src : "./images/5.png",
        value : 5,
    },
    {
        src : "./images/6.png",
        value : 6,
    },
]


// random-ness generater
function random(){
    var x=Math.floor(Math.random()*images.length)+1;
    return x-1;
}

//checking for repeation
function repeation(arr1,rnum){
    for(var j=0;j<arr1.length;j++){
        if(rnum==arr1[j]){
            return true;
        }
    }
    return false;
}

//array for store the random number
function storeRandom(){
    var arr=[];
    for(var i=0;i<images.length;i++){
        var y=random();
        if(!repeation(arr,y)){
            arr.push(y);
        }
        else{
            i--;
        }   
    }
    return arr;
}

//image listing and add the innerHTML
var arrayImgList=[];
arrayImgList=storeRandom();
for(var i=0;i<images.length;i++){
   
    itemListing+=`
                <div class="item" value="${arrayImgList[i]}">
                    <div class="num">
                        <h1></h1>
                    </div>
                    <img src="${images[arrayImgList[i]].src}" alt="${images[arrayImgList[i]].value}">
                </div>
                `
                
}
options.innerHTML=itemListing;


//option selection
var item=document.querySelectorAll('.item');
var num=document.querySelectorAll('.num');
var win=[];
var click=1;
var selectlist=[];
var flag='win';
var showList='';
console.log(item);
item.forEach((element)=> {
    element.addEventListener('click',(event)=>{
        showList+=`
                <div class="show-item">
                    <img src='${element.childNodes[3].src}' alt='${element.childNodes[3].alt}'/>
                    <div class="arrow">
                        <img src="./images/right arrow.png" alt="arrow"/>
                    </div>

                </div>
            `
        showCollections.innerHTML=showList;
        win.push(element.childNodes[3].alt);
        event.currentTarget.childNodes[1].childNodes[0].nextSibling.innerHTML=click;
        if(element.childNodes[3].alt!=click){
            flag='lose';
        }
        click+=1;
        element.style.pointerEvents='none';
        if(click==7){
            var arrow=document.querySelectorAll('.arrow');
            console.log(arrow);
            arrow[arrow.length-1].childNodes[1].style.display='none';
            showCollections.style.justifyContent='space-between';
        }
    })
   
});

//submit button 
submit.addEventListener('click',()=>{
    if(flag=='lose'){
        var lose=document.querySelector('.lose');
        var yuckySound=document.querySelector('#yuckySound');
        yuckySound.play();
        lose.style.display='block';
    }
    else{
        var gif=document.querySelector('#gif');
        var win=document.querySelector('.win');
        var awesomeSound=document.querySelector('#awesomeSound');
        awesomeSound.play();
        win.style.display='block';
        gif.style.display='block';
        console.log('you are winner');
    }
    submit.style.pointerEvents='none';
})