function write_admin(){
    var data = {
        title: "Write admin",
        list:[
            { name: "If images are not loading properly" },
            { name: "If there is a technical error on the page" },
            { name: "You can report a problem to the admin." },
        ]
    };
    var template = Handlebars.compile(document.querySelector("#template").innerHTML);
    var filled = template(data);
    document.querySelector("#output").innerHTML = filled;
}