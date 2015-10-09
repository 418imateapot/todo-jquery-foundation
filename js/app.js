var dataStore = (function() {
    var set, get;
    var storageAvailable = function(type) {
        // Check if localStorage is available
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return false;
        }
    };

    if (storageAvailable('localStorage')) {
        // We can use localStorage
        set = function(k, v) {
            return localStorage.setItem(k, JSON.stringify(v));
        };
        get = function(k) {
            var data = localStorage.getItem(k);
            return (!data) ? [] : JSON.parse(data);
        };
    } else {
        // Too bad, no localStorage for us
        // Use cookies instead
        set = function(k, v) {
            return $cookies.put(k, JSON.stringify(v));
        };
        get = function(k) {
            var cookie = $cookies.get(k);
            return (!cookie) ? [] : JSON.parse(cookie);
        };
    }

	return {
		set: set,
		get: get
	};

})();

var app = (function() {
    var saveTasks = function(list) {return dataStore.set('jqftasks', list);};
    var loadTasks = function() {return dataStore.get('jqftasks');};
    var tasks = loadTasks();

    var checkInput = function(item) {
        if (!item.name) return false;
        else return true;
        //TODO notify
    };


    var addTask = function(name, desc) {
        var item = {
            'name': name,
            'desc': desc
        };
        if (checkInput(item)) {
            tasks.push(item);
			saveTasks(tasks);
        } else {
            //TODO notify
        }
    };

    var display = function(elementID) {
        $(elementID).empty();
        $.each(tasks, function(index, value) {
            var listItem = $('<li>', {
                'id': 'task' + index,
                'class': 'task-item'
            });

            $('<h3>', {
                'text': value.name
            }).appendTo(listItem);
            $('<p>', {
                'text': value.desc
            }).appendTo(listItem);


            $(listItem).appendTo(elementID);
        });
    };

    return {
        addTask: addTask,
        display: display
    };

})();

$(document).ready(function() {
	app.display('#display-tasks');

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
