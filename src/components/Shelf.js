import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
    
    updateShelf(book, shelf){
        this.props.updateShelf(book, shelf)
    }
    
    render() {

        if(this.props.shelf.length === 0){
            return null;
        }
        return (
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        //Short-circuit evaluation
                        this.props.shelf.length > 0 && this.props.shelf.map((item)=> (
                            <Book key={item.id} myBook={item} updateShelf={this.props.updateShelf}/>
                        ))
                      }
                    </ol>
                  </div>
                </div>
        )
    }
}
export default Shelf;