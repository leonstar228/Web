let book = null;
let library = [];
let consoleOutput = document.getElementById('console-output');

function logToPage(message) {
    const line = document.createElement('div');
    line.className = 'console-line';
    line.textContent = message;
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
    console.log(message);
}

document.getElementById('createBookBtn').addEventListener('click', function() {
    book = {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        year: 1997,
        isRead: true
    };
    
    document.getElementById('book1-result').innerHTML = 
        '<div class="book-info">Об\'єкт book створено успішно!</div>';
    
    logToPage("Створено об'єкт book з властивостями:");
    logToPage(`  title: "${book.title}"`);
    logToPage(`  author: "${book.author}"`);
    logToPage(`  year: ${book.year}`);
    logToPage(`  isRead: ${book.isRead}`);
});

document.getElementById('addMethodBtn').addEventListener('click', function() {
    if (!book) {
        alert("Спочатку створіть об'єкт book!");
        return;
    }
    
    book.bookInfo = function() {
        const readStatus = this.isRead ? "Так" : "Ні";
        return `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${readStatus}`;
    };
    
    document.getElementById('book1-result').innerHTML = 
        '<div class="book-info">Метод bookInfo додано успішно!</div>';
    
    logToPage("Додано метод bookInfo до об'єкта book");
});

document.getElementById('toggleReadBtn').addEventListener('click', function() {
    if (!book) {
        alert("Спочатку створіть об'єкт book!");
        return;
    }
    
    book.isRead = !book.isRead;
    const status = book.isRead ? "прочитана" : "не прочитана";
    
    document.getElementById('book1-result').innerHTML = 
        `<div class="book-info">Статус книги змінено на: <span class="status ${book.isRead ? 'read' : 'unread'}">${status}</span></div>`;
    
    logToPage(`Змінено статус isRead на: ${book.isRead}`);
});

document.getElementById('callMethodBtn').addEventListener('click', function() {
    if (!book || !book.bookInfo) {
        alert("Спочатку створіть об'єкт book та додайте метод bookInfo!");
        return;
    }
    
    const bookInfo = book.bookInfo();
    document.getElementById('book1-result').innerHTML = 
        `<div class="book-info">${bookInfo}</div>`;
    
    logToPage("Викликано метод bookInfo():");
    logToPage(`  ${bookInfo}`);
});

document.getElementById('createLibraryBtn').addEventListener('click', function() {
    library = [
        {
            title: "Harry Potter and the Sorcerer's Stone",
            author: "J.K. Rowling",
            year: 1997,
            isRead: true,
            bookInfo: function() {
                const readStatus = this.isRead ? "Так" : "Ні";
                return `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${readStatus}`;
            }
        },
        {
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            year: 1937,
            isRead: false,
            bookInfo: function() {
                const readStatus = this.isRead ? "Так" : "Ні";
                return `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${readStatus}`;
            }
        },
        {
            title: "1984",
            author: "George Orwell",
            year: 1949,
            isRead: true,
            bookInfo: function() {
                const readStatus = this.isRead ? "Так" : "Ні";
                return `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${readStatus}`;
            }
        }
    ];
    
    document.getElementById('library-output').innerHTML = 
        '<div class="book-info">Масив library створено успішно! Містить 3 книги.</div>';
    
    logToPage("Створено масив library з 3 книгами");
});

document.getElementById('displayLibraryBtn').addEventListener('click', function() {
    if (library.length === 0) {
        alert("Спочатку створіть масив library!");
        return;
    }
    
    function displayLibrary(libraryArray) {
        let output = '';
        libraryArray.forEach((book, index) => {
            const statusClass = book.isRead ? 'read' : 'unread';
            const statusText = book.isRead ? 'Прочитана' : 'Не прочитана';
            output += `
                <div class="book-info">
                    <strong>Книга ${index + 1}:</strong> ${book.title}<br>
                    <strong>Автор:</strong> ${book.author}<br>
                    <strong>Рік:</strong> ${book.year}<br>
                    <strong>Статус:</strong> <span class="status ${statusClass}">${statusText}</span>
                </div>
            `;
        });
        return output;
    }
    
    const libraryHTML = displayLibrary(library);
    document.getElementById('library-output').innerHTML = libraryHTML;
    
    logToPage("=== БІБЛІОТЕКА КНИГ ===");
    library.forEach((book, index) => {
        logToPage(`Книга ${index + 1}: ${book.bookInfo()}`);
    });
});

document.getElementById('addBookBtn').addEventListener('click', function() {
    if (library.length === 0) {
        alert("Спочатку створіть масив library!");
        return;
    }
    
    library.push({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        isRead: false,
        bookInfo: function() {
            const readStatus = this.isRead ? "Так" : "Ні";
            return `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${readStatus}`;
        }
    });
    
    document.getElementById('library-output').innerHTML = 
        '<div class="book-info">Книгу "The Great Gatsby" додано успішно! Тепер у бібліотеці ' + library.length + ' книг.</div>';
    
    logToPage('Додано нову книгу: "The Great Gatsby"');
    logToPage(`Загальна кількість книг у бібліотеці: ${library.length}`);
});

document.getElementById('sortByYearBtn').addEventListener('click', function() {
    if (library.length === 0) {
        alert("Спочатку створіть масив library!");
        return;
    }
    
    const sortedByYear = [...library].sort((a, b) => a.year - b.year);
    
    logToPage("=== ВІДСОРТОВАНО ЗА РОКОМ ВИДАННЯ (ЗРОСТАННЯ) ===");
    sortedByYear.forEach((book, index) => {
        logToPage(`${index + 1}. ${book.title} (${book.year})`);
    });
});

document.getElementById('filterUnreadBtn').addEventListener('click', function() {
    if (library.length === 0) {
        alert("Спочатку створіть масив library!");
        return;
    }
    
    const unreadBooks = library.filter(book => !book.isRead);
    
    logToPage("=== НЕПРОЧИТАНІ КНИГИ ===");
    if (unreadBooks.length === 0) {
        logToPage("Непрочитаних книг немає");
    } else {
        unreadBooks.forEach((book, index) => {
            logToPage(`${index + 1}. ${book.title} - ${book.author}`);
        });
    }
});

document.getElementById('findTolkienBtn').addEventListener('click', function() {
    if (library.length === 0) {
        alert("Спочатку створіть масив library!");
        return;
    }
    
    const tolkienBook = library.find(book => book.author === "J.R.R. Tolkien");
    
    logToPage("=== ПОШУК КНИГИ АВТОРА J.R.R. TOLKIEN ===");
    if (tolkienBook) {
        logToPage(`Знайдено: ${tolkienBook.title} (${tolkienBook.year})`);
    } else {
        logToPage("Книгу автора J.R.R. Tolkien не знайдено");
    }
});

document.getElementById('clearConsoleBtn').addEventListener('click', function() {
    consoleOutput.innerHTML = '';
});

document.getElementById('addBookFormBtn').addEventListener('click', function() {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const year = parseInt(document.getElementById('year').value.trim());
    const isRead = document.getElementById('isRead').checked;
    
    if (!title || !author || !year || isNaN(year)) {
        alert("Будь ласка, заповніть всі поля коректно!");
        return;
    }
    
    const newBook = {
        title: title,
        author: author,
        year: year,
        isRead: isRead,
        bookInfo: function() {
            const readStatus = this.isRead ? "Так" : "Ні";
            return `Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${readStatus}`;
        }
    };
    
    if (!Array.isArray(library)) {
        library = [];
    }
    
    library.push(newBook);
    
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
    document.getElementById('isRead').checked = false;
    
    displayUpdatedLibrary();
    
    logToPage(`Додано нову книгу: "${title}" (${author}, ${year})`);
    logToPage(`Загальна кількість книг у бібліотеці: ${library.length}`);
});

document.getElementById('showAllBooksBtn').addEventListener('click', function() {
    displayUpdatedLibrary();
});

function displayUpdatedLibrary() {
    if (library.length === 0) {
        document.getElementById('updated-library').innerHTML = 
            '<div class="book-info">Бібліотека порожня. Додайте книги!</div>';
        return;
    }
    
    let output = `<p>Загальна кількість книг: ${library.length}</p>`;
    
    library.forEach((book, index) => {
        const statusClass = book.isRead ? 'read' : 'unread';
        const statusText = book.isRead ? 'Прочитана' : 'Не прочитана';
        output += `
            <div class="book-info">
                <strong>Книга ${index + 1}:</strong> ${book.title}<br>
                <strong>Автор:</strong> ${book.author}<br>
                <strong>Рік:</strong> ${book.year}<br>
                <strong>Статус:</strong> <span class="status ${statusClass}">${statusText}</span>
            </div>
        `;
    });
    
    document.getElementById('updated-library').innerHTML = output;
}

window.addEventListener('load', function() {
    document.getElementById('createBookBtn').click();
    document.getElementById('addMethodBtn').click();
    document.getElementById('createLibraryBtn').click();
    
    logToPage("=== ЛАБОРАТОРНА РОБОТА ===");
    logToPage("Сторінку завантажено. Об'єкти створено автоматично.");
});