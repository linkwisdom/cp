define(
    function() {
        var Model = require('er/Model');
        var util = require('er/util');
        var datasource = require('er/datasource');

        function _Model() {
            Model.apply(this, arguments);
        }

        var instant = {
            prepare: function() {
                console.log('prepare');
            }
        }

        
        _(_Model.prototype).extend(instant);
        util.inherits(_Model, Model);
        return _Model;
    }
);