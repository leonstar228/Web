let movieCollection = [
    {
        title: "Хрещений батько",
        director: "Френсіс Форд Коппола",
        year: 1972,
        genre: "кримінал, драма",
        watched: true
    },
    {
        title: "Темний лицар",
        director: "Крістофер Нолан",
        year: 2008,
        genre: "бойовик, кримінал, драма",
        watched: true
    },
    {
        title: "Форрест Гамп",
        director: "Роберт Земекіс",
        year: 1994,
        genre: "драма, мелодрама",
        watched: false
    },
    {
        title: "Початок",
        director: "Крістофер Нолан",
        year: 2010,
        genre: "фантастика, трилер",
        watched: true
    },
    {
        title: "Кримінальне чтиво",
        director: "Квентін Тарантіно",
        year: 1994,
        genre: "кримінал, драма",
        watched: false
    }
];

movieCollection.forEach(movie => {
    movie.markAsWatched = function() {
        this.watched = true;
        addToConsole(`Фільм "${this.title}" позначено як переглянутий.`);
        updateStats();
        displayMovies(movieCollection);
    };
});

function calculateAverageYear(movies) {
    if (movies.length === 0) return 0;
    const totalYears = movies.reduce((sum, movie) => sum + movie.year, 0);
    return Math.round(totalYears / movies.length);
}

function displayMovies(movies) {
    const container = document.getElementById('movies-container');
    const title = document.getElementById('content-title');
    
    if (movies.length === 0) {
        container.innerHTML = `
            <div class="no-movies">
                <i class="fas fa-film fa-3x"></i>
                <p>Фільмів не знайдено</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '<div class="movie-grid"></div>';
    const grid = container.querySelector('.movie-grid');
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = `movie-card ${movie.watched ? 'watched' : 'unwatched'}`;
        
        movieCard.innerHTML = `
            <div class="movie-header">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-year">${movie.year}</div>
            </div>
            <div class="movie-director">
                <i class="fas fa-user"></i> ${movie.director}
            </div>
            <div class="movie-genre">${movie.genre}</div>
            <div class="movie-status">
                <i class="fas ${movie.watched ? 'fa-eye status-watched' : 'fa-eye-slash status-unwatched'}"></i>
                <span class="${movie.watched ? 'status-watched' : 'status-unwatched'}">
                    ${movie.watched ? 'Переглянуто' : 'Не переглянуто'}
                </span>
            </div>
        `;
        
        grid.appendChild(movieCard);
    });
    
    if (movies === movieCollection) {
        title.innerHTML = '<i class="fas fa-video"></i> Всі фільми';
    }
}

function updateStats() {
    const totalMovies = movieCollection.length;
    const watchedMovies = movieCollection.filter(movie => movie.watched).length;
    const unwatchedMovies = totalMovies - watchedMovies;
    const averageYear = calculateAverageYear(movieCollection);
    
    document.getElementById('total-movies').textContent = totalMovies;
    document.getElementById('watched-movies').textContent = watchedMovies;
    document.getElementById('unwatched-movies').textContent = unwatchedMovies;
    document.getElementById('average-year').textContent = averageYear;
}

function addToConsole(message) {
    const consoleOutput = document.getElementById('console-output');
    const messageElement = document.createElement('div');
    messageElement.className = 'console-message';
    messageElement.textContent = `> ${new Date().toLocaleTimeString()}: ${message}`;
    
    consoleOutput.prepend(messageElement);
    
    if (consoleOutput.children.length > 10) {
        consoleOutput.removeChild(consoleOutput.lastChild);
    }
}

function findMovieByTitle(title) {
    return movieCollection.find(movie => 
        movie.title.toLowerCase().includes(title.toLowerCase())
    );
}

function filterMoviesByGenre(genre) {
    return movieCollection.filter(movie => 
        movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
}

function getMoviesByDirector(director) {
    return movieCollection.filter(movie => 
        movie.director.toLowerCase().includes(director.toLowerCase())
    );
}

function getUnwatchedMovies() {
    return movieCollection.filter(movie => !movie.watched);
}

function sortMoviesByYear(descending = false) {
    return [...movieCollection].sort((a, b) => {
        return descending ? b.year - a.year : a.year - a.year;
    });
}

function sortMoviesByTitle() {
    return [...movieCollection].sort((a, b) => 
        a.title.localeCompare(b.title)
    );
}

function showStatistics() {
    const stats = {
        total: movieCollection.length,
        watched: movieCollection.filter(m => m.watched).length,
        unwatched: movieCollection.filter(m => !m.watched).length,
        averageYear: calculateAverageYear(movieCollection),
        oldest: Math.min(...movieCollection.map(m => m.year)),
        newest: Math.max(...movieCollection.map(m => m.year)),
        directors: [...new Set(movieCollection.map(m => m.director))].length
    };
    
    addToConsole(`=== СТАТИСТИКА ФІЛЬМОТЕКИ ===`);
    addToConsole(`Всього фільмів: ${stats.total}`);
    addToConsole(`Переглянуто: ${stats.watched}`);
    addToConsole(`Не переглянуто: ${stats.unwatched}`);
    addToConsole(`Середній рік: ${stats.averageYear}`);
    addToConsole(`Найстаріший: ${stats.oldest} рік`);
    addToConsole(`Найновіший: ${stats.newest} рік`);
    addToConsole(`Унікальних режисерів: ${stats.directors}`);
    
    const title = document.getElementById('content-title');
    title.innerHTML = '<i class="fas fa-chart-bar"></i> Статистика';
    
    const container = document.getElementById('movies-container');
    container.innerHTML = `
        <div class="statistics-view">
            <div class="stat-card-large">
                <h3><i class="fas fa-chart-pie"></i> Статистика фільмотеки</h3>
                <div class="stat-details">
                    <p><i class="fas fa-film"></i> Всього фільмів: <strong>${stats.total}</strong></p>
                    <p><i class="fas fa-eye"></i> Переглянуто: <strong>${stats.watched}</strong></p>
                    <p><i class="fas fa-eye-slash"></i> Не переглянуто: <strong>${stats.unwatched}</strong></p>
                    <p><i class="fas fa-calendar-alt"></i> Середній рік: <strong>${stats.averageYear}</strong></p>
                    <p><i class="fas fa-history"></i> Найстаріший фільм: <strong>${stats.oldest}</strong></p>
                    <p><i class="fas fa-rocket"></i> Найновіший фільм: <strong>${stats.newest}</strong></p>
                    <p><i class="fas fa-users"></i> Унікальних режисерів: <strong>${stats.directors}</strong></p>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    displayMovies(movieCollection);
    updateStats();
    
    const addMovieModal = document.getElementById('add-movie-modal');
    const markWatchedModal = document.getElementById('mark-watched-modal');
    const movieForm = document.getElementById('movie-form');
    const btnCancel = document.getElementById('btn-cancel');
    const btnMarkCancel = document.getElementById('btn-mark-cancel');
    const btnMarkConfirm = document.getElementById('btn-mark-confirm');
    
    document.getElementById('btn-show-all').addEventListener('click', function() {
        displayMovies(movieCollection);
        addToConsole('Показано всі фільми');
    });
    
    document.getElementById('btn-add-movie').addEventListener('click', function() {
        addMovieModal.classList.add('active');
    });
    
    document.getElementById('btn-unwatched').addEventListener('click', function() {
        const unwatchedMovies = getUnwatchedMovies();
        displayMovies(unwatchedMovies);
        document.getElementById('content-title').innerHTML = '<i class="fas fa-eye-slash"></i> Непереглянуті фільми';
        addToConsole(`Знайдено ${unwatchedMovies.length} непереглянутих фільмів`);
    });
    
    document.getElementById('btn-statistics').addEventListener('click', showStatistics);
    
    document.getElementById('btn-sort-year').addEventListener('click', function() {
        const sortedMovies = sortMoviesByYear(true);
        displayMovies(sortedMovies);
        document.getElementById('content-title').innerHTML = '<i class="fas fa-sort-amount-down"></i> Фільми відсортовані за роком';
        addToConsole('Фільми відсортовані за роком (спадання)');
    });
    
    document.getElementById('btn-sort-title').addEventListener('click', function() {
        const sortedMovies = sortMoviesByTitle();
        displayMovies(sortedMovies);
        document.getElementById('content-title').innerHTML = '<i class="fas fa-sort-alpha-down"></i> Фільми відсортовані за назвою';
        addToConsole('Фільми відсортовані за назвою (алфавіт)');
    });
    
    document.getElementById('btn-search-title').addEventListener('click', function() {
        const searchTerm = document.getElementById('search-title').value;
        if (!searchTerm.trim()) {
            addToConsole('Введіть назву для пошуку');
            return;
        }
        
        const foundMovie = findMovieByTitle(searchTerm);
        if (foundMovie) {
            displayMovies([foundMovie]);
            document.getElementById('content-title').innerHTML = `<i class="fas fa-search"></i> Результат пошуку: "${searchTerm}"`;
            addToConsole(`Знайдено фільм: "${foundMovie.title}"`);
        } else {
            displayMovies([]);
            addToConsole(`Фільм з назвою "${searchTerm}" не знайдено`);
        }
    });
    
    document.getElementById('btn-search-genre').addEventListener('click', function() {
        const searchTerm = document.getElementById('search-genre').value;
        if (!searchTerm.trim()) {
            addToConsole('Введіть жанр для пошуку');
            return;
        }
        
        const filteredMovies = filterMoviesByGenre(searchTerm);
        displayMovies(filteredMovies);
        document.getElementById('content-title').innerHTML = `<i class="fas fa-search"></i> Фільми жанру: "${searchTerm}"`;
        addToConsole(`Знайдено ${filteredMovies.length} фільмів жанру "${searchTerm}"`);
    });
    
    document.getElementById('btn-search-director').addEventListener('click', function() {
        const searchTerm = document.getElementById('search-director').value;
        if (!searchTerm.trim()) {
            addToConsole('Введіть режисера для пошуку');
            return;
        }
        
        const filteredMovies = getMoviesByDirector(searchTerm);
        displayMovies(filteredMovies);
        document.getElementById('content-title').innerHTML = `<i class="fas fa-search"></i> Фільми режисера: "${searchTerm}"`;
        addToConsole(`Знайдено ${filteredMovies.length} фільмів режисера "${searchTerm}"`);
    });
    
    document.getElementById('btn-mark-watched').addEventListener('click', function() {
        markWatchedModal.classList.add('active');
    });
    
    btnCancel.addEventListener('click', function() {
        addMovieModal.classList.remove('active');
        movieForm.reset();
    });
    
    btnMarkCancel.addEventListener('click', function() {
        markWatchedModal.classList.remove('active');
        document.getElementById('movie-to-mark').value = '';
    });
    
    movieForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('movie-title').value;
        const director = document.getElementById('movie-director').value;
        const year = parseInt(document.getElementById('movie-year').value);
        const genre = document.getElementById('movie-genre').value;
        const watched = document.getElementById('movie-watched').value === 'true';
        
        const newMovie = {
            title,
            director,
            year: isNaN(year) ? new Date().getFullYear() : year,
            genre,
            watched
        };
        
        newMovie.markAsWatched = function() {
            this.watched = true;
            addToConsole(`Фільм "${this.title}" позначено як переглянутий.`);
            updateStats();
            displayMovies(movieCollection);
        };
        
        movieCollection.push(newMovie);
        
        addMovieModal.classList.remove('active');
        movieForm.reset();
        
        displayMovies(movieCollection);
        updateStats();
        
        addToConsole(`Додано новий фільм: "${title}"`);
    });
    
    btnMarkConfirm.addEventListener('click', function() {
        const movieTitle = document.getElementById('movie-to-mark').value;
        
        if (!movieTitle.trim()) {
            addToConsole('Введіть назву фільму');
            return;
        }
        
        const foundMovie = findMovieByTitle(movieTitle);
        
        if (foundMovie) {
            foundMovie.markAsWatched();
            markWatchedModal.classList.remove('active');
            document.getElementById('movie-to-mark').value = '';
        } else {
            addToConsole(`Фільм "${movieTitle}" не знайдено`);
        }
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === addMovieModal) {
            addMovieModal.classList.remove('active');
            movieForm.reset();
        }
        if (e.target === markWatchedModal) {
            markWatchedModal.classList.remove('active');
            document.getElementById('movie-to-mark').value = '';
        }
    });
    
    addToConsole('Фільмотека завантажена. Готово до роботи!');
});