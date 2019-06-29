//Global Variable
var storeID = null;
var logoName = null;
var bannerName = null;
var logoPath = null;
var bannerPath = null;
var serviceImg = null;
var serviceImgPath = null;
//var url = null;
// Get references to page elements
// Store elements
var $storeName = $("#storeName");
var $storePhone = $("#storePhone");
var $storeStreet = $("#storeStreet");
var $storeNum = $("#storeNum");
var $storeZip = $("#storeZip");
var $storeState = $("#storeState");
var $storeOpen = $("#storeOpen");
var $storeClose = $("#storeClose");
var $storeEmail = $("#storeEmail");
var $storePwd = $("#storePwd");
var $storeContact = $("#storeContact");
var $contactPosition = $("#contactPosition");
var $submitStore = $("#submitBtnStore");
var $logoBtn = $("#logoBtn");
var $bannerBtn = $("#bannerBtn");
//Service element
var $serviceName = $("#serviceName");
var $servicePrice = $("#servicePrice");
var $serviceTime = $("#serviceTime");
var $serviceGender = $("#serviceGender");
var $serviceDesc = $("#serviceDesc");
var $submitService = $("#submitBtnService");
var $serviceImgBtn = $("#serviceImgBtn");
var $exampleList = $("#example-list");
//Store and Service DIV's
var $storeDiv = $("#storeDiv");
var $serviceDiv = $("#serviceDiv");
// The API object contains methods for each kind of request we'll make
var API = {
  saveStore: function (store) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/storeSetup",
      data: JSON.stringify(store)
    });
  },
  saveService: function (service) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/serviceSetup",
      data: JSON.stringify(service)
    });
  },
  getServices: function () {
    return $.ajax({
      url: "/api/services/" + storeID,
      type: "GET"
    });
  },
  deleteService: function(id) {
    return $.ajax({
      url: "/api/services/" + id,
      type: "DELETE"
    });
  }
};

// handleFormSubmitStore is called whenever we submit a new store
var handleFormSubmitStore = function (event) {
  event.preventDefault();

  uploadImg(logoName).then(function (response) {
    logoPath = response;
    uploadImg(bannerName).then(function (response) {
      bannerPath = response;
      //submit the store information affter the images uoload
      var store = {
        storeName: $storeName.val().trim(),
        phoneN: $storePhone.val().trim(),
        storeAddress:
          $storeStreet.val().trim() +
          "," +
          $storeNum.val().trim() +
          "," +
          $storeZip.val().trim() +
          "," +
          $storeState.val().trim(),
        storeOpen: $storeOpen.val(),
        storeClose: $storeClose.val(),
        storeEmail: $storeEmail.val().trim(),
        storePass: $storePwd.val().trim(),
        storeLogo: logoPath,
        storeImg: bannerPath,
        storeContact: $storeContact.val().trim(),
        contactPosition: $contactPosition.val().trim()
      };
      API.saveStore(store).then(function (data) {
        createService(data);
      });
    });
  });
};

var createService = function (data) {
  $storeDiv.hide();
  $serviceDiv.show();
  storeID = data.id;
};

// handleFormSubmitStore is called whenever we submit a new store
var handleFormSubmitService = function (event) {
  event.preventDefault();
  uploadImg(serviceImg).then(function (response) {
    serviceImgPath = response;
    var service = {
      serviceTitle: $serviceName.val().trim(),
      serviceDesc: $serviceDesc.val().trim(),
      serviceImg: serviceImgPath,
      serviceTime: $serviceTime.val(),
      serviceGender: $serviceGender.val(),
      servicePrice: $servicePrice.val().trim(),
      StoreId: storeID
    };
    API.saveService(service).then(function (data) {
      refreshServices();
    });
  });
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshServices = function () {
  API.getServices().then(function (data) {
    var $services = data.map(function (service) {
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
  });
};
//handleDeleteBtnClick is called when an example's delete button is clicked
//Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteService(idToDelete).then(function() {
    refreshServices();
  });
};

// Add event listeners to the submit and delete buttons
$submitStore.on("click", handleFormSubmitStore);
$submitService.on("click", handleFormSubmitService);
$logoBtn.on("change", function (event) {
  logoName = event.target.files[0];
});
$bannerBtn.on("change", function (event) {
  bannerName = event.target.files[0];
});
$serviceImgBtn.on("change", function (event) {
  serviceImg = event.target.files[0];
});
$exampleList.on("click", ".delete", handleDeleteBtnClick);

function uploadImg(selectedFile) {
  return new Promise(function (resolve) {
    var fileName = selectedFile.name;
    var uploadTask = sotorageRef
      .child("/servicesImages/" + fileName)
      .put(selectedFile);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        // Handle unsuccessful uploads
        console.log(error);
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          //return downloadURL;
          resolve(downloadURL);
        });
      }
    );
  });
}
