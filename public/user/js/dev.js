function cartAdd(productId) {
  axios
    .post('/add-to-cart', {
      productId,
    })
    .then((result) => {
      if (result.data.access) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: result.data.msg,
        });
      } else {
        location.href = '/signin';
      }
    });
}
