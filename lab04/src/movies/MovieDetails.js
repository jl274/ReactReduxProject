import { connect } from "react-redux"
import { withRouter } from "react-router";
import '../styles/movieDetails.scss';
import Modal from 'react-modal';
import { hideToggle, showToggle } from "../actions/togglerActions";
import { Formik , Form, Field } from 'formik';
import { addActorToMovie, deleteActorFromMovie } from "../actions/movieActions";
import { addMovieToActor, deleteMovieFromActor } from "../actions/actorActions";

const customStyles = {
    content: {
        margin: '0',

      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      
    },
  };


const MovieDetails = ({movie, director, toggler, showToggle, 
    hideToggle, actors, addActorToMovie, addMovieToActor, deleteActorFromMovie, deleteMovieFromActor}, props) => {

    function openModal() {
        showToggle('modal');
    };

    function closeModal() {
        hideToggle('modal');
    };

    const handleModalSubmit = (values) => {
        addActorToMovie(movie.id, values.actorId);
        addMovieToActor(values.actorId, movie.title);
    }

    const handleModalDelete = (values) => {
        deleteActorFromMovie(movie.id, values.actorId);
        deleteMovieFromActor(values.actorId, movie.title);
        hideToggle('modal');
    }

    return (
        <div className="box">
            <div className="movie">
                <ul>
                    <li className="title">Movie</li>
                    <li className="label">Title</li><li>{movie.title}</li>
                    <li className="label">Year</li><li>{movie.productionYear}</li>
                    <li className="title">Director</li>
                    <li className="label">Name</li><li>{director.firstName}</li>
                    <li className="label">Surname</li><li>{director.lastName}</li>
                    <li className="label">Age</li><li>{director.age}</li>
                    <li className="title">Actors<button className="edit" onClick={openModal}>Edit actors</button></li>
                    <li className="actorFlex">
                        {movie.actors.length === 0 ? 
                        `No actors added yet` :
                        actors.map(actor =>{
                            if (movie.actors.includes(actor.id)) {
                                return <div className="movieActor" key={actor.id}> {actor.firstName}-{actor.lastName} </div>
                            } else {
                                return null
                            }
                        })}
                    </li>
                </ul>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-modal/3.14.3/react-modal.min.js"
            integrity="sha512-MY2jfK3DBnVzdS2V8MXo5lRtr0mNRroUI9hoLVv2/yL3vrJTam3VzASuKQ96fLEpyYIT4a8o7YgtUs5lPjiLVQ=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"></script>
            <Modal
                isOpen={toggler.modal}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >   
                <div className="modal">
                    <h2>Actor list editing</h2>
                    <button className="exitButton" onClick={closeModal}>close</button>

                    {/* ADD */}
                    <Formik
                        initialValues={{
                            actorId: ''
                        }}
                        onSubmit={(values) => {handleModalSubmit(values)}}
                    >
                        {({values})=><Form>
                            <label>Add actor </label>
                            <Field as="select" name="actorId">
                                <option value={null}>---</option>
                                {actors.map(actor => {
                                    if (!movie.actors.includes(actor.id)) {
                                        return <option key={actor.id} value={actor.id}>{actor.firstName} {actor.lastName}</option>
                                    } else {
                                        return null
                                    }
                                })}
                            </Field>
                            <button type="submit" disabled={!values.actorId || values.actorId === '---'}>Add</button>
                        </Form>}
                    </Formik>

                    {/* DELETE */}
                    <Formik
                        initialValues={{
                            actorId: ''
                        }}
                        onSubmit={(values) => {handleModalDelete(values)}}
                    >
                        {({values}) => 
                        <Form>
                            <label>Delete Actors </label>
                            {movie.actors.length === 0 
                            ? <>No actors added yet.</>
                            : <Field as="select" name="actorId">
                                    <option value={null}>---</option>
                                    {actors.map(actor => {
                                        if (movie.actors.includes(actor.id)) {
                                            return <option key={actor.id} value={actor.id}>{actor.firstName} {actor.lastName}</option>
                                        } else {
                                            return null
                                        }
                                    })}
                              </Field>
                             }
                            <button type="submit" disabled={movie.actors.length === 0 || values.actorId === '---'}>Delete</button>
                        </Form>}
                        
                    </Formik>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state, otherProps) => {
    const { match: {params: {id}} } = otherProps;
    return {
        movie: state.movies.list.find(x => x.id === id),
        director: state.directors.list.find(x => `${x.firstName} ${x.lastName}` === state.movies.list.find(x => x.id === id).director),
        actors: state.actors.list,
        toggler: state.toggler
    }
}

const mapDispatchToProps = {
    showToggle,
    hideToggle,
    addActorToMovie,
    addMovieToActor,
    deleteActorFromMovie,
    deleteMovieFromActor
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetails));