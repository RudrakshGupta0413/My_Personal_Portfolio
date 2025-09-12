-- Attach trigger to create a profile on new auth user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Ensure updated_at is maintained automatically
-- Profiles
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

-- Blogs
create trigger update_blogs_updated_at
  before update on public.blogs
  for each row execute function public.update_updated_at_column();

-- Freelance updates
create trigger update_freelance_updates_updated_at
  before update on public.freelance_updates
  for each row execute function public.update_updated_at_column();