import unittest
import server
import crud
import json
import model
import os
import test_seed

# os.system("dropdb testbookworm")
# os.system("createdb testbookworm")

class CrudTestCase(unittest.TestCase):

    # def setUp(self):
    #     model.connect_to_db(server.app, "testbookworm")
    #     model.db.create_all()   
    #     test_seed.test_data()

    # def tearDown(self):
    #     model.db.session.close()
    #     model.db.drop_all()

    def test_get_book_by_isbn(self):
        neverwhere = crud.get_book_by_isbn("yuCUZ3km3qIC")
        self.assertEqual(neverwhere.title, "Neverwhere")

    def test_get_user_by_id(self):
        hunter = crud.get_user_by_id(1)
        self.assertEqual(hunter.email, "hunterglaine@gmail.com")

    def test_get_user_by_email(self):
        jake = crud.get_user_by_email("jake@test.com")
        self.assertEqual(jake.first_name, "Jake")

    def test_get_category_by_label(self):
        category = crud.get_category_by_label(3, "Learn Something New") 
        self.assertEqual(category.id, 8)


class FlaskTestCase(unittest.TestCase):

    def setUp(self):
        self.client = server.app.test_client()
        server.app.config["TESTING"] = True

        model.connect_to_db(server.app, "testbookworm")

    def tearDown(self):
        model.db.session.close()
    
    def test_root(self):
        result = self.client.get("/")
        self.assertIn(b'<div id="root">', result.data)

    def test_create_new_user(self):
        response = self.client.post("/users",
                                    data = json.dumps({"first_name": "Richard",
                                                        "last_name": "Mayhew",
                                                        "email": "rmayhew@londonbelow.com",
                                                        "password": "door",
                                                        "city": "London",
                                                        "state": "RE"}),
                                    content_type = "application/json")
        self.assertEqual(response.data, 
                        b'{"user":{"city":"London","email":"rmayhew@londonbelow.com","first_name":"Richard","id":7,"is_searchable":true,"last_name":"Mayhew","state":"RE"}}\n')

        response = self.client.get("/users",

    def test_create_new_user(self):
        response = self.client.get("/users",
                                    data = json.dumps({"first_name": "Richard",
                                                        "last_name": "Mayhew",
                                                        "email": "rmayhew@londonbelow.com",
                                                        "password": "door",
                                                        "city": "London",
                                                        "state": "RE"}),
                                    content_type = "application/json")
        self.assertEqual(response.data, 
                        b'{"user":{"city":"London","email":"rmayhew@londonbelow.com","first_name":"Richard","id":7,"is_searchable":true,"last_name":"Mayhew","state":"RE"}}\n')

    # def test_get_user_by_email(self):
    #     # client = server.app.test_client()
    #     # result = crud.get_user_by_email("hunterglaine@gmail.com")
    #     # self.assertIn(b"email='hunterglaine@gmail.com'>", result.data)
    #     # # crud.create_new_user()
       
    #     client = server.app.test_client()
    #     result = client.post("/users", json={"first_name": "Yichen",
    #                             "last_name": "Dai",
    #                             "email": "yichen@test.com",
    #                             "password": "test",
    #                             "city": "San Francisco",
    #                             "state": "CA"})
    #     json_data = result.get_json()
    #     self.assertIn(b"email: 'yichen@test.com'>", result.data)
    #     with app.test_client() as c:
    # rv = c.post('/api/auth', json={
    #     'email': 'flask@example.com', 'password': 'secret'
    # })
    # json_data = rv.get_json()
    # assert verify_token(email, json_data['token'])



if __name__ == "__main__":
    unittest.main()