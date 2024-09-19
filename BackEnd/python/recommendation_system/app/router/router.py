import pandas as pd
from flask import Blueprint, jsonify, request, current_app
from sqlalchemy.engine.create import create_engine

from app.controllers.controller_products import get_all_products, get_product_by_id, create_product, update_product
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics import pairwise_distances
import numpy as np
import math

from app.models.models import Products
from app.recommender.recommender import global_model, get_recommendations1

# Create a blueprint for the routes
main_bp = Blueprint('main', __name__)

@main_bp.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify({'message': 'Hello, World!'})


@main_bp.route('/api/products', methods=['GET'])

@main_bp.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    context = get_recommendations1(8)
    return jsonify(context)

