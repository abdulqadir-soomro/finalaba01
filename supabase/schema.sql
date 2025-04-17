-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create a table for orders
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete set null,
  order_number text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  notes text,
  subtotal numeric not null,
  shipping numeric not null,
  total numeric not null,
  status text not null default 'pending',
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create a table for order items
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders on delete cascade not null,
  product_id integer not null,
  product_name text not null,
  price numeric not null,
  quantity integer not null,
  size text,
  color text,
  length text,
  inner text,
  scarf text,
  fabric text,
  embroidery text,
  created_at timestamp with time zone default now() not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Create policies
-- Public profiles are viewable by everyone
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

-- Users can insert their own profile
create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Users can view their own orders
create policy "Users can view their own orders"
  on orders for select
  using (auth.uid() = user_id);

-- Users can insert their own orders
create policy "Users can insert their own orders"
  on orders for insert
  with check (auth.uid() = user_id);

-- Users can view their own order items
create policy "Users can view their own order items"
  on order_items for select
  using (order_id in (select id from orders where user_id = auth.uid()));

-- Users can insert their own order items
create policy "Users can insert their own order items"
  on order_items for insert
  with check (order_id in (select id from orders where user_id = auth.uid()));

-- Create functions for managing user profiles
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
