//set variables
let $currentDay = $("#currentDay");
let $timeBlock = $(".time-block");
let $schedule = $(".schedule");
let toDoItems = [];
let currentDate = moment().format("dddd, MMMM Do");
let currentHour = moment().format("H");

//change bachground color based on real-time
function renderTimeBlockColor() {
   
    $timeBlock.each(function(){
        let $thisBlock = $(this);
        let thisBlockHour = parseInt($thisBlock.attr("data-hour"));

        if (thisBlockHour == currentHour) {
            $thisBlock.addClass("present").removeClass("past future");
        }
        if (thisBlockHour < currentHour) {
            $thisBlock.addClass("past").removeClass("present future");
        }
        if (thisBlockHour > currentHour) {
            $thisBlock.addClass("future").removeClass("present past");
        }
    });
}

//push the entered text and respective block hour into array. stringify
function scheduleArray() {

    $timeBlock.each(function(){
        let $thisBlock = $(this);
        let thisBlockHour = parseInt($thisBlock.attr("data-hour"));

        let toDoInfo = {
            hour: thisBlockHour,
            text: "",
        }
        toDoItems.push(toDoInfo);
    });

    localStorage.setItem('todos', JSON.stringify(toDoItems));
}

function renderSchedule(){
    toDoItems = localStorage.getItem("todos");
    toDoItems = JSON.parse(toDoItems);
  
    for (var i = 0; i < toDoItems.length; i++){
      var itemHour = toDoItems[i].hour;
      var itemText = toDoItems[i].text; 
     
      $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
    }
  
    // console.log(toDoItems);
}

//save to do items to local storage
function save() {
    let hourToUpdate = $(this).parent().attr("data-hour");
    let itemToAdd = (($(this).parent()).children("textarea")).val();

    for (var j = 0; j < toDoItems.length; j++) {
        if (toDoItems[j].hour == hourToUpdate) {
            toDoItems[j].text = itemToAdd;
        }
    }
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    renderSchedule();
}

//when the page loads, call functions and display date
$(document).ready(function(){
    
    renderTimeBlockColor();

    if(!localStorage.getItem("todos")) {
        scheduleArray();
    }

    $currentDay.text(currentDate);

    renderSchedule();
   
    $schedule.on("click", "button", save);
})
