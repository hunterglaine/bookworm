import unittest
import server
import crud
import json


class MyAppUnitTestCase(unittest.TestCase):

    def test_get_user_by_email(self):
        # client = server.app.test_client()
        # result = crud.get_user_by_email("hunterglaine@gmail.com")
        # self.assertIn(b"email='hunterglaine@gmail.com'>", result.data)
        # # crud.create_new_user()
       
        client = server.app.test_client()
        result = client.post("/users", json={"first_name": "Yichen",
                                "last_name": "Dai",
                                "email": "yichen@test.com",
                                "password": "test",
                                "city": "San Francisco",
                                "state": "CA"})
        json_data = result.get_json()
        self.assertIn(b"email: 'yichen@test.com'>", result.data)
    #     with app.test_client() as c:
    # rv = c.post('/api/auth', json={
    #     'email': 'flask@example.com', 'password': 'secret'
    # })
    # json_data = rv.get_json()
    # assert verify_token(email, json_data['token'])



if __name__ == "__main__":
    unittest.main()