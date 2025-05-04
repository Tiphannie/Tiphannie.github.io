function write_admin(){
    var data = {
        title: "Write Admin",
        list:[
            {name: "If problems write us Amigo"},
            {name: "if bla bla"}
        ]
    };
    var template = Handlebars.compile(document.querySelector("#template").innerHTML);
    var filled = template(data);
    document.querySelector("#output").innerHTML = filled;
}