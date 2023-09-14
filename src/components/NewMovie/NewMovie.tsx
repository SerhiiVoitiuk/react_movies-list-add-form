import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const initialInput = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>(initialInput);
  const [imdbValidity, setImdbValidity] = useState(false);
  const [imgValidity, setImgValidity] = useState(false);

  const isDisabled = newMovie.title
    && newMovie.imgUrl && newMovie.imdbUrl
    && newMovie.imdbId && imdbValidity && imdbValidity;

  const pattern = /^(https?:\/\/)?(www\.)?[A-Za-z\d.-]+\.\w{2,6}\/?([^\s]*)?$/;

  const handleChange = (field: string, value: string) => {
    setNewMovie({ ...newMovie, [field]: value.trimStart() });

    if ((field === 'imgUrl')) {
      setImgValidity(pattern.test(value));
    }

    if ((field === 'imdbUrl')) {
      setImdbValidity(pattern.test(value));
    }
  };

  const reset = () => {
    setNewMovie(initialInput);
    setImdbValidity(false);
    setImgValidity(false);
  };

  const handlSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isDisabled) {
      return;
    }

    onAdd(newMovie);
    setCount((currentCount) => currentCount + 1);
    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handlSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(event) => handleChange('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(event) => handleChange('description', event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(event) => handleChange('imgUrl', event)}
        imgValidity={imgValidity}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(event) => handleChange('imdbUrl', event)}
        imgValidity={imdbValidity}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(event) => handleChange('imdbId', event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
