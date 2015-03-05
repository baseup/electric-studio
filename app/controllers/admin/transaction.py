from app.models.packages import UserPackage

def find(self):
    transactions = yield UserPackage.objects.find_all()
    self.render_json(transactions)

def find_one(self):
    pass