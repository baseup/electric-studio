def find(self):
    self.write('message.find')

def find_one(self, id):
    self.write('message.find_one')

def create(self):
    self.write('message.create')

def update(self, id):
    self.write('message.udpate')

def destroy(self, id):
    self.write('message.destroy')