

// Comments elements
var $comment = $("#icon_comment");
var $stars = $("#stars");
var $btnComments = $("#btnComments");
var $service=$("#service");
;
// The API object contains methods for each kind of request we'll make
var API = {
  saveComment: function (comm) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/comments",
      data: JSON.stringify(comm)
    });
  },
  getComments: function () {
    return $.ajax({
      url: "/api/comments" + service,
      type: "GET"
    });
  }
};

// handleFormSubmitStore is called whenever we submit a new store
var handleFormSubmitComment = function (event) {
  event.preventDefault();
      var comment = {
        serviceRat: $stars.text(),
        serviceCom: $comment.val(),
        ServiceId: $service.val()
      };
      console.log(comment);
       API.saveComment(comment).then(function (data) {
        //refreshComments();
       });
};


// refreshExamples gets new examples from the db and repopulates the list
var refreshComments = function () {
  API.getComments().then(function (data) {
    var $comments = data.map(function (comment) {
      var $i = $("<i>")
        .text("edit")
        .addClass("material-icons");
      var $i2 = $("<i>")
        .text("delete")
        .addClass("material-icons");
      var $a = $("<a>")
        .attr({
          href: "/api/services/" + service.id,
          class: "secondary-content edit"
        })
        .append($i);
      var $a2 = $("<a>")
        .attr({
          href: "/api/services/" + service.id,
          class: "secondary-content delete"
        })
        .append($i2);

      var $div = $("<div>")
        .text(service.serviceTitle)
        .append($a);
      $div.append($a2);
      $div.attr({ "data-id": service.id });

      var $li = $("<li>")
        .attr({
          class: "collection-item",
          "data-id": service.id
        })
        .append($div);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($services);
    alert(storeID);
  });
};


// Add event listeners to the submit and delete buttons
$btnComments.on("click", handleFormSubmitComment);


