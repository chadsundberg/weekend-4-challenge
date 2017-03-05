$(document).ready(function(){
  console.log('jquery is up!');
  getTaskData();
  function getTaskData(){
    $.ajax({
      type: 'GET',
      url: '/tasks',
      success: function(response) {
        console.log('response', response);
        $('#taskList').empty();
        for (var i = 0; i < response.length; i++) {
          var currentTask = response[i];
          var $newTask = $('<tr>');
          $newTask.data('id', currentTask.id);
          $newTask.append('<td>' + currentTask.task_name + '</td>');
          $newTask.append('<td><button class="completeButton">Complete</button></td>');
          $newTask.append('<td><button class="deleteButton">Delete</button></td>');
          $('#taskList').append($newTask);
          console.log($newTask);
        }
      }
    });
  }

  $('#newTaskForm').on('submit', function(event){
      event.preventDefault();
      var newTaskObject = {
        taskName: $('#newTaskName').val(),
        completed: false                   //$('#newTaskCompleted').val(false)
      };
      console.log(newTaskObject);
      $.ajax({
        type: 'POST',
        url: '/tasks/new',
        data: newTaskObject,
        success: function(response){
          console.log(response);
          getTaskData();
        }
      });
      $('#newTaskName').val('');
    });

    $('#taskList').on('click', '.deleteButton', function(){
    var idOfTaskToDelete = $(this).parent().parent().data().id;
    console.log('the id to delete is: ', idOfTaskToDelete);
    $.ajax({
      type: 'DELETE',
      url: '/tasks/delete/' + idOfTaskToDelete,
      success: function(response) {
        console.log(response);
        getTaskData();
      }
    })
  });
});
