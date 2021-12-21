/* eslint-disable eqeqeq */
import React from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import {URL_PREFIX} from './constants'
import Utility from './utility';
import Header from './components/header'
import Footer from './components/footer'
import SinglePost from './components/post'
import Views from './pages/view';
import Loader from './components/loader';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      featurePost: [],
      post: [],
      viewPosts: [],
      currentPage: 0,
      pager: 10,
      totalPages: 1,
      loaderMore: false,
      sortBy: "newest",
      searchLoader: false,
      searchResults: []
    }

    this.searchHandler = this.searchHandler.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  componentDidMount() {
    if (window.location.pathname === '/') {
      this.loadHomepagePost();
    }
  }

  loadHomepagePost() {
    Utility.sendRequest("topstories/v2/home.json", "")
      .then(res => {
        let results = res.data.results;
        let featured = results.length > 4 ? results.slice(0, 4) : results.slice(0, results.length);
        let posts = results.length > 4 ? results.slice(4, results.length) : [];
        this.setState({
          post: posts,
          featurePost: featured,
          totalPages: Utility.getPager(posts.length, this.state.pager)
        }, () => {
          //call first page loader
          this.loadMore();
        })
      }).catch(err => console.log(err))
  }

  loadSearchPage(searchValue = "") {
    if (searchValue) {
      if (this.state.searchResults.length < 1) {
        this.setState({
          searchLoader: true
        })
      }

      Utility.sendRequest(`search/v2/articlesearch.json`, `fq=headline:('${searchValue}')&sort=${this.state.sortBy}&page=${this.state.currentPage}`)
        .then(res => {
          let results = res.data.response.docs;
          this.setState({
            searchResults: results,
            totalPages: Utility.getPager(results.length, this.state.pager)
          }, () => {
            //call first page loader
            this.loadMore(true); //reset current page
            this.setState({
              searchLoader: false
            })
          })
        }).catch(err => console.log(err))

      this.setState({
        searchValue: searchValue
      })
    }
  }

  loadMore(reset = false) {
    let currentPage = reset ? 0 : this.state.currentPage;
    let offset = currentPage === 0 ? 0 : (this.state.currentPage * this.state.pager);
    this.setState({ loaderMore: true });
    let newArr = reset ? this.state.post.slice(offset, offset + this.state.pager) : [...this.state.viewPosts, ...this.state.post.slice(offset, offset + this.state.pager)];
    this.setState({
      viewPosts: newArr,
      currentPage: currentPage + 1
    }, () => {
      this.setState({ loaderMore: false });
    });
  }

  searchHandler(searchValue = "") {
    this.loadSearchPage(searchValue);
  }

  sortBy(e) {
    let sortBy = e.target.value;
    if (sortBy) {
      this.setState({ sortBy }, () => {
        this.loadSearchPage(this.state.searchValue);
      });
    }
  }

  renderPosts(page = "home") {
    let posts = page === "home" ? this.state.viewPosts : this.state.searchResults;
    return posts.map((e, i) => <SinglePost post={e} type="default" pid={i} page={page} />);
  }

  render() {
    return (
      <main className="main">
        <Header searchHandler={this.searchHandler} search={this.state.searchValue} />
        <Switch>
          <Route key="1" exact path={"/"} render={() => {
            return (
              this.state.post.length > 0 ? (
                <React.Fragment>
                  <div className="featured-post">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-6 col-sm-12 mbl-padd-r">
                          <SinglePost post={this.state.featurePost[0]} type="left" pid="0" />
                        </div>
                        <div className="col-lg-6 col-sm-12 pl-0 mbl-padd">
                          <div className="row">
                            <div className="col-sm-12 mbl-padd-b" >
                              <SinglePost post={this.state.featurePost[1]} type="top" pid="1" />
                            </div>
                            <div className="col-sm-12 mbl-padd">
                              <div className="row">
                                <div className="col-sm-6 mbl-padd-r" >
                                  <SinglePost post={this.state.featurePost[2]} type="bottom" pid="2" />
                                </div>
                                <div className="col-sm-6 pl-0 mbl-padd">
                                  <SinglePost post={this.state.featurePost[3]} type="bottom" pid="3" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ny-posts">
                    <div className="container">
                      <div className="card-columns">
                        {this.renderPosts()}
                      </div>
                    </div>
                  </div>
                  {this.state.loaderMore ? <Loader /> : (
                    this.state.currentPage === this.state.totalPages ? "" : <div className="load-more" onClick={() => this.loadMore()}>Load More</div>
                  )}
                </React.Fragment>
              ) : <Loader />
            )
          }} />
          <Route key="2" exact path={URL_PREFIX+"/search"} render={() => {
            return (
              <React.Fragment>
                <div className="text-center section"><h3>No results found</h3>
                  <img src="https://img.icons8.com/pastel-glyph/64/000000/empty-box.png" alt="no-results" />
                </div>
                <div className="backtohome text-center p-5">
                  <Link className="" to={URL_PREFIX+"/"}>Back to Home</Link>
                </div>
              </React.Fragment>
            )
          }} />
          <Route key="3" exact path={URL_PREFIX+"/search/:keyword"} render={({ match }) => {
            //trigger search
            return this.state.searchValue ? (
              <React.Fragment>
                <div className="ny-posts post-full">
                  <div className="container">
                    <div className="pb-5 text-right">
                      <select className="sort-by" onChange={this.sortBy}>
                        <option value="">Sort by</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                      </select>
                    </div>
                    <div className="card-columns">
                      {this.state.searchLoader ? <Loader /> : ""}
                      {this.renderPosts("search")}
                    </div>
                  </div>
                </div>
                <div className="backtohome text-center p-5">
                  <Link className="" to={URL_PREFIX+"/"}>Back to Home</Link>
                </div>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <div className="text-center section"><h3>No results found</h3>
                    <img src="https://img.icons8.com/pastel-glyph/64/000000/empty-box.png" alt="no-results" />
                  </div>
                  <div className="backtohome text-center p-5">
                    <Link className="" to={URL_PREFIX+"/"}>Back to Home</Link>
                  </div>
                </React.Fragment>
              )
          }} />
          <Route key="4" exact path={URL_PREFIX+"/view/featured/:url"} render={({ match }) => <Views match={match} posts={this.state.featurePost} />} />
          <Route key="5" exact path={URL_PREFIX+"/view/:url"} render={({ match }) => <Views match={match} posts={this.state.viewPosts} />} />
        </Switch>
        <Footer/>
      </main >
    );
  }
}

export default withRouter(App);
