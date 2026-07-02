-- Same root cause as the earlier testimonials/client_logos fix: RLS policies
-- exist but the authenticated role was never granted the underlying table
-- privileges, so every write from the admin Site Content editor fails with
-- "permission denied for table site_content" before RLS is even evaluated.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT SELECT ON public.site_content TO anon;
