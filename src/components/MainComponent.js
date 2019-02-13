import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Catalog from './CatalogComponent';
import Contact from './ContactComponent';
import ProductDetail from './ProductDetailComponent';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchProducts, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    products: state.products,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: (productId, rating, author, comment) => dispatch(postComment(productId, rating, author, comment)),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => 
    dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
  fetchProducts: () => {dispatch(fetchProducts())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
})

class Main extends Component {

  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
      return(
        <Home 
          product={this.props.products.products.filter((product) => product.featured)[0]}
          productsLoading={this.props.products.isLoading}
          productsErrMess={this.props.products.errMess}
          promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />  
      )
    }

    const ProductWithId = ({match}) => {
      return(
        <ProductDetail 
          product={this.props.products.products.filter((product) => product.id === parseInt(match.params.productId,10))[0]} 
          isLoading={this.props.products.isLoading}
          errMess={this.props.products.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.productId === parseInt(match.params.productId,10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      )
    }

    return (
      <div>
        <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                <Route exact path="/catalog" component={() => <Catalog products={this.props.products} />} />
                <Route path="/catalog/:productId" component={ProductWithId} />
                <Route exact path="/contactus" component={() => 
                  <Contact 
                    resetFeedbackForm={this.props.resetFeedbackForm} 
                    postFeedback={this.props.postFeedback} 
                  />}
                />
                <Redirect to="/home" />
              </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));