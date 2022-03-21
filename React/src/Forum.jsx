import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const Forum = () => {
    const [forums, setForums] = useState([
        {
            title: 'The wings of fire',
            author: 'Abdul Kalam',
            dateOfAdding: '2022-03-20',
            body: 'It is a book written by Abdul Kalam',
        },
    ]);
    const getForums = () => {
        axios
            .get('/forum')
            .then((res) => {
                setForums(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getForums();
    }, []);
    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            dateOfAdding: '',
            body: '',
        },
        onSubmit(values) {
            const forumOb = {
                title: formik.values.title,
                author: formik.values.author,
                dateOfAdding: formik.values.dateOfAdding,
                body: formik.values.body,
            };
            axios
                .post('/forum', forumOb)
                .then((res) => {
                    getForums();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        validate() {
            const errors = {};
            const combined = /^[0-9a-zA-Z]+$/;
            if (
                formik.values.title.length < 10 ||
                formik.values.title.length > 100
            ) {
                errors.title =
                    '*title must have minimum of 10 and maximum of 100 characters';
            }
            if (
                formik.values.author.length < 5 ||
                formik.values.author.length > 50
            ) {
                errors.author =
                    '*author must have minimum of 5 and maximum of 50 characters';
            }
            if (!formik.values.author.match(combined)) {
                errors.author = '*author name must be alpha numberic';
            }
            if (
                formik.values.body.length < 50 ||
                formik.values.body.length > 500
            ) {
                errors.body =
                    '*body must have minimum of 50 and maximum of 500 characters';
            }
            return errors;
        },
    });
    const deleteBook = (id) => {
        axios
            .delete('/forum/' + id)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getForums();
    };
    const clearAll = () => {
        axios
            .get('/forum/clearall')
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getForums();
    };
    return (
        <div className="App-div">
            <h1>Book Details</h1>
            <form onSubmit={formik.handleSubmit} noValidate>
                <b>Title : </b>
                <input
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                />
                <br />
                <div className="text-danger">
                    {formik.errors.title ? formik.errors.title : null}
                </div>
                <br />
                <b>Author : </b>
                <input
                    type="text"
                    name="author"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                />
                <br />
                <div className="text-danger">
                    {formik.errors.author ? formik.errors.author : null}
                </div>
                <br />
                <b>Date of Adding : </b>
                <input
                    type="date"
                    name="dateOfAdding"
                    value={formik.values.dateOfAdding}
                    onChange={formik.handleChange}
                />
                <br />
                <br />
                <b>Body : </b>
                <textarea
                    name="body"
                    value={formik.values.body}
                    onChange={formik.handleChange}
                />
                <div className="text-danger">
                    {formik.errors.body ? formik.errors.body : null}
                </div>
                <br />
                <button>
                    <b>Add Forum</b>
                </button>
            </form>
            {forums.map((val, index) => {
                return (
                    <div className="cardForum">
                        <h2>Book {index + 1}</h2>
                        <b>Title : </b>
                        {val.title}
                        <br />
                        <b>Author : </b>
                        {val.author}
                        <br />
                        <b>Date of Adding : </b>
                        {val.dateOfAdding}
                        <br />
                        <b>Body : </b>
                        {val.body}
                        <br />
                        <div className="buttonForum">
                            <button
                                onClick={() => {
                                    deleteBook(index);
                                }}
                            >
                                <b>Delete</b>
                            </button>
                        </div>
                    </div>
                );
            })}
            <button onClick={clearAll}>
                <b>Clear All</b>
            </button>
        </div>
    );
};
export default Forum;
