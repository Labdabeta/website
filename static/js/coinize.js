function coinize(id,toptext,toptheta,bottext,bottheta,rad,radunits) {
    var coin = $("#"+id);

    coin.css("width",2*rad+radunits); //set width
    coin.css("height",2*rad+radunits); //set height
    coin.css("border","1px solid black"); //give a small outline
    //make it round
    coin.css("-moz-border-radius",rad+radunits);
    coin.css("-webkit-border-radius",rad+radunits);
    coin.css("border-radius",rad+radunits);

    //Starting top text
    for (i=0; i<toptext.length; i++) {
        //add a span with id "id#top" and class "idtop"
        coin.append("<span id=\""+id+i+"top\" class=\""+id+"top\">"+toptext.charAt(i)+"</span>");
    }

    var topchars = $("."+id+"top");
    topchars.css("height",rad+radunits); //make it tall, like a spoke
    topchars.css("position","absolute"); //force it where it should be
    topchars.css("left",rad+radunits); //move it to the center
    topchars.css("top","0");
    topchars.css("transform-origin","bottom left"); //bottom left is now in center of coin

    var theta = -(toptheta * toptext.length)/2;
    for (i=0; i<toptext.length; i++) {
        $("#"+id+i+"top").css("transform","rotate("+theta+"deg)");
        theta = theta + toptheta;
    }

    //Starting bot text
    for (i=0; i<bottext.length; i++) {
        //add a span with id "id#bot" and class "idbot"
        coin.append("<span id=\""+id+i+"bot\" class=\""+id+"bot\">"+bottext.charAt(i)+"</span>");
    }

    var botchars = $("."+id+"bot");
    botchars.css("height",rad+radunits); //make it tall, like a spoke
    botchars.css("position","absolute"); //force it where it should be
    botchars.css("left",rad+radunits); //move it to the center
    botchars.css("top","0");
    botchars.css("transform-origin","bottom left"); //bottom left is now in center of coin

    var theta = -(bottheta * bottext.length)/2;
    for (i=0; i<bottext.length; i++) {
        //adding an extra 180 degrees flips it upside-down
        $("#"+id+i+"bot").css("transform","rotate("+(180+theta)+"deg)");
        theta = theta + bottheta;
    }
}
    

