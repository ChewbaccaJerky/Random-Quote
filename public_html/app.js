// Colors
const colors = ["#283D3B", "#197278", "#C44536",
"#772E25", "#CBA135"];

// Error Handler
function handleAjaxError(jqXHR, textStatus, errorThrown){
    if(jqXHR.status < 600 && jqXHR.status >= 500){
        //server side error [500 - 599]
        console.log("server side error");
    }
    else if(jqXHR.status < 400 && jqXHR.status >= 300) {
        // client side error [300 - 399]
        console.log("client side error");
    }
}

// Load Quote
function getQuote(){
    $.ajax({
        url : "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json",
        dataType : 'json',
        cache : false,              // used for changing quote
        timeout: 2000,
        success : function(result){
            var text = result.quoteText;
            var author = result.quoteAuthor;
            
            $('#text').html('"'+ text +'"');
            
            if(author !== ""){
                $('#author').html('-'+ author);
            }
  
        },
        error : handleAjaxError
    });
}

// Randomize color
function getColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Change colors
function changeColor(){
    color = getColor();
    $('body').css("background-color", color);
    $('#next').css("background-color", color);
    $('#text').css("color", color);
    $('#author').css("color", color); 
}


$(document).ready(function(){
    // Load Quote
    changeColor();
    getQuote();
    
    // On Click
    $("#next").click(function(){
        getQuote();
        
        // Generate background color
        changeColor();
        
        
    });
});