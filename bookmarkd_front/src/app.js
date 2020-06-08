import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import Form from './form.js';


const App = (props) => {

    //CREATE STATE
    //this state holds our array of holidays
    const [bookmarks, setBookmarks] = React.useState(null);
    //this state holds the holiday the user wants to edit
    const [editBookmark, setEditBookmark] = React.useState({
        title: '',
        url: '',
    });

    //OBJECT FOR BLANK FORM FOR CREATE
    const blank = {
        title: '',
        url: '',
    };

    //Function to get bookmarks from API
    const getInfo = async () => {
        const response = await fetch('http://localhost:3000/bookmarkd');
        const result = await response.json();
        console.log(result);
        setBookmarks(result);
    };

    //Gets bookmarks from API
    React.useEffect(() => {
        getInfo();
    }, []); 

    //handleCreate function for the from
    const handleCreate = async (data) => {
        const response = await fetch('http://localhost:3000/bookmarkd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        getInfo(); //update the list of bookmarks
    };

    const handleDelete = async (id) => {
        //makes the delete call to the backend
        const response = await fetch(`http://localhost:3000/bookmarkd/${id}`, {
            method: 'DELETE',
        });
        //re-fetches the updated list of bookmarks
        getInfo();
    };

    //when clicking edit button, this function runs
    const handleSelect = async (bookmark) => {
        setEditBookmark(bookmark);
    };

    const handleEdit = async (data) => {
        //updates the selected bookmark
        const response = await fetch(
            `http://localhost:3000/bookmarkd/${data._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        );
        //grab the updated list of bookmarks
        getInfo();
    };

    return (
        <>
            <h1>Bookmarks</h1>
            <ul>
                {bookmarks
                    ? bookmarks.map((bookmark) => {
                          return (
                              <li key={bookmark._id}>
                                  <a href={`http://${bookmark.url}`}><h2>{bookmark.title}</h2></a>
                                  <br />
                                  <button
                                      onClick={() => {
                                          handleDelete(bookmark._id);
                                      }}
                                  >
                                      Delete
                                  </button>
                                  <button
                                      onClick={() => {
                                          handleSelect(bookmark);
                                      }}
                                  >
                                      Edit
                                  </button>
                              </li>
                          );
                      })
                    : 'LOADING...'}
            </ul>
            <br />
            <h3>Create a Bookmark</h3>
            <Form initial={blank} handleSubmit={handleCreate} />
            <h3>Edit Selected Bookmark</h3>
            <Form initial={editBookmark} handleSubmit={handleEdit} />
        </>
    ) 
};

const target = document.getElementById('app');
ReactDOM.render(<App />, target);