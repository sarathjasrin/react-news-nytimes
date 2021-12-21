import React from 'react';
import { Link } from 'react-router-dom'
import {URL_PREFIX} from '../constants'
import Utility from '../utility';
import Footer from "../components/footer";

export default function View(props) {
    let url = props.match.params.url;
    let post = props.posts[url];
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
            <section className="section post-full">
                <div className="container">
                    <h1 className="post-title-full">{title}</h1>
                    <div className="post-metas">
                        <h6 className="post-title">{byline}</h6>
                        <span>{date}</span>
                    </div>
                    <div className="post-image card-img-top">
                        <img src={img} alt={title} className="img-fluid" />
                        <span className="post-tag">{section}</span>
                    </div>
                    <p className="post-content mt-5">{post.abstract}</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed facilisis eros. Fusce nec sem venenatis, viverra lectus eget, sollicitudin magna. Etiam dapibus bibendum lorem, ac iaculis mauris pharetra non. In at cursus leo. Morbi nec feugiat lacus. Morbi sollicitudin massa ac eros pellentesque, a mollis odio lobortis. Vivamus vitae efficitur lectus, sed feugiat turpis. Quisque volutpat odio a urna dapibus, eget sollicitudin urna placerat. Fusce eget mattis dui, quis viverra sapien. Nam non elementum metus, sed hendrerit erat. Fusce mollis nec diam a cursus. In hac habitasse platea dictumst. Pellentesque pulvinar et arcu ut luctus. Aliquam erat volutpat. Nulla nec eleifend ante, at dapibus turpis. Curabitur fringilla ornare magna.
                    </p>

                    <p>  Vestibulum feugiat sem non ex tempus, ac vestibulum nisi porta. Nulla eu augue egestas, placerat nunc nec, vestibulum dui. Fusce non tempus magna. Suspendisse at tincidunt felis, vitae tincidunt sapien. Nam vel aliquet orci. Phasellus in venenatis sapien. Nam aliquet felis ac sem vulputate tincidunt. Sed ultrices molestie iaculis. Cras finibus et nunc ut mattis.
                      </p>
                    <p>  Vivamus porta ornare neque, a semper enim eleifend ut. Donec aliquam, est non cursus venenatis, ipsum velit vestibulum justo, eu lacinia dolor diam ac turpis. Vivamus mollis sit amet sem id tristique. Pellentesque enim ligula, scelerisque non egestas eu, venenatis ut nunc. Curabitur mattis ornare diam. Pellentesque lacinia risus at dapibus luctus. Nunc in tempor sapien. Nulla facilisi. Praesent porttitor venenatis sapien, vel tincidunt urna sodales id.
                       </p>
                    <p> Praesent blandit tincidunt eros, non hendrerit erat. Nullam auctor ornare finibus. Maecenas nec auctor lorem. Fusce faucibus accumsan nunc nec iaculis. Sed vel faucibus sapien, eu pretium ligula. Aenean posuere dolor sapien, id sagittis nisi vestibulum at. Mauris et elementum velit, ac ornare sem. Mauris semper ligula in sapien sollicitudin, in accumsan dui placerat. Proin eu nunc turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus leo erat, ornare scelerisque consectetur id, congue eget mi. Vestibulum lacinia ut justo ut vulputate.
                       </p>
                    <p>  Phasellus aliquet dolor ullamcorper, bibendum lectus ut, fringilla est. Donec mattis odio sit amet mauris imperdiet, elementum porttitor urna gravida. Curabitur eros est, malesuada quis porta vitae, pretium sed nunc. Donec dui diam, iaculis et elementum nec, lacinia quis purus. Maecenas dapibus odio sed odio finibus ultricies. Duis augue justo, dignissim in enim eu, euismod convallis mauris. Curabitur consequat augue erat, ut hendrerit tellus sollicitudin in. Fusce viverra porttitor urna id ullamcorper. Suspendisse et molestie tortor. Maecenas laoreet pulvinar nisi, quis pretium leo varius eu. Phasellus vel justo et est condimentum ultrices. Vestibulum orci ex, pretium nec mauris sed, commodo porta neque. Quisque eu diam sagittis massa congue pretium viverra vitae tortor. Pellentesque feugiat pharetra diam, lacinia rutrum felis porta id. Vestibulum dapibus nisl libero, ut finibus neque facilisis ac.
                    </p>
                </div>
            </section>
            <div className="backtohome text-center p-5">
                <Link className="" to={"/"}>Back to Home</Link>
            </div>
        </React.Fragment>
    )
}
