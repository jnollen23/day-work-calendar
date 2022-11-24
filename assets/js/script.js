var calendarEL = $(".container");
var hourList = [];
var hoursInDay = 9;
var hourStart = 9;

function ShowList() {

}

function InitList() {
    var keys = Object.keys(localStorage);

    //Check localstorage to make sure all the keys are present
    CreateFillList(keys);
    //With the full workday of items put it on the webpage
    CreateUI();
}

function CreateFillList(keys) {
    //if the localstorage does not have all necessary keys after this runs it needs to save them
    var update = false;
    for (var i = hourStart; i < (hoursInDay + hourStart); i++) {
        var index = keys.indexOf(i.toString());
        if (index < 0) {
            var newIndex = { time: i.toString(), text: null };
            hourList.push(newIndex);
            //Key was not present need to save the list
            update = true;
        }
        else hourList.push(JSON.parse(localStorage.getItem(keys[index])));
    }

    if(update) UpdateSavedList();
}


function UpdateSavedList() {
    hourList.forEach(x => {
        localStorage.setItem(x.time, JSON.stringify(x));
    })
}

function UpdateSavedItem(item){
    localStorage.setItem(item.time, JSON.stringify(item))
}

function SaveCalenderItem(event){
    event.preventDefault();
    
    var element = $(event.target);
    var eleTrav = element.parent();

    //Need to figure out the time and there is currently an AM PM on it
    var time = eleTrav.children().eq(0).text();
    time = moment(time, 'hA').format('H');

    //If the text is empty need to make it null so that it is saved with JSON.stringify
    var newText = eleTrav.children().eq(1).text();
    newText = newText.length > 0 ? newText : null;

    hourList[time - hourStart].text = newText;
    
    UpdateSavedItem(hourList[time-hourStart]);
}

function CreateUI(){
    hourList.forEach(x =>{
        CreateBlock(x.time, x.text);
    });
}


function CreateBlock(time, text){
    var item = $('<section>');
    var timeClass = '';
    var timeNow = moment("11:00AM","h:mmA");
    
    if(timeNow.format('HH') == time) timeClass = 'present';
    else if(parseInt(timeNow.format('HH')) > parseInt(time)) timeClass = 'past';
    else timeClass = 'future';

    item.addClass('row');
    item.append(`
        <article class='hour time-block col'>${moment(time,'hh').format("hA")}</article>
        <article class='description ${timeClass} col-10' contenteditable='true'>${text != null ? text : ''}</article>
    `);


    var saveButton = $('<button>');
    saveButton.addClass('saveBtn');
    saveButton.addClass('col');
    saveButton.on('click', SaveCalenderItem);
    saveButton.prepend('<img class="save-icon" src="./assets/images/save_icon_large.png" />')
    item.append(saveButton);

    calendarEL.append(item);
}


InitList();