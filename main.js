// Topic Array
var topics = ["Twilight Sparkle", "Pinkie Pie", "Fluttershy", "Rarity", "Rainbow Dash", "Applejack"];

//renderbutton
function renderButton() {
    for (var i = 0; i < topics.length; i++) {
        var addBtn = $('<button>');
        addBtn.addClass("btn btn-primary topic-btn");
        addBtn.attr("data-name", topics[i]);
        addBtn.text(topics[i]);
        $('.btnArea').prepend(addBtn);

    }
    $('.btnArea').append('<p style="color:grey">Click to play/pause the Gifs!</p>');
}

//click new button and steal gif
$('#addTopic-btn').click(function (event) {
    event.preventDefault();
    var gifpush = $("#gif-input").val().trim();
    topics.push(gifpush);
    $('.btnArea').empty();
    renderButton();

})

$(".gifArea").append('<div class="wrapper">');

$(document).on("click", ".topic-btn", stealSomeGif);

function stealSomeGif() {
    var topicName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topicName + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var topicData = response.data;

        $(".row").prepend('<div class="col-md-3" filled="false">');

        for (var i = 0; i < topicData.length; i++) {

            var gifDiv = $("<div>");
            gifDiv.addClass("card")
            gifDiv.attr("id", 'gif-' + i);
            var rating = topicData[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var newImage = $("<img class='newGif'>");
            newImage.attr("src", topicData[i].images.fixed_height_still.url);
            gifDiv.append(newImage);
            gifDiv.append(p);
            $(".wrapper").prepend(gifDiv);
            $(".card:hover").css("transform", "");
        }
    })
}

renderButton();

$(document).on('click', '.newGif', function () {
    var src = $(this).attr("src");
    if ($(this).hasClass('playing')) {
        //stop
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
    } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
})

$(document).on('mouseenter', ".card", function () {
    $(this).css("transform", "rotateY(2deg)")
})
$(document).on('mouseleave', ".card", function () {
    $(this).css("transform", "rotateY(0deg)")
})