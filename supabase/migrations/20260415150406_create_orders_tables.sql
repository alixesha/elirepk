
/*
  # ELIREPK Store - Orders Schema

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text) - buyer's full name
      - `customer_phone` (text) - contact number
      - `customer_address` (text) - delivery address
      - `payment_method` (text) - cod / jazzcash / easypaisa
      - `total_amount` (numeric) - total order value in PKR
      - `status` (text) - pending / confirmed / shipped / delivered
      - `created_at` (timestamptz)
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, FK to orders)
      - `product_id` (text) - product identifier
      - `product_name` (text)
      - `product_image` (text)
      - `price` (numeric)
      - `quantity` (int)
      - `size` (text, nullable)
      - `color` (text, nullable)

  2. Security
    - RLS enabled on both tables
    - Anyone can insert orders (public checkout)
    - Only authenticated users (admins) can read all orders
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  payment_method text NOT NULL DEFAULT 'cod',
  total_amount numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  product_name text NOT NULL,
  product_image text NOT NULL DEFAULT '',
  price numeric(10,2) NOT NULL,
  quantity int NOT NULL DEFAULT 1,
  size text DEFAULT '',
  color text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can insert order items"
  ON order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (true);
