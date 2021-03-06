import unittest
import server
import crud


class MyAppUnitTestCase(unittest.TestCase):

    def test_users(self):
        
        client = server.app.test_client()
        result = client.get("/user")
        self.assertIn(b"<h1>Bookshelf</h1>", result.data)


if __name__ == "__main__":
    unittest.main()