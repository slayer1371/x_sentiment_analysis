# in tests/test_api.py
import pytest
from app import app # Import your Flask app instance

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    """Tests if the server is running."""
    # Note: You might need to add a simple '/' route to your app.py for this to pass
    # @app.route('/')
    # def home():
    #     return "OK"
    response = client.get('/')
    assert response.status_code == 200
    assert b"OK" in response.data