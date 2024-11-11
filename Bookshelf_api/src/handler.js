import { nanoid } from 'nanoid';
import Hapi from '@hapi/hapi';

const bookCollection = [];

// Handler untuk menambahkan buku baru
const addNewBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    // Validasi input
    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    // Membuat buku baru
    const bookId = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const isFinished = pageCount === readPage;

    const newBook = {
        id: bookId,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished: isFinished,
        insertedAt: createdAt,
        updatedAt,
    };

    bookCollection.push(newBook);

    return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: bookId,
        },
    }).code(201);
};

// Handler untuk mengambil semua buku
const getAllBooksHandler = (request, h) => {
    return h.response({
        status: 'success',
        data: {
            books: bookCollection.map(({ id, name, publisher }) => ({ id, name, publisher })),
        },
    }).code(200);
};

// Handler untuk mendapatkan buku berdasarkan ID
const fetchBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = bookCollection.find((b) => b.id === bookId);

    if (!book) {
        return h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404);
    }

    return h.response({
        status: 'success',
        data: {
            book,
        },
    }).code(200);
};

// Handler untuk memperbarui buku berdasarkan ID
const updateBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const index = bookCollection.findIndex((b) => b.id === bookId);

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
    }

    const updatedAt = new Date().toISOString();
    bookCollection[index] = {
        ...bookCollection[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished: pageCount === readPage,
        updatedAt,
    };

    return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    }).code(200);
};

// Handler untuk menghapus buku berdasarkan ID
const removeBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = bookCollection.findIndex((b) => b.id === bookId);

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        }).code(404);
    }

    bookCollection.splice(index, 1);

    return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    }).code(200);
};

export {
    addNewBookHandler,
    getAllBooksHandler,
    fetchBookByIdHandler,
    updateBookByIdHandler,
    removeBookByIdHandler,
};
