$('#submit-form').submit((e) => {
  e.preventDefault();
  $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbzTAX0Zu3Fn1kxOitRzCNVOoH0a_lUyy8R1xDZP3XpnkrX0qU_J7iX2WzCVlnYGnRziRQ/exec',
    data: $('#submit-form').serialize(),
    method: 'post',
    success: function (response) {
      alert('Form submitted successfully');
      window.location.reload();
    },
    error: function (err) {
      alert('Something Error');
    },
  });
});
