import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './components/Shelf'
import Search from './components/Search'
import { Route, Link } from 'react-router-dom'

class App extends React.Component {
  state = {
    books:[]
  }
  
  // setState
  componentDidMount() {
    BooksAPI.getAll()
        .then(book=>this.setState({
          books: book
        }));
  };

  // Change Books'shelves
  handleShelfUpdate(book, shelf) {
    BooksAPI.update(book, shelf)
      .then(()=>{
        book.shelf = shelf;
        this.setState(currState=>({
          books: currState.books.filter(item=> item.id !== book.id).concat([book])
        }))
      })
  }
  render() {
    return (
      <div className="App">
        {/* Routing */}
          <Route exact path ="/search">
          <Search 
            updateShelf={(book, shelf)=> {this.handleShelfUpdate(book, shelf)}}
            booksOnShelf={this.state.books} 
          />
          </Route>
          <Route exact path='/' render={({ history })=>(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Shelf 
                    title='Currently Reading'
                    shelf={
                      this.state.books.filter(item => item.shelf === 'currentlyReading')
                    }
                    updateShelf={(book, shelf)=>{this.handleShelfUpdate(book, shelf)}}
                  />
                  <Shelf 
                    title='Want to Read'
                    shelf={
                      this.state.books.filter(item => item.shelf === 'wantToRead')
                    }
                    updateShelf={(book, shelf)=>{this.handleShelfUpdate(book, shelf)}}
                  />
                  <Shelf 
                    title='Read'
                    shelf={
                      this.state.books.filter(item => item.shelf === 'read')
                    }
                    updateShelf={(book, shelf)=>{this.handleShelfUpdate(book, shelf)}}
                  />
                </div>
              </div>

              {/* Search page route */}
              <div className="open-search">
                  <Link to='/search' className="open-search"><button>Add</button></Link>
              </div>
            </div>
          )}/>
      </div>
    )
  }
}

export default App;
