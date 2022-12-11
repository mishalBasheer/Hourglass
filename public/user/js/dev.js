function updateWish(id, index) {
  axios
    .post('/update-wishlist', {
      productId: id,
    })
    .then((result) => {
      if (result.data.access) {
        console.log(result.data.productStat);
        console.log(`#heart_symbol${index}`);
        if (result.data.productStat == 'removed') {
          $(`#heart_symbol${index}`)
            .replaceWith(`<a id="heart_symbol${index}" onclick="updateWish('${id}','${index}')"><i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg></i></a>`);
        } else {
          $(`#heart_symbol${index}`).replaceWith(
            `<a id="heart_symbol${index}" onclick="updateWish('${id}','${index}')"><i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg></i></a>`
          );
        }
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
function warningAlert(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      cancelOrder(id);
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    }
  });
}
function cancelOrder(id) {
  axios.post(`/cancel-order/${id}`).then((response) => {
    if (response.data.deleted === 'success') {
      location.href = '/orders';
    }
  });
}
function customAlert(message, status) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
  });

  Toast.fire({
    icon: status,
    title: message,
  });
}
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
