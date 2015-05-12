import sys
from motorengine.errors import InvalidDocumentError
from app.models.packages import Product

import tornado
import json
    
def find(self):
    products = yield Product.objects.find_all()
    self.render_json(products);

def find_one(self, id):
    product = yield Product.objects.get(id)
    if product:
        self.render_json(product)
    else:
        result = {
            'message' : 'No product found with this id ' + id,
            'valid' : False,
            'status' : 404
        }
        self.set_status(404)
        self.render_json(result)

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
        result = {
            'message': str(value),
            'status': 400,
            'valid': False
        }
        self.set_status(400)
        self.render_json(result)

def update(self, id):
    name = self.get_argument('name')
    amount = self.get_argument('amount')
    stock = self.get_argument('stock')
    product_desc = self.get_argument('product_desc')
    try :
        product = yield Product.objects.get(id)
        if product:
            product.name = name
            product.amount = amount
            product.stock = stock
            product.product_desc = product_desc
            product = yield product.save()
            self.render_json(product)
        else:
            result = {
                'message' : 'No product found with this id ' + id,
                'valid' : False,
                'status' : 404
            }
            self.set_status(404)
            self.render_json(result)
    except :
        value = sys.exc_info()[1]
        result = {
            'message': str(value),
            'status': 400,
            'valid': False
        }
        self.set_status(400)
        self.render_json(result)

def destroy(self, id):
    del_product = yield Product.objects.get(id)
    del_product.delete()
    self.finish()
