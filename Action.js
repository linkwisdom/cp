/**
 * control Pannel
 * 扩展 er.Action 增加了三个直接接口方法
 * initAction 在Action启动前之前相关操作，
 * 如修改model和view的类型，更改路由，初始化参数操作
 * initModel 在View和Model对象创建后，但是没有渲染中执行前相关操作
 * 如修改model的上下文，初始化参数等
 * beforeLeave 在model退出前执行相关操作，
 * 如保存操作记录，发送监控，清理事件绑定等操作
 */

define(
    function(require) {
        var Action = require('er/Action');
        var util = require('er/util');

        function _Action() {
            var me = this;
            Action.apply(this, arguments);

            this.on('enter', function() {
                me.initAction && me.initAction();
            });

            this.on('beforerender', function() {
                me.initModel && me.initModel();
            });

            this.on('beforeleave', function() {
                this.beforeLeave();
            });
        }

        var instant = {
            viewType: require('cp/View'),
            modelType: require('cp/Model'),

            initAction: function() {

            },

            beforeLeave: function() {
                
            }
        }

        _(_Action.prototype).extend(instant);

        util.inherits(_Action, Action);

        return _Action;  
    }
);