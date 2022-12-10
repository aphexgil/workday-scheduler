
$(function () {

  //print today's date at the top of the page
  var todayBox = $('#currentDay').append(dayjs().format('dddd, MMMM D, YYYY'));

  //fetch saved tasks from local storage
  var tasks = JSON.parse(localStorage.getItem("tasks"));

  //if no saved tasks were fetched, initilize the saved tasks array to be an empty array
  if(tasks == null){
    tasks = [];
  }

  //gets what hour it currently is
  var thisHour = dayjs().hour();
  
  //jquery selector grabs rows of the planner
  var rows = $('.row');

  //jquery selector grabs all save buttons
  var buttons = $('.saveBtn');

  //function saves text from box to local storage when save button is clicked
  var saveText = function (event) {
    event.preventDefault();

    //parent is the row that the current save button is in
    var parent = $(this).parent();

    //this is the 'TextArea' element that contains user inputted text
    var textBox = $(parent).children()[1];

    //creates new task element with hour from parent row and text from associated TextArea
    var task = {
      hour: $(parent).attr('id'),
      text: $(textBox).val()
    }

    //looks to see if anything was loaded from local storage for current row on page load.
    //if it was, overwrite it in tasks list and break out of the loop
    var inTasks = false;
    for(var i=0; i< tasks.length; i++){
      if(tasks[i].hour == task.hour){
        tasks[i].text = task.text;
        inTasks = true;
        break;
      }
    }
    
    //if the current row wasn't already saved in local storage, add it to the end of the tasks list
    if(!inTasks){
      tasks.push(task);
    }

    //save updated tasks list to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

  }

  //add color to rows based on the current hour
  for(var i=0; i< rows.length; i++){
    var hour = $(rows[i]).attr('id').split("-")[1];
    if(thisHour>hour){
      $(rows[i]).addClass('past');
    }else if(thisHour==hour){
      $(rows[i]).addClass('present');
    }else{
      $(rows[i]).addClass('future');
    }
  }


  //add saveText function to all save buttons
  for(var i=0; i<buttons.length; i++){
    $(buttons[i]).on('click', saveText);
  }

  //put text from tasks list in row textarea.
  for(var i=0; i<tasks.length; i++){
    var task = tasks[i];
    var div = $('#' + task.hour);
    var textBox = $(div).children()[1];
    $(textBox).val(task.text);
  }

});
