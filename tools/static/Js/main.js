/**
 * User : YuanChang<Yuan-Chang@qq.com>
 * Date : 2015/6/25.
 * Time : 20:44
 */
requirejs.config({
    shim:{
        'backbone':{
            deps:['underscore','jquery'],
            exports:'Backbone'
        },
        'underscore':{
            exports:'_'
        },
        'base':{
            deps:['backbone']
        }
    }
});
define(['require','base']);
