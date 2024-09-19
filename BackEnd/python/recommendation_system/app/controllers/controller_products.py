"""
    Example Controllers
"""
from flask import Blueprint

from app.models.models import Products, db

main = Blueprint('main', __name__)



def get_all_products():
    return Products.query.all()

def get_product_by_id(product_id):
    return Products .query.get(product_id)

def create_product(asin, name, contentHTML, contentMarkdown, statusId, categoryId, view, madeby, material, brandId):
    new_product = Products(
        asin=asin,
        name=name,
        contentHTML=contentHTML,
        contentMarkdown=contentMarkdown,
        statusId=statusId,
        categoryId=categoryId,
        view=view,
        madeby=madeby,
        material=material,
        brandId=brandId
    )
    db.session.add(new_product)
    db.session.commit()

def update_product(product_id, **kwargs):
    product = get_product_by_id(product_id)
    if product:
        for key, value in kwargs.items():
            if hasattr(product, key):
                setattr(product, key, value)
        db.session.commit()
    return product
