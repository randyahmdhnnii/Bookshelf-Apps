document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
  
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addBook();
    })
  
    if (isStorageExist()) loadDataFromStorage();
  });
  
  document.addEventListener('ondatasaved', function () {
    console.log('Data berhasil disimpan.');
  })
  
  document.addEventListener('ondataloaded', () => {
    refreshDataFromBooks();
  });
  