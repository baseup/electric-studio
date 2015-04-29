import sys
from motorengine.errors import InvalidDocumentError
from app.models.packages import Product
from app.auth import auth_token

import tornado
import json
    
def find(self):
    if 'ES-Token' in self.request.headers:
        auth = yield auth_token(self.request.headers)
        if auth['valid']:
            products = yield Product.objects.find_all()
            self.render_json(products);
        else:
            self.set_status(403)
            self.render_json(auth)
    else:
        self.set_status(404)
        self.redirect('/#/notfound')
    self.finish()

def find_one(self, id):
    if 'ES-Token' in self.request.headers:
        auth = yield auth_token(self.request.headers)
        if auth['valid']:
            package = yield Product.objects.get(id)
            self.write(package.to_dict())
        else:
            self.set_status(403)
            self.render_json(auth)
    else:
        self.set_status(404)
        self.redirect('/#/notfound')
    self.finish()

def create(self):
    if 'ES-Token' in self.request.headers:
        auth = yield auth_token(self.request.headers)
        if auth['valid']:
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
            except :
                value = sys.exc_info()[1]
                self.set_status(403)
                self.write(str(value))
        else:
            self.set_status(403)
            self.render_json(auth)
    else:
        self.set_status(404)
        self.redirect('/#/notfound')
    self.finish()

def update(self, id):
    if 'ES-Token' in self.request.headers:
        auth = yield auth_token(self.request.headers)
        if auth['valid']:
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
        else:
            self.set_status(403)
            self.render_json(auth)
    else:
        self.set_status(404)
        self.redirect('/#/notfound')
    self.finish()

def destroy(self, id):
    if 'ES-Token' in self.request.headers:
        auth = yield auth_token(self.request.headers)
        if auth['valid']:
            del_product = yield Product.objects.get(id)
            del_product.delete()
        else:
            self.set_status(403)
            self.render_json(auth)
    else:
        self.set_status(404)
        self.redirect('/#/notfound')
    self.finish()
