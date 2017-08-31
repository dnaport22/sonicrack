var DELEGATE = null;
var SUPPLIER = null;
var EVENT = null;
var ProfileHandler = function () {
  this.fileReader = new FileReader();
};

ProfileHandler.prototype.selectFile = function (profile) {
    switch (profile) {
        case 'delegate':
          return document.getElementById('delegate_profile').click();
          break;
        case 'supplier':
          return document.getElementById('supplier_profile').click();
          break;
        default:
          return null;
    }
};

ProfileHandler.prototype.setFile = function (profile) {
  if (profile === 'delegate') {
      EVENT = 'delegate';
      this.fileReader.onload = this.showProgress;
      this.fileReader.onloadend = this.setDelegate;
      this.fileReader.readAsText(
          document.getElementById('delegate_profile').files[0]
      );
  } else {
      EVENT = 'supplier';
      this.fileReader.onload = this.showProgress;
      this.fileReader.onloadend = this.setSupplier;
      this.fileReader.readAsText(
          document.getElementById('supplier_profile').files[0]
      );
  }
};

ProfileHandler.prototype.setDelegate = function (data) {
    DELEGATE = JSON.parse(data.target.result);
    setTimeout(function () {
        document.getElementById('progress_delegate').style.opacity = 0;
        document.getElementById('icon_delegate').style.color = "#2196F3";
    }, 1000);
};

ProfileHandler.prototype.showProgress = function () {
    if (EVENT === 'delegate') {
        document.getElementById('progress_delegate').style.opacity = 100;
    } else {
        document.getElementById('progress_supplier').style.opacity = 100;
    }

};

ProfileHandler.prototype.setSupplier = function (data) {
    SUPPLIER = JSON.parse(data.target.result);
    setTimeout(function () {
        document.getElementById('progress_supplier').style.opacity = 0;
        document.getElementById('icon_supplier').style.color = "#2196F3";
    }, 1000);
};

ProfileHandler.prototype.submitFilesRequest = function () {
  if (DELEGATE === null || SUPPLIER === null) {
      $('#empty_file').modal();
      $('#empty_file').modal('open');
  } else {
      $('#confirmation').modal();
      $('#confirmation').modal('open');
  }
};

ProfileHandler.prototype.submitFiles = function () {
  var csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0].defaultValue;
  var uploadData = JSON.stringify({
      "delegate": JSON.stringify(DELEGATE),
      "supplier": JSON.stringify(SUPPLIER),
  });
  $('#spinner_modal').modal();
  $('#spinner_modal').modal('open');

  var csrfSafeMethod = function (method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  };

  $.ajax({
      beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
      },
      type: 'POST',
      url: 'http://localhost:8000/apis/events-matching/',
      data: uploadData,
      processData: false,
      contentType: "application/json; charset=utf-8",
      success: function (res) {
          document.getElementById('request_spinner').style.display = "none";
          document.getElementById('result').innerHTML = res;
          document.getElementById('match_response').style.display = "block";
      },
      error: function (err) {
          console.log(err)
      }
  });
};

var profileHandler = new ProfileHandler();