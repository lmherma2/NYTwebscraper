import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Route } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Article extends Component {
  state = {
    OtherState: [],
    Article: [],
    StartYear: 2000,
    EndYear: 2010,
    Topic: "Cats"
  };

  componentDidMount() {
    this.loadArticle();
  }

  loadArticle = () => {
    API.getArticle(this.state.Topic,this.state.StartYear,this.state.EndYear)
      .then(res =>
        this.setState({ Article: res.data.response.docs})
      )
      .catch(err => console.log(err));
    API.getArticlesFromDatabase()
        .then(res => 
         console.log("other state")
        )
      .then(res =>
        this.setState({OtherState: this.state.OtherState.push(res.data)})
      )
      .then(res => 
        console.log(this.state.OtherState)
      )
      .catch(err => console.log(err))
  };

  deleteArticle = id => {
    if(this.state.OtherState.length = 1){
      this.state.OtherState = [];
    }
    this.state.OtherState.splice(id, id);
    API.deleteArticle(id)
      .then(res => this.loadArticle())
      .catch(err => console.log(err));
  };
  AddArticle = id => {
    console.log(id)
    var Article = this.state.Article[id]
    console.log(Article);
    this.setState({OtherState: [...this.state.OtherState, Article]})
    // API.saveArticle(Article)
    //   .then(res => this.loadArticle())
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.Topic && this.state.StartYear && this.state.EndYear) {
      API.getArticle(this.state.Topic, this.state.StartYear, this.state.EndYear)
        .then(res => this.loadArticle())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
              <h1>Results</h1>
            {this.state.Article.length ? (              <List>
                {this.state.Article.map((Article,i) => (
                  <ListItem key={i}>
                      <strong>
                        {Article.headline.main} 
                        </strong>
                        <button onClick={() => this.AddArticle(i)}>Save </button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            <form>
              <Input
                value={this.state.Topic}
                onChange={this.handleInputChange}
                name="Topic"
                placeholder="Topic"
              />
              <Input
                value={this.state.StartYear}
                onChange={this.handleInputChange}
                name="StartYear"
                placeholder="2000"
              />
              <Input
                value={this.state.EndYear}
                onChange={this.handleInputChange}
                name="EndYear"
                placeholder="EndYear"
              />
              <FormBtn
                disabled={!(this.state.Topic && this.state.StartYear)}
                onClick={this.handleFormSubmit}
              >
                Search For An Article
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
              <h1>Saved Articles</h1>

            {this.state.OtherState.length ? (
              <List>
                {this.state.OtherState.map((Article, id) => (
                  <ListItem key={id}>
                      <strong>
                        {Article.headline.main} 
                        </strong>
                    <DeleteBtn onClick={() => this.deleteArticle(id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Article;
