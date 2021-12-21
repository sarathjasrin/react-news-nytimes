import React from 'react';
import { withRouter } from 'react-router-dom'
import {URL_PREFIX} from '../constants'

let timer = false;

function Header(props) {
    return (
        <header>
            <div className="container">
                <h1 className="display-3 text-center text-light mb-5">NYTimes News</h1>
                <div className="search-container">
                    <input type="text" className="form-control" onKeyUp={e => {
                        let value = e.target.value.trim();
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            props.history.push(URL_PREFIX+"/search/" + value);
                            props.searchHandler(value);                            
                            clearTimeout(timer);
                        }, 600);                        
                    }} defaultValue={props.search} placeholder="Search" />
                </div>
            </div>
        </header>
    )
}

export default withRouter(Header)