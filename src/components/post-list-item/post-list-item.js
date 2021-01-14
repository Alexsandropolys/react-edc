import React from 'react';
import './post-list-item.css';

export default class PostListItem extends React.Component {
    
    render() {
        const {label, onDelete, onToggleLike, liked, important, onToggleImportant} = this.props;
        let classNames = 'app-list-item d-flex justify-content-between';
        if (important) {
            classNames += ' important';
        }

        if (liked){classNames += ' like'}
        return (
            <div className={classNames}>
                <span className="app-list-item-label" onClick={onToggleLike}>
                    {label}
                </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button 
                    className="btn-star btn-sm" 
                    type="button"
                    onClick={onToggleImportant}>
                        <i className="fa fa-star"></i>
                    </button>
                    <button onClick={onDelete} className="btn-trash btn-sm" type="button">
                        <i className="fa fa-trash"></i>
                    </button>
                    <i className="fa fa-heart"></i>
                </div>
            </div>
        );
    }
}
