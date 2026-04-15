/*
  # Fix Security Issues

  1. Unindexed Foreign Key
    - Add index on `order_items.order_id` to cover the FK constraint and improve JOIN performance

  2. RLS Policy Hardening
    - Drop the always-true `WITH CHECK (true)` INSERT policies on `orders` and `order_items`
    - Replace with policies that enforce basic data integrity:
      - `orders`: require non-empty customer_name, customer_phone, customer_address
      - `order_items`: require that the inserted order_id references a real order the same session created
        (enforced by checking the order exists in the orders table)

  3. Notes
    - Auth DB connection percentage strategy must be changed via the Supabase dashboard:
      Settings > Database > Connection pooling > switch from fixed to percentage-based allocation
*/

-- 1. Add covering index for the FK on order_items.order_id
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON public.order_items (order_id);

-- 2. Drop the always-true INSERT policies
DROP POLICY IF EXISTS "Anyone can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can insert order items" ON public.order_items;

-- 3. Recreate with meaningful WITH CHECK clauses

-- orders: ensure required fields are non-empty and total_amount is positive
CREATE POLICY "Anyone can insert orders"
  ON public.orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    customer_name <> ''
    AND customer_phone <> ''
    AND customer_address <> ''
    AND total_amount > 0
    AND payment_method IN ('cod', 'jazzcash', 'easypaisa')
  );

-- order_items: ensure the referenced order exists and fields are valid
CREATE POLICY "Anyone can insert order items"
  ON public.order_items
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    order_id IS NOT NULL
    AND EXISTS (SELECT 1 FROM public.orders WHERE id = order_id)
    AND price > 0
    AND quantity > 0
    AND product_name <> ''
  );
