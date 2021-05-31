//Require the dev-dependencies
const server = require('../src/app');
const chai = require('chai');
const chaiHttp =require("chai-http");
const expect = require('chai').expect;



//Assertion
chai.should();
chai.expect();
chai.use(chaiHttp);
 /*
  * Search for the user with username “Delphine”. /GET route
  */
describe('Users APIs',() =>{
    describe('Search Delphine username /users',() =>{
        it("It should return all delphine s' details ",(done) => {
            const user_name  = "Delphine";
            chai.request(server)
                .get("/users?username="+user_name)
                .end((_err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array').to.be.not.null;
                    response.body[0].should.have.property("id").to.be.not.null;
                    response.body[0].should.have.property("name").to.be.not.null;
                    response.body[0].should.have.property("username").to.be.not.null;
                    response.body[0].should.have.property("email").to.be.not.null;
                    response.body[0].should.have.property("address").to.be.not.null;
                    response.body[0].address.should.have.property("street").to.be.not.null;
                    response.body[0].address.should.have.property("suite").to.be.not.null;
                    response.body[0].address.should.have.property("city").to.be.not.null;
                    response.body[0].address.should.have.property("zipcode").to.be.not.null;
                    response.body[0].address.should.have.property("geo").to.be.not.null;
                    response.body[0].address.geo.should.have.property("lat").to.be.not.null;
                    response.body[0].address.geo.should.have.property("lng").to.be.not.null;
                    response.body[0].should.have.property("phone").to.be.not.null;
                    response.body[0].should.have.property("website").to.be.not.null;
                    response.body[0].should.have.property("company").to.be.not.null;
                    response.body[0].should.have.property("company").to.be.not.null;
                    response.body[0].company.should.have.property("name").to.be.not.null;
                    response.body[0].company.should.have.property("catchPhrase").to.be.not.null;
                    response.body[0].company.should.have.property("bs").to.be.not.null;
                    expect(response.body[0].id).to.be.eql(9);
                    expect(response.body[0].username).to.be.eql("Delphine")
                done();    

                });
            });
        });
    });
/*
  * Use the details fetched to make a search for the posts written by the
user.”. /GET route
  */
describe('Posts APIs',() =>{
    describe(' Details fetched /posts',() =>{
        it("It should return all the posts written by the user ",(done) => {
            const user_id  = 9;
            chai.request(server)
                .get("/posts?userId="+user_id)
                .end((_err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0,1,2,3,4,5,6,7,8,9].should.have.property("userId").to.be.not.null
                    response.body[0,1,2,3,4,5,6,7,8,9].should.have.property("id").to.be.not.null
                    response.body[0,1,2,3,4,5,6,7,8,9].should.have.property("title").to.be.not.null
                    response.body[0,1,2,3,4,5,6,7,8,9].should.have.property("body").to.be.not.null
                    response.body[0,1,2,3,4,5,6,7,8,9].should.have.property("userId").eql(user_id);
                done();
                });           
            });
        });
    });
/*
  * For each post, fetch the comments and validate if the emails in the
comment section are in the proper format..”. /GET route
  */
    function ValidateEmail(mail) 
    {
        if (/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(mail))
    {   
         return (true)
    }    
         return (false)
    }
describe('Comments APIs',() =>{
        it("It should return all the Comments written by the users ",(done) => {
            chai.request(server)
                .get("/comments")
                .end((_err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                });
            });   
        it("It should return all the Comments written by the postId 81 ",(done) => {
            const post_id = 81;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {  
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0,1,2,3].should.have.property("postId").to.be.not.null
                    response.body[0,1,2,3].should.have.property("id").to.be.not.null
                    response.body[0,1,2,3].should.have.property("name").to.be.not.null
                    response.body[0,1,2,3].should.have.property("email").to.be.not.null
                    response.body[0,1,2,3].should.have.property("body").to.be.not.null
                    expect(response.body[0,1,2,3].postId).to.be.eql(post_id);
                done();
            });
        });           
        it("Email validation for postId 81 ",(done) => {
            const post_id = 81;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    const checkmail = ValidateEmail(response.body[0,1,2,3].email);
                    expect(checkmail).to.be.eql(true);
                done();    
                }) ;
            });
        it("It should return all the Comments written by the postId 82 ",(done) => {
            const post_id = 82;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0,1,2,3].should.have.property("postId").to.be.not.null
                    response.body[0,1,2,3].should.have.property("id").to.be.not.null
                    response.body[0,1,2,3].should.have.property("name").to.be.not.null
                    response.body[0,1,2,3].should.have.property("email").to.be.not.null
                    response.body[0,1,2,3].should.have.property("body").to.be.not.null
                    expect(response.body[0,1,2,3].postId).to.be.eql(post_id);
                done();
            }) ;
        });           
        it("Email validation for postId 82 ",(done) => {
            const post_id = 82;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    const checkmail = ValidateEmail(response.body[0,1,2,3].email);
                    expect(checkmail).to.be.eql(true);
                done();
             });
        });
        it("It should return all the Comments written by the postId 83 ",(done) => {
            const post_id = 83;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0,1,2,3].should.have.property("postId").to.be.not.null
                    response.body[0,1,2,3].should.have.property("id").to.be.not.null
                    response.body[0,1,2,3].should.have.property("name").to.be.not.null
                    response.body[0,1,2,3].should.have.property("email").to.be.not.null
                    response.body[0,1,2,3].should.have.property("body").to.be.not.null
                    expect(response.body[0,1,2,3].postId).to.be.eql(post_id);
                done();    
            });
        });
        it("Email validation for postId 83 ",(done) => {
            const post_id = 83;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    const checkmail = ValidateEmail(response.body[0,1,2,3].email);
                    expect(checkmail).to.be.eql(true);
                done();
             });
        });
        it("It should return all the Comments written by the postId 84 ",(done) => {
            const post_id = 84;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0,1,2,3].should.have.property("postId").to.be.not.null
                    response.body[0,1,2,3].should.have.property("id").to.be.not.null
                    response.body[0,1,2,3].should.have.property("name").to.be.not.null
                    response.body[0,1,2,3].should.have.property("email").to.be.not.null
                    response.body[0,1,2,3].should.have.property("body").to.be.not.null
                    expect(response.body[0,1,2,3].postId).to.be.eql(post_id);
                done();   
            });
        });
        it("Email validation for postId 84 ",(done) => {
            const post_id = 84;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    const checkmail = ValidateEmail(response.body[0,1,2,3].email);
                    expect(checkmail).to.be.eql(true);
                done();
             });
        });
        it("It should return all the Comments written by the postId 85 ",(done) => {
            const post_id = 85;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0,1,2,3].should.have.property("postId").to.be.not.null
                    response.body[0,1,2,3].should.have.property("id").to.be.not.null
                    response.body[0,1,2,3].should.have.property("name").to.be.not.null
                    response.body[0,1,2,3].should.have.property("email").to.be.not.null
                    response.body[0,1,2,3].should.have.property("body").to.be.not.null
                    expect(response.body[0,1,2,3].postId).to.be.eql(post_id);
                done();   
            });
        });
        it("Email validation for postId 85 ",(done) => {
            const post_id = 85;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    const checkmail = ValidateEmail(response.body[0,1,2,3].email);
                    expect(checkmail).to.be.eql(true);
                done();
             });
        });
        it("It should return all the Comments written by the postId 86 ",(done) => {
            const post_id = 86;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0,1,2,3].should.have.property("postId").to.be.not.null
                    response.body[0,1,2,3].should.have.property("id").to.be.not.null
                    response.body[0,1,2,3].should.have.property("name").to.be.not.null
                    response.body[0,1,2,3].should.have.property("email").to.be.not.null
                    response.body[0,1,2,3].should.have.property("body").to.be.not.null
                    expect(response.body[0,1,2,3].postId).to.be.eql(post_id);
                done();   
            });
        });
        it("Email validation for postId 86 ",(done) => {
            const post_id = 86;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    const checkmail = ValidateEmail(response.body[0,1,2,3].email);
                    expect(checkmail).to.be.eql(true);
                done();
             });
        });
        it("It should return all the Comments written by the postId 87 ",(done) => {
            const post_id = 87;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0,1,2,3].should.have.property("postId").to.be.not.null
                    response.body[0,1,2,3].should.have.property("id").to.be.not.null
                    response.body[0,1,2,3].should.have.property("name").to.be.not.null
                    response.body[0,1,2,3].should.have.property("email").to.be.not.null
                    response.body[0,1,2,3].should.have.property("body").to.be.not.null
                    expect(response.body[0,1,2,3].postId).to.be.eql(post_id);
                done();   
            });
        });
        it("Email validation for postId 87 ",(done) => {
            const post_id = 87;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    const checkmail = ValidateEmail(response.body[0,1,2,3].email);
                    expect(checkmail).to.be.eql(true);
                done();
             });
        });
        it("It should return all the Comments written by the postId 88 ",(done) => {
            const post_id = 88;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0,1,2,3].should.have.property("postId").to.be.not.null
                    response.body[0,1,2,3].should.have.property("id").to.be.not.null
                    response.body[0,1,2,3].should.have.property("name").to.be.not.null
                    response.body[0,1,2,3].should.have.property("email").to.be.not.null
                    response.body[0,1,2,3].should.have.property("body").to.be.not.null
                    expect(response.body[0,1,2,3].postId).to.be.eql(post_id);
                done();   
            });
        });
        it("Email validation for postId 88 ",(done) => {
            const post_id = 88;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    const checkmail = ValidateEmail(response.body[0,1,2,3].email);
                    expect(checkmail).to.be.eql(true);
                done();
             });
        });
        it("It should return all the Comments written by the postId 89 ",(done) => {
            const post_id = 89;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0,1,2,3].should.have.property("postId").to.be.not.null
                    response.body[0,1,2,3].should.have.property("id").to.be.not.null
                    response.body[0,1,2,3].should.have.property("name").to.be.not.null
                    response.body[0,1,2,3].should.have.property("email").to.be.not.null
                    response.body[0,1,2,3].should.have.property("body").to.be.not.null
                    expect(response.body[0,1,2,3].postId).to.be.eql(post_id);
                done();   
            });
        });
        it("Email validation for postId 89 ",(done) => {
            const post_id = 89;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    const checkmail = ValidateEmail(response.body[0,1,2,3].email);
                    expect(checkmail).to.be.eql(true);
                done();
             });
        });
        it("It should return all the Comments written by the postId 90 ",(done) => {
            const post_id = 90;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body[0,1,2,3].should.have.property("postId").to.be.not.null
                    response.body[0,1,2,3].should.have.property("id").to.be.not.null
                    response.body[0,1,2,3].should.have.property("name").to.be.not.null
                    response.body[0,1,2,3].should.have.property("email").to.be.not.null
                    response.body[0,1,2,3].should.have.property("body").to.be.not.null
                    expect(response.body[0,1,2,3].postId).to.be.eql(post_id);
                done();   
            });
        });
        it("Email validation for postId 90 ",(done) => {
            const post_id = 90;
            chai.request(server)
                .get("/comments?postId="+post_id)
                .end((_err,response) => {
                    const checkmail = ValidateEmail(response.body[0,1,2,3].email);
                    expect(checkmail).to.be.eql(true);
                done();
             });
        });     
    });

