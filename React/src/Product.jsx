import { useState, useEffect } from 'react';
import axios from 'axios';
const Product = () => {
    const [products, setProducts] = useState([
        {
            name: 'Levis Shirt',
            price: 1499,
            description: 'This is a levis shirt',
            category: 'Clothes',
            status: 'Available',
        },
        {
            name: 'Remote Control Car',
            price: 899,
            description: 'This is remote control car for childern',
            category: 'Toys',
            status: 'Unavailable',
        },
    ]);
    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = () => {
        axios
            .get('/products')
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const addProduct = (event) => {
        event.preventDefault();
        let productOb = {
            name: event.target.name.value,
            price: event.target.price.value,
            description: event.target.description.value,
            category: event.target.category.value,
            status: event.target.status.value,
        };
        axios
            .post('/products', productOb)
            .then((res) => {
                getProducts();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteProduct = (indexToDelete) => {
        axios
            .delete('/products/' + indexToDelete)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getProducts();
    };
    const deleteAll = () => {
        axios
            .get('/products/deleteall')
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getProducts();
    };
    return (
        <div className="App-div">
            <h1>Products App</h1>
            <form onSubmit={addProduct}>
                <b>Name : </b>
                <input type="text" name="name" />
                <br />
                <b>Price : </b>
                <input type="number" name="price" />
                <br />
                <b>Description : </b>
                <textarea name="description"></textarea>
                <br />
                <b>Category : </b>
                <select name="category">
                    <option selected>Select</option>
                    <option value="Toys">Toys</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Food Items">Food Items</option>
                </select>
                <br />
                <b>Status : </b>
                <select name="status">
                    <option selected>Select</option>
                    <option value="Complete">Complete</option>
                    <option value="Incomplete">Incomplete</option>
                </select>
                <br />
                <button>Add Product</button>
                <br />
            </form>
            {products.map((val, index) => {
                return (
                    <div className="cardProduct">
                        <h2>Product {index + 1}</h2>
                        <b>Name : </b>
                        {val.name}
                        <br />
                        <b>Price : </b>
                        {val.price}
                        <br />
                        <b>Description : </b>
                        {val.description}
                        <br />
                        <b>Category : </b>
                        {val.category}
                        <br />
                        <b>Status : </b>
                        {val.status} <br />
                        <button
                            onClick={() => {
                                deleteProduct(index);
                            }}
                        >
                            <b>Delete</b>
                        </button>
                    </div>
                );
            })}
            <button onClick={deleteAll}>
                <b>Delete All</b>
            </button>
            <br />
        </div>
    );
};
export default Product;
