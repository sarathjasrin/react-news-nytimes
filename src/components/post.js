import React from 'react'
import { Link } from 'react-router-dom'
import {URL_PREFIX} from '../constants'
import Utility from '../utility'

export default function singlePost(props) {
    let post = props.post;
    let type = props.type ? props.type : "";


    if (props.post) {
        let pat = /^https?:\/\//i;
        let img = post.multimedia.length > 0 ? post.multimedia[0].url : "";
        if (img && !pat.test(img)) {
           img= "https://www.nytimes.com/" + img
        }
        let title = props.page === "search" ? post.headline.main : post.title;
        let section = props.page === "search" ? post.section_name : post.section;
        let byline = props.page === "search" ? post.byline.original : post.byline;
        let date = props.page === "search" ? Utility.postDate(post.pub_date) : Utility.postDate(post.published_date);
        return (
            <React.Fragment>
                {type === "default" ? (
                    <div className="card" key={props.pid}>
                        <Link className="post-link" to={URL_PREFIX+"/view/" + props.pid}>
                            <div className={"post single-post card " + type} >
                                {img ? (
                                    <div className="post-image card-img-top">
                                        <img src={img} alt={title} className="img-fluid" />
                                        <span className="post-tag">{section}</span>
                                    </div>
                                ) : ""}

                                <div className="card-body post-meta mt-3">
                                    <h3 className="post-title display-5">{title}</h3>
                                    <span className="post-author">{byline}</span>
                                    <span className="post-date">{date}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ) : (
                        <Link className="post-link" key={props.pid} to={URL_PREFIX+"/view/featured/" + props.pid}>
                            <div className={"post " + type} >
                                <div className="post-image" style={{ background: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center center" }}></div>
                                <div className="post-meta">
                                    <h3 className="post-title display-5">{post.title}</h3>
                                    <span className="post-author">{post.byline}</span>
                                    <span className="post-date">{Utility.postDate(post.published_date)}</span>
                                </div>
                            </div>
                        </Link>
                    )}

            </React.Fragment>

        )
    } else {
        return ""
    }

}