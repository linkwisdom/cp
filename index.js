define(
    function(require) {
        var Model = require('cp/Model');
        var View = require('cp/View');
        var Action = require('cp/Action');
        var util = require('er/util');

        var cp = {
            extend: function(Clazz, option) {
                function _Clazz() {
                    Clazz.apply(this, arguments);
                }
                _(_Clazz.prototype).extend(option);

                util.inherits(_Clazz, Clazz);
                return _Clazz;
            }
        };

        
        cp.Action = function(option) {
            return this.extend(Action, option);
        };

        cp.View = function(option) {
            return this.extend(View, option);   
        };

        cp.Model = function(option) {
            return this.extend(Model, option);
        };

        return cp;

    }
);