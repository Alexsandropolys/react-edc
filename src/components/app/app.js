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

    maxId = 4;
    state = {
        data: [
            { label: 'Going to learn React', important: true, id: 'www' },
            { label: 'That is so good', important: false, id: 'qqq' },
            { label: 'I need a break...', important: false, id: 'eee' }
        ]
    };
    dleteItem = id => {
        this.setState(({data})=>{
            //const index = data.findIndex(elem => elem.id === id);
            const newState = data.filter((d) => d.id !== id);
            console.log(newState);
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
            console.log(newItem);
            return({data: newState});
        });
    }
     
    render = () => {
        return (
            <AppBlock>
                <AppHeader />
                <div className="search-panel d-flex">
                    <SearchPanel />
                    <PostStatusFilter />
                </div>
                <PostList 
                posts={this.state.data} 
                onDelete={this.dleteItem}
                />
                <PostAddForm onAdd={this.addItem}/>
            </AppBlock>
        )
    }
}

