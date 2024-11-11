import {
  addNewBookHandler,
  getAllBooksHandler,
  fetchBookByIdHandler, // mengganti getBookByIdHandler dengan fetchBookByIdHandler
  updateBookByIdHandler,
  removeBookByIdHandler,
} from './handler.js'; 

const routes = [
  {
      method: 'POST',
      path: '/books',
      handler: addNewBookHandler,
  },
  {
      method: 'GET',
      path: '/books',
      handler: getAllBooksHandler,
  },
  {
      method: 'GET',
      path: '/books/{bookId}',
      handler: fetchBookByIdHandler, 
  },
  {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: updateBookByIdHandler,
  },
  {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: removeBookByIdHandler,
  },
];

// Default export
export default routes;
