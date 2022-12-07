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

function quantityDec(id, quantity, index) {
  if (!document.querySelector(`#qnty${index} #quantity`).value) {
    document.querySelector(`#qnty${index} #quantity`).value = Number(quantity);
  }

  if (document.querySelector(`#qnty${index} #quantity`).value > 1) {
    axios
      .post('/cart/dec-quantity', {
        productId: id,
      })
      .then((result) => {
        if (result.data.stat) {
          let count = Number(document.querySelector(`#qnty${index} #quantity`).value);
          count--;
          document.querySelector(`#qnty${index} #quantity`).value = count;
        }
        cartUpdateRmv();
      })
      .catch((err) => {
        console.log({ error: err });
      });
  }
}

function quantityInc(id, quantity, index) {
  if (!document.querySelector(`#qnty${index} #quantity`).value) {
    document.querySelector(`#qnty${index} #quantity`).value = Number(quantity);
  }
  if (document.querySelector(`#qnty${index} #quantity`).value < 10) {
    axios
      .post('/cart/inc-quantity', {
        productId: id,
      })
      .then((result) => {
        if (result.data.stat) {
          let count = Number(document.querySelector(`#qnty${index} #quantity`).value);
          count++;
          document.querySelector(`#qnty${index} #quantity`).value = count;
        }
        cartUpdateRmv();
      })
      .catch((err) => {
        console.log({ error: err });
      });
  }
}

function removeFromCart(id, index, r) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: true,
  });

  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure?',
      text: 'MOVE TO WISHLIST or Remove from cart',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove from cart',
      cancelButtonText: 'Move to Wishlist',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios
          .post('/remove-from-cart', {
            productId: id,
          })
          .then((result) => {
            if (result.data.access) {
              let i = r.parentNode.parentNode.rowIndex;
              document.getElementById('cartTable').deleteRow(i);
              // document.getElementById(`cartTable`).deleteRow(`${index}`)
              cartUpdateRmv();
            }
          });
        swalWithBootstrapButtons.fire('Deleted!', 'Cart product has been removed', 'success');
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        axios
          .post('/set-to-wish', {
            productId: id,
          })
          .then((result) => {
            if (result.data.access) {
              let i = r.parentNode.parentNode.rowIndex;
              document.getElementById('cartTable').deleteRow(i);
              // document.getElementById(`cartTable`).deleteRow(`${index}`)
              cartUpdateRmv();
            }
          });
        swalWithBootstrapButtons.fire('Cancelled', 'Product is successfully added to wishlist', 'success');
      }
    });
}
