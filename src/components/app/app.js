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
        ],
        term: '',
        filter: 'all'
    };

    
    onToggleLike = id => {
        this.setState(({data})=>{
            return ({data: this.toggleHelp([...data], id, 'like')});
        });
    }
    search = (items, term) => {
        if (term.length === 0){
            return items;
        }
        return items.filter(item => {
            return item.label.indexOf(term) > -1;
        })
    }
    toggleHelp = (data, id, type) => {
            const index = data.findIndex(elem => elem.id === id);
            let newOne = {};
            if (type === 'like'){
                newOne = {...data[index], liked: !data[index].liked};
            }else{
                newOne = {...data[index], important: !data[index].important};
            }
            
            const before = data.slice(0, index);
            const after = data.slice(index+1);
            const newState = [...before, newOne, ...after];
            return newState;
    }
    onToggleImportant = id => {
        this.setState(({data}) => {
            return ({data: this.toggleHelp([...data], id, 'important')});
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
    onUpdSearch = (term) => {
        this.setState({term});
    }

    filterPost = (filter, items) => {
        if (filter === 'liked'){
            return items.filter((item) => item.liked);
        }else{
            return items;
        }
        
    }
    onFilterSelect= (filter) => {
        this.setState({filter})
    }
    render = () => {
        const {filter, data, term} = this.state;
        const visiblePosts = this.filterPost(filter, this.search(data, term));
        const totalPosts = data.length;
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
                    <SearchPanel
                    onUpdSearch={this.onUpdSearch}
                    />
                    <PostStatusFilter
                    onFilterSelect={this.onFilterSelect}
                    filter={filter} />
                </div>
                <PostList 
                posts={visiblePosts} 
                onDelete={this.dleteItem}
                onToggleLike={this.onToggleLike}
                onToggleImportant={this.onToggleImportant}
                />
                <PostAddForm onAdd={this.addItem}/>
            </AppBlock>
        )
    }
}

