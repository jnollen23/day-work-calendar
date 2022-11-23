var calendarEL = $("container");
var hourList = [];
var hoursInDay = 12;
var hourStart = 7;

function ShowList() {

}

function InitList() {
    var keys = Object.keys(localStorage);

    //Check localstorage to make sure all the keys are present
    CreateFillList(keys);
    CreateUI();
}

function CreateFillList(keys) {
    //if the localstorage does not have all necessary keys after this runs it needs to save them
    var update = false;
    for (var i = hourStart; i < (hoursInDay + hourStart); i++) {
        if (keys.indexOf(i) < 0) {
            var newIndex = { time: i.toString(), text: "" };
            hourList.push(newIndex);
            //Key was not present need to save the list
            update = true;
        }
        else hourList.push({ time: i.toString(), text: localStorage.getItem(keys[i]) });
    }

    if(update) UpdateSavedList();
}


function UpdateSavedList() {
    hourList.forEach(x => {
        localStorage.setItem(x.time, JSON.stringify(x));
    })
}

function SaveCalenderItem(event){
    event.preventDefault();
    console.log(event.target);
}

function CreateUI(){
    console.log("need to make initial UI list");
}

function CreateBlock(time, text){
    var item = $('<section>');

    var timeKeeper = $('<article>');
    timeKeeper.text(moment(time,"hh").format("hh:mm"));
    item.append(timeKeeper)

    var textBlock = $('<article>');
    textBlock.text(text);
    item.append(textBlock);

    var saveButton = $('<button>');
    saveButton.on('click', SaveCalenderItem);
    calendarEL.append(item);
}


InitList();