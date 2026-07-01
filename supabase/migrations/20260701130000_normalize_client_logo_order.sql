-- Normalize display_order to alphabetical rank so the default ordering
-- (before any manual admin reordering) is alphabetical by name.
WITH ranked AS (
  SELECT id, row_number() OVER (ORDER BY name) - 1 AS rank
  FROM public.client_logos
)
UPDATE public.client_logos c
SET display_order = ranked.rank
FROM ranked
WHERE c.id = ranked.id;
