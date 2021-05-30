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
  * Search for the user with username “Delphine”. /POST route
  */
describe('Users APIs',() =>{
    describe('Search Delphine username /users',() =>{
        it("It should return all delphine s' details ",(done) => {
            const user_name  = "Delphine";
            chai.request(server)
            .get("/users?username="+user_name)
            .end((_err,response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body[0].should.have.property("id");
                response.body[0].should.have.property("name");
                response.body[0].should.have.property("username");
                response.body[0].should.have.property("email");
                response.body[0].should.have.property("address");
                response.body[0].address.should.have.property("street");
                response.body[0].address.should.have.property("suite");
                response.body[0].address.should.have.property("city");
                response.body[0].address.should.have.property("zipcode");
                response.body[0].address.should.have.property("geo");
                response.body[0].address.geo.should.have.property("lat");
                response.body[0].address.geo.should.have.property("lng");
                response.body[0].should.have.property("phone");
                response.body[0].should.have.property("website");
                response.body[0].should.have.property("company");
                response.body[0].should.have.property("company");
                response.body[0].company.should.have.property("name");
                response.body[0].company.should.have.property("catchPhrase");
                response.body[0].company.should.have.property("bs");
                expect(response.body[0].id).to.be.not.null;
                expect(response.body[0].id).to.be.eql(9);
                expect(response.body[0].username).to.be.eql("Delphine")
            done();    

            });
        });
    });
});
