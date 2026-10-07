import random

class WeatherMonitor:
    def __init__(self):
        self.city = "Moscow"

    # получения погоды по api
    def get_current_weather(self) -> dict:
        conditions = ["Clear", "Cloudy", "Rainy", "Snowing"]
        return {
            "city": self.city,
            "temp": random.randint(-5, 25),
            "condition": random.choice(conditions)
        }
