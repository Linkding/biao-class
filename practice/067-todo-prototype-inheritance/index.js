var task_ui = new TaskUi();
var cat_ui = new CatUi({
    on_item_click: function(cat_id,cat_title){
        task_ui.render(cat_id,cat_title);
        
    }
});

task_ui.init();
cat_ui.init()