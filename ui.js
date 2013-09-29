define(
    function(require) {
        var ui = require('esui');
        return {
            include: function(list, callback) {
                if (typeof list === 'string') {
                    list = [list];
                }
                require(list, function() {
                    callback();
                });
            },
            start: function() {
                ui.init();
                require(['css!esui/css/main.css']);
            }
        };
    }
);