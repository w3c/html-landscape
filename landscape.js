
(function ($) {
    var data = {}
    ,   typeKey = {
            ua:     "user agent"
        ,   val:    "validity"
        ,   auth:   "authoring advice"
        ,   op:     "opinion"
        }
    ,   rationaleKey = {
            impl:   "Insufficient implementation experience at this point."
        ,   "new":  "Introduced after feature freeze"
        ,   a11y:   "The HTML WG, in liasion with other W3C working groups, has decided this alternative is better"
        }
    ;
    function loadData (cb) {
        var sources = "what-51 51-50".split(" ")
        ,   done = 0;
        $.each(sources, function (idx, src) {
            $.getJSON(src + ".json", function (json) {
                data[src] = json;
                done++;
                if (done === sources.length) cb();
            });
        });
    }
    function render (id) {
        var $target = $("#" + id);
        $.each(data[id], function (idx, item) {
            var rat = /\s/.test(item.rationale) ? item.rationale : rationaleKey[item.rationale]
            , $div = $("<div class=diff><h3></h3><p></p></div>")
                        .find("h3")
                            .text(item.title + " ")
                            .append($("<span class=type></span>").text("(" + typeKey[item.type] + ")"))
                        .end()
                        .find("p")
                            .html(rat)
                        .end()
                        .appendTo($target)
            ;
            if (item.link) {
                var text = typeof item.link === "string" ? item.link : item.link.text
                ,   url  = typeof item.link === "string" ? item.link : item.link.url
                ;
                $("<p class=more><a></a></p>")
                    .find("a")
                        .attr("href", url)
                        .text(text)
                    .end()
                    .appendTo($div)
                ;
            }
        });
    }
    $(function () { loadData(function () {
        data["what-50"] = data["what-51"].concat(data["51-50"]);
        render("what-51");
        render("51-50");
        render("what-50");
    }); });
}(jQuery));
