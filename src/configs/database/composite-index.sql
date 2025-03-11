------------------------------------- ORDER - COMPOSITE INDEX
CREATE TABLE orders (
    id VARCHAR(255) PRIMARY KEY,
    customer_id VARCHAR(255),
    order_date TIMESTAMP,
    order_status VARCHAR(50),
    amount INT
);

CREATE INDEX idx_composite ON orders (customer_id, order_date, order_status);

INSERT INTO orders (id, customer_id, order_date, order_status, amount)
SELECT
    'ORD' || LPAD(gs::TEXT, 6, '0'),
    'CUST' || LPAD((floor(random() * 1000) + 1)::TEXT, 3, '0'),
    NOW() - (random() * INTERVAL '365 days'),
    CASE
        WHEN random() < 0.3 THEN 'Pending'
        WHEN random() < 0.6 THEN 'Completed'
        ELSE 'Shipped'
        END,
    (random() * 10000)::INT
FROM generate_series(1, 100000) AS gs;

EXPLAIN ANALYZE
SELECT *
FROM orders
WHERE customer_id = 'CUST001'
  AND order_date >= '2024-02-11'
  AND order_status = 'Pending'
;

------------------------------------- ORDERS V2 - MULTI-COLUMN INDEX
CREATE TABLE orders_v2 (
    id VARCHAR(255) PRIMARY KEY,
    customer_id VARCHAR(255),
    order_date TIMESTAMP,
    order_status VARCHAR(50),
    amount INT
);

CREATE INDEX idx_customer_id ON orders_v2 (customer_id);
CREATE INDEX idx_date ON orders_v2 (order_date);
CREATE INDEX idx_status ON orders_v2 (order_status);

INSERT INTO orders_v2 (id, customer_id, order_date, order_status, amount)
SELECT
    'ORD' || LPAD(gs::TEXT, 6, '0'),
    'CUST' || LPAD((floor(random() * 1000) + 1)::TEXT, 3, '0'),
    NOW() - (random() * INTERVAL '365 days'),
    CASE
        WHEN random() < 0.3 THEN 'Pending'
        WHEN random() < 0.6 THEN 'Completed'
        ELSE 'Shipped'
        END,
    (random() * 10000)::INT
FROM generate_series(1, 100000) AS gs;

EXPLAIN ANALYZE
SELECT *
FROM orders_v2
WHERE customer_id = 'CUST001'
    AND order_date >= '2024-02-11'
    AND order_status = 'Pending'
;

