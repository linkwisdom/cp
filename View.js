define(
    function(require) {
        var View = require('er/View');
        var util = require('er/util');

        function _View() {
            var me = this;
            View.apply(me, arguments);
            var model = me.model;

            if (model && me.repaint) {
                model.on('change', function() {
                    me.repaint();
                });
            }

            if (this.container) {
                var dom = document.getElementById(this.container);
                if (!dom) {
                    this.container = 'main';
                    this.dom = document.getElementById(this.container);
                }
                this.main = dom;
            }
        }

        var instant = {
            bindEvents: {},
            enterDocument: function() {

            },
            dispose: function() {

            }
        };


        _(_View.prototype).extend(instant);
        util.inherits(_View, View);
        
        return _View;
    }
);