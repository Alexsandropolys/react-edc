import React from 'react';
import { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list'
import PostAddForm from '../post-add-form';
import nextId from 'react-id-generator';

import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`
export default class App extends Component {
    state = {
        data: [
            { label: 'Going to learn React', important: true, id: nextId(), liked:false},
            { label: 'That is so good', important: false, id: nextId(), liked:false },
            { label: 'I need a break...', important: false, id: nextId(), liked:false }
        ]
    };

    
    onToggleLike = id => {
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);
            const newOne = {...data[index], liked: !data[index].liked};
            const before = data.slice(0, index);
            const after = data.slice(index+1);
            const newState = [...before, newOne, ...after];
            return ({data: newState});
        });
        console.log(this.state);
    }

    onToggleImportant = id => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const newOne = {...data[index], important: !data[index].important};
            const before = data.slice(0, index);
            const after = data.slice(index+1);
            const newState = [...before, newOne, ...after];
            return ({data: newState});
        });
    }
    dleteItem = id => {
        this.setState(({data})=>{
            const newState = data.filter((d) => d.id !== id);
            return({data: newState});
        });
    }
    addItem = (body) => {
        const newItem = {
            label: body,
            important: false,
            id: nextId()
        }
        this.setState(({data}) => {
            const newState = [...data, newItem];
            return({data: newState});
        });
    }
     
    render = () => {
        const totalPosts = this.state.data.length;
        let likedPosts = 0;
        this.state.data.forEach(post => {
            if (post.liked){
                likedPosts++;
            }
        });
        return (
            <AppBlock>
                <AppHeader
                totalPosts={totalPosts}
                likedPosts={likedPosts}
                 />
                <div className="search-panel d-flex">
                    <SearchPanel />
                    <PostStatusFilter />
                </div>
                <PostList 
                posts={this.state.data} 
                onDelete={this.dleteItem}
                onToggleLike={this.onToggleLike}
                onToggleImportant={this.onToggleImportant}
                />
                <PostAddForm onAdd={this.addItem}/>
            </AppBlock>
        )
    }
}

