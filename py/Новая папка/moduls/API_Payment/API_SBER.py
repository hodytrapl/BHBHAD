import random

class SberPayGateway:
    def __init__(self):
        self.gateway_name = "SberBank API v2.4"


    # првоерки лимита баланса
    def process_payment(self, amount: float) -> dict:
        if amount > 100000:
            return {"success": False, "message": "Limit exceeded for Sber anonymized gateway"}
        
        tx_id = f"SBER-{random.randint(100000, 999999)}"
        return {
            "success": True,
            "transaction_id": tx_id,
            "gateway": self.gateway_name,
            "amount": amount
        }
