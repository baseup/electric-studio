import sys
from motorengine.errors import InvalidDocumentError
from app.models.packages import Product

import tornado
import json
    
def find(self):
    products = yield Product.objects.find_all()
    self.render_json(products);
    self.finish()

def find_one(self, id):
    package = yield Product.objects.get(id)
    self.write(package.to_dict())
    self.finish()

def create(self):
    name = self.get_argument('name')
    amount = self.get_argument('amount')
    stock = self.get_argument('stock')
    product_desc = self.get_argument('product_desc')
    try :
        product = Product(name=name, 
                            amount=amount,
                            stock=stock,
                            product_desc=product_desc)
        product = yield product.save()
        self.render_json(product)
    except :
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def update(self, id):
    name = self.get_argument('name')
    amount = self.get_argument('amount')
    stock = self.get_argument('stock')
    product_desc = self.get_argument('product_desc')
    try :
        product = yield Product.objects.get(id)
        product.name = name
        product.amount = amount
        product.stock = stock
        product.product_desc = product_desc
        product = yield product.save()
        self.render_json(product)
    except :
        value = sys.exc_info()[1]
        self.set_status(403)
        self.write(str(value))
    self.finish()

def destroy(self, id):
    del_product = yield Product.objects.get(id)
    del_product.delete()
    self.finish()
