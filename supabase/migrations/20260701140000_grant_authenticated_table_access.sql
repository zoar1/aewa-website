-- RLS policies alone are not sufficient in Postgres — the role also needs the
-- underlying table-level GRANT, or every query fails with "permission denied"
-- before RLS is even evaluated. testimonials and client_logos were created via
-- raw SQL (unlike site_content, likely created through the dashboard UI, which
-- auto-grants these), so the authenticated role was never actually granted access.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_logos TO authenticated;

-- anon already works in practice (public pages render fine), but grant
-- explicitly so it isn't relying on an implicit/legacy default.
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT ON public.client_logos TO anon;
