/**
* User : YuanChang<Yuan-Chang@qq.com>
* Date : 2015/6/21.
* Time : 15:26
*/
(function(){
    require(['text!../templates/history_tpl.html'], function (history_tpl) {
       
        //构建查询结果视图
        var ResultView = Backbone.View.extend({
            render:function(city){
                $.get("/search/",{"city":encodeURIComponent(city) },function(json){
                    $("#rs_tpl").html(json);
                })                
            }
        });

        //实例化一个结果数据视图
        var resultView = new ResultView();
        
        //构建查询历史数据模块类
        var History = Backbone.Model.extend({
           defaults:{
               city: "", //城市
               time:""  //查询时间
           }
        });

        //构建历史数据的视图类
        var HistoryView = Backbone.View.extend({

            template:_.template(history_tpl),   //加载历史数据模板

            //渲染模板
            render:function(json){
                $("#history_record").prepend(this.template(json));
            },

            //获取查询时间
            time:function(){ 
                var now = new Date();
            
                var year = now.getFullYear();       //年
                var month = now.getMonth() + 1;     //月
                var day = now.getDate();            //日
               
                var hh = now.getHours();            //时
                var mm = now.getMinutes();          //分
               
                var clock = year + "-";
               
                if(month < 10)
                    clock += "0";
               
                clock += month + "-";
               
                if(day < 10)
                    clock += "0";
                   
                clock += day + " ";
               
                if(hh < 10)
                    clock += "0";
                   
                clock += hh + ":";
                if (mm < 10) clock += '0'; 
                clock += mm; 
                return(clock); 
            } 
        });

        //实例化一个历史数据视图
        var historyView = new HistoryView({model:History});

        //构建路由器导航类，根据不同hash执行对应方法
        var AppRouter = Backbone.Router.extend({
          routes:{
              "search/:city":"search"
          },
          search:function(city){
               resultView.render(city);
           }
        });

        //实例化一个路由导航对象
        var appRouter = new AppRouter();

        //开启路由导航功能
        Backbone.history.start();

        //构建主页视图类
        var MainView = Backbone.View.extend({
            initialize:function(){
                $("#submit").bind("click",this.submit);
                $(".ready-record").hover(this.mouseover, this.mouseout);
            },
            
            submit:function(){
                var city = $.trim($("#value").val());
                if(city){
                    //获取服务器数据
                    appRouter.navigate("#search/"+city,{trigger:true});
                    // resultView.render(city);
                    
                    //创建一条历史记录
                    historyView.render({
                        search:"#search/"+city,
                        city:city,
                        time:historyView.time()
                    });
                }else{
                    alert("请输入查询城市的拼音,如:beijing");
                }
            },

            mouseover:function(event){
                $(this).find(".ready-desc").slideDown();
                event.stopPropagation();
            },
            
            mouseout:function(event){
                $(this).find(".ready-desc").slideUp();
                event.stopPropagation();
            }
        });

        //实例化一个主页视图对象
        var mainView = new MainView();
    });
})();