var app = (function() {
    var tasks = [];

    var checkInput = function(item) {
        if (!item.name) return false;
        else return true;
        //TODO notify
    };

	var saveTasks = function () {
	};

    var addTask = function(name, desc) {
        var item = {
            'name': name,
            'desc': desc
        };
        if (checkInput(item)) {
            tasks.push(item);
        } else {
            //TODO notify
        }
    };

    var display = function(elementID) {
		$(elementID).empty();
		$.each(tasks, function (index, value) {
			var listItem = $('<li>', {
				'id' : 'task' + index,
				'class': 'task-item'
			});

			$('<h3>', {'text': value.name}).appendTo(listItem);
			$('<p>', {'text': value.desc}).appendTo(listItem);


			$(listItem).appendTo(elementID);
		});
	};

	return {
		addTask: addTask,
		display: display
	};

})();

$(document).ready(function() {

    // Event listener per il tastone blu
    $('#new-task-submit').click(function(e) {
        e.preventDefault();
        app.addTask(
            $('#new-task-title').val(),
            $('#new-task-description').val()
        );
		app.display('#display-tasks');
    });

});
