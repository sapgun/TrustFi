-- 사용자 프로필 테이블 생성
create table if not exists public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  privy_user_id text unique not null,
  email text,
  display_name text,
  avatar_url text,
  trust_score integer default 0,
  trust_level text default 'Bronze',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS 활성화
alter table public.user_profiles enable row level security;

-- RLS 정책: 모든 사용자가 자신의 프로필을 볼 수 있음
create policy "사용자는 자신의 프로필을 볼 수 있습니다"
  on public.user_profiles for select
  using (true);

-- RLS 정책: 사용자는 자신의 프로필을 생성할 수 있음
create policy "사용자는 자신의 프로필을 생성할 수 있습니다"
  on public.user_profiles for insert
  with check (true);

-- RLS 정책: 사용자는 자신의 프로필을 업데이트할 수 있음
create policy "사용자는 자신의 프로필을 업데이트할 수 있습니다"
  on public.user_profiles for update
  using (true);

-- 업데이트 시간 자동 갱신 함수
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 업데이트 트리거
drop trigger if exists on_user_profile_updated on public.user_profiles;
create trigger on_user_profile_updated
  before update on public.user_profiles
  for each row
  execute function public.handle_updated_at();

-- 인덱스 생성
create index if not exists idx_user_profiles_privy_user_id 
  on public.user_profiles(privy_user_id);
