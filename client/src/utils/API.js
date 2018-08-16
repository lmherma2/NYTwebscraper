import axios from "axios";

export default {
  // Gets all Article
  getArticles: function() {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=ef9dfeec77c54d0b9b015dd6ebfb281a";
    return axios.get(url);
  },
  // Gets the Article with the given id
  getArticle: function(Topic, BeginDate, EndDate) {
    var a = Topic.split(' ').join('+');
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"
    url += "q=" + a + "&"
    url += "api-key=ef9dfeec77c54d0b9b015dd6ebfb281a";
    url += "&begin_date=" + BeginDate +"0101" + "&end_date=" + EndDate+ "0101";
    return axios.get(url);
  },

  // // Deletes the Article with the given id
  // deleteArticle: function(id) {
  //   return axios.delete("/api/Articles", id);
  // },
  // // Saves a Article to the database
  // saveArticle: function(Article) {
  //    return axios.post("/api/Articles", Article);
  // },
  // getArticlesFromDatabase: function(){
  //   console.log("Find all get");
  //   console.log(axios.get("/api/Articles"))
  // return axios.get("/api/Articles").then(res => console.log(res.data))
  // },

  // getArticlesFromDatabaseWithId: function(id){
  //   console.log("Find with Id");
  //   console.log(axios.get("/api/Articles/"+ id))
  // return axios.get("/api/Articles/"+ id);

  // }
};
