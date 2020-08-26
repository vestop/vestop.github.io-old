'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 3000;
  var form = document.querySelector('.form');
  var url = 'form.php';
  var statusMessage = form.querySelector('.contacts__status');

  var debounce = function (fun, interval) {
    var lastTimeout;
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(fun, interval);
  };

  var hideMessageElement = function () {
    statusMessage.innerHTML = '';
    statusMessage.style.display = 'none';
  };

  var showMessageElement = function (message) {
    statusMessage.innerHTML = message;
    statusMessage.style.display = 'block';
    debounce(hideMessageElement, DEBOUNCE_INTERVAL);
  };

  var load = function (message) {
    showMessageElement(message);
    form.reset();
  };

  var error = function (message) {
    showMessageElement(message);
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad('✔ Your message has been sent');
      } else {
        onError('✖ Your message hasn\'t been sent.<br>Please try again later.');
      }
    });
    xhr.open('POST', url);
    xhr.send(data);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    save(new FormData(form), load, error);
  });
})();
