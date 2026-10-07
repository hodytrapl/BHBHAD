import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
import json

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from moduls.API_Payment.API_SBER import SberPayGateway
from moduls.API_Payment.API_T import TBankPayGateway
from moduls.Open_weather.API_Weather import WeatherMonitor
from moduls.SERVER_api_SELECTEL.connect import SelectelServerConnector

# главный класс бекенда
class BankSimulatorHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

      # создание подключение кл всем зависимым источникам(get - запрос)
    def do_GET(self):
        if self.path == '/api/config':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            connector = SelectelServerConnector()
            self.wfile.write(json.dumps(connector.load_configuration()).encode('utf-8'))
        elif self.path == '/api/weather':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            monitor = WeatherMonitor()
            self.wfile.write(json.dumps(monitor.get_current_weather()).encode('utf-8'))
        else:
            if self.path == '/' or self.path == '':
                self.path = '/core/HTML/HTML/index.html'
            elif self.path.startswith('/core/HTML/'):
                pass
            else:
                cleaned_path = self.path.lstrip('/')
                if os.path.exists(os.path.join('core', 'HTML', cleaned_path)):
                    self.path = f'/core/HTML/{cleaned_path}'
            return super().do_GET()

# отправка денег на другой счёт
    def do_POST(self):
        if self.path == '/api/pay':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            bank = data.get('bank')
            amount = float(data.get('amount', 0))

            if bank == 'SBER':
                gateway = SberPayGateway()
                result = gateway.process_payment(amount)
            elif bank == 'TINKOFF':
                gateway = TBankPayGateway()
                result = gateway.process_payment(amount)
            else:
                result = {"success": False, "message": "Unknown gateway"}

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode('utf-8'))

# запуск программы по конфигу
def run(server_class=HTTPServer, handler_class=BankSimulatorHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Сервер симулятора банка запущен на http://localhost:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass

if __name__ == '__main__':
    run()
