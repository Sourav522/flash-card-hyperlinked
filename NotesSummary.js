var totalPages = 4; //it means 5 questions
var currentPageNo = 0;
var prevPageNo = 0;
var forwardsAnimation = -1;  //if it becomes 1 then it means btn1,btn2, etc is clicked
var backwardsAnimation = -1;  //if it becomes 1 then it means back button is clicked

var noOfButtonsPerPage = [1,1,3,0,1,1,0,1,0]; //does not include back button information, only other button number
var ButtonColour = ["D2D2D2","C4C4C4","95A8CE","95A8CE","95A8CE","95A8CE","95A8CE","95A8CE","95A8CE"]; //does not include back button
var ImageSrcPerPage = ["./SVGs/All about Reflection_0.svg","./SVGs/All about Reflection_1.svg","./SVGs/All about Reflection_2.svg","./SVGs/All about Reflection_3.svg","./SVGs/All about Reflection_4.svg","./SVGs/All about Reflection_5.svg","./SVGs/All about Reflection_6.svg","./SVGs/All about Reflection_7.svg","./SVGs/All about Reflection_8.svg"]; //does not include back button

var backButtonInPage = ["0","1","1","1","1","1","1","1","1"]; //back button visibility information
var buttonTexts = [["How many types of reflection are there ?","","",""]
,["How does a plane mirror reflect light?","","",""]
,["How does two mirrors\n can form multiple images?","what size mirror does we need to\n see a complete image of an object?","what are the\n properties of reflection?",""]//"Sample Text here"
,["","","",""]
,["Is the line joining the image and the object\n perpendicular to the mirror?","","",""]
,["By what angle the reflected ray turns\n if we roate the mirror?","","",""]
,["","","",""]
,["What is the minimum height of mirror\n required to see a complete image of a wall?","","",""]
,["","","",""]];

var BackbuttonLinkedPage = [-1,0,1,2,2,4,5,2,7];         
//Back button link in all the pages; -1 means , buton is hidden for that page
//eg. BackbuttonLinkedPage[1]= 0 means that if you click on the backbutton on the 2nd page, youll go to 1st page
//eg. BackbuttonLinkedPage[5]= 4 means that if you click on the backbutton on the 4th page, youll go to 3rd page
// remaining buttonlinkedpage arrays are written and implemented similarly
var button1LinkedPage    = [1,2,3,-1,5,6,-1,8,-1];       // Button 1 link in all the pages
var button2LinkedPage    = [-1,-1,7,-1,-1,-1,-1,-1,-1];  // Button 2 link in all the pages
var button3LinkedPage    = [-1,-1,4,-1,-1,-1,-1,-1,-1];  // Button 3 link in all the pages
var button4LinkedPage    = [-1,-1,-1,-1,-1,-1,-1,-1,-1]; // Button 4 link in all the pages

var snd = new Audio('whoosh.mp3');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




async function setPage(n){ //sets the nth page; n=0,1, .....
    if(n!=0){
        snd.play();
    }
    

    //set all buttons to invisible
    document.getElementById("btn1").style.display="none";
    document.getElementById("btn2").style.display="none";
    document.getElementById("btn3").style.display="none";
    document.getElementById("btn4").style.display="none";
    
    //setting back button visibility
    if(backButtonInPage[n]==1){  //true or false stored value
        document.getElementById("backBtn").style.display="block";
        console.log("showing back button,"+backButtonInPage[n]);

    }
    else{
        document.getElementById("backBtn").style.display="none";
        console.log("hiding back button,"+backButtonInPage[n])
    }
    var idString="";
    //setting other button's visibility
    for(var i=1;i<=(noOfButtonsPerPage[n]); i++){
        idString="btn"+i.toString(); // idString = "btn1", "btn2", etc
        document.getElementById(idString).style.display = "block";
        // console.log(idString);
        document.getElementById(idString).innerText = buttonTexts[n][i-1];  // -1 done, since i starts with 1
        
    }
    // ---------------ANIMATION PART-----------------------
    //backwards case
    if(backwardsAnimation ==1){
        document.getElementById("pic").src=ImageSrcPerPage[n]; //Load new page
        document.getElementById("picForAnimation").src=ImageSrcPerPage[currentPageNo]; //Load prev page into 2nd pic div.
        document.getElementById("picForAnimation").style.display ="1"; //make visible
        //set image background(with animation)
        document.getElementById("picForAnimation").style.zIndex=1;
        document.getElementById("picForAnimation").classList.add("fromRightToLeftPicAnimationOpposite");
    }
    //forwards case
    if(forwardsAnimation ==1){
        document.getElementById("pic").src=ImageSrcPerPage[n];
        document.getElementById("picForAnimation").src=ImageSrcPerPage[prevPageNo]; //Load prev page into 2nd pic div.
        document.getElementById("picForAnimation").style.opacity ="1"; //make visible
        //set image background(with animation)
        document.getElementById("pic").classList.add("fromRightToLeftPicAnimation");
    }
    // if(backwardsAnimation ==1){
    //     document.getElementById("picForAnimation").src=ImageSrcPerPage[currentPageNo]; //Load prev page into 2nd pic div.
    //     document.getElementById("picForAnimation").style.opacity ="1"; //make visible
    //     //set image background(with animation)
    //     document.getElementById("pic").classList.add("toLeftFromRightPicAnimation");
    // }

    //add buttons to the fastswap class
    document.getElementById("backBtn").classList.add("buttonAnimation");
    document.getElementById("btn1").classList.add("buttonAnimation");
    document.getElementById("btn2").classList.add("buttonAnimation");
    document.getElementById("btn3").classList.add("buttonAnimation");
    document.getElementById("btn4").classList.add("buttonAnimation");
    
    //----------wait 600ms------------
    await sleep(600); //make sure it matches with the total time of animation
    // make sure it matches with the total time of animation in .backgroundPicAnimation
    //----------wait over-------------


    //backwards case
    if(backwardsAnimation ==1){
        document.getElementById("picForAnimation").src=ImageSrcPerPage[currentPageNo]; //Load prev page into 2nd pic div.
        document.getElementById("picForAnimation").style.opacity ="0"; //make invisible
        document.getElementById("picForAnimation").style.zIndex=-1;

        //remove them from the class
        document.getElementById("picForAnimation").classList.remove("fromRightToLeftPicAnimationOpposite");
    }
    //forwards case
    if(forwardsAnimation ==1){
        document.getElementById("picForAnimation").style.opacity ="0"; //make invisible
        //remove them from the class
        document.getElementById("pic").classList.remove("fromRightToLeftPicAnimation");

    }

    document.getElementById("backBtn").classList.remove("buttonAnimation");
    document.getElementById("btn1").classList.remove("buttonAnimation");
    document.getElementById("btn2").classList.remove("buttonAnimation");
    document.getElementById("btn3").classList.remove("buttonAnimation");
    document.getElementById("btn4").classList.remove("buttonAnimation");

    //Resetting animation direction indicators
    forwardsAnimation = -1;  //if it becomes 1 then it means btn1,btn2, etc is clicked
    backwardsAnimation = -1;  //if it becomes 1 then it means back button is clicked
}

//set links to each button
document.getElementById("backBtn").onclick = function(){
    prevPageNo=currentPageNo;
    backwardsAnimation = 1; //Back Button is clicked, hence backward animation will happen.
    //go to next page in sequence
    setPage(BackbuttonLinkedPage[currentPageNo]);
    currentPageNo = BackbuttonLinkedPage[currentPageNo];
    console.log("Back button clicked,"+BackbuttonLinkedPage[currentPageNo])

    
}

document.getElementById("btn1").onclick = function(){
    prevPageNo=currentPageNo;
    forwardsAnimation = 1; //Buttons are clicked, hence forward animation will happen.
    //go to next page in sequence
    setPage(button1LinkedPage[currentPageNo]);
    currentPageNo = button1LinkedPage[currentPageNo];
    console.log("Button 1 clicked,"+button1LinkedPage[currentPageNo])


}
document.getElementById("btn2").onclick = function(){
    prevPageNo=currentPageNo;
    forwardsAnimation = 1; //Buttons are clicked, hence forward animation will happen.
    //go to next page in sequence
    setPage(button2LinkedPage[currentPageNo]);
    currentPageNo = button2LinkedPage[currentPageNo];
    console.log("Button 2 clicked,"+button2LinkedPage[currentPageNo])

    
}
document.getElementById("btn3").onclick = function(){
    prevPageNo=currentPageNo;
    forwardsAnimation = 1; //Buttons are clicked, hence forward animation will happen.
    //go to next page in sequence
    setPage(button3LinkedPage[currentPageNo]);
    currentPageNo = button3LinkedPage[currentPageNo];
    console.log("Button 3 clicked,"+button3LinkedPage[currentPageNo])

    
}
document.getElementById("btn4").onclick = function(){
    prevPageNo=currentPageNo;
    forwardsAnimation = 1; //Buttons are clicked, hence forward animation will happen.
    //go to next page in sequence
    setPage(button4LinkedPage[currentPageNo]);
    currentPageNo = button4LinkedPage[currentPageNo];
    console.log("Button 4 clicked,"+button4LinkedPage[currentPageNo])   
}


window.onload = setPage(0);

function fadeStartScreen(){
    document.getElementById("startScreen").style.display = "none";
    // document.getElementById("blur").style.display = "none";
}
document.getElementById("startBtn").onclick = function (){fadeStartScreen()};



