import unittest
import server
import crud


class MyAppUnitTestCase(unittest.TestCase):

    def test_get_user_by_email(self):
        # client = server.app.test_client()
        # result = crud.get_user_by_email("hunterglaine@gmail.com")
        # self.assertIn(b"email='hunterglaine@gmail.com'>", result.data)
        # # crud.create_new_user()
       
        # client = server.app.test_client()
        # result = client.post("/users", data={"first_name": "Hunter",
        #                         "last_name": "Laine",
        #                         "email": "yichen@test.com",
        #                         "password": "test",
        #                         "city": "San Francisco",
        #                         "state": "CA"})
        # self.assertIn(b"""{"user": {"first_name": Hunter,""", result.data)


if __name__ == "__main__":
    unittest.main()