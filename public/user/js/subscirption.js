$('#submit-form').submit((e) => {
  e.preventDefault();
  $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbzTAX0Zu3Fn1kxOitRzCNVOoH0a_lUyy8R1xDZP3XpnkrX0qU_J7iX2WzCVlnYGnRziRQ/exec',
    data: $('#submit-form').serialize(),
    method: 'post',
    success: function (response) {
      window.location.reload();
      customAlert('Form submitted successfully', 'success');
    },
    error: function (err) {
      customAlert('Something Error', 'error');
    },
  });
});
