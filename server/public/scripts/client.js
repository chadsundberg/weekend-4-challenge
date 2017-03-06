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
          if (currentTask.task_completed === true) {
            $newTask.data('id', currentTask.id);
            $newTask.append('<td>' + currentTask.task_name + '</td>');
            $newTask.append('<td></td>');
            $newTask.append('<td><button class="deleteButton">Delete</button></td>');
            $newTask.addClass('green');
            $('#taskList').append($newTask);
            console.log($newTask);
          } else {
            $newTask.data('id', currentTask.id);
            $newTask.append('<td>' + currentTask.task_name + '</td>');
            $newTask.append('<td><button class="completeButton">Complete</button></td>');
            $newTask.append('<td><button class="deleteButton">Delete</button></td>');
            $newTask.addClass('salmon');
            $('#taskList').append($newTask);
            console.log($newTask);
          }
        }
      }
    });
  }


  $('#newTaskForm').on('submit', function(event){
    event.preventDefault();
    var newTaskObject = {
      taskName: $('#newTaskName').val(),
      completed: false
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

  $('#taskList').on('click', '.completeButton', function(){
    var idOfTaskToComplete = $(this).parent().parent().data().id;
    console.log('the id of task to complete is ', idOfTaskToComplete);
    $.ajax({
      type: 'PUT',
      url: '/tasks/update/' + idOfTaskToComplete,
      success: function(response){
        console.log(response);
        getTaskData();
      }
    })
  });

  $('#taskList').on('click', '.deleteButton', function(){
    var idOfTaskToDelete = $(this).parent().parent().data().id;
    console.log(idOfTaskToDelete);
    swal({
      title: 'Are you sure you want to delete?',
      text: "Do you really want to delete this task?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(function() {
      swal(
        'Deleted!',
        'Your task has been deleted.',
        'success'
      )
      deleteTask(idOfTaskToDelete);
      $('#taskList').empty();
      getTaskData();
    })

  });

});

function deleteTask(id) {
$.ajax({
  type: 'DELETE',
  url: '/tasks/delete/' + id,
  success: function(response) {
    console.log(response);
  }
})

}
