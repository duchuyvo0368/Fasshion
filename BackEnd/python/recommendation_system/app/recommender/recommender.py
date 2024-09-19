import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics import pairwise_distances
import numpy as np
import math

from sqlalchemy import create_engine

from app.models.models import Products

engine = create_engine('mysql://root@localhost/ecom').connect()
df_store_product = pd.read_sql_table('products', engine)
print(df_store_product)

tfidf_title_vectorizer = TfidfVectorizer(min_df=1)
tfidf_title_features = tfidf_title_vectorizer.fit_transform(df_store_product['name'])
tf_idf_euclidean = []


def tfidf_model(doc_id, num_results):
    L = []
    pairwise_dist = pairwise_distances(tfidf_title_features, tfidf_title_features[doc_id])

    indices = np.argsort(pairwise_dist.flatten())[0:num_results]
    pdists = np.sort(pairwise_dist.flatten())[0:num_results]

    df_indices = list(df_store_product.index[indices])
    for i in range(0, len(indices)):
        L.append(df_store_product['asin'].loc[df_indices[i]])
    return L


idf_title_vectorizer = CountVectorizer()
idf_title_features = idf_title_vectorizer.fit_transform(df_store_product['name'])


def n_containing(word):
    # return the number of documents which had the given word
    return sum(1 for blob in df_store_product['name'] if word in blob.split())


def idf(word):
    # idf = log(#number of docs / #number of docs which had the given word)
    return math.log(df_store_product.shape[0] / (n_containing(word)))


idf_euclidean = []


def idf_model(doc_id, num_results):
    M = []
    pairwise_dist = pairwise_distances(idf_title_features, idf_title_features[doc_id])

    indices = np.argsort(pairwise_dist.flatten())[0:num_results]
    pdists = np.sort(pairwise_dist.flatten())[0:num_results]

    df_indices = list(df_store_product.index[indices])

    for i in range(0, len(indices)):
        M.append(df_store_product['asin'].loc[df_indices[i]])

    return M


title_vectorizer = CountVectorizer()
title_features = title_vectorizer.fit_transform(df_store_product['name'])
title_features.get_shape()
bag_of_words_euclidean = []


def bag_of_words_model(doc_id, num_results):
    B = []
    pairwise_dist = pairwise_distances(title_features, title_features[doc_id])

    # np.argsort will return indices of the smallest distances
    indices = np.argsort(pairwise_dist.flatten())[0:num_results]
    # pdists will store the smallest distances
    pdists = np.sort(pairwise_dist.flatten())[0:num_results]

    # data frame indices of the 9 smallest distace's
    df_indices = list(df_store_product.index[indices])

    for i in range(0, len(indices)):
        B.append(df_store_product['asin'].loc[df_indices[i]])

    return B


def global_model(doc_id, num_results):
    G = bag_of_words_model(doc_id, num_results) + tfidf_model(doc_id, num_results) + idf_model(doc_id, num_results)
    G = list(dict.fromkeys(G))
    return G


def product_to_dict(products):
    return {
        'id': products.id,
        'asin': products.asin,
        'name': products.name,
        'contentHTML': products.contentHTML,
        'contentMarkdown': products.contentMarkdown,
        'statusId': products.statusId,
        'categoryId': products.categoryId,
        'view': products.view,
        'madeby': products.madeby,
        'material': products.material,
        'brandId': products.brandId,
        'createdAt': products.createdAt.isoformat() if products.createdAt else None,
        'updatedAt': products.updatedAt.isoformat() if products.updatedAt else None
    }


def get_recommendations1(product_id):
    # Kiểm tra xem product_id có tồn tại trong DataFrame không


    # Tìm chỉ số (index) của product_id trong DataFrame
    doc_id = df_store_product.index[df_store_product['id'] == product_id].tolist()[0]

    # Lấy các đề xuất
    recommendations = global_model(doc_id, 5)

    # Truy vấn các sản phẩm tương tự
    similar_products = Products.query.filter(Products.asin.in_(recommendations)).all()

    # Chuyển đổi sản phẩm thành dict
    similar_products_list = [product_to_dict(prod) for prod in similar_products]

    # Tạo context để trả về
    context = {
        'product_id': product_id,
        'recommendations': recommendations,
        'similar_products': similar_products_list
    }

    return context
