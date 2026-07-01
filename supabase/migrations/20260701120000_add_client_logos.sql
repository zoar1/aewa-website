-- Add newly supplied client logos (Schlumberger, Halliburton, Baker Hughes)
INSERT INTO public.client_logos (name, file_url, active, display_order)
SELECT
  t.name,
  t.file_url,
  true,
  (SELECT COALESCE(MAX(display_order), 0) FROM public.client_logos) + row_number() OVER ()
FROM (VALUES
  ('Schlumberger', '/images/Client logos/Schlumberger.png'),
  ('Halliburton',  '/images/Client logos/Halliburton.png'),
  ('Baker Hughes', '/images/Client logos/Baker-Hughes.png')
) AS t(name, file_url)
WHERE NOT EXISTS (
  SELECT 1 FROM public.client_logos existing WHERE existing.name = t.name
);
