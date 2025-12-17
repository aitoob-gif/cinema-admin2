const showMoviesBtn = document.getElementById('show-films-btn');
const addMovieBtn = document.getElementById('add-film-btn');
const searchMovieBtn = document.getElementById('search-film-btn');
const rentMovieBtn = document.getElementById('mark-film-btn');
const displayArea = document.getElementById('content');

const movieCatalog = [
  { title: 'Inception', isAvailable: true },
  { title: 'The Dark Knight', isAvailable: true },
  { title: 'Avatar', isAvailable: false },
  { title: 'Titanic', isAvailable: true },
  { title: 'Avengers: Endgame', isAvailable: false },
];

const clearDisplay = () => {
  displayArea.innerHTML = '';
};

const showAllMovies = () => {
  clearDisplay();

  const movieList = document.createElement('ul');
  movieCatalog.forEach(movie => {
    const listItem = document.createElement('li');
    listItem.textContent = `${movie.title} - ${movie.isAvailable ? 'Доступен' : 'Не доступен'}`;
    movieList.appendChild(listItem);
  });

  displayArea.appendChild(movieList);
};

const addNewMovie = () => {
  clearDisplay();

  const movieForm = document.createElement('form');
  const movieInput = document.createElement('input');
  movieInput.placeholder = 'Введите название фильма';
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Добавить фильм';
  movieForm.appendChild(movieInput);
  movieForm.appendChild(submitButton);

  displayArea.appendChild(movieForm);

  movieForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newMovieTitle = movieInput.value.trim();
    if (newMovieTitle) {
      movieCatalog.push({ title: newMovieTitle, isAvailable: true });
      showAllMovies();
    }
  });
};

const searchForMovie = () => {
  clearDisplay();

  const searchInput = document.createElement('input');
  searchInput.placeholder = 'Поиск фильма...';
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Найти фильм';
  displayArea.appendChild(searchInput);
  displayArea.appendChild(searchButton);

  searchButton.addEventListener('click', () => {
    const searchQuery = searchInput.value.trim().toLowerCase();
    const foundMovies = movieCatalog.filter(movie => movie.title.toLowerCase().includes(searchQuery));

    clearDisplay();
    if (foundMovies.length > 0) {
      const movieList = document.createElement('ul');
      foundMovies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.textContent = `${movie.title} - ${movie.isAvailable ? 'Доступен' : 'Не доступен'}`;
        movieList.appendChild(listItem);
      });
      displayArea.appendChild(movieList);
    } else {
      displayArea.textContent = 'Фильм не найден';
    }
  });
};

const markMovieAsRented = () => {
  clearDisplay();

  const movieSelector = document.createElement('select');
  movieCatalog.forEach((movie, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = movie.title;
    movieSelector.appendChild(option);
  });

  const rentButton = document.createElement('button');
  rentButton.textContent = 'Выдать фильм в прокат';
  displayArea.appendChild(movieSelector);
  displayArea.appendChild(rentButton);

  rentButton.addEventListener('click', () => {
    const selectedMovieIndex = movieSelector.value;
    const selectedMovie = movieCatalog[selectedMovieIndex];
    if (selectedMovie && selectedMovie.isAvailable) {
      selectedMovie.isAvailable = false;
      showAllMovies();
    } else {
      alert('Этот фильм уже выдан.');
    }
  });
};

showMoviesBtn.addEventListener('click', showAllMovies);
addMovieBtn.addEventListener('click', addNewMovie);
searchMovieBtn.addEventListener('click', searchForMovie);
rentMovieBtn.addEventListener('click', markMovieAsRented);
