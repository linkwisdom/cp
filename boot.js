/**
 * @file boot 系统启动
 * @usage require('cp/boot')
 */

define(
    function(require) {
        var er = require('er');
        var util = require('er/util');
        var Observable = require('er/Observable');
        var controller = require('er/controller');
        var URL = require('er/URL');

        function Boot() {

        };

        /**
         * boot.start()
         * 系统启动的逻辑是 
         * 1. 初始化路由配置
         * 2. 启动ER
         * 3. 导入页面公共元素
         * 4. 导入UI组件
         */
        Boot.prototype.start = function(config) {
            config || (config = {});
            var me = this;

            if (config.routes) {
                _.forEach(config.routes, controller.registerAction);
            }
            
            er.start();

            this.initAction(config);
        };

       

        /**
         * 直接进入某类Action
         * @param  {Object}   item     [Action 配置]
         * @param  {Function} callback [Action 完成后的回调函数]
         */
        Boot.prototype.enterAction = function(item, callback) {
            var me = this;
            require([item.type], function(Action) {
                var action = new Action();
                action.enter({
                    url: URL.parse(item.path),
                    args: item.args
                });

                action.on('entercomplete', function() {
                    callback && callback();
                });
            });
        }

        Boot.prototype.initDepends = function(config) {
            var me = this;
            var flag = 0;

            if (!config.common || config.common.length <1) {
                me.fire('loaded');
                return;
            };

             _.each(config.common, function(item) {
                flag++;
                me.enterAction(item, function() {
                    flag--;
                    if (flag === 0) {
                        me.fire('loaded');
                    }
                });
            });
        }

        Boot.prototype.initAction = function(config) {
            var me = this;
            if (config.main) {
                me.enterAction(config.main, function() {
                    me.initDepends(config);
                });
            }
            else if (config.common) {
                me.initDepends(config);
            }
        }

        Boot.prototype.initUI = function() {
            var me = this;
            me.on('loaded', function() {
                require(['cp/ui'], function(ui) {
                    ui.start();
                    me.fire('uiloaded');
                });
            });
        }

        util.inherits(Boot, Observable);

        return new Boot();
    }
);



  