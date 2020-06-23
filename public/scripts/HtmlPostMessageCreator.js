class HtmlPostMessageCreator {

    constructor(entry) {
        let e = new Encoder();
        let json = JSON.parse(entry);
        this.date = new Date(json.post_time);

        this.title = e.decode(json.title);
        this.contents = e.decode(json.contents);
        this.post_username = json.post_username;
    }

    getHTML(fn) {
        let button = this.post_username === fn("username") ?
            "<button class=\"delete_button\" onclick=\"deleteMsg(\'" + (new Encoder()).encode(this.title) + "\')\">Delete</button>" :
            "";

        let html = "<div style=\"display:flex;flex-direction:row;justify-content:space-between;\"><div style=\"font-size:25px;padding-left:10px;\">" 
            + this.title + "</div>" + button + "</div>";
        html += "<div style=\"font-size:10px;padding-left:10px;\">By "
            + this.post_username + " on " + this.date.toLocaleDateString() + " at "
            + this.date.toLocaleTimeString() + "</div>";
        html += "<div style=\"font-size:15px;padding-left:10px;\">" + this.contents + "</div>";
        html += "<br>";

        return html;
    }
}