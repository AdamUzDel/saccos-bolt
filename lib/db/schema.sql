-- Create saccos table
create table public.saccos (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  logo_url text,
  address text not null,
  phone_number text not null,
  email text not null,
  registration_number text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add missing columns to users table
alter table public.users add column if not exists first_name text not null;
alter table public.users add column if not exists last_name text not null;
alter table public.users add column if not exists phone_number text not null;
alter table public.users add column if not exists profile_image text;

-- Create transactions table
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  sacco_id uuid references public.saccos(id) not null,
  type text not null check (type in ('SAVINGS', 'WITHDRAWAL', 'LOAN', 'LOAN_REPAYMENT')),
  amount decimal(12,2) not null,
  status text not null check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  approved_by uuid references public.users(id),
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create loans table
create table public.loans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  sacco_id uuid references public.saccos(id) not null,
  amount decimal(12,2) not null,
  interest_rate decimal(5,2) not null,
  duration integer not null, -- in months
  status text not null check (status in ('PENDING', 'APPROVED', 'REJECTED', 'PAID')),
  approved_by uuid references public.users(id),
  approved_at timestamp with time zone,
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS policies for saccos
alter table public.saccos enable row level security;

create policy "App admins can manage all saccos" on public.saccos
  using (auth.jwt() ->> 'role' = 'app_admin');

create policy "SACCO admins can view and update their own SACCO" on public.saccos
  using (id = (
    select sacco_id from public.users 
    where id = auth.uid() and role = 'sacco_admin'
  ));

create policy "SACCO agents can view their SACCO" on public.saccos
  for select using (id = (
    select sacco_id from public.users 
    where id = auth.uid() and role = 'sacco_agent'
  ));

create policy "SACCO users can view their SACCO" on public.saccos
  for select using (id = (
    select sacco_id from public.users 
    where id = auth.uid() and role = 'sacco_user'
  ));

-- Set up RLS policies for transactions
alter table public.transactions enable row level security;

create policy "App admins can view all transactions" on public.transactions
  for select using (auth.jwt() ->> 'role' = 'app_admin');

create policy "SACCO admins can view their SACCO transactions" on public.transactions
  for select using (sacco_id = (
    select sacco_id from public.users 
    where id = auth.uid() and role = 'sacco_admin'
  ));

create policy "SACCO agents can manage transactions" on public.transactions
  using (sacco_id = (
    select sacco_id from public.users 
    where id = auth.uid() and role = 'sacco_agent'
  ));

create policy "Users can view own transactions" on public.transactions
  for select using (user_id = auth.uid());

-- Set up RLS policies for loans
alter table public.loans enable row level security;

create policy "App admins can view all loans" on public.loans
  for select using (auth.jwt() ->> 'role' = 'app_admin');

create policy "SACCO admins can view their SACCO loans" on public.loans
  for select using (sacco_id = (
    select sacco_id from public.users 
    where id = auth.uid() and role = 'sacco_admin'
  ));

create policy "SACCO agents can manage loans" on public.loans
  using (sacco_id = (
    select sacco_id from public.users 
    where id = auth.uid() and role = 'sacco_agent'
  ));

create policy "Users can view own loans" on public.loans
  for select using (user_id = auth.uid());

-- Create functions for updating timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for updating timestamps
create trigger handle_updated_at
  before update on public.users
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.saccos
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.transactions
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at
  before update on public.loans
  for each row
  execute function public.handle_updated_at();